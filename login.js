const express=require("express");
const app=express();
const bodyparser=require("body-parser");
const https=require("https");
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("Public"));

app.get("/",function(request,response){
    response.sendFile(__dirname + "/index2.html");
    
});
app.post("/",function(request,response){
    const firstname=request.body.fname;
    const lastname=request.body.lname;
    const emailid=request.body.email;
    console.log(firstname,lastname,emailid);

    const data={
        members:[ 
            {
        email_address:emailid,
        status:"subscribed",
        merge_fields:{
            FNAME:firstname,
            LNAME:lastname
        }

        }

        ]
    };

    const jsonData=JSON.stringify(data);

    const url="https://us18.api.mailchimp.com/3.0/lists/01fc3e6798";

    const options={
        method:"POST",
        auth:"yadhuveer:0121a1c37dd4bb5cd91596b03f5770bf-us18"
    }
      const req= https.request(url,options,function(response){
      response.on("data",function(data){
          console.log(JSON.parse(data));
      })
    
    })
    req.write(jsonData);
    req.end()

})

app.listen(process.env.PORT || 3000);
//6f6b415b218cc300ff1ed8235b02f6b2-us14

//8fe224bf4e.
//0121a1c37dd4bb5cd91596b03f5770bf-us18