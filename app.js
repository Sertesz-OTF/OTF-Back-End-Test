const express  = require('express');
const app = express();
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))

//set view engine
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended:false}));
app.use(express.json())

app.use('/', require('./router'));

app.listen(8080, () =>{
    console.log('Server running http://localhost:8080');
});