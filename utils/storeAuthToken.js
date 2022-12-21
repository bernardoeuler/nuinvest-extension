export async function storeAuthToken(details) {
  const authorizationHeader = details.requestHeaders.find(header => header.name === "Authorization")
  if (authorizationHeader) {
    const authToken = authorizationHeader.value
    const sessionStorage = await chrome.storage.session.get(null)
    if (sessionStorage.authToken === undefined) {
      await chrome.storage.session.set({ authToken })
    }
  }
}