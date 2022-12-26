import { getData } from "./getData.js"
import { getValidPeriods } from "./getValidPeriods.js"

export async function getStatementBetweenDates(startDate, endDate) {
  const { authToken } = await chrome.storage.session.get("authToken")
  const periods = getValidPeriods(startDate, endDate)
  const transactions = []
  
  for (const period of periods) {
    const { startDate: currentStartDate, endDate: currentEndDate } = period
    const queryString = `startDate=${currentStartDate}&endDate=${currentEndDate}`
    const statementUrl = `https://www.nuinvest.com.br/api/gringott/statements/1?${queryString}`
    const periodStatement = await getData(statementUrl, { "Authorization": authToken })
    if (periodStatement) {
      transactions.push(...periodStatement.value.statements)
    }
  }

  return {
    transactions,
    initialBalance: transactions[0].balance - transactions[0].value,
    finalBalance: transactions[transactions.length - 1].balance
  }
}