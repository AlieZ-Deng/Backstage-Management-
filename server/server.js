const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(require("cors")());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/el-admin", {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: true
});

const schema = new mongoose.Schema({
  title: { type: String },
  content: { type: String }
});

const Post = mongoose.model("Post", schema);

app.get("/api/posts", async (req, res) => {
  const data = await Post.find();
  res.send(data);
});

app.post("/api/newpost", async (req, res) => {
  const data = await Post.create(req.body);
  res.send(data);
});

app.put("/api/posts/:id", async (req, res) => {
  const item = await Post.findByIdAndUpdate(req.params.id, req.body);
  res.send("ok");
});

app.delete("/api/posts/:id", async (req, res) => {
  const item = await Post.findById(req.params.id);
  await Post.remove(item);
});

app.listen("3000", () => {
  console.log("listening");
});
