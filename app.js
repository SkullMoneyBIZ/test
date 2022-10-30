const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const path = require("path");
var stripe = require('stripe')('sk_test_51LxvbqSB0I4sgpWfxgwEHbJilDSrKNDZtmE5fKbXfQ95I7kw2ich7KL2MmPncAVDxd1oz6VQML0JoEcmqR3F3pgq00SwTkxKIb');

const PUBLISHABLE_KEY = "pk_test_51LxvbqSB0I4sgpWfrrzGrK7ikqyG43HBRWrMfQUBD0q3h6CxR4kO8ZqZI052pF5dNKxx5cVDsRcGOvPiKIG1ucMu002USdEeoB"
const SECRET_KEY = "sk_test_51LxvbqSB0I4sgpWfxgwEHbJilDSrKNDZtmE5fKbXfQ95I7kw2ich7KL2MmPncAVDxd1oz6VQML0JoEcmqR3F3pgq00SwTkxKIb"

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

let userDetails = [];
let productDetails = [
  {
    pImage : 'element1.png',
    pTitle: 'Neon Menu Bar',
    pDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ',
    pPrice:'150',
    pLink: 'https://codepen.io/skrullcandy/pen/rNKOLbL'
  },
  {
    pImage : 'element2.png',
    pTitle: 'Radial Menu',
    pDescription: 'ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    pPrice:'120'
  },
  {
    pImage : 'element3.png',
    pTitle: 'Neon Loading Screen',
    pDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ',
    pPrice:'80'
  },
  {
    pImage : 'element4.png',
    pTitle: 'Hover Cards',
    pDescription: 'ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    pPrice:'170'
  },
  {
    pImage : 'element5.png',
    pTitle: 'Loading Screen',
    pDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ',
    pPrice:'50'
  },
  {
    pImage : 'element6.png',
    pTitle: 'Neon Buttons',
    pDescription: 'ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    pPrice:'20'
  }
];

app.get("/", function(req, res){
  res.render("index");
});

app.get("/login", function(req, res){
  res.render("login");
});

app.get("/signup", function(req, res){
  res.render("signup");
});

app.get("/service", function(req, res){
  res.render("service");
});

app.get("/contact", function(req, res){
  res.render("contact");
});

app.get("/products", function(req, res){
  res.render("products", {productDetails: productDetails});
});

app.get("/products/:productId", function(req, res){
  const requestedTitle = _.lowerCase(req.params.productId);

 productDetails.forEach(function(product){
   const storedTitle = _.lowerCase(product.pTitle);

   if(storedTitle === requestedTitle){
     res.render("description",{
       pImage: product.pImage,
       pTitle: product.pTitle,
       pDescription: product.pDescription,
       pPrice: product.pPrice,
       key: PUBLISHABLE_KEY
     });
   }
 })

})





app.post('/products/payment', function(req, res){

    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken,

    })
    .then((customer) => {

        return stripe.charges.create({
            amount: 2500,
            description: 'Web Development Product',
            currency: 'INR',
            customer: customer.id
        });
    })
    .then((charge) => {
        res.send("PAYMENT SUCCESSFUL")
    })
    .catch((err) => {
        res.render("success")
    });

})










app.post("/signup",function(req, res){
  const userDetail = {
    name : req.body.userName,
    email : req.body.userEmail,
    password : req.body.userPass,
    confirmPass : req.body.confirmPass,
  }
  if (userDetail.password == userDetail.confirmPass) {
    userDetails.push(userDetail);
    res.redirect("/");
  }

});






















app.listen(3000, function(){
  console.log("Server Started");
})
