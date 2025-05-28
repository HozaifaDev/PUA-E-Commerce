let allProducts = [];

function renderProducts(filteredProducts) {
  const productList = document.getElementById('product-list');
  productList.innerHTML = '';

  filteredProducts.forEach(product => {
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
}

function applyFilters() {
  const faculty = document.getElementById('facultyFilter').value.toLowerCase();
  const type = document.getElementById('typeFilter').value.toLowerCase();
  const search = document.getElementById('searchInput').value.toLowerCase();

  const filtered = allProducts.filter(product => {
    return (
      (faculty === '' || product.faculty.toLowerCase() === faculty) &&
      (type === '' || product.type.toLowerCase() === type) &&
      (search === '' || product.title.toLowerCase().includes(search))
    );
  });

  renderProducts(filtered);
}

document.addEventListener("DOMContentLoaded", () => {
  fetch('data/products.json')
    .then(response => response.json())
    .then(data => {
      allProducts = data;
      renderProducts(data);

      document.getElementById('facultyFilter').addEventListener('change', applyFilters);
      document.getElementById('typeFilter').addEventListener('change', applyFilters);
      document.getElementById('searchInput').addEventListener('input', applyFilters);
    });
});
