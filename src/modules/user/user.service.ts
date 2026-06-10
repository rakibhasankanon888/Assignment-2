import { pool } from "../../db/index.js";
import type { IUser } from "./user.interface.js";
import bcrypt from "bcryptjs";

const createUserIntoDB = async (payLoad: IUser) => {
    const { name, email, password, role } = payLoad;

    const hashPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(`
        INSERT INTO users(name,email,password,role) VALUES($1,$2,$3,$4) RETURNING *
        `,
        [name, email, hashPassword, role],
    );

    delete result.rows[0].password;
    return result;
};
const getAllUsersDB = async () => {
    const result = await pool.query(`
            SELECT * FROM users
            `);
    return result;
};

const getSingleUserDB = async (id: string) => {
    const result = await pool.query(
        `
            SELECT * FROM users WHERE id=$1
            `,
        [id],
    );
    return result;
};

const updateUserDB = async (payLoad: IUser, id: string) => {

    const { name, password, is_active, role, } = payLoad;
    const result = await pool.query(
        `
        UPDATE users 
        SET 
        name=COALESCE($1,name),
        password=COALESCE($2,password),
        is_active=COALESCE($3,is_active),
        role=COALESCE($4,role) 

        WHERE id=$5 RETURNING *
        `,
        [name, password, is_active, role, id],
    );
    return result;
};

const deleteUserDB = async (id: string) => {
    const result = await pool.query(`
            DELETE FROM users WHERE id=$1
            `,
        [id],
    );
    return result;
}


export const userService = {
    createUserIntoDB,
    getAllUsersDB,
    getSingleUserDB,
    updateUserDB,
    deleteUserDB
};