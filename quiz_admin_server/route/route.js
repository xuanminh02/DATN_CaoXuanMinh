const express = require('express');
const get_list_province = require('../controller/get_province');
const get_list_district = require('../controller/get_district');
const get_list_ward = require('../controller/get_ward');
const requireAuth = require('../middleware/auth');
const checkAdmin = require('../middleware/auth_admin');
const get_all_user = require('../controller/get_user');
const { login } = require('../controller/login');
const update_user_admin = require('../controller/update_user');
const delete_user_admin = require('../controller/delete_user');

const router = express.Router();

router.get("/api/v1/province", get_list_province)
router.post("/api/v1/login", login)
router.put("/api/v2/user", update_user_admin)
router.delete("/api/v2/user", delete_user_admin)
router.get("/api/v1/province/district/:province_id", get_list_district)
router.get("/api/v1/province/ward/:district_id", get_list_ward)
router.get('/api/v2/user', get_all_user);

module.exports = router;