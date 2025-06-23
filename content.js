// This script runs on the webpage the user is currently viewing.
console.log("Content script loaded on this page!");

// Example: Gather some basic information from the page
document.addEventListener('DOMContentLoaded', () => {
  const pageTitle = document.title;
  const pageUrl = window.location.href;

  console.log(`Page Title: ${pageTitle}`);
  console.log(`Page URL: ${pageUrl}`);

  // You can send this information back to your background script or popup if needed.
  // For example, to send to the popup:
  // chrome.runtime.sendMessage({ type: "pageInfo", title: pageTitle, url: pageUrl });
});