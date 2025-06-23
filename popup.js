document.addEventListener('DOMContentLoaded', () => {
  const messageElement = document.getElementById('message');
  const myButton = document.getElementById('myButton');

  // Display a temporary message
  messageElement.textContent = "Extension is mounted!";

  // Example: Save something to storage on button click
  myButton.addEventListener('click', () => {
    chrome.storage.local.set({ 'popupClicked': true }, () => {
      console.log('Button click state saved to storage.');
      messageElement.textContent = "Button clicked and state saved!";
    });
  });

  // Example: Retrieve something from storage on load
  chrome.storage.local.get(['popupClicked'], (result) => {
    if (result.popupClicked) {
      console.log('Popup was previously clicked.');
    }
  });
});

