const connection = require("../database");

const get_list_ward = async (req, res)=> {
    try {
        const {district_id }= req.params
        const [rows]= await connection.query("SELECT * FROM wards WHERE district_id= ?", [district_id])
        return res.json({results: rows})
    } catch (error) {
        console.log(error);
        return res.json({ok: false});
    }
};

module.exports = get_list_ward;
