//Coffee: price_1MTmaAIZTkvJDKXeOm3eVaW9
//Sunglasses: price_1MTmaAIZTkvJDKXeOm3eVaW9
//Camera: price_1MTmcGIZTkvJDKXe88eAIVZH

const productsArray = [
  {
    id: "price_1MTmaAIZTkvJDKXeOm3eVaW9",
    title: "coffee",
    price: 4.99,
  },
  {
    id: "price_1MTmbIIZTkvJDKXegF8vDmfh",
    title: "Sunglasses",
    price: 9.99,
  },
  {
    id: "price_1MTmcGIZTkvJDKXe88eAIVZH",
    title: "Camera",
    price: 39.99,
  },
];

function getProductData(id) {
  let productData = productsArray.find((product) => product.id === id);

  if (productData == undefined) {
    console.log("Product data does not exist for ID:" + id);
  }

  return productData;
}

export { productsArray, getProductData };
