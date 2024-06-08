import connection from "../database/config/init.js"
import { v4 as uuidv4 } from "uuid"

export default async function create_term_api(req, res) {
    try {
        const [rows, fields]= await connection.execute("INSERT INTO term VALUES(?, ?,?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE id_term=VALUES(id_term), title=VALUES(title), description= VALUES(description), category= VALUES(category), visible= VALUES(visible), editable= VALUES(editable), own_id= VALUES(own_id), time_created= VALUES(time_created), time_updated= VALUES(time_updated)", [req.body.id_term, req.body.title, req.body.description,req.body.category ,req.body.visible, req.body.editable, req.body.own_id, new Date(), new Date()])
        const list_questions= req.body?.question
        list_questions?.map(item=> connection.execute("INSERT INTO question_of_term VALUES(?, ?, ?, ?)", [uuidv4(), req.body?.id_term, item?.question, item?.answer]))
    } catch (error) {
        return console.log(error)
    }

    return res.json([req.body?.id_term, req.body?.title])
}