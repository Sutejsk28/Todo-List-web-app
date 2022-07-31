const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

let items = [];
let workList = [];

app.get("/", function(req,res){

  let today = new Date();

  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  let day = today.toLocaleDateString("en-US", options);

  res.render("list", {listTitle: day, items: items});
});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work Lists", items: workList});
})

app.post("/", function(req,res){

  let Item = req.body.newItem;

  if(req.body.button === "Work"){
    workList.push(Item);
    res.redirect("/work");
  }else{
    items.push(Item);
    res.redirect("/");
  }

});

app.get("/about", function(req,res){
  res.render("about", {About: "about me: "});
});

app.set('view engine', 'ejs');


app.listen(3000, function(){
  console.log("the server is up and running on port 3000");
})
