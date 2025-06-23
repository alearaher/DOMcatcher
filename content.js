function injectUniqueIds() {
  console.log("Attempting to inject unique IDs into elements...");

  let buttonCounter = 1; // Counter for unique button IDs
  let linkCounter = 1;   // Counter for unique link IDs

  // Select all <button> elements
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => {
    // Check if the button already has an ID
    if (!button.id) {
      const newId = `ext-button-${buttonCounter++}`;
      button.id = newId;
      console.log(`Injected ID '${newId}' into a button.`);
    }
  });

  // Select all <a> (anchor/link) elements
  const links = document.querySelectorAll('a');
  links.forEach(link => {
    // Check if the link already has an ID
    if (!link.id) {
      const newId = `ext-link-${linkCounter++}`;
      link.id = newId;
      console.log(`Injected ID '${newId}' into a link.`);
    }
  });

  console.log("Finished injecting unique IDs.");
}

 chrome.runtime.onMessage.addListener(function(message, sender, senderResponse){

        console.log(message);
        if(message.message == "start_recording"){
            console.log("Recording DOM elements clicked - yay");
            //inject all html elements with getID here
            

        }else if(message.message == "stop_recording"){
            console.log("Recording has stopped - sad poyo");
            console.log("Saving to macro...");
            //Reload page
            //go over list and click elements as follows
            //document.getElementById('elementID').click();
        }
    });

    

// This script runs on the webpage the user is currently viewing.
(() => {

    console.log("I am in the content script!");
    const currentUrl = window.loacation.href;
    injectUniqueIds();
    document.addEventListener('click', (event) => {
    const el = event.target;
    const id = el.id;

    if (id) {
      console.log(`🖱️ Clicked element with ID: ${id}`);

  chrome.storage.local.get(['recordedIDs'], (result) => {
    // Initialize injectedElementData if it doesn't exist
    const storedData = result.injectedElementData || {};

    // Store the array of IDs for the current URL.
    // This will overwrite previous IDs for the same URL, which is
    // appropriate since our IDs are re-generated sequentially on each load.
    storedData[currentUrl] = injectedIdsOnPage;

    // Save the updated object back to local storage
    chrome.storage.local.set({ 'recordedIDs': storedData }, () => {
      if (chrome.runtime.lastError) {
        console.error('Error saving to storage:', chrome.runtime.lastError.message);
      } else {
        console.log(`IDs for ${currentUrl} saved to chrome.storage.local.`);
        // Optional: You can inspect storage via Chrome DevTools:
        // Application -> Local Storage -> chrome-extension://<your-extension-id>
      }
    });
  })




    } else {
      console.log("🖱️ Clicked element with no ID:", el);
    }
  }, true); // Use `true` to capture events in capture phase (before bubbling)

  console.log("👂 Listening for clicks on all elements...");

})()