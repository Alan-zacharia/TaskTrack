const socketConfig = (io) => {
    io.on("connection", (socket) => {
    console.log("a user connected.")
    })
}