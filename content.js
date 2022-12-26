chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  sendResponse({received: true})
  chrome.runtime.sendMessage(message)
})