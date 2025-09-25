import express, { Request, Response } from "express";
import cors from 'cors';
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;


app.use(cors());
app.use(express.json());

app.get('/api/v1', (req: Request, res: Response) => {
    res.send("HTTP Server is running!");
});


// Start the server
app.listen(port, ()=> {
    console.log(`HTTP server listening on http://localhost:${port}`);
});
