const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com",
  user: "bsale_test",
  password: "bsale_test",
  database: "bsale_test",
});

const traerCategorias = async () => {
  const result = await pool.query("SELECT * FROM category");
  try {
    return result[0];
  } catch (error) {
    console.log(error);
  }
};

const traerProductos = async () => {
  const result = await pool.query("SELECT * FROM product");
  try {
    return result[0];
  } catch (error) {
    console.log(error);
  }
};

const traerProductoPorCategoriayOrden = async (categoria, orden) => {
  let ordenado = ordenSwitch(orden);
  const result = await pool.query(`SELECT * FROM product WHERE category=${categoria} ORDER BY ${ordenado}`);
  try {
    return result[0];
  } catch (error) {
    console.log(error);
  }
};

const traerProductosOrdenados = async (orden) => {
  let ordenado = ordenSwitch(orden);
  const result = await pool.query(`SELECT * FROM product ORDER BY ${ordenado}`);
  try {
    return result[0];
  } catch (error) {
    console.log(error);
  }
};

const traerProductoPorCategoria = async (categoria) => {
  const result = await pool.query(`SELECT * FROM product WHERE category=${categoria}`);
  try {
    return result[0];
  } catch (error) {
    console.log(error);
  }
};

const ordenSwitch = (orden) => {
  switch (orden) {
    case "1":
      orden = "price";
      break;
    case "2":
      orden = "price DESC";
      break;
    case "3":
      orden = "name"; 
      break;
    case "4":
      orden = "name DESC";
      break;
  }
  return orden;
}

module.exports = { 
  traerCategorias, 
  traerProductos, 
  traerProductoPorCategoriayOrden,
  traerProductosOrdenados,
  traerProductoPorCategoria
};
