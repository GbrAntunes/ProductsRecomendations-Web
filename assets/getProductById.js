async function getProductById(id) {
  const apiResponse = await fetch(`http://192.168.15.28:3333/products/${id}`)

  return apiResponse.status === 404 ? false : apiResponse.json()
}