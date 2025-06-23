// This script runs on the webpage the user is currently viewing.
(() => {

    let toggle = true;
    // need to fetch

    console.log("I am in the content script!");

   





})()


 chrome.runtime.onMessage.addListener(function(message, sender, senderResponse){

        console.log(message);
        if(message.message == "turn_blue"){
            console.log("Turning blue....")
            document.body.style.backgroundColor = "blue";
        }
    });
