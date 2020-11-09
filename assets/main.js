(async function () {
  const popularsSection = document.querySelector('.most-popular')
  const reducedPriceSection = document.querySelector('.reduced-price')
  const productCarousel = popularsSection.querySelector('.product-carousel')
  const reducedPriceCarousel = reducedPriceSection.querySelector('.product-carousel')
  const arrowRight = document.querySelector('#arrow-right')
  const arrowLeft = document.querySelector('#arrow-left')

  const productList = await getProductIdList()

  renderPopularCarouselContent(productCarousel, productList)
  renderReducedPriceCarouselContent(reducedPriceCarousel, productList)

  function renderPopularCarouselContent(carousel, products) {
    let currentGroup = 0
    let productCount = 1

    while (products.mais_vendidos.length >= 4) {

      const productPack = products.mais_vendidos.splice(0, 4)

      const productGroup = createElement('div', 'products-group')

      carousel.insertBefore(productGroup, arrowRight)

      productPack.forEach(async (product) => {
        const productElement = createElement('div', 'product')

        const fullProduct = await getProductById(product.recommendedProduct.id)

        if (!fullProduct) {
          console.log('Não encontrado')
        }

        productElement.innerHTML = `
          <span class="position-badge">${productCount}º</span>
        
          <img
            src="http:/${fullProduct.images.default || ''}"
            alt="${fullProduct.name || ''}">
          <div class="description">
            <p class="title">${fullProduct.name || ''}</p>
            <small>
              <del>${formatValue(fullProduct.oldPrice)}</del>
            </small>
            <p>Por <strong>${formatValue(fullProduct.price)}</strong></p>
            <p>10x ${formatValue(fullProduct.installment.price)}</p>
          </div>
        `

        productGroup.appendChild(productElement)
        productCount++
      });
    }
    
    const productGroups = document.querySelectorAll('.products-group')

    productGroups[currentGroup].style.display = 'flex'

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
  }

  function renderReducedPriceCarouselContent(carousel, products) {
    let currentGroup = 0
    let productCount = 1

    while (products.mais_vendidos.length >= 4) {

      const productPack = products.mais_vendidos.splice(0, 4)

      const productGroup = createElement('div', 'products-group')

      carousel.insertBefore(productGroup, arrowRight)

      productPack.forEach(async (product) => {
        const productElement = createElement('div', 'product')

        const fullProduct = await getProductById(product.recommendedProduct.id)

        if (!fullProduct) {
          console.log('Não encontrado')
        }

        productElement.innerHTML = `
          <span class="position-badge">${productCount}º</span>
        
          <img
            src="http:/${fullProduct.images.default || ''}"
            alt="${fullProduct.name || ''}">
          <div class="description">
            <p class="title">${fullProduct.name || ''}</p>
            <small>
              <del>${formatValue(fullProduct.oldPrice)}</del>
            </small>
            <p>Por <strong>${formatValue(fullProduct.price)}</strong></p>
            <p>10x ${formatValue(fullProduct.installment.price)}</p>
          </div>
        `

        productGroup.appendChild(productElement)
        productCount++
      });
    }
    
    const productGroups = document.querySelectorAll('.products-group')

    productGroups[currentGroup].style.display = 'flex'

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
  }

})()
