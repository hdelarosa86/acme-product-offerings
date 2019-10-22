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
    const fetchedProduct = fetchProduct(products);
    //console.log(fetchedProduct);

    const fetchedCompaniesId = fetchCompaniesId(offerings, fetchedProduct,companies);
    console.log(fetchedCompaniesId);
  }
); //end response

const fetchProduct = products => {
  return products.map(ele => {
    //console.log(ele);
    return ele.id;
  });
};

const fetchCompaniesId = (offerings, fetchedProduct,companies) => {
    let arr =[];
    fetchedProduct.forEach((ele) => {
        let obj ={productId : ele, price:[], companyId:[]};
    offerings.forEach(offering => {
      if (ele === offering.productId) {
          let companyId;
          companies.forEach(company => {
              if(offering.companyId === company.id){
                  companyId = company.name;
              }
          })
        obj.price.push(offering.price);

        obj.companyId.push(companyId);
      }
    });
    arr.push(obj);
  });
  return arr;
};
