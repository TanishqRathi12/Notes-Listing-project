import mongoose from "mongoose";
import bcrypt from "bcrypt";

const AuthSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    dob:{
        type: Date,
        required: true,
    },
    date:{
        type: Date,
        required:true
    }
})

AuthSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      return next();
    }
    try {
      this.password = await bcrypt.hash(this.password, 10);
      next();
    } catch (err) {
      throw err;
    }
  });
  
  AuthSchema.methods.comparePassword = async function (password : string) {
    try {
      return await bcrypt.compare(password, this.password);
    } catch (err) {
      throw err;
    }
  };

const Author = mongoose.model("Auth", AuthSchema);

module.exports = Author;