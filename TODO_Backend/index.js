const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth.js");
const todoRoutes = require("./routes/todo.js");
const cors = require("cors")

app.use(cors())
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/todo", todoRoutes);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

// mongoose.connect('mongodb://localhost:27017/TODO');
mongoose.connect("mongodb", { 
    dbName: "TODO", 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
