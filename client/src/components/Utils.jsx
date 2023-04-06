import { validate } from "email-validator";
// const emailValidator = require('deep-email-validator');

export const searchByName = (inputValue, setSearchNames, setProduct) => {
  const apiKey = "hRrgsC44OhzB21TJ4FWnCI2NOwj1zFjFCf4Tniag"; // Replace with your API key
  const query = inputValue; // Replace with your search query

  fetch(
    `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${apiKey}&query=${query}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(1, data.foods);
      setSearchNames(data.foods);
      setProduct(null);
    })
    .catch((error) => console.error(error));

  // fetch(
  //   `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${inputValue}&search_simple=1&action=process&json=1&fields=code,product_name`
  // )
  //   .then((res) => res.json())
  //   .then((data) => {
  //     console.log(2, data.products);
  //     // setSearchNames(data.products);
  //     setProduct(null);
  //   });
};

const getNut = (data, name) => {
  let nut = data.foodNutrients.find((el) => {
    return el.nutrient.name === name;
  });
  return nut ? nut.amount : 0;
};

export const searchByBarcode = (barcode, setSearchNames, setProduct, fdcId) => {
  console.log(barcode, fdcId);
  const apiKey = "hRrgsC44OhzB21TJ4FWnCI2NOwj1zFjFCf4Tniag";
  if (fdcId != undefined)
    fetch(`https://api.nal.usda.gov/fdc/v1/food/${fdcId}?api_key=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(1, data);
        setSearchNames(null);
        setProduct({
          barcode: data.fdcId,
          name: data.description,
          nutriments: {
            kcal: getNut(data, "Energy"),
            carbohydrates: getNut(data, "Carbohydrate, by difference"),
            fat: getNut(data, "Total lipid (fat)"),
            proteins: getNut(data, "Protein"),
            fiber: getNut(data, "Fiber, total dietary"),
            sugars: getNut(data, "Sugars, total including NLEA"),
          },
        });
      })
      .catch((error) => console.error(error));
  //5201360674503
  if (barcode)
    fetch(
      `https://world.openfoodfacts.org/api/v2/product/${barcode}?fields=code,product_name,nutriments`
    )
      .then((res) => res.json())
      .then((data) => {
        setSearchNames(null);
        console.log({
          barcode: data.code,
          name: data.product["product_name"],
          nutriments: {
            kcal: data.product.nutriments["energy-kcal"],
            carbohydrates: data.product.nutriments.carbohydrates,
            fat: data.product.nutriments.fat,
            proteins: data.product.nutriments.proteins,
            fiber: data.product.nutriments.fiber,
            sugars: data.product.nutriments.sugars,
          },
        });
        data["status_verbose"] === "product found"
          ? setProduct({
              barcode: data.code,
              name: data.product["product_name"],
              nutriments: {
                kcal: data.product.nutriments["energy-kcal"],
                carbohydrates: data.product.nutriments.carbohydrates,
                fat: data.product.nutriments.fat,
                proteins: data.product.nutriments.proteins,
                fiber: data.product.nutriments.fiber,
                sugars: data.product.nutriments.sugars,
              },
            })
          : setProduct("Product Not Found");
      });
};

export const addingProduct = (product, useremail, grams, setUser, customDay) => {
  let today = new Date().toISOString().substring(0, 10);

  fetch(`http://localhost:3001/api/user/${customDay || today}/${useremail}/${grams}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    mode: "cors",
    body: JSON.stringify(product),
  })
    .then((res) => res.json())
    .then((data) => {
      setUser(data);
      // console.log(data);
    });
};

export const checking = {
  name: (e) => {
    if (e.target.value.length < 5) {
      e.target.setCustomValidity("Invalid field.");
    } else {
      e.target.setCustomValidity("");
    }
  },
  email: (e) => {
    if (validate(e.target.value)) {
      e.target.setCustomValidity("");
    } else {
      e.target.setCustomValidity("Invalid field.");
    }
  },
  password: (e) => {
    if (e.target.value.length < 7) {
      e.target.setCustomValidity("Invalid field.");
    } else {
      e.target.setCustomValidity("");
    }
  },
};
