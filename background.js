import { handleStorageChange } from "./utils/handleStorageChange.js"
import { storeAuthToken } from "./utils/storeAuthToken.js"
import { getStatementBetweenDates } from "./utils/getStatementBetweenDates.js"

const requestFilters = { urls: ["https://*.nuinvest.com.br/api/*"] }

chrome.webRequest.onSendHeaders.addListener(storeAuthToken, requestFilters, [ "requestHeaders" ])

chrome.storage.onChanged.addListener(handleStorageChange)

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  sendResponse({received: true})
  const { action, data } = message
  switch (action) {
    case "download-statement":
      const { startDate, endDate } = data
      const statement = await getStatementBetweenDates(startDate, endDate)
      console.log(statement)
      break
    default:
      console.log("No action provided")  
      break  
  }

})