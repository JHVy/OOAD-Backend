import express from "express";
import auth from "../../middleware/auth";
const router = express.Router();

//Member Model
import Member from "../../models/Member";

//search theo query, them duong dan /api/member/search/ trong file server
router.get("/search/:query", ({ params }, res) => {
  const { query } = params;
  let newQuery = "";
  if (query === "undefined") newQuery = "";
  else newQuery = query;

  Member.find({ name: { $regex: newQuery, $options: "i" } })
    .sort({ createAt: -1 }) //desc = -1 acs = 1
    .then(member => res.json(member)) //return lại item
    .catch(err => res.json(err)); //Catch lỗi rồi return ra;
});

router.get("/:id", auth, ({ params }, res) => {
  Member.findById(params.id)
    .then(member => {
      res.json(member);
    }) //return lại item
    .catch(err => res.json(err)); //Catch lỗi rồi return ra;
});

router.get("", auth, (req, res) => {
  Member.find()
    .then(member => {
      res.json(member);
    }) //return lại item
    .catch(err => res.json(err)); //Catch lỗi rồi return ra;
});

router.put("/:id", auth, ({ body, params }, res) => {
  const { name, phone, point } = body;
  const newMember = {
    name,
    phone,
    point,
    _id: params.id
  };
  Member.findByIdAndUpdate(params.id, newMember, { new: true })
    .then(member => {
      res.json(member);
    }) //return lại item
    .catch(err => res.json(err)); //Catch lỗi rồi return ra;
});

router.get("/:objects/:page/:query", auth, ({ params }, res) => {
  const { objects, page, query } = params;
  let newQuery = "";
  if (query === "undefined") newQuery = "";
  else newQuery = query;

  Member.find({ name: { $regex: newQuery, $options: "i" } })
    .limit(Number(objects))
    .skip(objects * (page - 1))
    .sort({ createAt: -1 }) //desc = -1 acs = 1
    .then(member => res.json(member)) //return lại item
    .catch(err => res.json(err)); //Catch lỗi rồi return ra;
});

router.get("/count/:query", ({ params }, res) => {
  const { query } = params;
  let newQuery = "";
  if (query === "undefined") newQuery = "";
  else newQuery = query;

  Member.find({ name: { $regex: newQuery, $options: "i" } })
    .countDocuments()
    .sort({ createAt: -1 }) //desc = -1 acs = 1
    .then(counter => res.json(counter)) //return lại item
    .catch(err => res.json(err)); //Catch lỗi rồi return ra;
});

//@route POST /member   (dùng phương thức POST và route là /member)
//@desc  Create a member  (miểu tả APi làm gì)
//@access Public            (access hiện tại là public vì Trung chưa tạo authentication)
router.post("/", auth, ({ body }, res) => {
  const { _id, name, phone, point } = body;
  const newMember = new Member({
    _id: _id,
    name: name,
    phone: phone,
    point: point
  });

  newMember
    .save()
    .then(member => res.json(member)) //reutnr lại item đã save đc
    .catch(err => res.json(err)); //Catch lỗi rồi return ra;
});

//@route DELETE /member/:id (dùng phương thức POST và route là /member/:id)
//@desc  Delete a member      (miêu tả API làm gì)
//@access Public                (access hiện tại là public vì Trung chưa tạo authentication)
router.delete("/:id", auth, ({ params }, res) => {
  Member.findByIdAndDelete(params.id)
    .then(item => res.json(item)) //Return lại item đã xóa
    .catch(err => res.json(err)); //Catch lỗi rồi return ra
});
export default router;
