// src/index.ts
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(ClerkExpressWithAuth());

app.get('/api/profile', (req, res) => {
  const { auth } = req as any;

  if (!auth?.userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  res.json({
    message: 'Authenticated route',
    userId: auth.userId,
    sessionId: auth.sessionId,
  });
});

app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
