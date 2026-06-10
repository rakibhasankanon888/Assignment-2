import { Router, type Request, type Response } from "express";
import { pool } from "../../db/index.js";
import { userController } from "./user.controller.js";


const router = Router();


router.post("/", userController.createUser);
router.get("/", userController.getAllUsers);

router.get('/:id', userController.getSingleUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export const userRoute = router