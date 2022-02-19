/*****************************************************************************
*   background.js
*
*   Logic to generate and open URLs 
*
*   Pulled rng and URL code from another project of mine with a similar purpose
*   
*   Authored by Christopher Glenn (chglenn20@gmail.com)
******************************************************************************/

const delay = 300; // 300ms delay
const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'

// Returns a random char (0-9, a-z) using RNG
function generateChar() {
    return chars.charAt(Math.floor(Math.random() * 36));
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

// Open tabs at a controlled rate to prevent 503 errors
function openTabs(urls) {
    let counter = 0;
    setInterval(() => {
        if (counter < urls.length) {
            chrome.tabs.create({ url: urls[counter]});
            counter++;
        } else {
            return;
        }
    }, delay);
}

// Generate URLs for each tab to be opened and start opening tabs
function createTabs(numTabs) {
    let urls = [];
    for (let i = 0; i < numTabs; i++) {
        urls.push(`http://www.prnt.sc/${generateUrl()}`);
    }
    openTabs(urls);
}

// Listen for message from popup
chrome.runtime.onMessage.addListener((request) => {
    if (request.numTabs) {
        createTabs(request.numTabs);
        chrome.runtime.sendMessage({result: {error: false, message: ''}});
        return;
    } else if (!request.numTabs) {
        chrome.runtime.sendMessage({result: {error: true, message: 'Please provide a number.'}});
    } else {
        chrome.runtime.sendMessage({result: {error: true, message: 'Something went wrong. Please try again.'}});
    }
});
