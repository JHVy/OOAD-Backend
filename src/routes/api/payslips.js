import express from "express";
const router = express.Router();

import PaySlip from "../../models/PaySlip";

router.get("/:id", ({ params }, res) => {
  PaySlip.findById(params.id)
    .then(payslip => {
      res.json(payslip);
    })
    .catch(err => res.json(err));
});

router.get("", (req, res) => {
  PaySlip.find()
    .then(payslip => {
      res.json(payslip);
    })
    .catch(err => res.json(err));
});

router.put("/:id", ({ body, params }, res) => {
  const { idMember, idSupplier, createddate, totalAmt } = body;
  const newPaySlip = {
    idMember,
    idSupplier,
    createddate,
    totalAmt,
    _id: params._id
  };
  PaySlip.findByIdAndUpdate(params._id, newPaySlip, { new: true })
    .then(payslip => {
      res.json(payslip);
    })
    .catch(err => res.json(err));
});

router.get("/:objects/:page/:query", ({ params }, res) => {
  const { objects, page, query } = params;
  let newQuery = "";
  if (query === "undefined") newQuery = "";
  else newQuery = query;

  PaySlip.find({ idMember: { $regex: newQuery, $options: "i" } })
    .limit(Number(objects))
    .skip(objects * (page - 1))
    .sort({ createddate: -1 })
    .then(payslip => res.json(payslip))
    .catch(err => res.json(err));
});

router.get("/count/:query", ({ params }, res) => {
  const { query } = params;
  let newQuery = "";
  if (query === "undefined") newQuery = "";
  else newQuery = query;

  PaySlip.find({ idMember: { $regex: newQuery, $options: "i" } })
    .countDocuments()
    .sort({ createddate: -1 })
    .then(counter => res.json(counter))
    .catch(err => res.json(err));
});

router.post("/", ({ body }, res) => {
  const { _id, idMember, idSupplier, createddate, totalAmt } = body;
  const newPaySlip = new PaySlip({
    _id,
    idMember,
    idSupplier,
    createddate,
    totalAmt
  });

  newPaySlip
    .save()
    .then(payslip => res.json(payslip))
    .catch(err => res.json(err));
});

router.delete("/:id", ({ params }, res) => {
  PaySlip.findByIdAndDelete(params.id)
    .then(payslip => res.json(payslip))
    .catch(err => res.json(err));
});

export default router;
