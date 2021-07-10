const express = require("express");
const env = require("dotenv");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');


const path = require('path');
// env --->
env.config();

//router
const authRoutes = require('./routes/user/auth');
const farmerAuthRoutes = require('./routes/farmer/auth');
const adminRoutes = require('./routes/admin/auth')
const productRoutes = require('./routes/product')
const subscriptionRoutes = require('./routes/subscription');
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

app.use(cors());
app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin","*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  res.header('Access-Control-Allow-Methods','GET,PUT,PATCH,POST,DELETE,OPTIONS');
  next();

});

//middlewares to handle request bodies
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.use('/api' , authRoutes);
app.use('/api' , adminRoutes);
app.use('/api' , farmerAuthRoutes);
app.use('/api', productRoutes);
app.use('/api' , subscriptionRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log("server is running ", process.env.PORT || 3000);
});
