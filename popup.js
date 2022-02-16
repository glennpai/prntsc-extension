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

let numTabs = 0;
let inputElement;
let submitButton;
let minusFiveButton;
let minusOneButton;
let plusOneButton;
let plusFiveButton;

document.addEventListener('DOMContentLoaded', () => {
    inputElement = document.getElementById('numTabs');
    submitButton = document.getElementById('submit');
    minusFiveButton = document.getElementById('-5');
    minusOneButton = document.getElementById('-1');
    plusOneButton = document.getElementById('+1');
    plusFiveButton = document.getElementById('+5');

    minusFiveButton.addEventListener('click', () => {
        updateTabs(minusFiveButton.id);
    });

    minusOneButton.addEventListener('click', () => {
        updateTabs(minusOneButton.id);
    });

    plusOneButton.addEventListener('click', () => {
        updateTabs(plusOneButton.id);
    });

    plusFiveButton.addEventListener('click', () => {
        updateTabs(plusFiveButton.id);
    });

    submitButton.addEventListener('click', () => {
        openTabs(numTabs);
    });

});

function updateTabs(value) {
    let chars = value.split("");
    let isPos = (chars[0] === '+') ? true : false;

    if (isPos) {
        numTabs = numTabs + parseInt(chars[1]);
        inputElement.value = numTabs;
    } else {
        numTabs = numTabs - parseInt(chars[1]);
        if (numTabs < 0) {
            numTabs = 0;
        }
        inputElement.value = numTabs;
    }
    document.getElementById('debug').innerHTML = numTabs;
}

function openTabs(numTabs) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        for (let i = 0; i < numTabs; i++) {
            imgUrl = generateUrl();
            chrome.tabs.create({ url: `http://www.prnt.sc/${imgUrl}` })
        }
    });
}

function rng(max) {
    return Math.floor(Math.random() * max);
}

function generateChar() {
    const random = this.rng(36);
    return chars.get(String(this.rng(36)));
}

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