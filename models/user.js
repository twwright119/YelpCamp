const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const pastportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});
UserSchema.plugin(pastportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
