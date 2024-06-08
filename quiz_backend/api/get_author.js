import connection from "../database/config/init.js"

export const get_author= async (req, res)=> {
    const [rows]= await connection.execute("SELECT uid, displayName, photoURL from user WHERE uid= ?", [req.body.user])
}