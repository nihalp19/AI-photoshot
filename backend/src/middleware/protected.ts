import { ClerkExpressWithAuth} from "@clerk/clerk-sdk-node";
import { Request,Response,NextFunction } from "express";
import { getAuth } from "@clerk/express"; // ✅ Correct module


export const withClerkAuth = ClerkExpressWithAuth();

export const requireClerkAuth = (req : Request, res : Response, next : NextFunction) => {
  const { userId } = req.auth || {};
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized access" });
  }
  next();
};

export const getClerkUser = (req : Request ) => {
  const { userId, sessionId, orgId } = getAuth(req);
  return { userId, sessionId, orgId };
};


