const { Schema, model } = require("mongoose");

const showSchema = new Schema({
    venue: {
        type: String,
        required: "You need to specify a venue",
        trim: true,
      },
      address: {
        type: String,
        required: "You need to give the venues address",
        trim: true,
      },
    date: {
    type: String,
    required: "You need to specify a date",
    trim: true,
  },
  start: {
    type: String,
    required: "You need to specify a start time",
    trim: true,
  },
  notes: {
    type: String,
    required: true,
    trim: true,
  },
  attending: {
    type: Number,
  },
  band: [
    {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
  ],
});

const Show = model("show", showSchema);

module.exports = Show;
