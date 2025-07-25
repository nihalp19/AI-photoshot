import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';
import ImageRoutes from "./routes/imagesRoutes"
import { withClerkAuth } from './middleware/protected';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(withClerkAuth);

app.use("/api",ImageRoutes)


app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
