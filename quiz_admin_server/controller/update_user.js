const connection = require("../database")

const update_user_admin= async (req, res)=> {
    try {
        const {account_name, displayName, uid}= req.body
        await connection.query("UPDATE user SET account_name= ?, displayName= ? WHERE uid= ?", [account_name, displayName, uid])
        return res.json({ok: true, message: "Cập nhật người dùng thành công"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ok: false, message: "Có lỗi bất ngờ xảy ra từ server"})
    }
}

module.exports= update_user_admin