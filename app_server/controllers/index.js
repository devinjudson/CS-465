const fs = require("fs");
const blogs = JSON.parse(fs.readFileSync("./data/blog.json", "utf-8"));

/* GET Homepage */
const index = (req, res) => {
  res.render("index", { title: "Travlr Getaways" }, blogs);
};

module.exports = { index };