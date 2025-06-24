
const clickRecords = [];

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

function hoverAndClickById(id) {
  const el = document.getElementById(id);
  if (!el) {
    console.warn(`❌ No element found with ID: ${id}`);
    return;
  }

  // Simulate hover (mouseover + mouseenter)
  const mouseOverEvent = new MouseEvent('mouseover', { bubbles: true });
  const mouseEnterEvent = new MouseEvent('mouseenter', { bubbles: true });
  el.dispatchEvent(mouseOverEvent);
  el.dispatchEvent(mouseEnterEvent);

  // Optional delay before click (to mimic real hover)
  setTimeout(() => {
    el.click(); // Direct click
    // or simulate a full click event if needed:
    // const clickEvent = new MouseEvent('click', { bubbles: true });
    // el.dispatchEvent(clickEvent);
  }, 200); // Delay in ms
}


function clickHandler(event) {
  const el = event.target;
  const id = el.id;

  if (id) {
    console.log(`🖱️ Clicked element with ID: ${id}`);

    const currentUrl = window.location.href;
    const newRecord = { id: id, url: currentUrl };

    // Optional: Avoid duplicates
    const exists = clickRecords.some(
      (entry) => entry.id === newRecord.id && entry.url === newRecord.url
    );

    if (!exists) {
      clickRecords.push(newRecord);
      console.log(`✅ Recorded:`, newRecord);
    } else {
      console.log(`ℹ️ Already recorded:`, newRecord);
    }
  } else {
    console.log("🖱️ Clicked element with no ID:", el);
  }
}

function hoverAndClickById(id) {
  const el = document.getElementById(id);
  if (!el) {
    console.warn(`❌ No element found with ID: ${id}`);
    return;
  }

  // Simulate hover (mouseover + mouseenter)
  const mouseOverEvent = new MouseEvent('mouseover', { bubbles: true });
  const mouseEnterEvent = new MouseEvent('mouseenter', { bubbles: true });
  el.dispatchEvent(mouseOverEvent);
  el.dispatchEvent(mouseEnterEvent);

  // Optional delay before click (to mimic real hover)
  setTimeout(() => {
    el.click(); // Direct click
    // or simulate a full click event if needed:
    // const clickEvent = new MouseEvent('click', { bubbles: true });
    // el.dispatchEvent(clickEvent);
  }, 200); // Delay in ms
}

    

// This script runs on the webpage the user is currently viewing.
(() => {

    console.log("I am in the content script!");

 chrome.runtime.onMessage.addListener(function(message, sender, senderResponse){

        console.log(message);
        if(message.message == "start_recording"){
            console.log("Recording DOM elements clicked - yay");
            injectUniqueIds();
            //inject all html elements with getID here
            
            document.addEventListener('click',clickHandler, true); 





        }else if(message.message == "stop_recording"){

            document.removeEventListener('click', clickHandler, true);
            console.log("Recording has stopped - sad poyo");
            console.log("Saving to macro...");
            location.reload();
            injectUniqueIds();
            clickRecords.forEach(record => {
              console.log(`ID: ${record.id}, URL: ${record.url}`);
              hoverAndClickById(record.id);

            }); 
            console.log("printed!");
            //location.reload();           
            //Reload page
            //go over list and click elements as follows
            //document.getElementById('elementID').click();
        }
    });



    const currentUrl = window.location.href;
   
    // Use `true` to capture events in capture phase (before bubbling)

  //console.log("👂 Listening for clicks on all elements...");

})()