const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const User = mongoose.model("users");

passport.use(
  new LocalStrategy(
    { usernameField: "email" }, // Specify that the "email" field is used as the username
    async (username, password, done) => {
      try {
        // Use async/await to query the database
        const user = await User.findOne({ email: username });

        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }

        // Use the `validPassword` method to verify the password
        if (!user.validPassword(password)) {
          return done(null, false, { message: "Incorrect password." });
        }

        // If the user is found and the password is correct, return the user
        return done(null, user);
      } catch (err) {
        // Handle any errors during the query
        return done(err);
      }
    }
  )
);