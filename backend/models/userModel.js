const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      //   required: true,
    },
    email: {
      type: String,
      //   required: true,
      unique: true,
    },
    password: {
      type: String,
      //   required: true,
    },
    isAdmin: {
      type: Boolean,
      //   required: true,
      default: false,
    },
    pic: {
      type: String,
      //   required: true,
      default:
        "https://www.youtube.com/redirect?event=video_description&redir_token=QUFFLUhqazJONGlOSWdFQk1CbC1Ea1kwdm9QM2lwanNkZ3xBQ3Jtc0tuTzF0SXo4Zzl2SW85ZktJYjhhWWlQZDdhSWFCZmNTbUFmQnpQUHZRTlF0U09YQ0tDV3NvRTZtSzdsSVktd2lKeUJvUDJ5UVU0NGcxNDIzTFRTX3pLcUZDbnZYRHNPSDl6YV9wc1hQbUU5THdsNmNGRQ&q=https%3A%2F%2Ficon-library.com%2Fimages%2Fanonymous-avatar-icon%2Fanonymous-avatar-icon-25.jpg&v=iw5RSIflYGU",
    },
  },
  {
    timestamps: true,
  }
);

// userSchema.pre("save", async function (next) {
//   // if (this.isModified("password")) {
//   //   next();
//   // }

//   const salt = await bcrypt.genSalt(10);
//   this.password = bcrypt.hash(this.password, salt);
// });

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
