const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const app = express();

app.use(require("cors")());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/el-admin", {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: true
});

const basicschema = new mongoose.Schema({
  title: {
    type: String
  },
  content: {
    type: String
  }
});


const usershcma = new mongoose.Schema({
  username: {
    type: String
  },
  password: {
    type: String,
    set(val) {
      return bcrypt.hashSync(val, 5)
    }
  }
})

const Post = mongoose.model("Post", basicschema);


const User = mongoose.model("User", usershcma);



//文章列表操作
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


//用户信息
app.get("/api/user", async (req, res) => {
  res.send(await User.find())
})


app.put('/api/user', async (req, res) => {
  const user = await User.findOne({
    username: req.body.username
  });
  let password = req.body.password;
  let newpassword = req.body.newpassword;
  const isuser = bcrypt.compareSync(password, user.password)
  if (!isuser) {
    res.send('原密码不正确');
    return
  } else {
    user.password = bcrypt.hashSync(newpassword, 5)
    await user.save();
    res.send('ok')
  }

})

app.post("/api/register", async (req, res) => {
  const data = await User.create(req.body);
  res.send(data)
});


app.post("/api/login", async (req, res) => {
  const item = await User.findOne({
    username: req.body.username
  });
  if (!item) {
    res.status(422).send({
      errmsg: `${req.body.username}用户不存在`
    })
    return;
  }

  const ispassVaild = bcrypt.compareSync(
    req.body.password,
    item.password
  );
  if (!ispassVaild) {
    res.status(422).send({
      errmsg: '密码不匹配'
    })
    return;
  }
  res.send({
    msg: 'ok'
  })
})


app.listen("3000", () => {
  console.log("listening");
});