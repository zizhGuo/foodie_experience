console.log("Enter the js! Hello!");

var express     = require("express");
var app         = express();
var bodyParser  = require("body-parser");
var methodOverride = require("method-override");
var flash       = require("connect-flash");
var mongoose    = require("mongoose");
var passport    = require("passport");
var LocalStrategy = require("passport-local");
var User = require("./models/user");
// var Experience = require("./models/experience");
// var Comment = require("./models/comment");

// setting routes
var experienceRoutes = require("./routes/experiences");
var commentRoutes = require("./routes/comments");
var bookRoutes = require("./routes/book");
var authenticationRoutes = require("./routes/authentication");


// Connect to MongoDB
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false, // Don't build indexes
    poolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
}
mongoose.connect("mongodb://localhost:27017/dbtest", options, function(err, succeeded){
    if (err) {
    console.log("error!");
    }
    else{
    console.log("DB connection succeeded!");
    }
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(flash());


// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "CDC 2020 CYPHER",
    resave: false,
    saveUninitialized: false  
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// test adding new user
var new_user = {
  username: "hmn1990",
  name: "Hermione Granger",
  thumbnail: "https://elenasquareeyes.files.wordpress.com/2014/09/hermione_granger_ootp_promo_f_1.jpg",
  slefintro: "Hello, my name is Hermione. I am a student from Hogwartz!",
  location: "UK",
  language: "English"
}

// User.remove({}, function(err, doc){
//   if(err){
//     console.log(err);
//   }
//   else {
//     console.log("All documents deleted!");
//     console.log(doc);
//     User.create(new_user, function(err, newUserCreated){
//       if(err){
//         console.log(err);
//       }
//       else {
//         console.log("New User Created!");
//         // console.log(newUserCreated);

//       }
//     });
//   }
// });


// read the document
// User.find({username: "hmn1990"}, function(err, res){
//   if(err){
//     console.log(err);
//   }
//   else {
//     console.log("Hermione Found!");
//     console.log(res[0]._id);
//     // console.log(res._id);

//   }
// });

// test create experience with founded user id

// User.find({username: "hmn1990"}, function(err, res){
//     if(err){
//       console.log(err);
//     }
//     else {
//       // console.log(res);
//       res[0].location = "UK";
//       res[0].save(function(err, edited){
//         if (err){
//           console.log(err);
//         }
//         else{
//           console.log(edited);
//         }
//       });
//       // Experience.create()
//     }
// });

// var new_experience = {
//   price: 58,
//   title: "Hogwart's annual Hotpot fest",
//   location: "UK",
//   rating: 4.6,
//   duration: 3,
//   group: 5,
//   description: "Spicy and Yummy hotpot fest brings you to unique Traditional Chengdu hotpot dish!",

// }
  

app.use("/", authenticationRoutes);
app.use("/experiences", experienceRoutes);
app.use("/experiences/:id/comments", commentRoutes);
app.use("/experiences/:id/book", bookRoutes);



// app.get("/", function(req, res){
//     // res.send("Hi there, welcome to HOME RESTAURANTS!");
//     console.log("lalalalalalal");
//     res.render("home");
//     // res.send("lalalalalallalala");
// });




app.listen(3000, function(){
    console.log("Home Restaurants Server has Started!");
});
