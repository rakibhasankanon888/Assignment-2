import type { Request, Response } from "express"
import { authService } from "./auth.service.js";

const loginUser = async (req: Request, res: Response) => {
    try {

        const result = await authService.loginUserDB(req.body);
        // res.status(200).json({
        //     success: true,
        //     message: "User updated successfully",
        //     data: result.rows[0],
        // });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error,
        });
    }
}

export const authController = {
    loginUser,
}






// import type { Request, Response } from "express"
// // import { authService } from "./auth.service.js";



// const loginUser = async (req: Request, res: Response) => {
//     try {

//         // const result = await authService.loginUserDB(req.body)
//         //     res.status(201).json({
//         //      success: true,
//         //      message: "User registered successfully",
//         //      data: result.rows[0]
//         //  });
//     } catch (error: any) {
//         res.status(500).json({
//             success: false,
//             message: error.message,
//             error: error,
//         });
//     }
// }

// export const authController = {
//     loginUser
// }



// import type { Request, Response } from "express";
// import { pool } from "../../db/index.js";


// const createAuth = async (req: Request, res: Response) => {
//     const { name, email, password, role } = req.body;

//     const userRole = role || "contributor";

//     const result = await pool.query(
//         `
//         INSERT INTO users(name, email, password, role)
//         VALUES($1, $2, $3, $4)
//         RETURNING id, name, email, role, created_at, updated_at
//         `,
//         [name, email, password, userRole]
//     );

//     res.status(201).json({
//         success: true,
//         message: "User registered successfully",
//         data: result.rows[0]
//     });
// };

// export default createAuth;