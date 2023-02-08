const Connection = require("../config/Connection");

exports.getBarang = async (req, res) => {
  let jenisBarang = [];
  let message = "";

  try {
    const sqlJenisBarang =
      "SELECT DISTINCT jenis_barang FROM tb_barang ORDER BY jenis_barang";
    await Connection.query(sqlJenisBarang, function (err, rows) {
      if (err) throw err;
      jenisBarang = rows;
    });

    const sql = "SELECT * FROM tb_barang ORDER BY id_barang DESC";
    await Connection.query(sql, function (err, rows) {
      if (err) throw err;
      if (rows.length > 0) {
        message = "Data Tersedia";
      } else {
        message = "Tidak ada Data";
      }

      res.json({
        status: 200,
        message: message,
        data: rows,
        typeBarang: jenisBarang,
        info: {
          limit: rows.length,
          page: "page",
          totalRows: rows.length,
          totalPage: "totalPage",
        },
      });
    });
  } catch (error) {}
};

exports.insertBarang = async (req, res) => {
  try {
    const { id_barang, nama_barang, jenis_barang, jml_stock } = req.body;
    let message = "";
    let sql =
      "INSERT INTO tb_barang (id_barang, nama_barang, jenis_barang, jml_stock) VALUES (?, ?, ?, ?)";
    let values = [id_barang, nama_barang, jenis_barang, jml_stock];

    await Connection.query(sql, values, (err, rows, fileds) => {
      if (err) throw err;
      if (err) {
        console.log("error: ", err);
        res.json({
          status: 400,
          message: "Error Post",
          Error: err.sqlMessage,
        });
        return;
      }
      if (rows.affectedRows > 0) {
        message = "Data Berhasil ditambahkan";
      } else {
        message = "Data gagal ditambahkan";
      }
      res.json({
        status: 200,
        message: message,
        data: req.body,
      });
    });
  } catch (error) {
    console.log(`ERRORNYA: ${error}`);
  }
};

exports.deleteBarang = async (req, res) => {
  try {
    const id = req.params.id;
    let message = "";
    let sql = `DELETE FROM tb_barang WHERE id_barang LIKE '${id}'`;

    await Connection.query(sql, function (err, rows, fileds) {
      if (err) throw err;
      if (err) {
        console.log(`ERRORNYA: ${err}`);
        res.json({
          status: 400,
          message: "ERROR Request",
          error: err.sqlMessage,
        });
      }

      if (rows.affectedRows > 0) {
        message = "Data Berhasil Dihapus";
      } else {
        message = `Data Tidak Ada`;
      }

      res.json({
        status: 200,
        message: message,
      });
    });
  } catch (error) {
    console.log(`ERRORNYA: ${error}`);
  }
};

exports.detailBarang = async (req, res) => {
  try {
    let id = req.params.id;
    let message = "";
    let sql = `SELECT * FROM tb_barang WHERE id_barang LIKE '${id}'`;

    Connection.query(sql, function (err, rows, fileds) {
      if (err) throw err;
      if (err) {
        console.log(`ERRORNYA: ${err}`);
        res.json({
          status: 400,
          message: "Data Tidak Tersedia",
          error: err.sqlMessage,
        });
      }
      if (rows.lenght > 0) {
        message = "Data Tersedia";
      } else {
        message = "Data Tidak Tersedia";
      }

      res.json({
        status: 200,
        message: message,
        data: rows,
      });
    });
  } catch (error) {
    console.log(`ERRORNYA: ${error}`);
    let err = error;
    res.json({
      status: 400,
      message: `Error: ${error}`,
    });
  }
};
