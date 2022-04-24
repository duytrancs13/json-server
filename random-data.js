const casual = require("casual");
const fs = require("fs");

const randomUser = () => {
  casual.define("user", () => ({
    email: casual.email,
    firstname: casual.first_name,
    lastname: casual.last_name,
    password: casual.password,
  }));
  return casual.user;
};

const randomCategories = (n) => {
  if (n <= 0 || typeof n !== "number") return [];
  return Array.from(new Array(n)).map(() => ({
    categoryId: casual.uuid,
    name: casual.name,
  }));
};

const randomProducts = (categories, n) => {
  if (categories.length < 1) return [];
  if (n <= 0 || typeof n !== "number") return [];

  return categories.map(({ categoryId }) =>
    Array.from(new Array(n)).map(() => ({
      categoryId,
      id: casual.uuid,
      name: casual.name,
      description: casual.description,
      price: casual.price,
    }))
  ).flat(1);
};

// write random data into db.json
(() => {
  const categories = randomCategories(4);
  const db = {
    user: randomUser(),
    categories,
    products: randomProducts(categories, 5),
  };
  fs.writeFile("db.json", JSON.stringify(db), () => {
    console.log("wrote successfully!!!");
  });
})();
