const actionsContainer = document.querySelector(".actions")
const startDateInput = actionsContainer.querySelector("#start-date")
const endDateInput = actionsContainer.querySelector("#end-date")
const downloadStatementButton = actionsContainer.querySelector("#download-statement-btn")
const showInvestmentsReturnButton = actionsContainer.querySelector("#show-investments-return-btn")

downloadStatementButton.addEventListener("click", async () => {
  const startDateString = startDateInput.value + "T00:00:00"
  const endDateString = endDateInput.value + "T00:00:00"
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
  const data = { startDate: startDateString, endDate: endDateString }
  const action = "download-statement"
  const message = { action, data }
  chrome.tabs.sendMessage(tab.id, message)
})

showInvestmentsReturnButton.addEventListener("click", async () => {
  const startDateString = startDateInput.value + "T00:00:00"
  const endDateString = endDateInput.value + "T00:00:00"
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
  const data = { startDate: startDateString, endDate: endDateString }
  const action = "show-investments-return"
  const message = { action, data }
  chrome.tabs.sendMessage(tab.id, message)
})