import { Router } from "express";
import { profile, rotateToken } from "./user.service.js";
import { successResponse } from "../../common/utils/index.js";
import { authentication, authorization } from "../../middleware/authentication.middleware.js";
import { TokenTypeEnum } from "../../common/enums/security.enum.js";
import { RoleEnum } from "../../common/enums/user.enum.js";
const router = Router()

router.get("/",
    authentication(),
    authorization([RoleEnum.Admin]),
    async (req, res, next) => {
        const account = await profile(req.user)
        return successResponse({ res, data: account })
    })

router.get("/rotate-token", authentication(TokenTypeEnum.Refresh), async (req, res, next) => {
    const credentials = await rotateToken(req.user, `${req.protocol}://${req.host}`)
    return successResponse({ res, data: credentials })
})
export default router