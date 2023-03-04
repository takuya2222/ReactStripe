// Access-Control-Allow-Origin: https://react-stripe-rn7c.vercel.app/;   // 特定のサイトを許可する
// Access-Control-Allow-Origin: *;   // 全てのサイトを許可する(危険なのでプロダクトでは基本的には使わない)
// Access-Control-Allow-Headers "X-Requested-With, Origin, X-Csrftoken, Content-Type, Accept";  // この辺は使うフレームワークにより異なるが許可するヘッダーを定義しておく。

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTION"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// sk_test_51MTmXIIZTkvJDKXehkjJqpTBBmkhCGgcriQj8iq4KTuxrsXpbhpVdG8bHV52h9YbZhr1FLzpw2ctErPKmrrZf4PU00Cbsay3kj
const express = require("express");
var cors = require("cors");
// const stripe = require("stripe")();

// const apiKey = process.env.VARIABLE_NAME;
process.env.VARIABLE_NAME;
console.log(process.env.VARIABLE_NAME);

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

// 決済を新しく作る→post
app.post("/", async (req, res) => {
  /*
    req.body.items
    [
        {
            id: 1,
            quantity: 3
        }
    ]
    stripe wants
    [
        {
            price: 1,
            quantity: 3
        }
    ]
    */
  console.log(req.body);
  const items = req.body.items;
  let lineItems = [];
  items.forEach((item) => {
    lineItems.push({
      price: item.id,
      quantity: item.quantity,
    });
  });

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: "https://react-stripe-ltxl.vercel.app/",
    // success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });

  res.send(
    JSON.stringify({
      url: session.url,
    })
  );
});

app.listen(4000, () => console.log("Listening on port 4000!"));
