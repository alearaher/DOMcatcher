
let clickRecords = [];

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
    console.warn(`No element found with ID: ${id}`);
    return;
  }

  // Simulate hover (mouseover + mouseenter)
  const mouseOverEvent = new MouseEvent('mouseover', { bubbles: true });
  const mouseEnterEvent = new MouseEvent('mouseenter', { bubbles: true });
  el.dispatchEvent(mouseOverEvent);
  el.dispatchEvent(mouseEnterEvent);
  el.focus();

  // Optional delay before click (to mimic real hover)
  setTimeout(() => {
    el.click(); // Direct click

  }, 200); // Delay in ms
}


function clickHandler(event) {
  const el = event.target;
  const id = el.id;

  if (id) {
    console.log(`🖱️ Clicked element with ID: ${id}`);

    const currentUrl = window.location.href;
    const newRecord = { id: id, url: currentUrl, type: "click" };

    // Optional: Avoid duplicates
    const exists = clickRecords.some(
      (entry) => entry.id === newRecord.id && entry.url === newRecord.url
    );

    if (!exists) {
      clickRecords.push(newRecord);
      chrome.storage.local.set({ clickRecords }, () => {
      console.log(`✅ Saved to chrome.storage:`, newRecord);
      });
      console.log(`✅ Recorded:`, newRecord);
    } else {
      console.log(`ℹ️ Already recorded:`, newRecord);
    }
  } else {
    console.log("🖱️ Clicked element with no ID:", el);
  }
}

//TODO create a keyPressHandler(event)

(() => {

  console.log("Content script loaded!");

 chrome.runtime.onMessage.addListener(function(message, sender, senderResponse){

        console.log(message);
        if(message.message == "start_recording"){
            console.log("Recording DOM elements clicked - yay");
            injectUniqueIds();
            document.addEventListener('click',clickHandler, true); 
            chrome.runtime.sendMessage({ status: 'Recording in progress!' });
        }else if(message.message == "stop_recording"){

            document.removeEventListener('click', clickHandler, true);
            chrome.runtime.sendMessage({ status: 'Saving to macro!' });
            chrome.storage.local.set({ clickRecords }, () => {
                 console.log("Click records saved. Reloading...");
                location.reload();
        });
        } else if (message.message === "replay_macro") {
          console.log("Replaying macro from chrome.storage...");

          chrome.storage.local.get('clickRecords', (result) => {
            const records = result.clickRecords || [];

            if (records.length === 0) {
              console.log("No click records found to replay.");
             chrome.runtime.sendMessage({ status: 'No macro found to play!' });
              return;
            }

            injectUniqueIds(); // Ensure all elements have IDs again

            let delay = 0;
            records.forEach((record, index) => {
              setTimeout(() => {
                console.log(`🎯 Replaying click ${index + 1}: ${record.id} @ ${record.url}`);
                hoverAndClickById(record.id);

                // When last action finishes, clear storage
                if (index === records.length - 1) {
                  setTimeout(() => {
                    chrome.storage.local.remove('clickRecords', () => {
                      console.log("🗑️ Cleared clickRecords after replay.");
                    });
                  }, 500); // Small delay after last click
                }
              }, delay);
              delay += 500;
            });
          });
        }

    });

})()