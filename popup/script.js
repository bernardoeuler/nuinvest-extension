const showStatement = document.querySelector(".show-statement")
const startDateInput = showStatement.querySelector("#start-date")
const endDateInput = showStatement.querySelector("#end-date")
const downloadStatementButton = showStatement.querySelector("#download-statement-btn")

downloadStatementButton.addEventListener("click", async () => {
  const startDateString = startDateInput.value + "T00:00:00"
  const endDateString = endDateInput.value + "T00:00:00"
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
  const message = { startDate: startDateString, endDate: endDateString }
  chrome.tabs.sendMessage(tab.id, message)
})