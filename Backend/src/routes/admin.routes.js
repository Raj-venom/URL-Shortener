import { Router } from "express"
import { AllUseraAnylatic } from "../controllers/admin.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router = Router()



router.route("/dashboard").get(verifyJWT, AllUseraAnylatic)



export default router