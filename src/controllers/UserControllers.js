const Connection = require("../config/Connection");
const bycript = require('bcrypt');


exports.registerUser = async(req, res) => {
    const { email, username, password, confPassword } = req.body;
    const salt = await bycript.genSalt();
    const hashPassword = await bycript.hash(password, salt);
    if (password !== confPassword){
        res.json({
            status: 400,
            message: "Password dan Confirm Password tidak cocok"
        })
    }
    let values = [email, username, hashPassword];
    let sql = `INSERT INTO tb_admin (email, username, password) VALUES (?, ?, ?)`;
    try {
        await Connection.query(sql,values, (err, rows, fields) => {
            if (err) throw err;
            if(err){
                console.log("error: ", err);
                res.json({
                status: 400,
                message: "Error Post",
                Error: err.sqlMessage,
                });
            }
            if (rows.affectedRows > 0) {
                message = "Registrasi Berhasil";
              } else {
                message = "Gagal Registrasi";
              }
              res.json({
                status: 200,
                message: message,
              });
        });
    } catch (error) {
        console.log(error);
    }
}

exports.loginUser = async(req, res) => {
    try {
        let {email} = req.body;
        let sql = `SELECT id_admin,email,username,key_token FROM tb_admin WHERE email LIKE '${email}'`;
         const user = await Connection.query(sql, function(err, rows) {
            res.json({
                status: 200,
                message: "succes Login",
                rows: rows[0].email,
            })
         })
         console.log(user[0].email)
    } catch (error) {
        res.json({
            staus: 400,
            message:"Email tidak ditemukan",
        });
    }
}