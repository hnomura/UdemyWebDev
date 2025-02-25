import {dbank} from "../../declarations/dbank"

async function updateCurrentAmount() { 
  const currentAmount = await dbank.checkBalance(); 
  const currentAmountTruncated = currentAmount.toFixed(2);
  console.log("currentAmount = ", currentAmountTruncated);
  document.getElementById("value").innerText = currentAmountTruncated;
}

window.addEventListener("load", async function() {
  await updateCurrentAmount();
});

document.querySelector("form").addEventListener("submit", async function(event) {
  event.preventDefault(); 
  console.log("submit pressed"); 

  const button = event.target.querySelector("#submit-btn");
  
  const inputAmount = parseFloat(document.getElementById("input-amount").value)
  const outputAmount = parseFloat(document.getElementById("withdrawal-amount").value);
  console.log("Input=", inputAmount, " Output=", outputAmount);
  button.setAttribute("disabled", true);

  if (!isNaN(inputAmount)) {
    console.log("topUp: ", inputAmount);
    await dbank.topUp(inputAmount); 
  }
  if (!isNaN(outputAmount)) { 
    console.log("withdraw: ", outputAmount);
    await dbank.withdraw(outputAmount); 
  }

  await dbank.compound(); 

  await updateCurrentAmount(); 

  document.getElementById("input-amount").value = "";
  document.getElementById("withdrawal-amount").value = "";
  button.removeAttribute("disabled");

});
