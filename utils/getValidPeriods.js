export function getValidPeriods(startDate, endDate) {
  const periodOfDays = getTimeInterval(startDate, endDate)
  const periodOfYears = Math.floor(periodOfDays / 365)

  if (periodOfDays > 365) {
    const firstEndDate = getFutureDate(startDate, 365)
    const periodsList = [{ startDate, endDate: firstEndDate }]

    for (let i = 1; i < periodOfYears; i++) {
      const newPeriod = createNewPeriod(periodsList, 365)
      periodsList.push(newPeriod)
    }
    
    const newPeriod = createNewPeriod(periodsList)
    periodsList.push({ ...newPeriod, endDate: endDate })

    return periodsList
  }

  return [
    { startDate, endDate }
  ]
}

function createNewPeriod(periodsList, remainingDays = 0) {
  const lastIndex = periodsList.length - 1
  const { endDate: lastEndDate } = periodsList[lastIndex] 
  console.log(lastEndDate)
  const lastEndDateDay = Number(lastEndDate.slice(8,10))
  const newStartDateDay = lastEndDateDay + 1 < 10 ? "0" + (lastEndDateDay + 1) : lastEndDateDay + 1
  const newStartDate = lastEndDate.slice(0,8) + newStartDateDay + lastEndDate.slice(10)
  const newEndDate = getFutureDate(newStartDate, remainingDays)
  return { startDate: newStartDate, endDate: newEndDate}
}

function getDateString(dateObj) {
  const year = dateObj.getFullYear()
  const month = dateObj.getMonth() + 1
  const day = dateObj.getDate()
  const monthString = month < 10 ? "0" + month : month
  const dayString = day < 10 ? "0" + day : day
  return `${year}-${monthString}-${dayString}T00:00:00`
}

function getFutureDate(startDate, daysPassed) {
  const startDateObj = new Date(startDate)
  const startDateMs = new Date(startDateObj).getTime()
  const futureDateObj = new Date(startDateMs + convertDaysToMs(daysPassed))
  return getDateString(futureDateObj)
}

function getTimeInterval(startDate, endDate) {
  const startDateObj = new Date(startDate)
  const endDateObj = new Date(endDate)
  const startDateMs = startDateObj.getTime()
  const endDateMs = endDateObj.getTime()
  return convertMsToDays(endDateMs - startDateMs)
}

function convertMsToDays(ms) {
  return ms / 1000 / 3600 / 24
}

function convertDaysToMs(days) {
  return days * 1000 * 3600 * 24
}