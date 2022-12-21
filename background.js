import { handleStorageChange } from "./utils/handleStorageChange.js"
import { storeAuthToken } from "./utils/storeAuthToken.js"
import { getValidPeriods } from "./utils/getValidPeriods.js"

const requestFilters = { urls: ["https://*.nuinvest.com.br/api/*"] }

chrome.webRequest.onSendHeaders.addListener(storeAuthToken, requestFilters, [ "requestHeaders" ])

chrome.storage.onChanged.addListener(handleStorageChange)

chrome.action.onClicked.addListener(async () => {
  // Dates are about the settlement date of the transactions
  // If response status is 204, the res.json() method won't be called.
  // And the user will be notified if the response don't have content.
  const startDate = "2016-11-08T00:00:00"
  const endDate =   "2022-05-11T00:00:00"
  const periods = getValidPeriods(startDate, endDate) // returns array
  console.log(periods)
  // periods.forEach(period => console.log(period))
  const queryString = `startDate=${startDate}&endDate=${endDate}`
  const statementUrl = `https://www.nuinvest.com.br/api/gringott/statements/1?${queryString}`
  const { authToken } = await chrome.storage.local.get("authToken");
  
  try {
    const res = await fetch(statementUrl, { headers: { "Authorization": authToken}})
    // const statement = await res.json()
    // const date = new Date(statement.value.statements[0].settlementDate)
    console.log(await res.json())
  }
  
  catch (error) {
    console.error(error)
  }
})