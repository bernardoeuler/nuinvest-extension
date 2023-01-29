import { getData } from "./getData.js"
import { getValidPeriods } from "./getValidPeriods.js"
import { roundNumber } from "./roundNumber.js"

export async function getStatementBetweenDates(startDate, endDate) {
  const { authToken } = await chrome.storage.session.get("authToken")
  const periods = getValidPeriods(startDate, endDate)
  const movimentations = []
  
  for (const period of periods) {
    const { startDate: currentStartDate, endDate: currentEndDate } = period
    const queryString = `startDate=${currentStartDate}&endDate=${currentEndDate}`
    const statementUrl = `https://www.nuinvest.com.br/api/gringott/statements/1?${queryString}`
    const periodStatement = await getData(statementUrl, { "Authorization": authToken })
    if (periodStatement) {
      movimentations.push(...periodStatement.value.statements)
    }
  }

  return {
    movimentations,
    initialBalance: roundNumber(movimentations[0].balance - movimentations[0].value),
    finalBalance: roundNumber(movimentations[movimentations.length - 1].balance)
  }
}