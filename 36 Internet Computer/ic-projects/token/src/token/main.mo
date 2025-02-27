import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap"

actor Token { 
    var owner : Principal = Principal.fromText("ldi4m-zpflu-lvqn6-tozv3-y5f55-4xxrj-nshxb-t7bat-ug7yy-lui36-yae");
    var totalSupply : Nat = 1000000000;
    var symbol : Text = "DANG"; 

    // initial balance (all owned by owner)
    var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal,  Principal.hash);
    balances.put( owner, totalSupply );

    public query func balanceOf( who: Principal) : async Nat { 
        let balance : Nat = switch(balances.get(who)) { 
            case null 0;
            case (?result) result; 
        };
        return balance; 
    };

    public query func getSymbol() : async Text { 
        return symbol; 
    }
}