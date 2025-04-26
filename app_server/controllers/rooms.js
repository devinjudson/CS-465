const fs = require("fs");
const roomData = JSON.parse(fs.readFileSync("./data/rooms.json", "utf-8"));

/* GET rooms page */
const rooms = (req, res) => {
  res.render("rooms", { title: "Travlr Getaways", roomData });
};

module.exports = { rooms };