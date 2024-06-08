const CHANGE_ROLE_MEMBER_CLASS= async (parent, args, context, info)=> {
    const [rows]= await connection.execute("UPDATE member_of_class SET role=? WHERE id_user=? AND id_class= ?", [args?.role, args?.id_user, args?.id_class])
    return { is_change: true }
}

export default CHANGE_ROLE_MEMBER_CLASS