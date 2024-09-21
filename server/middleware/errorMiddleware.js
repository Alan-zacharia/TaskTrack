const errorHandler = (err, req, res, next) => {
    console.log(err.message || "Internal server error.");
    const statusCode = err.status || 500
    return res.status(statusCode).json({
        message: err.message || "Internal server error."
    })
}

export default errorHandler;