const { AuthenticationError } = require("apollo-server-express");
const { User, Show } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { name }) => {
      return User.findOne({ name });
    },
    allshows: async () => {
      return Show.find();
    },
    shows: async (parent, { name }) => {
      const params = name ? { name } : {};
      return Show.find(params).sort({ date: -1 });
    },
    show: async (parent, { showId }) => {
      return Show.findOne({ _id: showId });
    },
  },

  Mutation: {
    addUser: async (parent, { name, email, password }) => {
      const user = await User.create({ name, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    addShow: async (
      parent,
      { venue, address, date, start, notes, attending },
      context
    ) => {
      if (context.user) {
        const show = await Show.create({
          venue,
          address,
          date,
          start,
          notes,
          attending,
          band: context.user._id,
        });

        return show;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    removeShow: async (parent, { showId }, context) => {
      if (context.user) {
        const show = await Show.findOneAndDelete({
          _id: showId,
          band: context.user_id,
        });

        return show;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};
module.exports = resolvers;
