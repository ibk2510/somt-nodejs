const express = require("express");
const env = require("dotenv");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// env --->
env.config();

//router
const authRoutes = require('./src/routes/auth');
const adminRoutes = require('./src/routes/admin/auth')

//mongodb connect
mongoose.connect(
  ` mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASS}@cluster0.u4lph.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex : true }
)
.then(
    ()=>{
        console.log("db connected");
    }
);

//middlewares to handle request bodies
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.use('/api' , authRoutes);
app.use('/api' , adminRoutes);

app.listen(process.env.PORT, () => {
  console.log("server is running ", process.env.PORT);
});
