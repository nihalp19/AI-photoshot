"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const imagesRoutes_1 = __importDefault(require("./routes/imagesRoutes"));
const protected_1 = require("./middleware/protected");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(protected_1.withClerkAuth);
app.use("/api", imagesRoutes_1.default);
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
