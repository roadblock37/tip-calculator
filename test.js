// input fields for bill total and number of people
const inputBill = document.querySelector('input[name="bill"]');
const inputPeople = document.querySelector('input[name="people"]');
// array of radio buttons
const radios = Array.from(document.querySelectorAll("input[name='option] + label"));
// output fields for total amount and total tip amount
const totalOut = document.getElementById("tip");
const amountOut = document.getElementById('total');
// custom tip button
const custom = document.getElementById('custom');
// reset button to clear all fields
const reset = document.getElementById('reset');
// spans for error messages
const span1 = document.createElement("span");
const span2 = document.createElement("span");

// bill amount
let value;

// number of people
let key;

// value of radio button
let radioValue = 0;
let divider = 0;

// custom tip amount function
custom.onfocus = () => {
    let radioTest = document.querySelector("input[type='radio']:checked");

    if (radioTest){
        radioTest.checked = false;

        if (value !== "" && Number(value) > 0 
        && key !== "" && Number(key) > 0 
        && Number.isInteger(key) === true){
            if (custom.value !== ""){
                radioValue = custom.value;
                totalOut.innerHTML = `${(divider * (radioValue / 100 + 1)).toFixed(2)}`;
                amountOut.innerHTML = `${(divider * (radioValue / 100 + 1)).toFixed(2)}`;

            }
            else {
                radioValue = 0;
                totalOut.innerHTML = `${(divider.toFixed(2))}`;
                amountOut.innerHTML = `${(divider * (radioValue / 100 + 1)).toFixed(2)}`;

            }
        }
    }
};

function inputCustom(event) {
    // sets radioValue to the amount in the custom tip field
    const customValue = event.target.value;
    radioValue = Number(customValue);

    // if customValue is less than 0 
    // give the custom input field a red border
    if (customValue < 0) {
        reset.setAttribute("disabled", "");
        custom.style.color = "red";

        totalOut.innerHTML = `$0.00`;
        amountOut.innerHTML = `$0.00`;
    }
    else {
        custom.style.color = "inherit";

        if (value !== "" && Number(value > 0) 
        && key !== "" && Number(key) > 0 
        && Number.isInteger(key) === true){
            reset.removeAttribute("disabled");
            totalOut.innerHTML = `${(divider * (radioValue / 100 + 1)).toFixed(2)}`;
            amountOut.innerHTML = `${(divider * (radioValue / 100 + 1)).toFixed(2)}`;

        }
    }
};

// add event listener to custom field to change on input
custom.addEventListener("change", inputCustom);

// event listeners for radio inputs for tip amounts
radios.forEach((radio) => {
    radio.addEventListener("click", radioSelect);
});

// event listener for radio buttons
function radioSelect(event) {
    // sets radioValue to the value of the radio button selected
    if (event.target.getAttribute("for") === "option5"){
        radioValue = 5;
    }
    else if (event.target.getAttribute("for") === "option10"){
        radioValue = 10;
    }
    else if (event.target.getAttribute("for") === "option15"){
        radioValue = 15;
    }
    else if (event.target.getAttribute("for") === "option25"){
        radioValue = 25;
    }
    else if (event.target.getAttribute("for") === "option50"){
        radioValue = 50;
    }

    // use the radio value to output the correct amount for the total and tip total
    if (value !== "" && Number(value > 0) 
        && key !== "" && Number(key) > 0 
        && Number.isInteger(key) === true){
            totalOut.innerHTML = `${(divider * (radioValue / 100 + 1)).toFixed(2)}`;
            amountOut.innerHTML = `${(divider * (radioValue / 100 + 1)).toFixed(2)}`;
    console.log(radioValue);

        }
}

// bill and people inputs

function input(){
    value = inputBill.value;
    key = inputPeople.value;
    const labelBill = document.getElementById("labelBill");
    const labelPeople = document.getElementById("labelPeople");
    const default5 = document.querySelector("input[value='option5']");
    
    if (value > 0){
        totalOut.innerHTML = Number(value);
    }
    // if ( value !== "") {
    //     value = Number(value);

    //     if bill amount is negative 
    //     if (value < 0) {
    //         span1.innerHTML = "Amount can't be negative";
    //         labelBill.append(span1);
    //         inputBill.style.color = "red";
    //         inputBill.classList.add("zero-negative");
    //     }
    //     if bill amount is zero
    //     else if (value === 0){
    //         span1.innerHTML = "Amount can't be zero";
    //         labelBill.append(span1);
    //         inputBill.style.color = "red";
    //         inputBill.classList.add("zero-negative");
    //     }
    //     else {
    //         span1.innerHTML = "";
    //         inputBill.style.color = "inherit";
    //         inputBill.classList.remove("zero-negative");
    //         totalOut.innerHTML = `$0.00`;
    //         amountOut.innerHTML = `$0.00`;

    //     }

        // if number of people is empty or zero produce error message
        if (key !== ""){
            key = Number(key);
            // if number of people is negative produce error message
            if (key < 0){
                span2.innerHTML = "Number of People cant be negative";
                labelPeople.append(span2);
                inputPeople.style.color = "red";
                inputPeople.classList.add("zero-negative");
            }
            else if (key === 0){
                span2.innerHTML = "Number of People cant be zero";
                labelPeople.append(span2);
                inputPeople.style.color = "red";
                inputPeople.classList.add("zero-negative");
            }
            // checks if amount of people is a whole number
            else if ( Number.isInteger(key) === false){
                span2.innerHTML = "Number of People must be a whole number";
                labelPeople.append(span2);
                inputPeople.style.color = "red";
                inputPeople.classList.add("zero-negative");
            }
            else {
                span2.innerHTML = "";
                inputPeople.style.color = "inherit";
                inputPeople.classList.remove("zero-negative");

               
            }
        }
        else {
            span2.innerHTML = "";
            inputPeople.style.color = "inherit";
            inputPeople.classList.remove("zero-negative");
            totalOut.innerHTML = `$0.00`;
            amountOut.innerHTML = `$0.00`;
        }

        if ( value > 0 && key > 0 && Number.isInteger(key) === true){
            if (Number(custom.value) > 0 || custom.value === ""){
                reset.removeAttribute("disabled");
                if (default5.checked){
                    totalOut.innerHTML = `${(divider * 1.05).toFixed(2)}`;
                    amountOut.innerHTML = `${(divider * 0.05).toFixed(2)}`;
                }
                else {
                    totalOut.innerHTML = `${(divider * (radioValue / 100 + 1)).toFixed(2)}`;
                    amountOut.innerHTML = `${(divider * (radioValue / 100)).toFixed(2)}`;   
                }
            }
        }
        else {
            reset.setAttribute("disabled", "");
        } 
    console.log("bill amount changed")  ;

    } 
// }

// set event listener to bill amount and number of people input fields
inputBill.addEventListener("keyup", input);
inputPeople.addEventListener("keyup", input);

// reset button event listener
function resetButton(event){
    const default5 = document.querySelector("input[value='option5']");
    event.preventDefault();
    radioValue = 0;
    divider = 0;
    inputBill.value = 0;
    inputPeople.value = 0;
    custom.value = "";
    totalOut.innerHTML = `$0.00`;
    amountOut.innerHTML = `$0.00`;
    default5.checked = true;
    reset.setAttribute("disabled", "");
    console.log("reset button clicked");

}

reset.addEventListener("click", resetButton);

function test(event){
    totalOut.innerHTML = inputBill.value;
}