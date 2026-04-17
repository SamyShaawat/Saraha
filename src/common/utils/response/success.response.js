export const successResponse = async ({ res, message = "Done", status = 200, data = undefined }) => {
    return res.status(status).json({ status, Msg: message, data: data })
}
