module dao::dao{
    use sui::object::{Self,UID,ID};
    use std::string::{utf8, String};
    use sui::url::{Self,Url};
    use std::option::{Self, Option};
    use sui::balance::{Self,Balance};
    use sui::object_table::{Self,ObjectTable};
    use sui::table_vec::{Self,TableVec};
    use sui::tx_context::{Self,TxContext,sender};
    use sui::transfer::{share_object,public_transfer};
    use sui::clock::{Self, Clock};
    use std::vector;
    use sui::display;
    use sui::package;
    use ntl_coin::ntl::{NTL};

     //ERROR
     const EWrongProposalType :u64 =0;
     const EWrongOwner:u64 =1;
     const EVotingEnded:u64 =2;
 
     const FUNDING:u64 =3;
     const VOTING:u64 = 4;

    struct DAO has drop{}

    struct DaoHub<phantom T :key + store> has key{
        id:UID,
        daos: ObjectTable<ID,T>
        //dof<address,ObjectTable<ID,Proposal>>
        //dof<address,ObjectTable<ID,Dao>>

    }


    struct Proposal has key,store{
        id:UID,
        name:String,
        description:String,
        image:Url,
    }

    struct Dao has key,store {
        id:UID,
        name:String,
        description:String,
        image:Url,
        creator:address,
        start_time:u64,
        end_time:u64,
        type:u64,
        recipient: Option<address>,
        balance:Option<Balance<NTL>>,
        proposals:ObjectTable<ID, Proposal>,
        //winner:Option<ID>,
        //df voted:<address,bool>
        //results:<ID,u64>
    }

     public fun create<X:drop,T:key+store> ( otw: X,ctx:&mut TxContext):DaoHub<T>{
        let publisher = package::claim(otw, ctx);
        let keys = vector[
            utf8(b"Name"),
            utf8(b"Description"),
            utf8(b"Email"),
          ];
      
          let values = vector[
            utf8(b"Voting platform"),
            utf8(b"An online voting platform"),
            utf8(b"ntluongbn62@gmail.com"),
          ];
        let d1 = display::new_with_fields<DaoHub<T>>(&publisher, keys, values, ctx);
        display::update_version(&mut d1);
        public_transfer(d1, sender(ctx));
        public_transfer(publisher, sender(ctx));

        DaoHub<T>{
            id:object::new(ctx),
            daos: object_table::new(ctx)
       }
    }

    fun init(otw:DAO,ctx:&mut TxContext){
        share_object (create(otw,ctx)  )  
    }

    public entry fun create_dao<X,T: store + key>(
        hub: &mut DaoHub<T>,
        name:String,description:String,image:vector<u8>,
        voting_delay:u64,voting_period:u64,type:u64,
        recipient:Option<address>,
        clock:&Clock,
        ctx:&mut TxContext
    ){
       
       if(type ==VOTING){
        assert!(option::is_none(&recipient), EWrongProposalType);
        let dao = Dao<X,T>{
            id:object::new(ctx),
            name,description,
            image:url::new_unsafe_from_bytes(image),
            creator:sender(ctx),
            start_time:clock::timestamp_ms(clock)+ voting_delay,
            end_time:clock::timestamp_ms(clock) + voting_delay + voting_period,
            type,
            recipient: option::none(),
            balance:option::none(),
            proposals:object_table::new(ctx)
        };
        object_table::add(&mut hub.daos, object::id(&dao), dao);
       // table_vec::push_back(&mut hub.daos, object::id(&dao));
        share_object(dao);
       }else if(type == FUNDING){
        //  assert!(option::is_some(&recipient),EWrongProposalType) ;
        //  let dao = Dao<X,T>  {
        //     id:object::new(ctx),
        //     name,description,
        //     image:url::new_unsafe(string::to_ascii(image)),
        //     creator:sender,
        //     start_time:clock::timestamp_ms(&Clock)+voting_delay,
        //     end_time:clock::timestamp_ms(&Clock) +voting_delay + voting_period,
        //     type,
        //     recipient: Option::some(sender),
        //     balance:Option::some(balance::zero<X>),
        //  };
        //  table_vec::push_back(&mut hub.daos, object::id(&dao));
        //  transfer::share_object(dao);
       }

    }

    public entry fun create_proposals<X:key + store,T:key + store>(
        dao: &mut Dao<X,T>,
        name:String,
        image:String,
        description:String,
        clock: &Clock,
        ctx:&mut TxContext
    ){
        assert!(dao.creator == sender(ctx),EWrongOwner);
        assert!(clock::timestamp_ms(clock) <= proposal.end_time, EVotingEnded);
        let proposal =Proposal{
            id:object::new(ctx),
            name,
            description,
            image:url::new_unsafe(string::to_ascii(image)),
            vote_counts:0,
        };
        //ADD EVENT 
        object_table::add(&mut dao.proposals, object::id(&proposal), proposal)
    }
    

}