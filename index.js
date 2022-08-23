// input fields for bill total and number of people
const inputBill = document.querySelector('input[name="bill"]');
const inputPeople = document.querySelector('input[name="people"]');
// array of radio buttons
const radios = document.querySelectorAll("input[name='option']");
const radioChecked = document.querySelector("input[name='option']:checked")
// output fields for total amount and total tip amount per person
const tipPerPerson = document.getElementById("tip");
const totalPerPerson = document.getElementById('total');
// custom tip button
const custom = document.getElementById('custom');
// reset button to clear all fields
const reset = document.getElementById('reset');
// spans for error messages
const span1 = document.createElement("span");
const span2 = document.createElement("span");

// function to compute total tip amount and per person amount
function computeTip(bill, tipPercent, numPeople ) {
    return {
        totalAmountPerPerson: (Number(bill) * Number(tipPercent) / 100).toFixed(2),
        perPersonTip: ((Number(bill) * Number(tipPercent) / 100) / Number(numPeople)).toFixed(2)
    } 
}

// add an event listener to each radio button when clicked
radios.forEach(radio => {
    radio.addEventListener("change", (e) => {
        // enable reset button
        reset.disabled = false;
        // remove any custom tip if a percent is selected
        custom.value = "";

        // compute tip
        if(!parseInt(inputPeople.value) || !parseInt(inputBill.value)) return;

        const tip = computeTip(inputBill.value, e.target.value, inputPeople.value);
        tipPerPerson.innerText = "$" + tip.perPersonTip;
        totalPerPerson.innerText = "$" + tip.totalAmountPerPerson;
    });
});

// custom tip event listener
custom.addEventListener("input", (e) => {
    // enable reset button
    reset.disabled = false;
    
    // uncheck tip percentage if there is a custom amount input
    if (radioChecked){
        radioChecked.checked = false;
    }

    // if there are no people or bill amount is zero nothing happens
    if (!parseInt(inputPeople.value) || !parseInt(bill.value)) {
        reset.disabled = true;
        return;
    }

    // compute tip
    const tip = computeTip(inputBill.value, e.target.value, inputPeople.value);
    tipPerPerson.innerText = "$" + tip.perPersonTip;
    totalPerPerson.innerText = "$" + tip.totalAmountPerPerson;
});


