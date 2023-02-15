// sk_test_51MTmXIIZTkvJDKXehkjJqpTBBmkhCGgcriQj8iq4KTuxrsXpbhpVdG8bHV52h9YbZhr1FLzpw2ctErPKmrrZf4PU00Cbsay3kj
// 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
const express = require("express");
var cors = require("cors");
const stripe = require("stripe")(
  "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"
);

const apiKey = process.env.API_KEY;

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.post("/checkout", async (req, res) => {
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
    success_url: "https://react-stripe-ltxl.vercel.app",
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
