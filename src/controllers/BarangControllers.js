const Connection = require("../config/Connection");

exports.getBarangMasuk = async (req, res) => {
  let jenisBarang = [];
  let message = "";
  // SELECT DISTINCT alamat FROM daftar_dosen ORDER BY alamat
  try {
    const sqlJenisBarang =
      "SELECT DISTINCT jenis_barang FROM tb_barang_masuk ORDER BY jenis_barang";
    await Connection.query(sqlJenisBarang, function (err, rows) {
      if (err) throw err;
      jenisBarang = rows;
    });

    const sql = "SELECT * FROM tb_barang_masuk ORDER BY id DESC";
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

exports.insertBarangMasuk = async (req, res) => {
  // const {id_barang,nama_barang,jenis_barang,jml_barang_masuk} = req.body;

  const body = req.body;
  let id_barang = body.id_barang;
  let nama_barang = body.nama_barang;
  let jenis_barang = body.jenis_barang;
  let jml_barang_masuk = body.jml_barang_masuk;
  let message = "";
  try {
    let sql = "INSERT INTO tb_barang_masuk (id_barang, nama_barang, jenis_barang, jml_barang_masuk) VALUES (?, ?, ?, ?)";
    let values = [id_barang, nama_barang, jenis_barang, jml_barang_masuk];

    await Connection.query(sql, values, (err, rows, fileds) => {
      if (err) throw err;
      if (rows.affectedRows > 0) {
        message = "Data Berhasil ditambahkan";
      } else {
        message = "Data gagal ditambahkan";
      }
      res.json({
        status: 200,
        message: message,
        // data: rows,
      });
    });
  } catch (error) {
    console.log(`ERRORNYA: ${error}`);
  }
};
