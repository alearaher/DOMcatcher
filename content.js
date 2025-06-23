// This script runs on the webpage the user is currently viewing.
function injectOnClickHandlers() {
  console.log("Attempting to inject onClick handlers...");

  // Select all <a> (anchor/link) elements
  const links = document.querySelectorAll('a');
  // Select all <button> elements
  const buttons = document.querySelectorAll('button');

  // Combine the NodeLists into a single array for easier iteration
  const elementsToModify = [...links, ...buttons];

  elementsToModify.forEach(element => {
    // Check if the element already has an onclick attribute
    if (!element.hasAttribute('onclick')) {
    
      element.setAttribute('onclick', 'getId(this)');
      console.log(`Injected onClick into: <${element.tagName}> with ID: ${element.id || 'No ID'}`);
    } else {
      console.log(`Element <${element.tagName}> with ID: ${element.id || 'No ID'} already has an onclick attribute, appending....`);
      element.setAttribute('onclick', element.getAttribute('onclick') + '; getId(this);');
     
    }
  });

  console.log("Finished injecting onClick handlers.");
}

// Ensure the DOM is fully loaded before trying to modify elements.
// This is crucial for content scripts to find all elements.
//if (document.readyState === 'loading') {
  // Loading hasn't finished yet
//  document.addEventListener('DOMContentLoaded', injectOnClickHandlers);
//} else {
  // `DOMContentLoaded` has already fired
//  injectOnClickHandlers();
//}

function getID(element){

    console.log("ID captured!");
    console.log(element.id);

}

 chrome.runtime.onMessage.addListener(function(message, sender, senderResponse){

        console.log(message);
        if(message.message == "start_recording"){
            console.log("Recording DOM elements clicked");
            //inject all html elements with getID here
            //injectOnClickHandlers(); 

        }else if(message.message == "stop_recording"){
            console.log("Recording has stopped");
            console.log("Saving to macro...");
            //Reload page
            //go over list and click elements as follows
            //document.getElementById('elementID').click();
        }
    });

    

// This script runs on the webpage the user is currently viewing.
(() => {

    console.log("I am in the content script!");
    document.addEventListener('click', (event) => {
    const el = event.target;
    const id = el.id;

    if (id) {
      console.log(`🖱️ Clicked element with ID: ${id}`);
    } else {
      console.log("🖱️ Clicked element with no ID:", el);
    }
  }, true); // Use `true` to capture events in capture phase (before bubbling)

  console.log("👂 Listening for clicks on all elements...");

})()