const connection = require("../database");

const get_all_user = async (req, res) => {
  try {
    // Lấy trang hiện tại từ query parameters, mặc định là 1 nếu không có
    const currentPage = parseInt(req.query.page) || 1;
    // Số lượng mục trên mỗi trang, có thể điều chỉnh theo nhu cầu của bạn
    const itemsPerPage = 10;
    // Từ khóa tìm kiếm, mặc định là trống nếu không có
    const searchKeyword = req.query.search || "";

    // Đếm tổng số người dùng dựa trên từ khóa tìm kiếm
    const [countRows] = await connection.query(
      "SELECT COUNT(*) AS total FROM user WHERE email LIKE ?",
      [`%${searchKeyword}%`]
    );
    const totalItems = countRows[0].total;

    // Tính tổng số trang
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Tính offset
    const offset = (currentPage - 1) * itemsPerPage;

    // Lấy dữ liệu người dùng cho trang hiện tại và từ khóa tìm kiếm
    const [rows] = await connection.query(
      `SELECT * FROM user WHERE email LIKE ? ORDER BY time_created DESC LIMIT ?, ?`,
      [`%${searchKeyword}%`, offset, itemsPerPage]
    );

    return res.json({ ok: true, data: rows, totalPages: totalPages });
  } catch (error) {
    console.log(error);
    return res.json({ ok: false, error: error.message });
  }
};

module.exports = get_all_user;
