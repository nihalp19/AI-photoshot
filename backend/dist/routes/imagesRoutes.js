"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multerMiddleware_1 = require("../middleware/multerMiddleware");
const protected_1 = require("../middleware/protected");
const uploadControllers_1 = require("../controllers/uploadControllers");
const router = express_1.default.Router();
router.post("/upload-images", multerMiddleware_1.upload.array('image', 6), protected_1.requireClerkAuth, uploadControllers_1.handleUploadImages);
exports.default = router;
