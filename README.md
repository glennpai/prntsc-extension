# prntsc-extension
Chrome extension to open one or more random images hosted at prnt.sc.

- Author: Christopher Glenn
- Contact: chglenn20@gmail.com

## DISCLAIMER
This extension opens one or more randomly generated URLs for images hosted at a public image hosting site, prnt.sc. These images are not hosted by, owned by, or the responsibility of me, the author of this extension. I am not responsible for inappropriate or illicit content hosted on the site. All content liability falls upon the owner of prnt.sc and you, the visitor of their site. 

Opening too many tabs using this extension can get you blocked from the host site. It is your responsibility to limit your use of this extension to a reasonable amount. 

You are using this extension at your own risk. 

## APIs
This extension is made possible using the chrome.tabs API available to extension developers. 

`tabs` : [docs](https://developer.chrome.com/docs/extensions/reference/tabs/) - This API allows us to create several tabs with a single action, regardless of pop-up blocker rules. We also gain much greater control over the tab focus and other cool features.

## How to install
This extension is not yet published to the Chrome extension marketplace. Due to this, we have to install this extension through the developer settings in your browser. 

1. Clone this project to your desired download location
1. Navigate in your Chromium browser to `chrome://extensions`
1. Toggle the `Developer mode` option
1. Select `Load unpacked` 
1. Navigate to and select the base directory of the downloaded project

## How to use
1. Enable the extension in your browser's settings
1. Click the extension icon in your browser taskbar
1. Select the desired number of tabs to open using either the text input or selection buttons
1. Click `Go!`

## TODO
- Refine URL logic to not be so... gross
- Make the styling less 2003
- Identify those pesky 'Image Removed' images and generate a new URL
- Create an "AFK" mode where the tabs will be loaded, focused, and unloaded without user input
- Create a new icon (even though the pizza icon is beautiful)
- Publish to the Chrome extension marketplace
