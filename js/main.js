document.addEventListener("DOMContentLoaded", () => {
    const productList = document.getElementById('product-list');
  
    fetch('data/products.json')
      .then(response => response.json())
      .then(data => {
        data.forEach(product => {
          const card = `
            <div class="col-md-4 mb-4">
              <div class="card h-100 shadow-sm">
                <img src="${product.image}" class="card-img-top" alt="${product.title}">
                <div class="card-body d-flex flex-column">
                  <h5 class="card-title">${product.title}</h5>
                  <p class="card-text text-muted">Faculty: ${product.faculty}</p>
                  <p class="card-text fw-bold text-primary">EGP ${product.price}</p>
                  <a href="${product.link}" class="btn btn-primary mt-auto">View</a>
                </div>
              </div>
            </div>
          `;
          productList.innerHTML += card;
        });
      })
      .catch(error => {
        productList.innerHTML = `<div class="col-12 text-danger">Failed to load products.</div>`;
        console.error('Error loading product data:', error);
      });
  });
  