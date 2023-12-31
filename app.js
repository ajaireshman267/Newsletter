const express = require("express");
const bodyParser = require("body-parser");
const request=require("request");
const https=require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req, res){
    res.sendFile(__dirname+"/signup.html")
});

app.post("/",function(req, res){
    const firname=req.body.Fname;
    const secname=req.body.Sname;
    const emailid=req.body.Email;
    const data = {
        members:[
            {
                email_address:emailid,
                status: "subscribed",
                merge_fields    :{
                    FNAME:firname,
                    LNAME:secname
                }
            }
        ]
    };
    const jsonData=JSON.stringify(data);
    const url="https://us21.api.mailchimp.com/3.0/lists/98339b2293";
    const options={
        method:"POST",
        auth:"ajai:ed06c4c2447a003477261ba3805b3e4e-us21"
    }
    const request= https.request(url,options,function(response){
        if(response .statusCode===200){
            res.sendFile(__dirname+ "/success.html");
        }
        else{
            res.sendFile(__dirname+ "/Failure.html");
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })

request.write(jsonData);
request.end();
});
app.post("/failure",function(req,res){
    res.redirect("/");
})


app.listen(process.env.PORT,()=>{
    console.log("listening to port 3000");
});
//ed06c4c2447a003477261ba3805b3e4e-us21
//98339b2293