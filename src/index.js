const express = require("express");
const env = require("dotenv");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const path = require('path');
// env --->
env.config();

//router
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth')
const productRoutes = require('./routes/product')
//static files
app.use('/uploads' , express.static(path.join(__dirname, 'uploads')));

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
app.use('/api', productRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log("server is running ", process.env.PORT || 3000);
});
