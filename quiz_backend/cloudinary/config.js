import { v2 as cloudinary } from "cloudinary"

export default cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "cockbook",
    api_key: process.env.CLOUDINARY_API_KEY || "362125891568421",
    api_secret: process.env.CLOUDINARY_API_SECRET || "kR3bk36ysLWcYuKLy-MN9otXogM",
    secure: true
})