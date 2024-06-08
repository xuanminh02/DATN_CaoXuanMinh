const connection = require("../database");

const get_list_province = async (req, res)=> {
    try {
        const [rows]= await connection.query("SELECT * FROM provinces")
        return res.json({results: rows})
    } catch (error) {
        console.log(error);
        return res.json({ok: false});
    }
};

module.exports = get_list_province;
