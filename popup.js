async function getActiveTabURL() {
    const tabs = await chrome.tabs.query({
        currentWindow: true,
        active: true
    });
  
    return tabs[0];
}

document.addEventListener('DOMContentLoaded', async () => {
  const messageElement = document.getElementById('message');
  const startButton = document.getElementById('startButton');
  const stopButton = document.getElementById('stopButton');
  const macroButton = document.getElementById('playButton');

  // Display a temporary message
  messageElement.textContent = "Extension is mounted!";
  const activeTab = await getActiveTabURL();

  // Example: Save something to storage on button click
  startButton.addEventListener('click',  () => {
    chrome.storage.local.set({ 'popupClicked': true }, () => {
      console.log('Button click state saved to storage.');
      messageElement.textContent = "Starting!";
      chrome.tabs.sendMessage(activeTab.id, {message: "start_recording"});
    });
  });


  stopButton.addEventListener('click',  () => {
    chrome.storage.local.set({ 'popupClicked': true }, () => {
      console.log('Button click state saved to storage.');
      messageElement.textContent = "Stopping..";
      chrome.tabs.sendMessage(activeTab.id, {message: "stop_recording"});
    });
  });


   macroButton.addEventListener('click',  () => {
    chrome.storage.local.set({ 'popupClicked': true }, () => {
      console.log('Button click state saved to storage.');
      messageElement.textContent = "Macro time";
      chrome.tabs.sendMessage(activeTab.id, {message: "replay_macro"});
    });
  });



  // Example: Retrieve something from storage on load
  chrome.storage.local.get(['popupClicked'], (result) => {
    if (result.popupClicked) {
      console.log('Popup was previously clicked.');
    }
  });
});

