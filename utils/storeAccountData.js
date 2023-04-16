export async function storeAccountData(changes, type) {
  const { authToken } = await chrome.storage.session.get("authToken")
  if (changes.authToken === undefined || authToken === undefined) return
  const requestUrl = "https://nuinvest.com.br/api/samwise/v2/custody-position"
  const requestHeaders = { headers: { "Authorization": authToken }}
  const response = await fetch(requestUrl, requestHeaders)
  const data = await response.json()
  const accountDataJSON = JSON.stringify(data)
  chrome.storage.session.set({ accountData: accountDataJSON })
}