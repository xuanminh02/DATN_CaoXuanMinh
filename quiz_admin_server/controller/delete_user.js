const connection = require("../database")

const delete_user_admin = async (req, res)=> {
    try {
        const {uid }= req.body
        await connection.query("DELETE FROM user WHERE uid= ?", [uid])
        return res.json({ok: true, message: "Đã xoá người dùng thành công"})
    } catch (error) {
        console.log(error)
        return res.json({ok: false, message: "Có lỗi bất ngờ xảy ra ở server"})
    }
}

module.exports= delete_user_admin 