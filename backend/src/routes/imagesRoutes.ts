import express from "express"
import { execPath } from "process"
import { upload } from "../middleware/multerMiddleware"
import { requireClerkAuth } from "../middleware/protected"
import { handleUploadImages } from "../controllers/uploadControllers"

const router = express.Router()

router.post("/upload-images", upload.array('image', 6), requireClerkAuth, handleUploadImages);


export default router