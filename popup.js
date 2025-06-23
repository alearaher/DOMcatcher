async function getActiveTabURL() {
    const tabs = await chrome.tabs.query({
        currentWindow: true,
        active: true
    });
  
    return tabs[0];
}

document.addEventListener('DOMContentLoaded', async () => {
  const messageElement = document.getElementById('message');
  const myButton = document.getElementById('myButton');

  // Display a temporary message
  messageElement.textContent = "Extension is mounted!";
  const activeTab = await getActiveTabURL();

  // Example: Save something to storage on button click
  myButton.addEventListener('click',  () => {
    chrome.storage.local.set({ 'popupClicked': true }, () => {
      console.log('Button click state saved to storage.');
      messageElement.textContent = "Button clicked and state saved!";
      chrome.tabs.sendMessage(activeTab.id, {message: "turn_blue"});
    });
  });

  // Example: Retrieve something from storage on load
  chrome.storage.local.get(['popupClicked'], (result) => {
    if (result.popupClicked) {
      console.log('Popup was previously clicked.');
    }
  });
});

