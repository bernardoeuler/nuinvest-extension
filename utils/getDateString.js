export function getDateString(dateObj) {
  const year = dateObj.getFullYear()
  const month = dateObj.getMonth() + 1
  const day = dateObj.getDate()
  const monthString = month < 10 ? "0" + month : month
  const dayString = day < 10 ? "0" + day : day
  return `${year}-${monthString}-${dayString}T00:00:00`
}