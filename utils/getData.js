export async function getData(url, headers) {
  try {
    const res = await fetch(url, { headers: headers})
    if (res.status === 200) return await res.json()
  }
  catch (err) {
    console.warn(url)
    throw Error(err)
  }
}