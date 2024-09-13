const express = require('express');
const mongoose = require("mongoose");
const authRouter = require("./authRouter");
const userRouter = require("./userRouter");
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
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