const { AuthenticationError } = require("apollo-server-express");
const { User, Show } = require("../models");
const { signToken } = require("../utils/auth");
const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { _id }) => {
      return User.findOne({ _id });
    },
    allshows: async () => {
      return Show.find();
    },
    shows: async (parent, { band }, context, info) => {
      const params = band ? { band } : {};
      return await Show.find({band})
  
    },
    show: async (parent, { _id }) => {
      return Show.findOne({ _id: _id });
    },
  },

  Mutation: {
    addUser: async (parent, { name, email, password, image, genre, about }) => {
      const user = await User.create({ name, email, password, image, genre, about });
      const token = signToken(user);
      return { token, user };
    },
    editUser: async (parent, { id, email, image, genre, about }) => {
      const update = {email, image, genre, about}
      const user = await User.findByIdAndUpdate(id, update, { new: true })
      console.log(id)
      return user
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
      { band, venue, address, date, start, notes },
      context
    ) => {
      if (context.user) {
        const show = await Show.create({
          band,
          venue,
          address,
          date,
          start,
          notes,
        });

        return show;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    removeShow: async (parent, { showId }, context) => {
      if (context.user) {
        const show = await Show.findOneAndDelete({
          _id: showId,
        });
        return show;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};
module.exports = resolvers;
