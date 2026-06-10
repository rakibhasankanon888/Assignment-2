import bcrypt from "bcryptjs";
import { pool } from "../../db/index.js";

const loginUserDB = async (payLode: {
    email: string;
    password: string;
}) => {
    const { email, password } = payLode;

    const userData = await pool.query(`
        SELECT * FROM users WHERE email=$1
        `,
        [email],
    );
    if (userData.rows.length === 0) {
        throw new Error("Invalid Credentials!");
    }
    const user = userData.rows[0];
    const matchPassword = await bcrypt.compare(password, user.password);
   
    if (!matchPassword) {
        throw new Error("Invalid Credentials!");
    }
};

export const authService = {
    loginUserDB
}