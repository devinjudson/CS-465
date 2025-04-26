const router = require("express").Router();
const controller = require("../controllers/rooms");

/* GET rooms page */
router.get("/", controller.rooms);

module.exports = router;