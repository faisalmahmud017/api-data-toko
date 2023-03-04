const Connection = require("../config/Connection");
const bycript = require('bcrypt');
const jwt = require('jsonwebtoken');


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
            // if (err) throw err;
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
        res.json({
            status: 400,
            message: "Gagal Regsitrasi",
            errors: error.sqlMessage,
          });
    }
}

exports.loginUser = async(req, res) => {
    let {email, password} = req.body;
    console.log(`email: ${email}, pass:${password}`)
    try {
        let sqlCekAdmin = `SELECT * FROM tb_admin WHERE email='${email}'`;
        let admin = [];
       await Connection.query(sqlCekAdmin, function(err, rows) {
            if (err) throw err;
            admin = rows;
         })
 
        const match = await bycript.compare(password, admin[0].password);
        if(!match) return res.status(400).json({msg: "Wrong Password"});
        
        const adminId = admin[0].id_admin;
        const name = admin[0].username;
        const emailAdmin = admin[0].email;

        const accessToken = jwt.sign({adminId, name, emailAdmin}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '20s'
        });

        const refreshToken = jwt.sign({adminId, name, emailAdmin}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '1d'
        });

        let sqlUpdateToken = `UPDATE tb_admin SET key_token='${refreshToken}' WHERE id_admin LIKE '${adminId}'`;
        await Connection.query(sqlUpdateToken, refreshToken, (err, rows, fileds) => {
            if (err) throw err;
            
        })

        res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 //expired 1 hari dalam miliseconds
        });
        res.json({ 
            status: 200,
            msg: "Login Succes",
            data: [{
                username: name
            }],
            accessToken 
        });
       
         console.log(admin[0].email)

    } catch (error) {
        console.log(error);
        res.json({
            staus: 400,
            message:"Email tidak ditemukan",
        });
    }
}

exports.tesLoginUser = async(req, res) => {
    try {  
      let email = req.body.email; 
        let sql = `SELECT * FROM tb_admin WHERE email='${email}'`;
        await Connection.query(sql, function(err, rows, fileds) {
            if (err) throw err;
            let dataAdmin = null;
            let dataStatus = null;
            let message = '';
            var reqStatus = 0;

                if (rows.length > 0) {
                    dataAdmin = rows;
                    message = "Login Berhasil";
                    reqStatus = 200;

                    const match = bycript.compareSync(req.body.password, dataAdmin[0].password);
                    if(!match){
                        return res.status(400).json({
                            status: 400,
                            message: "Wrong Password",
                        });
                    } else {
                        dataStatus = true;
                    }
                } else {
                    message = "Email Tidak ditemukan";
                    dataStatus = false;
                    return res.status(400).json({
                        status: 400,
                        message: message,
                    })    
                }
                
                if (dataStatus) {
                    const idAdmin = dataAdmin[0].id_admin;
                    const username = dataAdmin[0].username;
                    const email = dataAdmin[0].email;

                        const access_token = jwt.sign({idAdmin, username, email}, process.env.ACCESS_TOKEN_SECRET,{
                        expiresIn: '20s'
                    });

                    const refreshToken = jwt.sign({idAdmin, username, email}, process.env.REFRESH_TOKEN_SECRET,{
                        expiresIn: '1d'
                    });

                    let sqlUpdatetoken = `UPDATE tb_admin SET key_token=? WHERE id_admin='${idAdmin}'`;
                    let values = [refreshToken];
                    
                    Connection.query(sqlUpdatetoken, values, (err, rows, fileds) => {
                        if (err) throw err;
                    })

                    res.cookie('refreshToken', refreshToken,{
                        httpOnly: true,
                        maxAge: 24 * 60 * 60 * 1000
                    });

                    res.json({
                        status: reqStatus,
                        message: message,
                        data: [{
                            email: dataAdmin[0].email,
                            username: dataAdmin[0].username,
                        }],
                        access_token,
                    })    
                }

            })
    } catch (error) {
        console.log(`ERRORNYA: ${error}`);
        res.json({
            staus: 400,
            message:"Email tidak ditemukan",
            errors: `${error}`,
        });
    }
}