import express, { type Application, type Request, type Response } from "express"

import { pool } from "./db/index.js";
import { authRoute } from "./modules/auth/auth.route.js";

const app: Application = express();


app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));



app.get('/', (req: Request, res: Response) => {
    // res.send('Hello World!')
    res.status(200).json({
        "success": true,
        "message": "DevPulse Server is running successfully",

    });
});



app.use("/api/auth", authRoute);


export default app