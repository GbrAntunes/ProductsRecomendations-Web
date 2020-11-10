async function getProductIdList() {
  const apiResponse = await fetch('http://localhost:3334?maxProducts=16')

  return apiResponse.json()
}