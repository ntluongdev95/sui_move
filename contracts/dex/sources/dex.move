module ntl_swap::dex{
    use sui::object::{Self,UID};
    use sui::balance::{Self, Balance};
    use sui::tx_context::{Self,TxContext,sender};
    use sui::transfer ;
    use sui::coin::{Self,Coin};
    use std::string;
    use sui::display;
    use  ntl_coin::ntl::NTL;
    //status
    const POOL_ACTIVE: u64 = 0;
    const POOL_INACTIVE: u64 = 1;

    //Error
    const E_ZERO_AMOUNT: u64 = 0;
    const E_WRONG_FEE: u64 = 1;
    const E_NOT_ENOUGH_RESERVE :u64 = 2;
    const E_POOL_INACTIVE:u64=3;

    const FEE_SCALING: u128 = 1000;

    struct AdminCap has key, store {
        id: UID,
    }
    struct DEX has drop{ }
    
    struct Pool<phantom X,phantom Y> has key{
        id:UID,
        reserve_x: Balance<X>,
        reserve_y: Balance<Y>,
        fee_percent: u64,
        status: u64,
    }
    fun init(ctx: &mut TxContext) {
        let admin_cap = AdminCap {
            id: object::new(ctx),
       };
        let sender = tx_context::sender(ctx);
        transfer::public_transfer(admin_cap, sender(ctx));
    }

    public entry fun display<X ,Y> (otw:DEX,_:&AdminCap,ctx: &mut TxContext){
        let sender = tx_context::sender(ctx);
        let publisher = sui::package::claim(otw, ctx);
        let display = display::new<Pool<X,Y>>(&publisher, ctx);
        display::add(&mut display, string::utf8(b"name"), string::utf8(b"DEX"));
        display::add(&mut display, string::utf8(b"description"), string::utf8(b"A simple Dex to swap NTL token"));
        display::add(&mut display, string::utf8(b"website"), string::utf8(b"https://ntluongbn62.com"));
        display::update_version(&mut display);
        transfer::public_transfer(display, sender);
        transfer::public_transfer(publisher, sender);
    }


    public entry fun create_pool<X,Y>(_:&AdminCap,fee_percent:u64,ctx:&mut TxContext){
        assert!(fee_percent >= 0 && fee_percent < 1000, E_WRONG_FEE);
        transfer::share_object(Pool{
            id:object::new(ctx),
            reserve_x:balance::zero<X>(),
            reserve_y:balance::zero<Y>(),
            fee_percent,
            status:POOL_ACTIVE
        })
    }
    public entry fun deposit<X,Y>(
        _:&AdminCap,
        poll:&mut Pool<X,Y>,
        deposit_X:Coin<X>,
        deposit_Y:Coin<Y>,
        _ctx: &mut TxContext
    ){
        //   let amount_X = coin::value(&deposit_X);
        //   let amount_Y = coin::value(&deposit_Y);
          let balance_X  = coin::into_balance(deposit_X);
          let balance_Y  = coin::into_balance(deposit_Y);
          balance::join(&mut poll.reserve_x, balance_X);
          balance::join(&mut poll.reserve_y, balance_Y);
    }

    //SUI TO NTL
    public entry fun swap_x_to_y<X,Y>(
        pool:&mut Pool<X,Y>,
        price_input:u64, 
        price_output:u64,
        coin_x:Coin<X>,
        ctx: &mut TxContext
    ){ 
        assert!(pool.status ==POOL_ACTIVE,E_POOL_INACTIVE);
        transfer::public_transfer(
            x_to_y(pool,price_input,price_output, coin_x, ctx),
            tx_context::sender(ctx)
        )
    }
    //NTL TO SUI
     public entry fun swap_y_to_x<X,Y>(
        pool:&mut Pool<X,Y>,
        price_input:u64, 
        price_output:u64,
        coin_y:Coin<Y>,
        ctx: &mut TxContext
    ){  
        assert!(pool.status ==POOL_ACTIVE,E_POOL_INACTIVE);
        transfer::public_transfer(
            y_to_x(pool,price_input,price_output, coin_y, ctx),
            tx_context::sender(ctx)
        )
    }
    public fun x_to_y<X,Y>(
      pool:&mut Pool<X,Y>,
      price_input:u64, 
      price_output:u64,
      coin_x:Coin<X>,
     ctx: &mut TxContext
    ):Coin<Y>{
       let(reserve_x,reserve_y) = get_amounts(pool);
       let input_x = coin::value(&coin_x);
       let balance_x = coin::into_balance(coin_x);
       assert!(input_x > 0, E_ZERO_AMOUNT);
       assert!(input_x < reserve_x ,E_NOT_ENOUGH_RESERVE);
       let output_amount = get_output(price_input,price_output,input_x,reserve_x,reserve_y,pool.fee_percent);
       assert!(output_amount < reserve_y, E_NOT_ENOUGH_RESERVE);
       balance::join(&mut pool.reserve_x , balance_x);
       coin::take(&mut pool.reserve_y, output_amount, ctx)
    }
      public fun y_to_x<X,Y>(
      pool:&mut Pool<X,Y>,
      price_input:u64, 
      price_output:u64,
      coin_y:Coin<Y>,
     ctx: &mut TxContext
    ):Coin<X>{
       let(reserve_x,reserve_y) = get_amounts(pool);
       let input_y = coin::value(&coin_y);
       let balance_y = coin::into_balance(coin_y);
       assert!(input_y > 0, E_ZERO_AMOUNT);
       assert!(input_y < reserve_y ,E_NOT_ENOUGH_RESERVE);
       let output_amount = get_output(price_input,price_output,input_y,reserve_x,reserve_y,pool.fee_percent);
       assert!(output_amount < reserve_x, E_NOT_ENOUGH_RESERVE);
       balance::join(&mut pool.reserve_y , balance_y);
       coin::take(&mut pool.reserve_x, output_amount, ctx)

    }
    public fun get_output(price_input:u64, price_output:u64,input_amount: u64, input_reserve: u64, output_reserve: u64, fee_percent: u64):u64 {
           let (
            input_amount,
            input_reserve,
            output_reserve,
            fee_percent
        ) = (
            (input_amount as u128),
            (input_reserve as u128),
            (output_reserve as u128),
            (fee_percent as u128)
        );
        //
        let input_money = input_amount  *  (price_input as u128) ;
        let output_amount_without_fee = input_money / (price_output as u128) ;
        let output_amount_with_fee = output_amount_without_fee * (FEE_SCALING - fee_percent);

        (output_amount_with_fee as u64 )
    }
    public fun get_amounts<X,Y>(pool:&Pool<X,Y>):(u64,u64){
       (
        balance::value(&pool.reserve_x),
         balance::value(&pool.reserve_y)
       )
    }
    
}