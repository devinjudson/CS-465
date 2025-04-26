const fs = require("fs");
const mealData = JSON.parse(fs.readFileSync("./data/meals.json", "utf-8"));

/* GET meals page */
const meals = (req, res) => {
  res.render("meals", { title: "Travlr Getaways", mealData });
};

module.exports = { meals };