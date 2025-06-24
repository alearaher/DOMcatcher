<script setup>
import { ref, onMounted } from 'vue';

// This is our reactive state for the message, replacing getElementById('message')
const message = ref('Loading...');

// This is the equivalent of your getActiveTabURL function
async function getActiveTabURL() {
  const tabs = await chrome.tabs.query({
    currentWindow: true,
    active: true,
  });
  return tabs[0];
}

// This function runs when the component is ready, similar to DOMContentLoaded
onMounted(async () => {
  message.value = "Extension is mounted!";

  // Example from your original code: check storage on load
  chrome.storage.local.get(['popupClicked'], (result) => {
    if (result.popupClicked) {
      console.log('Popup was previously clicked.');
    }
  });
});

// --- Button Click Handlers ---

async function startRecording() {
  const activeTab = await getActiveTabURL();
  message.value = "Starting!";
  chrome.tabs.sendMessage(activeTab.id, { message: "start_recording" });
  console.log('Start recording message sent.');
}

async function stopRecording() {
  const activeTab = await getActiveTabURL();
  message.value = "Stopping...";
  chrome.tabs.sendMessage(activeTab.id, { message: "stop_recording" });
  console.log('Stop recording message sent.');
}

async function playMacro() {
  const activeTab = await getActiveTabURL();
  message.value = "Macro time";
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
    /* Use a more modern box-sizing model for easier layout */
  :root {
    --primary-blue: #007aff; /* A strong, friendly blue */
    --primary-blue-darker: #0056b3; /* A darker shade for hover */
    --background-color: #f8f9fa; /* A very light, clean grey */
    --text-color: #212529; /* A dark charcoal for readability */
    --border-color: #dee2e6; /* A light border color */
  }

  /* Main container styling */
  .popup-container {
    background-color: var(--background-color);
    width: 250px;
    padding: 20px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    text-align: center;
  }

  /* Header styling */
  h1 {
    color: var(--text-color);
    font-size: 18px;
    margin-top: 0;
    margin-bottom: 12px;
  }

  /* Paragraph/message styling */
  p {
    color: #6c757d; /* A softer grey for secondary text */
    font-size: 14px;
    min-height: 20px; /* Prevents layout shift when text changes */
    margin-bottom: 20px;
  }

  /* General button styling */
  button {
    background-color: var(--primary-blue);
    color: white;
    font-size: 14px;
    font-weight: 500;
    border: none;
    border-radius: 6px; /* Slightly rounded corners */
    padding: 10px 15px;
    width: 100%;
    cursor: pointer;
    margin-top: 10px;
    
    /* Smooth transition for hover effects */
    transition: background-color 0.2s ease-in-out, transform 0.1s ease;
  }

  /* Hover and focus effects for interactivity */
  button:hover {
    background-color: var(--primary-blue-darker);
  }
  
  /* A subtle "press down" effect when clicking */
  button:active {
    transform: scale(0.98);
  }
</style>
