import { Router } from "express"
import { createShortUrl, getRedirectUrl, getUserUrls } from "../controllers/url.controller.js"

const router = Router()

import { verifyJWT } from "../middlewares/auth.middleware.js"

router.route("/").post(verifyJWT, createShortUrl)
router.route("/:shortId").get(getRedirectUrl)
router.route("/").get(verifyJWT, getUserUrls)

export default router