import { Router,} from "express";

import createAuth from "./auth.controller.js";

const router = Router();

router.post("/api/auth/login", createAuth);

export const authRoute = router
