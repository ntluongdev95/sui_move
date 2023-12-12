module ntl_coin::ntl{
  use std::option;
  use sui::coin::{Self};
  //use sui::object::{Self, ID, UID};
  use sui::transfer;
  use sui::tx_context::{Self, TxContext};
  use sui::url::{Self,Url};
  
    struct NTL has drop{}

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
}