"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClerkUser = exports.requireClerkAuth = exports.withClerkAuth = void 0;
const clerk_sdk_node_1 = require("@clerk/clerk-sdk-node");
const express_1 = require("@clerk/express"); // ✅ Correct module
exports.withClerkAuth = (0, clerk_sdk_node_1.ClerkExpressWithAuth)();
const requireClerkAuth = (req, res, next) => {
    const { userId } = req.auth || {};
    if (!userId) {
        return res.status(401).json({ error: "Unauthorized access" });
    }
    next();
};
exports.requireClerkAuth = requireClerkAuth;
const getClerkUser = (req) => {
    const { userId, sessionId, orgId } = (0, express_1.getAuth)(req);
    return { userId, sessionId, orgId };
};
exports.getClerkUser = getClerkUser;
