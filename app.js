const express = require("express");
const BodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(BodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});


app.post("/", function(req, res){

  const firstName = req.body.fname;
  const lastName = req.body.lName;
  const gmail = req.body.gmail;

  const data = {
    members: [
      {
        email_address: gmail,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

const jsondata = JSON.stringify(data);
const url = "https://us14.api.mailchimp.com/3.0/lists/e6596d8725";
const options = {
  method: "POST",
  auth: "maahi:16a3cc1b0069647543b2603c8eca4061-us14"
}

const request = https.request(url, options, function(response){

if(response.statusCode === 200){
  res.sendFile(__dirname + "/success.html");
}else{
  res.sendFile(__dirname + "/failure.html");
}

  response.on("data", function(data){

    console.log(JSON.parse(data));

  });
});
 request.write(jsondata);
  request.end();
});

app.post("/failure", function(req, res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
  console.log("server started at port 3000");
});


//16a3cc1b0069647543b2603c8eca4061-us14

//e6596d8725
