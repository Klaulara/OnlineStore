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

const traerProductoPorCategoria = async (id) => {
  const result = await pool.query(`SELECT * FROM product WHERE category=${id}`);
  try {
    return result[0];
  } catch (error) {
    console.log(error);
  }
};

module.exports = { traerCategorias, traerProductos, traerProductoPorCategoria };
