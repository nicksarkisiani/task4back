const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors')
const authRouter = require("./authRouter");
const userRouter = require("./userRouter");
const PORT = 5000
const {client_url} = require("./config");

const app = express();

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: client_url,
}))
app.use("/auth", authRouter);
app.use("/user", userRouter)
const start = async () => {
    try {
        await mongoose.connect(`mongodb+srv://root:root@cluster0.ot4bl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
        app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
    } catch (e) {
        console.log(e)
    }
}

start()