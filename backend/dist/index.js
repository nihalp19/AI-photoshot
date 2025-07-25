"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const clerk_sdk_node_1 = require("@clerk/clerk-sdk-node");
dotenv_1.default.config();
const PORT = 3000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, clerk_sdk_node_1.ClerkExpressWithAuth)());
app.all("/", (req, res) => {
    return res.send("BACKEND IS RUNNING");
});
app.get("/protected", (req, res) => {
    var _a;
    if (!((_a = req.auth) === null || _a === void 0 ? void 0 : _a.userId)) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    res.json({ message: `Hello, ${req.auth.userId}` });
});
app.listen(PORT, () => {
    console.log("Server running on port 3000");
});
