import express, { type Application, type Request, type Response } from "express";


import { pool } from "./db/index.js";
import { userRoute } from "./modules/user/user.route.js";
import { profileRoute } from "./modules/profile/profile.route.js";
import { authRoute } from "./modules/auth/auth.route.js";
const app: Application = express()


app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));




app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        message: " DevPulse Server is running successfully",
        success: true,

    });
});

app.use("/api/users", userRoute);
app.use("/api/profile", profileRoute);
app.use("/api/auth", authRoute);









export default app