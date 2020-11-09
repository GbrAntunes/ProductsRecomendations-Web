function createElement(element, className = '') {
  const newElement = document.createElement(element)
  newElement.className = className

  return newElement
}