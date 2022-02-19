/*****************************************************************************
*   popup.js
*
*   Logic behind the view. Mostly event handlers and validation for the input.
*   
*   Authored by Christopher Glenn (chglenn20@gmail.com)
******************************************************************************/

// Initialize variables
let numTabs = 0;
let inputElement;
let submitButton;
let errorElement;
let minusFiveButton;
let minusOneButton;
let plusOneButton;
let plusFiveButton;

// Wait for DOM before adding event listeners
document.addEventListener('DOMContentLoaded', () => {
    inputElement = document.getElementById('numTabs');
    submitButton = document.getElementById('submit');
    errorElement = document.getElementById('error');
    minusFiveButton = document.getElementById('-5');
    minusOneButton = document.getElementById('-1');
    plusOneButton = document.getElementById('+1');
    plusFiveButton = document.getElementById('+5');
    
    submitButton.addEventListener('click', () => { submit(); }); 
    inputElement.addEventListener('input', () => { validateInput() });
    minusFiveButton.addEventListener('click', () => { updateTabs(minusFiveButton); });
    minusOneButton.addEventListener('click', () => { updateTabs(minusOneButton); });
    plusOneButton.addEventListener('click', () => { updateTabs(plusOneButton); });
    plusFiveButton.addEventListener('click', () => { updateTabs(plusFiveButton); });
});

// Validate the input element contains a valid value, otherwise fix the value
function validateInput() {
    const value = inputElement.value;
    const reg = new RegExp('^[0-9]*$');

    if (reg.test(value) && value !== '') {
        numTabs = parseInt(value);
        errorElement.innerHTML = '';
        return true;
    } else if (value === '') {
        inputElement.value, numTabs = 0;
        errorElement.innerHTML = '';
        return true;
    } else {
        errorElement.innerHTML = 'Invalid value. Please enter a number.';
        return false;
    }
}

// Update the value in the input element using numTabs as a model
function updateTabs(button) {
    if (!validateInput()) { return; }

    const value = button.id;
    const chars = value.split("");
    const isPos = (chars[0] === '+') ? true : false;

    if (isPos) {
        numTabs = numTabs + parseInt(chars[1]);
        inputElement.value = numTabs;
    } else {
        numTabs = numTabs - parseInt(chars[1]);
        numTabs = numTabs < 0 ? 0 : numTabs;    // Do not allow values less than zero
        inputElement.value = numTabs;
    }
}

// Send data to backend and let the magic happen
function submit() {
    if (!validateInput()) { return; }
    else { 
        chrome.runtime.sendMessage({numTabs: numTabs}, (response) => {
            if(chrome.runtime.lastError) {
                setTimeout(submit, 1000); // Wait 1 second if our runtime isn't ready
            } else {
                if (response.error) {
                    error.innerHTML = response.error.message;
                }
            }
        });
    }
}
