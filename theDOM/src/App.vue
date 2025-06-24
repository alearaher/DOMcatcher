<script setup>
import { ref, onMounted } from 'vue';

const message = ref('Loading...');

async function getActiveTabURL() {
  const tabs = await chrome.tabs.query({
    currentWindow: true,
    active: true,
  });
  return tabs[0];
}

onMounted(async () => {
  message.value = "Extension is mounted!";

  chrome.storage.local.get(['popupClicked'], (result) => {
    if (result.popupClicked) {
      console.log('Popup was previously clicked.');
    }
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.status) {
    //const messageElement = document.getElementById('message');
    message.value = request.status;
  }
});

// --- Button Click Handlers ---

async function startRecording() {
  const activeTab = await getActiveTabURL();
  //message.value = "Starting!";
  chrome.tabs.sendMessage(activeTab.id, { message: "start_recording" });
  console.log('Start recording message sent.');
}

async function stopRecording() {
  const activeTab = await getActiveTabURL();
 // message.value = "Stopping...";
  chrome.tabs.sendMessage(activeTab.id, { message: "stop_recording" });
  console.log('Stop recording message sent.');
}

async function playMacro() {
  const activeTab = await getActiveTabURL();
  //message.value = "Macro time";
  chrome.tabs.sendMessage(activeTab.id, { message: "replay_macro" });
  console.log('Replay macro message sent.');
}
</script>

<template>
  <div class="popup-container">
    <h1>Hello from your Extension!</h1>
    <p>{{ message }}</p>
    <button @click="startRecording">Start recording</button>
    <button @click="stopRecording">Stop recording</button>
    <button @click="playMacro">Play Macro</button>
  </div>
</template>

<style>
 
  :root {
    --primary-blue: #007aff; 
    --primary-blue-darker: #0056b3; 
    --background-color: #f8f9fa; 
    --text-color: #212529;
    --border-color: #dee2e6; 
  }

  
  .popup-container {
    background-color: var(--background-color);
    width: 250px;
    padding: 20px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    text-align: center;
  }

  h1 {
    color: var(--text-color);
    font-size: 18px;
    margin-top: 0;
    margin-bottom: 12px;
  }


  p {
    color: #6c757d; 
    font-size: 14px;
    min-height: 20px; 
    margin-bottom: 20px;
  }


  button {
    background-color: var(--primary-blue);
    color: white;
    font-size: 14px;
    font-weight: 500;
    border: none;
    border-radius: 6px; 
    padding: 10px 15px;
    width: 100%;
    cursor: pointer;
    margin-top: 10px;
    
   
    transition: background-color 0.2s ease-in-out, transform 0.1s ease;
  }


  button:hover {
    background-color: var(--primary-blue-darker);
  }
  
 
  button:active {
    transform: scale(0.98);
  }
</style>
