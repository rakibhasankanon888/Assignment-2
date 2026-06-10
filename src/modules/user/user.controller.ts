import type { Request, Response } from "express";
import { pool } from "../../db/index.js";
import { userService } from "./user.service.js";


const createUser = async (req: Request, res: Response) => {
    const { name, email, password, role } = req.body;

    try {
        const result = await userService.createUserIntoDB(req.body);
        // console.log(result);
        res.status(201).json({
            message: "User Created successfully!",
            data: result.rows[0],
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error,
        });
    }

};

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const result = await userService.getAllUsersDB();
        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: result.rows,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error,
        });
    }
};

const getSingleUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await userService.getSingleUserDB(id as string)

        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "User Not found",
                data: {},
            });
        }
        res.status(200).json({
            success: true,
            message: "User retrieved successfully",
            data: result.rows[0],
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error,
        });
    }
};

const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const result = await userService.updateUserDB(req.body, id as string)
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "User Not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: result.rows[0],
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error,
        });
    }
};

const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await userService.deleteUserDB(id as string)

        console.log(result);
        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "User Not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "User delete successfully",
            data: {},
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error,
        });
    }
}

export const userController = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser
};