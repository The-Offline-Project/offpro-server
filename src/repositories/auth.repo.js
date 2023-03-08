const CryptoHelper = require("../config/crypto-helper");
const TokenHelper = require("../config/token-helper");
const TwilioHelper = require("../config/twilio-helper");
const User = require("../models/user.model");
const UserRepo = require("./user.repo");

class AuthRepo {
  static async signupUser({ email,  password, phone }) {
    try {
      let response = { msg: "", status: null, data: null };

      //   encrypt password
      const hashedPassword = await CryptoHelper.encryptPassword(password);

      const user = await User.create({ email, password: hashedPassword ,phone});

      if (user ) {
        return { ...response, msg: "User created successfully", status: 201, data: user };
      }

      return { ...response, msg: "Could not signup user", status: 400 };
    } catch (error) {
      console.log("🚀 ~ error", error);
    }
  }

  static async login({ email, password }) {
    try {
      let response = { msg: "", status: null, data: null };

      const userExists = await User.findOne({ email });

      if (!userExists) {
        return { ...response, msg: "User does not exist", status: 404 };
      }

      const validPassword = await CryptoHelper.comparePassword(password, userExists.password);
      if (!validPassword) {
        return { ...response, msg: "Invalid password", status: 400 };
      }

      const otp = await CryptoHelper.generateOtp();
      // get user info and send otp to user phone
      if (otp) {
        await User.findOneAndUpdate({ email }, { otp });

        return { ...response, msg: "OTP generated", status: 200, data: otp };
      }
      return { ...response, msg: "Could not geneate OTP", status: 400 };

      // const verificationSent = await TwilioHelper.sendVerificationSms(userExists.phone);

      // if (verificationSent?.status === "pending" || verificationSent?.status === "approved") {
      //   return { ...response, msg: "OTP sent to your phone", status: 200 };
      // }

      // return { ...response, msg: "Could not send OTP", status: 400 };
    } catch (error) {
      console.log("🚀 ~ error", error);
    }
  }

  static async adminLogin({ email, password }) {
    try {
      let response = { msg: "", status: null, data: null };

      const existingAdmin = await User.findOne({ email });
      if (!existingAdmin) {
        return { ...response, msg: "Admin does not exist", status: 404 };
      }

      const validPassword = await CryptoHelper.comparePassword(password, existingAdmin.password);

      if (!validPassword) {
        return { ...response, msg: "Password incorrect", status: 400 };
      }

      // create token for admin
      const payload = {
        id: existingAdmin._id,
        firstname: existingAdmin.firstname,
        lastname: existingAdmin.lastname,
        email: existingAdmin.email,
        role: existingAdmin.role,
        phone: existingAdmin.phone,
        location: existingAdmin.location,
      };
      const token = await TokenHelper.createToken(payload);

      if (!token) {
        return { ...response, msg: "Could not create token", status: 400 };
      }

      return { ...response, msg: "Login successful", status: 200, data: token };
    } catch (error) {
      console.log("🚀 ~ error", error);
    }
  }

  static async verifyOtp({ email, otp }) {
    try {
      let response = { msg: "", status: null, data: null };

      const userWithOtp = await User.findOne({ otp, email }).select("-password");

      if (!userWithOtp) {
        return { ...response, msg: "Otp incorrect", status: 400 };
      }

      // sign the token and set req.user to decoded token
      const payload = {
        id: userWithOtp._id,
        firstname: userWithOtp.firstname,
        lastname: userWithOtp.lastname,
        email: userWithOtp.email,
        role: userWithOtp.role,
        phone: userWithOtp.phone,
        location: userWithOtp.location,
      };
      const token = await TokenHelper.createToken(payload);

      if (!token) {
        return { ...response, msg: "Could not create token", status: 400 };
      }

      return { ...response, msg: "Log in successful", status: 200, data: token };

      // const user = await User.findOne({ email }).select("-password");

      // if (!user) {
      //   return { ...response, msg: "User does not exist", status: 404 };
      // }

      // const verifiedCode = await TwilioHelper.verifyCode(user.phone, otp);

      // if (verifiedCode.status === "approved") {
      //   // sign the token and set req.user to decoded token
      //   const payload = {
      //     id: user._id,
      //     firstname: user.firstname,
      //     lastname: user.lastname,
      //     email: user.email,
      //     role: user.role,
      //     phone: user.phone,
      //     location: user.location,
      //   };
      //   const token = await TokenHelper.createToken(payload);

      //   if (!token) {
      //     return { ...response, msg: "Could not create token", status: 400 };
      //   }

      //   return { ...response, msg: "Log in successful", status: 200, data: token };
      // }

      // return { ...response, msg: "Could not log in user", status: 400 };
    } catch (error) {
      console.log("🚀 ~ error", error);
    }
  }

  static async updatePassword({ user_id, oldPassword, newPassword, confirmNewPassword }) {
    try {
      let response = { msg: "", status: null, data: null };

      if (newPassword !== confirmNewPassword) {
        return { ...response, msg: "New passwords do not match", status: 400 };
      }

      const existingUser = await User.findById(user_id);
      const validPassword = await CryptoHelper.comparePassword(oldPassword, existingUser.password);

      if (!validPassword) {
        return { ...response, msg: "Password is incorrect", status: 400 };
      }

      // go ahead and update the password, but hash it first
      const newHashedPassword = await CryptoHelper.encryptPassword(newPassword);
      const updatedUserWithPassword = await User.findOne(
        { _id: user_id },
        { password: newHashedPassword },
        { new: true },
      );

      if (updatedUserWithPassword) {
        return { ...response, msg: "Password updated successfully", status: 200 };
      }

      return { ...response, msg: "Could not update password", status: 400 };
    } catch (error) {
      console.log("🚀 ~ error", error);
    }
  }

  static async logout({ req }) {
    try {
      let response = { msg: "", status: null, data: null };

      const decoded = req.user ? req.user : null;
      const authHeader = req.headers.authorization ? req.headers.authorization : null;

      if (authHeader && decoded) {
        delete req.user;
        delete req.headers.authorization;

        return { ...response, msg: "Logout success", status: 200 };
      }
      return { ...response, msg: "You are not logged in", status: 400 };
    } catch (error) {
      console.log("🚀 ~ error", error);
    }
  }
}

module.exports = AuthRepo;
