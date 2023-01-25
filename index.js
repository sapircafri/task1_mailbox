const express = require('express');
const cors = require('cors');
const app = express();
const userRouter = require("./routes/userRouter")
const emailRouter =require("./routes/emailRouter")
const chatRouter = require("./routes/chatRouter")
// const { runCommand } = require('./sql');

app.use(cors());
app.use(express.json());
// app.use('/uploads', express.static('uploads'))

app.use("/user" , userRouter)
app.use('/email', emailRouter )
app.use('/chat', chatRouter )


app.listen(4000, ()=>{
    // opedDb()
    console.log("server listening to port 4000");
})