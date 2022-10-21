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
    match: [/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/],
  },
  start: {
    type: String,
    required: "You need to specify a start time",
    trim: true,
    match: [/((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))/]
  },
  notes: {
    type: String,
    required: true,
    trim: true,
  },
  attending: {
    type: String,
  },
  band: {
   type: String,
   trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 7889238
  }
});


const Show = model("show", showSchema);

module.exports = Show;
