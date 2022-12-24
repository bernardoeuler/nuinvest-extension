import { handleStorageChange } from "./utils/handleStorageChange.js"
import { storeAuthToken } from "./utils/storeAuthToken.js"
import { getValidPeriods } from "./utils/getValidPeriods.js"

const requestFilters = { urls: ["https://*.nuinvest.com.br/api/*"] }

chrome.webRequest.onSendHeaders.addListener(storeAuthToken, requestFilters, [ "requestHeaders" ])

chrome.storage.onChanged.addListener(handleStorageChange)

chrome.action.onClicked.addListener(async () => {
  const startDate = "2020-10-08T00:00:00"
  const endDate =   "2022-12-24T00:00:00"
  const { authToken } = await chrome.storage.session.get("authToken")
  const periods = getValidPeriods(startDate, endDate)
  const transactions = []
  
  for (const period of periods) {
    const { startDate, endDate } = period
    const queryString = `startDate=${startDate}&endDate=${endDate}`
    const statementUrl = `https://www.nuinvest.com.br/api/gringott/statements/1?${queryString}`
    const periodStatement = await getData(statementUrl, { "Authorization": authToken })
    if (periodStatement) {
      transactions.push(...periodStatement.value.statements)
    }
  }

  const fullStatement = {
    transactions,
    initialBalance: transactions[0].balance - transactions[0].value,
    finalBalance: transactions[transactions.length - 1].balance
  }

  console.log(fullStatement)
})

async function getData(url, headers) {
  try {
    const res = await fetch(url, { headers: headers})
    if (res.status === 200) return await res.json()
  }
  catch (err) {
    console.warn(url)
    console.error(err)
  }
}