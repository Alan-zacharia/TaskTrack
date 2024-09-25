export const setAuthTokenCookie = (res, token_name, token) => {
    res.cookie(token_name, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV == "production",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite : "none"
    })
} 