const connection = require("../database");

const get_list_district = async (req, res)=> {
    try {
        const {province_id }= req.params
        const [rows]= await connection.query("SELECT * FROM districts WHERE province_id= ?", [province_id])
        return res.json({results: rows})
    } catch (error) {
        console.log(error);
        return res.json({ok: false});
    }
};

module.exports = get_list_district;
