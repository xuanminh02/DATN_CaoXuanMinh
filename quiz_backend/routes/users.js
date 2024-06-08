import express from "express";
import create_term_api from "../api/create_term.js";
import get_full_user from "../api/get_full_user.js";
import uploadAvatar from "../api/upload_avatar.js";
import uploadCloud from "../cloudinary/upload.js";
const router = express.Router();

/* GET users listing. */

router.post("/api/v1/create/term", create_term_api);
router.get("/api/v1/get/user", get_full_user)
router.post(
  "/api/v1/upload/avatar",
  uploadCloud.single("avatar"),
  uploadAvatar
);
router.get("/", (req, res) => {
  res.render("index");
});
router.get("/api/graphql", (req, res) => {
  res.render("index");
});

export default router;
