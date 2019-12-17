import express from "express";
const router = express.Router();

//Material Model
import Material from "../../models/Material";

//Get Material by ID
router.get("/:id", ({ params }, res) => {
  Material.findById(params.id)
    .then(material => {
      res.json(material);
    })
    .catch(err => res.json(err));
});

router.get("/getall/:query", ({ params }, res) => {
  const { query } = params;
  let newQuery = "";
  if (query === "undefined") newQuery = "";
  else newQuery = query;

  //Material.find({ name: { $regex: newQuery, $options: "i" } })
  Material.find()
    .sort({ createAt: -1 }) //desc = -1 acs = 1
    .then(material => res.json(material)) //return lại item
    .catch(err => res.json(err)); //Catch lỗi rồi return ra;
});

//Update Material
router.put("/:id", ({ body, params }, res) => {
  const newMaterial = {
    name: body.name,
    quantity: body.quantity,
    _id: params._id
  };
  Material.findByIdAndUpdate(params._id, newMaterial, { new: true })
    .then(material => {
      res.json(material);
    })
    .catch(err => res.json(err));
});

router.put("/quantity/:id", ({ doby }, res) => {
  // const newMaterial = {
  //     name: req.body.name,
  //     quantity: req.body.quantity,
  //     _id: req.body._id
  // };
  Material.findByIdAndUpdate(
    body._id,
    { quantity: body.quantity },
    { new: true }
  )
    .then(material => {
      res.json(material);
    })
    .catch(err => res.json(err));
});

//Get all Material
router.get("/:objects/:page/:query", ({ params }, res) => {
  const { objects, page, query } = params;
  let newQuery = "";
  if (query === "undefined") newQuery = "";
  else newQuery = query;

  Material.find({ name: { $regex: newQuery, $options: "i" } })
    .limit(Number(objects))
    .skip(objects * (page - 1))
    .sort({ createAt: -1 }) //desc = -1 acs = 1
    .then(material => res.json(material)) //return lại item
    .catch(err => res.json(err)); //Catch lỗi rồi return ra;
});

//Get all Material
router.get("/count/:query", ({ params }, res) => {
  const { query } = params;
  let newQuery = "";
  if (query === "undefined") newQuery = "";
  else newQuery = query;

  Material.find({ name: { $regex: newQuery, $options: "i" } })
    .countDocuments()
    .sort({ createAt: -1 }) //desc = -1 acs = 1
    .then(counter => res.json(counter)) //return lại item
    .catch(err => res.json(err)); //Catch lỗi rồi return ra;
});

//Create a new Material
router.post("/", ({ body }, res) => {
  const newMaterial = new Material({
    name: body.name,
    quantity: body.quantity
  });

  newMaterial
    .save()
    .then(material => res.json(material)) //reutnr lại item đã save đc
    .catch(err => res.json(err)); //Catch lỗi rồi return ra;
});

//Delete a Material
router.delete("/:id", ({ params }, res) => {
  Material.findByIdAndDelete(params.id)
    .then(item => res.json(item)) //Return lại item đã xóa
    .catch(err => res.json(err)); //Catch lỗi rồi return ra
});

export default router;
