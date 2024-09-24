const socketConfig = (io) => {
    io.on("connection", (socket) => {
        console.log("a user connected.")
        socket.on("disconnect", () => {
            console.log("User disconnected..")
        })
    })
};
export default socketConfig;