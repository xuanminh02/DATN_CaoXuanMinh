import connection from "../database/config/init.js"

const DELETE_TERM= async (parent, args, context, info)=> {
    const [rows2]= await connection.execute("DELETE FROM user_learn_term WHERE id_term=?", [args.id_term])
    const [rows1]= await connection.execute("DELETE FROM question_of_term WHERE id_term= ?", [args.id_term])
    const [rows]= await connection.execute("DELETE FROM term WHERE id_term= ?", [args.id_term])
    return { is_delete: true }
}

export default DELETE_TERM