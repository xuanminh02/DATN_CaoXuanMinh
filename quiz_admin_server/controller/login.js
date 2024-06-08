const connection = require("../database");

exports.login = async (req, res) => {
  const { password, account } = req.body;

  try {
    if (account === "admin" && password === "12456789") {
      res.json({ ok: true, message: "Đăng nhập thành công" });
    } else {
      return res
        .status(401)
        .json({ message: "Tên tài khoản hoặc mật khẩu không đúng", ok: false });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Đã xảy ra lỗi, vui lòng thử lại sau", ok: false });
  }
};
