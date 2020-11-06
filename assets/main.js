(async function () {
  const vitrines = await fetch('./assets/products.json')
  const productCarousel = document.querySelector('.product-carousel')
  const arrowRight = document.querySelector('#arrow-right')
  const arrowLeft = document.querySelector('#arrow-left')

  renderCarouselContent(productCarousel, await vitrines.json())

  function renderCarouselContent(carousel, products) {
    const productGroups = document.querySelectorAll('.products-group')
    let currentGroup = 0
    productGroups[currentGroup].style.display = 'flex'


    // Verifica se ainda há 4 produtos para serem renderizados
    while (products[0].products.length % 4 === 0) {
      const productGroup = createElement('div', 'products-group')

      products[0].products.splice(0, 4).forEach(product => {
        const productElement = createElement('div', 'product')

        productElement.innerHtml = `
          <span class="position-badge">1º</span>
        
          <img
            src="http://d1h4n7nr93grs2.cloudfront.net/Custom/Content/Products/11/08/1108504_p-12495_m3_636935423525390545"
            alt="arara">
          <div class="description">
            <p class="title">Conjunto 3 Potes Retangular 750ml Porto Alegre Jaguar Sortido - 12215</p>
            <small>
              <del>R$ 79,90</del>
            </small>
            <p>Por <strong>R$ 79,90</strong></p>
            <p>10x R$ 7.99</p>
          </div>
        `

        productGroup.appendChild(productElement)
      })

      carousel.insertBefore(productGroup, arrowRight)
    }

    function createElement(element, className) {
      const newElement = document.createElement(element)
      newElement.className = className

      return newElement
    }
  }

  arrowRight.addEventListener("click", () => {
    productGroups[currentGroup].style.display = 'none'

    currentGroup++
    (currentGroup === productGroups.length) && (currentGroup = 0)

    productGroups[currentGroup].style.display = 'flex'
  })

  arrowLeft.addEventListener("click", () => {
    productGroups[currentGroup].style.display = 'none'

    currentGroup === 0 && (currentGroup = (productGroups.length))
    currentGroup--

    productGroups[currentGroup].style.display = 'flex'
  })
})()