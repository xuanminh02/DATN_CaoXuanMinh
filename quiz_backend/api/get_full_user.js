import connection from "../database/config/init.js"

const get_full_user= async (req, res, next)=> {
    try {
        const [rows]= await connection.execute("SELECT * FROM user")
        return res.send(rows)
    } catch (error) {
        next(error)
    }
}

export default get_full_user