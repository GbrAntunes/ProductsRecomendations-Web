(async function () {
  const [mostPopularCrs, reducedPriceCrs] = document.querySelectorAll('.product-carousel')

  const {
    ofertas: reducedPriceList,
    mais_vendidos: mostPopularList
  } = await getProductIdList()

  renderPopularCarouselContent(mostPopularCrs, mostPopularList)
  renderReducedPriceCarouselContent(reducedPriceCrs, reducedPriceList)

  function renderPopularCarouselContent(carousel, products) {
    const arrowRight = carousel.querySelector('#arrow-right')
    const arrowLeft = carousel.querySelector('#arrow-left')
    let currentGroup = 0
    let productCount = 1

    while (products.length >= 4) {

      const productPack = products.splice(0, 4)
      
      const productGroup = createElement('div', 'products-group')
      
      carousel.insertBefore(productGroup, arrowRight)
      
      productPack.forEach(async (product) => {
        
        const productElement = createElement('div', 'product')
        
        const fullProduct = await getProductById(product.recommendedProduct.id)
        
        if (!fullProduct) {
          console.error(`Product ${product.recommendedProduct.id} not found`)
          return
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

    const productGroups = carousel.querySelectorAll('.products-group')

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
    const arrowRight = carousel.querySelector('#arrow-right')
    const arrowLeft = carousel.querySelector('#arrow-left')
    let currentGroup = 0

    while (products.length >= 4) {

      const productPack = products.splice(0, 4)

      const productGroup = createElement('div', 'products-group')

      carousel.insertBefore(productGroup, arrowRight)

      productPack.forEach(async (product) => {
        const productElement = createElement('div', 'product')

        const fullProduct = await getProductById(product.recommendedProduct.id)

        if (!fullProduct) {
          console.error(`Product ${product.recommendedProduct.id} not found`)
          return
        }

        const porcentage = discountCalc(fullProduct.price, fullProduct.oldPrice)

        productElement.innerHTML = `
          <span class="discount-badge">-${porcentage}%</span>
        
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
      });
    }

    const productGroups = carousel.querySelectorAll('.products-group')

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
