import { Router } from "express"
import { createShortUrl, getRedirectUrl } from "../controllers/url.controller.js"

const router = Router()


router.route("/").post(createShortUrl)
router.route("/:shortId").get(getRedirectUrl)

export default router