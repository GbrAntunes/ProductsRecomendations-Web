async function getProductIdList() {
  const apiResponse = await fetch('http://192.168.15.28:3334?maxProducts=16')

  return apiResponse.json()
}