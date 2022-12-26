const showStatement = document.querySelector(".show-statement")
const startDateInput = showStatement.querySelector("#start-date")
const endDateInput = showStatement.querySelector("#end-date")
const downloadStatementButton = showStatement.querySelector("#download-statement-btn")

downloadStatementButton.addEventListener("click", () => {
  const startDateString = startDateInput.value + "T00:00:00"
  const endDateString = endDateInput.value + "T00:00:00"

  console.log(startDateString, endDateString)
})