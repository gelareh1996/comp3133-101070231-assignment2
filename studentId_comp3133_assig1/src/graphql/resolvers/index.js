const User = require("../../models/User");
const Listing = require("../../models/Listing");
const Booking = require("../../models/Booking");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config/env");
const { isAdmin, isUser } = require("../../middleware/auth");

module.exports = {
  Query: {
    users: async (_, args, context) => {
      const { userLoggedIn } = context;
      const list = await User.find();
      // return isAdmin(userLoggedIn, list);
      return list;
    },
    listings: async (_, args, context) => {
      const { search } = args;
      const { userLoggedIn } = context;
      const list = await Listing.find({
        $or: [
          { listing_title: { $regex: search, $options: "i" } },
          { city: { $regex: search, $options: "i" } },
          { postal_code: { $regex: search, $options: "i" } },
        ],
      });
      return list;
    },
    bookings: async (_, args, context) => {
      const { userLoggedIn } = context;
      const list = await Booking.find({
        username: userLoggedIn.username,
      });
      return isUser(userLoggedIn, list);
    },
  },
  Mutation: {
    login: async (_, args) => {
      const { username, password } = args;
      const user = await User.findOne({ username, password });
      if (user) {
        const payload = {
          id: user.id,
          username: user.username,
          type: user.type,
        };
        return {
          user,
          token: jwt.sign(payload, JWT_SECRET),
        };
      }
      throw new Error("User not found");
    },
    createUser: async (_, args, context) => {
      const { user } = args;
      const create = new User(user);
      return create.save();
    },
    updateUser: async (_, args, context) => {
      const { id, user } = args;
      const update = await User.findByIdAndUpdate(
        id,
        {
          $set: { ...user },
        },
        { new: true }
      );
      return update;
    },
    createListing: async (_, args, context) => {
      const { listing } = args;
      const { userLoggedIn } = context;
      const check = isAdmin(userLoggedIn, true);
      if (check) {
        const create = new Listing(listing);
        return create.save();
      }
      throw new Error("Create listing failed");
    },
    updateListing: async (_, args, context) => {
      const { id, listing } = args;
      const { userLoggedIn } = context;
      const check = isAdmin(userLoggedIn, true);
      if (check) {
        const update = await Listing.findByIdAndUpdate(
          id,
          {
            $set: { ...listing },
          },
          { new: true }
        );
        return update;
      }
      throw new Error("Update listing failed");
    },
    createBooking: async (_, args, context) => {
      const { booking } = args;
      const { userLoggedIn } = context;
      const check = isUser(userLoggedIn, true);
      if (check) {
        const create = new Booking(booking);
        return create.save();
      }
      throw new Error("Create booking failed");
    },
    updateBooking: async (_, args, context) => {
      const { id, booking } = args;
      const { userLoggedIn } = context;
      const check = isUser(userLoggedIn, true);
      if (check) {
        const update = await Booking.findByIdAndUpdate(
          id,
          {
            $set: { ...booking },
          },
          { new: true }
        );
        return update;
      }
      throw new Error("Update booking failed");
    },
  },
};
