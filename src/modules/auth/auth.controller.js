import { Router } from 'express'
import { login, signup, signupWithGmail } from './auth.service.js';
import { successResponse } from '../../common/utils/index.js';
const router = Router();

router.post("/signup", async (req, res, next) => {
    const account = await signup(req.body);
    return successResponse({ res, status: 201, data: account });
})

router.post("/login", async (req, res, next) => {
    const credentials = await login(req.body, `${req.protocol}://${req.host}`);
    return successResponse({ res, status: 201, data: { credentials } });
})

router.post("/signup/gmail", async (req, res, next) => {
    const { status, credentials } = await signupWithGmail(req.body.idToken, `${req.protocol}://${req.host}`);
    return successResponse({ res, status, data: { ...credentials } });
})

export default router