// This script runs on the webpage the user is currently viewing.
(() => {

    console.log("I am in the content script!");

})()


 chrome.runtime.onMessage.addListener(function(message, sender, senderResponse){

        console.log(message);
        if(message.message == "start_recording"){
            console.log("Recording DOM elements clicked");


        }else if(message.message == "stop_recording"){
            console.log("Recording has stopped");
            console.log("Saving to macro...");
            //Reload page
            //go over list and click elements as follows
            //document.getElementById('elementID').click();
        }
    });

    
