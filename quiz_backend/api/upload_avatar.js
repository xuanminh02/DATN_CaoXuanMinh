export default function uploadAvatar(req, res, next) {
    if(!req.file) {
        next(new Error("No file uploaded"))
        return
    }
    return res.json({secure_url: req.file.path, fiedlname: req.file.fiedlname})
}