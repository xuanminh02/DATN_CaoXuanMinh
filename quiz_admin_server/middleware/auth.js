const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  // Lấy token từ header 'Authorization'
  const authHeader = req.headers.authorization;

  // Kiểm tra xem header 'Authorization' có tồn tại không
  if (!authHeader) {
    return res
      .status(401)
      .json({
        message:
          "Token không tồn tại, vui lòng đăng nhập để truy cập tài nguyên",
      });
  }

  // Tách token từ header 'Authorization'
  const tokenParts = authHeader.split(" ");
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return res.status(401).json({ message: "Định dạng token không hợp lệ" });
  }
  const token = tokenParts[1];

  try {
    // Xác minh token và lấy thông tin payload (userId)
    const decoded = jwt.verify(token, "1245678");

    // Gắn userId vào request để sử dụng trong các middleware hoặc controller sau này
    req.user = decoded;

    // Cho phép tiếp tục thực hiện các middleware hoặc controller tiếp theo
    next();
  } catch (error) {
    console.error(error);
    return res
      .status(403)
      .json({ message: "Token không hợp lệ, vui lòng đăng nhập lại" });
  }
};

module.exports = requireAuth;
