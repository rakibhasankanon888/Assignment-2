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

app.post("/api/auth/signup", async (req: Request, res: Response) => {
    const { name, email, password, role } = req.body;

    const userRole = role || "contributor";

    const result = await pool.query(
        `
        INSERT INTO users(name, email, password, role)
        VALUES($1, $2, $3, $4)
        RETURNING id, name, email, role, created_at, updated_at
        `,
        [name, email, password, userRole]
    );

    res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: result.rows[0]
    });
});

app.use("/api/auth", authRoute);


export default app