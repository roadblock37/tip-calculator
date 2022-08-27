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

// bill input event listener
inputBill.addEventListener("input", (e) => {
    // enable reset button
    reset.disabled = false;

    // if value is zero or negative error msg shows
    // and border display in red
    if (e.target.value <= '0'){
        document.getElementById("bill").style.border = "thin solid red";
        document.getElementById('billError').className = "errorShow";
        console.log("no bill amount" + e.target.value);    
    }
    // if the value is positive no error msg or border
    if (e.target.value > '0') {
        document.getElementById('bill').style.borderStyle = "none";
        document.getElementById('billError').className = "errorHide";

    }
});

// TODO
// number of people event listener
inputPeople.addEventListener("input", (e) => {
    // enable reset button
    reset.disabled = false;

    // if value is zero or negative error msg shows
    // and border display in red
    if (e.target.value <= '0'){
        document.getElementById("people").style.border = "thin solid red";
        document.getElementById('peopleError').className = "errorShow";
        console.log("no people amount" + e.target.value);    
    }
    // if the value is positive no error msg or border
    if (e.target.value > '0') {
        document.getElementById('people').style.borderStyle = "none";
        document.getElementById('peopleError').className = "errorHide";

    }
});

// reset button event listener
reset.addEventListener("click", (e) => {
    // input fields revert to zero
    inputBill.value = 0;
    inputPeople.value = 0;
    custom.value = "";
    // output fields revert to zero
    tipPerPerson.innerText = `$0.00`;
    totalPerPerson.innerText = `$0.00`;
    // disable reset button
    reset.disabled = true;
    // hide error msg and hide error border
    document.getElementById('people').style.borderStyle = "none";
    document.getElementById('peopleError').className = "errorHide";
    document.getElementById('bill').style.borderStyle = "none";
    document.getElementById('billError').className = "errorHide";



    // uncheck the radio button and select 5%
    if (radioChecked){
        radioChecked.checked = false;
        document.getElementById("option5").checked = true;
    }
});



