const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");

const app = express();

//Bodyparese Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

//Connect to Mongo
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => console.log("Mongo DB Connected"))
  .catch(err => console.log(err));

app.use("/api/category", require("./routes/api/categories"));
app.use("/api/user", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/authentication"));
app.use("/api/role", require("./routes/api/roles"));
app.use("/api/member", require("./routes/api/members"));
app.use("/api/product", require("./routes/api/products"));
app.use("/api/invoice", require("./routes/api/invoices"));
app.use("/api/payslip", require("./routes/api/payslips"));
app.use("/api/material", require("./routes/api/materials"));
app.use("/api/storagereport", require("./routes/api/storagereports"));
app.use("/api/invoicedet", require("./routes/api/invoicedets"));
app.use("/api/supplier", require("./routes/api/suppliers"));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
