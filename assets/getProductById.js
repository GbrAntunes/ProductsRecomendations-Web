async function getProductById(id) {
  const apiResponse = await fetch(`http://localhost:3333/products/${id}`)

  return apiResponse.status === 404 ? false : apiResponse.json()
}