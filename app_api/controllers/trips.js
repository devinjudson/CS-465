const mongoose = require("mongoose");
const Trip = require("../models/travlr");
const Model = mongoose.model("trips");
const User = mongoose.model("users");

// GET trips
const getTrips = async (req, res) => {
  try {
    const q = await Model.find({}).exec();
    if (!q) {
      return res.status(404).json({ error: "Error getting trips" });
    }
    return res.status(200).json(q);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

const getTripByCode = async (req, res) => {
  try {
    const q = await Model.find({ code: req.params.tripCode }).exec();
    if (!q) {
      return res.status(404).json(err);
    }
    return res.status(200).json(q);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

const addTrip = async (req, res) => {
  const { code, name, length, start, resort, perPerson, image, description } =
    req.body;
  try {
    const user = await getUser(req, res);
    if (!user) {
      return;
    }

    const newTrip = await Trip.create({
      code,
      name,
      length,
      start,
      resort,
      perPerson,
      image,
      description,
    });

    return res.status(201).json(newTrip);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: "Error adding trip" });
  }
};

const updateTrip = async (req, res) => {
  const { code, name, length, start, resort, perPerson, image, description } =
    req.body;

  try {
    const user = await getUser(req, res);
    if (!user) {
      return;
    }

    const updatedTrip = await Trip.findOneAndUpdate(
      { code: req.params.tripCode },
      { code, name, length, start, resort, perPerson, image, description },
      { new: true }
    ).exec();

    if (!updatedTrip) {
      return res
        .status(404)
        .json({ error: `Trip not found with code ${req.params.tripCode}` });
    }

    return res.status(200).json(updatedTrip);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

const getUser = async (req, res) => {
  if (!req.auth || !req.auth.email) {
    console.log(req.auth);
    res.status(404).json({ message: "User not found" });
    return null;
  }

  try {
    const user = await User.findOne({ email: req.auth.email }).exec();
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return null;
    }
    return user;
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
    return null;
  }
};

module.exports = { getTrips, getTripByCode, addTrip, updateTrip };
