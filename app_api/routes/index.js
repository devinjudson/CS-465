require("dotenv").config();
const router = require("express").Router();
const { expressjwt: jwt } = require("express-jwt");

const auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: "payload",
  algorithms: ["HS256"],
});

// Import controllers
const {
  getTrips,
  getTripByCode,
  addTrip,
  updateTrip,
} = require("../controllers/trips");
const { login, register } = require("../controllers/authentication");

// Define route for our trips endpoint
router.route("/trips").get(getTrips).post(auth, addTrip);

// GET Method routes getTripByCode
router.route("/trips/:tripCode").get(getTripByCode).put(auth, updateTrip);

// Login route
router.route("/login").post(login);

// Register route
router.route("/register").post(register);

module.exports = router;