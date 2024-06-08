import connection from "../../database/config/init.js";

export default async function createQuiz(parent, args, context, info) {
    const [rows]= await connection.execute("INSERT INTO quiziz VALUES(?, ?, ?, ?)", [args.id_quiziz, args.owner_id, args.titleQuiz, new Date()])
    args.categoryQuiz.map(item=> connection.execute("INSERT INTO category_quiziz VALUES(?, ?)", [args.id_quiziz, item]))
    return { is_create: true }
}