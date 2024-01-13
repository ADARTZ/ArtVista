const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Products = require("./Products");
const Users = require("./Users");
const Orders = require("./Orders");

const stripe = require("stripe")(
  "sk_test_51NonINSIPD0Gl3eopFP0dwyPZ3rDOOkUj7XHbuO9fEUdTw6Onaa3Q5euMxT3SxqSISCNKErjBsfzNrURHWj9PJHe00UUr3Msuc"
  // process.env.KEY
);

const app = express();
// const port = process.env.PORT || 8000;
const port = process.env.PORT || 8000;
// const port = 3001;


// Middlewares
app.use(express.json());
app.use(cors());

// connection url

const connection_url = "mongodb+srv://adarshbyadav243:project123@cluster0.fiovxzr.mongodb.net/project"
// process.env.DATABASE;
// mongoose.set("strictQuery", false);

mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// API

app.get("/", (req, res) => res.status(200).send("Home Page"));

// add product

app.post("/products/add", (req, res) => {
  const productDetail = req.body;

  console.log("Product Detail >>>>",
    productDetail);
  Products.create(productDetail)
  .then((data)=>{
    res.status(201).send(data);
  })
  .catch((err)=>{
    res.status(500).send(err.message);
  })
  // Products.create(productDetail, (err, data) => {
  //   if (err) {
  //     res.status(500).send(err.message);
  //     console.log(err);
  //   } else {
  //     res.status(201).send(data);
  //   }
  // });
});

app.get("/products/get", async (req, res) => {
  console.log("1")
  try {
    const products = await Products.find({});
    res.json(products);
    console.log(products);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching products.");
  }
});

// app.get("/products/get", (req, res) => {
//   console.log("2")
//   const xyz =Products.find({ isFeature: true });
//   res.json(xyz)
//   console.log(xyz)
//   // Products.find()
//   // .then((result)=>{
//   //   console.log(data);
//   //   res.status(200).send(data);
//   // })

//   // .catch((err)=>{
//   //   res.status(500).send(err);
//   // })
//   // Products.find((err, data) => {
//   //   if (err) {
//   //     res.status(500).send(err);
//   //   } else {
//   //     res.status(200).send(data);
//   //   }
//   // });
// });

app.get("/product-view/get/:id", async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    res.send(product);
  } catch (err) {
    res.status(404).send(err.message);
  }
});



// API for SIGNUP

app.post("/auth/signup", async (req, res) => {
  const { email, password, fullName } = req.body;

  const encrypt_password = await bcrypt.hash(password, 10);

  const userDetail = {
    email: email,
    password: encrypt_password,
    fullName: fullName,
  };

  const user_exist = await Users.findOne({ email: email });

  if (user_exist) {
    res.send({ message: "The Email is already in use !" });
  } else {
  

  Users.create(userDetail)
  .then((result)=>{
    res.send({ message: "User Created Succesfully" })
  })
  .catch((err)=>{
    res.status(500).send({ message: err.message })
  })

    // Users.create(userDetail, (err, result) => {
    //   if (err) {
    //     res.status(500).send({ message: err.message });
    //   } else {
    //     res.send({ message: "User Created Succesfully" });
    //   }
    // });
  }
});


app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const userDetail = await Users.findOne({ email: email });

  if (userDetail) {
    if (await bcrypt.compare(password, userDetail.password)) {
      res.send(userDetail);
    } else {
      res.send({ error: "invaild Password" });
    }
  } else {
    res.send({ error: "user does not exist" });
  }
});


app.get("/buy-now", (req, res) => {
  if (loggedIn) {
    res.redirect("/address");
  } else {
    res.redirect("/login");
  }
});
// API for PAYMENT

app.post("/payment/create", async (req, res) => {
  const total = req.body.amount;
  console.log("Payment Request recieved for this rupees", total);

  const payment = await stripe.paymentIntents.create({
    amount: total * 100,
    currency: "inr",
  });

  res.status(201).send({
    clientSecret: payment.client_secret,
  });
});

// API TO add ORDER DETAILS

app.post("/orders/add", (req, res) => {
  const products = req.body.basket;
  const price = req.body.price;
  const email = req.body.email;
  const address = req.body.address;

  const orderDetail = {
    products: products,
    price: price,
    address: address,
    email: email,
  };
Orders.create(orderDetail)
.then((result)=>{
  console.log("order added to database >> ", result);
})
.catch((err)=>{
  console.log(err);
})

  // Orders.create(orderDetail, (err, result) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log("order added to database >> ", result);
  //   }
  // });
});

app.post("/orders/get", (req, res) => {
  const email = req.body.email;
  Orders.find({})
  .then((result)=>{
    const userOrders = result.filter((order) => order.email === email);
  res.send(userOrders);
  })
  .catch((err)=>{
    console.log(err);
  })
  // Orders.find((err, result) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     const userOrders = result.filter((order) => order.email === email);
  //     res.send(userOrders);
  //   }
  // });
});

app.listen(port, () => console.log("listening on the port", port));
