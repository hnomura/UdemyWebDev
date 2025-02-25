import Debug "mo:base/Debug";
import Time "mo:base/Time";
import Float "mo:base/Float";

actor DBank { 
  stable var currentValue : Float = 100;
  stable var startTime = Time.now();

  // these are to manually reset stable data 
  currentValue := 100; 
  startTime := Time.now(); 

  let id = 234235243524;
  Debug.print("DBank canister start-up with initial currentValue = ");
  Debug.print(debug_show(currentValue));
  Debug.print(debug_show(startTime));

  public func topUp(amount: Float) { 
    currentValue += amount; 
    Debug.print("topUp");
    Debug.print(debug_show(currentValue));
  };

  public func withdraw(amount: Float) { 
    let tempValue: Float = currentValue - amount; 
    if (tempValue >= 0) {
      currentValue -= amount; 
    } else { 
      Debug.print("Amount too large. Canceling wiwithdraw");
    };
    Debug.print("withdraw");
    Debug.print(debug_show(currentValue));
  };

  public query func checkBalance() : async Float { 
    return currentValue; 
  };

  public func compound() { 
    let currentTime = Time.now(); 
    let timeElapsedNS = currentTime - startTime; 
    let timeElapsedSEC = timeElapsedNS / 1000000000;

    currentValue := currentValue * (1.01 ** Float.fromInt(timeElapsedSEC));   
    startTime := currentTime; 
  }
}
