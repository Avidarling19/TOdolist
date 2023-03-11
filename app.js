
const express = require("express");
const bodyParser =require("body-parser");

const app= express();
const date=require(__dirname+"/date.js");
var items = ["Buy Food","Cook Food","Eat Food"];
var workitems =[];
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.get("/", function(req,res)
{
 const day =date.getDate();

   res.render("list", {listtitle: day ,newListItems :items});
});

app.post("/", function(req,res)
{  console.log(req.body);
  const item = req.body.newItem;

  if(req.body.list === "Work list"){
    workitems.push(item);
    res.redirect ("/work");
  }else{
    items.push(item);
    res.redirect ("/");
  }
});

app.get("/work", function(req,res)
{
  res.render("list",{listtitle:"Work list",newListItems:workitems});
});

app.post("/work",function(req ,res)
{
  console.log(req.body);
  let item =req.body.newItem;
  workitems.push(item);
  res.redirect("/work");

});
 
app.get("/about",function(req,res)
{
  res.render("about");
});


app.listen(3000, function()
{
    console.log("Server is running on port 3000");
}) ;