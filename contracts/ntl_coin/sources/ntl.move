

module ntl_coin::ntl{
  use std::option;
  use sui::coin::{Self};
  use sui::transfer;
  use sui::tx_context::{Self, TxContext};
  use sui::url::{Self,Url};

    struct NTL has drop{}
    #[allow(unused_function)]
    fun init(otw:NTL, ctx: &mut TxContext){
       let sender = tx_context::sender(ctx);
       let (treasury_cap, metadata) = coin::create_currency<NTL>(
        otw, 
        9, 
        b"NTL", 
        b"NTL Coin", 
        b"NTL Token on Devnet", 
        option::some(url::new_unsafe_from_bytes(
          b"https://t4.ftcdn.net/jpg/05/01/62/51/360_F_501625157_iwDUAUUnttN182U6kAI6UeU2KoctqgX6.jpg"
        )), 
        ctx
    );
    transfer::public_freeze_object(metadata);
    transfer::public_transfer(treasury_cap, sender)
    }
     public entry fun mint(
        treasury: &mut coin::TreasuryCap<NTL>, amount: u64, recipient: address, ctx: &mut TxContext
    ) {
        coin::mint_and_transfer(treasury, amount, recipient, ctx)
    }

    public entry fun burn(treasury: &mut coin::TreasuryCap<NTL>, coin: coin::Coin<NTL>) {
        coin::burn(treasury, coin);
    }

    public fun get_decimals(metadata: &coin::CoinMetadata<NTL>): u8{
        coin::get_decimals(metadata)
    }
    public fun get_icon_url(metadata: &coin::CoinMetadata<NTL>): option::Option<Url> {
        coin::get_icon_url(metadata)
    }

    // #[test]
    // public fun test_mint (){
    //     use sui::test_scenario;
    //     let admin = @0xAD;
    //     let user = @0x01;
    //     let scenario_val = test_scenario::begin(admin);
    //     let scenario = &mut scenario_val;
    //     {
    //         let ctx = test_scenario::ctx(scenario);
    //         init(NTL{},ctx)
    //    };
    //     test_scenario::next_tx(scenario, admin);
    //     {
    //         let treasury = test_scenario::take_from_sender<TreasuryCap<NTL>>(scenario);
    //         let treasury_ref = &mut treasury;
    //         mint(treasury_ref,100,user,test_scenario::ctx(scenario));
    //         test_scenario::return_to_sender(scenario, treasury);
    //     };
    //     test_scenario::end(scenario_val);
    // }
}
//ntl_coin = "0x70ee7a2d2517565ff0aaaee442f5950aa55f53a765674e4074f409c474011b14"
