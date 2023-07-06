//jshint esversion: 6

const express = require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){
    const firstName=req.body.fName;
    const lastName=req.body.lName;
    const email=req.body.email;
    
    const data ={
        members:[
            {
                email_address:email,
                status:"subscribed",
                mergefields:{
                    FNAME:firstName,
                    LNAME:lastName,
                }
            }
        ]
    };

    const jsonData=JSON.stringify(data); 

    const url="https://us5.api.mailchimp.com/3.0/lists/cc830c550d";

    const options ={
        method:"POST",
        auth:"mohammed1:312b1d4eb989e1cb2e049f043a221c93-us5"
    }

    const request = https.request(url,options,function(response){
        
        if (response.statusCode===200){
           
            res.sendFile(__dirname+"/success.html");
            
        }
        else{
            
            res.sendFile(__dirname+"/failure.html");
            
        }

        response.on("data",function(data){
            console.log(JSON.parse(data));
        })

    })
    request.write(jsonData);
    request.end();

})

app.post("/failure",function(req,res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000,function(){
    console.log("Server is running on port 3000");
})

//API Key
//312b1d4eb989e1cb2e049f043a221c93-us5

//list id
//cc830c550d