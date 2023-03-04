const jwt = require('jsonwebtoken');
const Connection = require("../config/Connection");


exports.refreshToken = async(req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        let sql = `SELECT id_admin,email,username,key_token FROM tb_admin WHERE email key_token '${refreshToken}'`;
        let cekAdmin =[];
        if(!refreshToken) return res.sendStatus(401);
        const admin = await Connection.query(sql, function(err, rows) {
            // res.json({
            //     status: 200,
            //     message: "succes Login",
            //     rows: rows[0].email,
            // })
            cekAdmin = rows[0];
         })
        //  if(!admin[0]) return res.sendStatus(403);
         if(!cekAdmin) return res.sendStatus(403);

         jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decode) => {
            if(err) return res.sendStatus(403);
            const userId = admin[0].id_admin;
            const name = admin[0].username;
            const email = admin[0].email;
            const accessToken = jwt.sign({userId, name, email}, process.env.ACCESS_TOKEN_SECRET,{
                expiresIn: '60s'
            });
            res.json({ accessToken });
         })
        
    } catch (error) {
        console.log(error);
    }
}