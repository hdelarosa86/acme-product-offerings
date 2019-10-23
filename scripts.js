const grabCompanies = () =>
  new Promise((res, rej) => {
    // can change url to /api/products, /api/offerings for the other ones
    return window
      .fetch('https://acme-users-api-rev.herokuapp.com/api/companies')
      .then(response => response.json())
      .then(jsonData => res(jsonData))
      .catch(e => rej(e));
  });
const grabProducts = () =>
  new Promise((res, rej) => {
    // can change url to /api/products, /api/offerings for the other ones
    return window
      .fetch('https://acme-users-api-rev.herokuapp.com/api/products')
      .then(response => response.json())
      .then(jsonData => res(jsonData))
      .catch(e => rej(e));
  });
const grabOfferings = () =>
  new Promise((res, rej) => {
    // can change url to /api/products, /api/offerings for the other ones
    return window
      .fetch('https://acme-users-api-rev.herokuapp.com/api/offerings')
      .then(response => response.json())
      .then(jsonData => res(jsonData))
      .catch(e => rej(e));
  });

Promise.all([grabCompanies(), grabProducts(), grabOfferings()]).then(
  responses => {
    const [companies, products, offerings] = responses;
    const productAPI = createProductAPI(offerings, products, companies);
    const container = document.querySelector('#container');
    const template = products
      .map((item, idx) => {
        let a = '';
        for (let i = 0; i < productAPI[idx].offerPrice.length; i++) {
          a += `<li>Offered by:${productAPI[idx].companyName[i]} $${productAPI[idx].offerPrice[i].toFixed(2)}</li>`;
        }
        return `<div class="product-info">
        <h2><a href="#${item.id}">${item.name}</a></h2>
        <p>${item.description}</p>
        <p>$${item.suggestedPrice}.00</p>
        <ul>${a}</ul></div>`;
      })
      .join('');

    render(template, container);
  } //end responses
); //end Promise.all

const createProductAPI = (offerings, products, companies) => {
  let arr = [];
  products.forEach(product => {
    let obj = {
      offerPrice: [],
      companyName: [],
    };
    offerings.forEach(offering => {
      if (product.id === offering.productId) {
        obj.offerPrice.push(offering.price);
        companies.forEach(company => {
          if (offering.companyId === company.id) {
            obj.companyName.push(company.name);
          }
        });
      }
    });
    arr.push(obj);
  });
  return arr;
}; //End of createProductAPI

const render = (template, node) => {
  node.innerHTML = template;
};
