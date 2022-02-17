/*****************************************************************************
*   popup.js
*
*   Logic behind the extension view 
*
*   Pulled rng and URL code from another project of mine with a similar purpose
*   
*   Authored by Christopher Glenn (chglenn20@gmail.com)
******************************************************************************/


// Initialize map to allow us to grab random characters for the URLs
// Please make this less ugly if I'm missing something obvious
const chars = new Map([
    ['0', '0'],
    ['1', '1'],
    ['2', '2'],
    ['3', '3'],
    ['4', '4'],
    ['5', '5'],
    ['6', '6'],
    ['7', '7'],
    ['8', '8'],
    ['9', '9'],
    ['10', 'a'],
    ['11', 'b'],
    ['12', 'c'],
    ['13', 'd'],
    ['14', 'e'],
    ['15', 'f'],
    ['16', 'g'],
    ['17', 'h'],
    ['18', 'i'],
    ['19', 'j'],
    ['20', 'k'],
    ['21', 'l'],
    ['22', 'm'],
    ['23', 'n'],
    ['24', 'o'],
    ['25', 'p'],
    ['26', 'q'],
    ['27', 'r'],
    ['28', 's'],
    ['29', 't'],
    ['30', 'u'],
    ['31', 'v'],
    ['32', 'w'],
    ['33', 'x'],
    ['34', 'y'],
    ['35', 'z']
]);

// Initialize variables
let numTabs = 0;
let inputElement;
let submitButton;
let errorElement;
let minusFiveButton;
let minusOneButton;
let plusOneButton;
let plusFiveButton;

// Load elements and add event listeners once popup is open
document.addEventListener('DOMContentLoaded', () => {
    inputElement = document.getElementById('numTabs');
    submitButton = document.getElementById('submit');
    errorElement = document.getElementById('error');
    minusFiveButton = document.getElementById('-5');
    minusOneButton = document.getElementById('-1');
    plusOneButton = document.getElementById('+1');
    plusFiveButton = document.getElementById('+5');
    
    // Submit has to be from an eventListener instead of a form to prevent violating content security policies
    // This can be fixed with additional application permissions but this looks prettier anyway
    submitButton.addEventListener('click', () => { go(); }); 
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
    }

    else if (value === '') {
        inputElement.value, numTabs = 0;
        errorElement.innerHTML = '';
        return true;
    }

    else {
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

// Open tabs based on the current value in numTabs
function openTabs() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        for (let i = 0; i < numTabs; i++) {
            imgUrl = generateUrl();
            chrome.tabs.create({ url: `http://www.prnt.sc/${imgUrl}` });
        }
    });
}

// Roll that beautiful D36 to pull from the giant ugly map
function rng(max) {
    return Math.floor(Math.random() * max);
}

// Returns a random char (0-9, a-z) using RNG
function generateChar() {
    return chars.get(String(this.rng(36)));
}

// Patch together six random chars to create a six digit string for the URL
function generateUrl() {
    let url = '';

    while (url.length < 6) {
        url += this.generateChar();
    }

    if (url.substring(0, 1) === '0') {
        url = this.generateChar() + url.substring(1);
    }

    return url;
}

// Let's go, brother
function go() {
    if (!validateInput()) { return; }
    else { openTabs() }
}
