chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  sendResponse({received: true})
  chrome.runtime.sendMessage(msg)
})