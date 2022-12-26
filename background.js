import { handleStorageChange } from "./utils/handleStorageChange.js"
import { storeAuthToken } from "./utils/storeAuthToken.js"
import { getStatementBetweenDates } from "./utils/getStatementBetweenDates.js"

const requestFilters = { urls: ["https://*.nuinvest.com.br/api/*"] }

chrome.webRequest.onSendHeaders.addListener(storeAuthToken, requestFilters, [ "requestHeaders" ])

chrome.storage.onChanged.addListener(handleStorageChange)

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  sendResponse({received: true})
  const { startDate, endDate } = message
  const statement = await getStatementBetweenDates(startDate, endDate)
  console.log(statement)
})