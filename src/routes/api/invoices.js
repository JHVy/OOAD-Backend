import express from "express";
const router = express.Router();

import Invoice from "../../models/Invoice";

router.get("/:id", ({ params }, res) => {
  Invoice.findById(params.id)
    .then(invoice => {
      res.json(invoice);
    }) //return lại item
    .catch(err => res.json(err)); //Catch lỗi rồi return ra;
});

router.get("/getall/:query", ({ params }, res) => {
  const { query } = params;
  let newQuery = "";
  if (query === "undefined") newQuery = "";
  else newQuery = query;

  Invoice.find()
    .sort({ createAt: -1 }) //desc = -1 acs = 1
    .then(invoice => res.json(invoice)) //return lại item
    .catch(err => res.json(err)); //Catch lỗi rồi return ra;
});

router.put("/:id", ({ body, params }, res) => {
  const { idMember, idUser, totalAmt, createddate, comments, status } = body;

  const newInvoice = {
    idMember,
    idUser,
    totalAmt,
    createddate,
    comments,
    status,
    _id: params.id
  };
  Invoice.findByIdAndUpdate(params.id, newInvoice, { new: true })
    .then(invoice => {
      res.json(invoice);
    }) //return lại item
    .catch(err => res.json(err)); //Catch lỗi rồi return ra;
});

router.get("/:objects/:page/:query", ({ params }, res) => {
  const { objects, page, query } = params;
  let newQuery = "";
  if (query === "undefined") newQuery = "";
  else newQuery = query;

  Invoice.find({ idMember: { $regex: newQuery, $options: "i" } })
    .limit(Number(objects))
    .skip(objects * (page - 1))
    //.sort({ createddate: -1 }) //desc = -1 acs = 1
    .then(invoice => res.json(invoice)) //return lại item
    .catch(err => res.json(err)); //Catch lỗi rồi return ra;
});

router.get("/count/:query", ({ params }, res) => {
  const { query } = params;
  let newQuery = "";
  if (query === "undefined") newQuery = "";
  else newQuery = query;

  Invoice.find({ name: { $regex: newQuery, $options: "i" } })
    .countDocuments()
    .sort({ createddate: -1 }) //desc = -1 acs = 1
    .then(counter => res.json(counter)) //return lại item
    .catch(err => res.json(err)); //Catch lỗi rồi return ra;
});

router.post("/", ({ body }, res) => {
  const {
    _id,
    idMember,
    idUser,
    totalAmt,
    createddate,
    comments,
    status
  } = body;
  const newInvoice = new Invoice({
    _id,
    idMember,
    idUser,
    totalAmt,
    createddate,
    comments,
    status
  });

  newInvoice
    .save()
    .then(invoice => res.json(invoice)) //reutnr lại item đã save đc
    .catch(err => res.json(err)); //Catch lỗi rồi return ra;
});

router.delete("/:id", ({ params }, res) => {
  Invoice.findByIdAndDelete(params.id)
    .then(item => res.json(item)) //Return lại item đã xóa
    .catch(err => res.json(err)); //Catch lỗi rồi return ra
});

export default router;
