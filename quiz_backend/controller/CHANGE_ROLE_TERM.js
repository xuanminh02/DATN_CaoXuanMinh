import connection from "../database/config/init.js"

const CHANGE_ROLE_TERM= async (parent, args, context, info)=> {
    const [rows]= await connection.execute("UPDATE term SET visible=? WHERE id_term= ?", [args?.visible, args?.id_term])
    const [rows2]= await connection.execute("UPDATE term SET editable=? WHERE id_term= ?", [args?.editable, args?.id_term])
    return { is_change: true }
}

export default CHANGE_ROLE_TERM