import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";

actor Token { 
    Debug.print("Token actor started");

    let owner : Principal = Principal.fromText("ldi4m-zpflu-lvqn6-tozv3-y5f55-4xxrj-nshxb-t7bat-ug7yy-lui36-yae");
    let totalSupply : Nat = 1000000000;
    let symbol : Text = "DANG"; 

    // serialized banances as stable
    private stable var balanceEntries : [(Principal, Nat)] = []; 

    // initial balance (all owned by owner)
    private var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal,  Principal.hash);
    if (balances.size() < 1) { 
        Debug.print("!!! Balances being Initialized !!!");
        balances.put( owner, totalSupply );
    } ;   

    public query func balanceOf( who: Principal) : async Nat { 
        let balance : Nat = switch(balances.get(who)) { 
            case null 0;
            case (?result) result; 
        };
        return balance; 
    };

    public query func getSymbol() : async Text { 
        return symbol; 
    };

    public shared(msg) func payOut() : async Text { 
        Debug.print("payOut");
        Debug.print(debug_show(msg.caller));
        if (balances.get(msg.caller)==null) { 
            // new identifity
            let amount = 10000;
            // balances.put(msg.caller, amount);
            let result = await transfer(msg.caller, amount);
            return result; 
        } else { 
            // existing identity
            return "Already Claimed";
        }
    };

    public shared(msg) func transfer(to: Principal, amount: Nat) : async Text { 
        Debug.print("transfer");
        Debug.print(debug_show(msg.caller));
        let fromBalance = await balanceOf(msg.caller);
        if (fromBalance >= amount ) { 
            let newFromBalance : Nat = fromBalance - amount; 
            balances.put(msg.caller, newFromBalance);
            
            let toBalance = await balanceOf(to);
            let newToBalance = toBalance + amount; 
            balances.put(to, newToBalance); 

            return "Success";
        } else { 
            return "Insufficient Funds";
        }
    };

    // https://internetcomputer.org/docs/motoko/main/canister-maintenance/upgrades
    // Pre/Post-upgrade hooks are not recommended now. 
    // Use "StableHashMap" instead.  
    system func preupgrade() { 
        // store: serialize to array 
        balanceEntries := Iter.toArray(balances.entries());
    };

    system func postupgrade() {
        // restore: deserialize to hash map 
        balances := HashMap.fromIter<Principal, Nat>(balanceEntries.vals(), 1, Principal.equal, Principal.hash);
        if (balances.size() < 1) { 
            Debug.print("!!! Balances being Initialized !!!");
            balances.put( owner, totalSupply );
        };
    };
}