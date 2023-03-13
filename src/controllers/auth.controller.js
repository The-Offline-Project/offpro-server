const CryptoHelper = require("../config/crypto-helper");
const User = require("../models/user.model");
const AuthRepo = require("../repositories/auth.repo");
const TwilioHelper = require("../config/twilio-helper")

class AuthController {
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   *  */
  static async signup(req, res) {
    try {
      const { email,  password,  confirmPassword ,username} = req.body;

      if (!email ||!password) {
        return res.status(400).json({ msg: "Please provide all required fields", status: 400 });
      }

     
      if (password != confirmPassword) {
        return res.status(400).json({ msg: "Passwords do not match", status: 400 });
      }

      //   check if user exists
      const existingEmail = await User.findOne({ email });
      // const existingUsername = await User.findOne({ username });

      if (existingEmail) {
        return res.status(400).json({ msg: "Email already exists" });
      }
      // if (existingUsername) {
      //   return res.status(400).json({ msg: "Username already exists" });
      // }

      //   go ahead and create the user
      const response = await AuthRepo.signupUser({ email,  password, phone,username});

      if (response.status === 201) {
        // generate otp and send to user phone
        const otp = await CryptoHelper.generateOtp();
        TwilioHelper.sendVerificationSms(phone);
        await User.findOneAndUpdate({ email }, { otp });

        return res.status(201).json({ msg: "User created", status: 200 });
      }
      return res.status(400).json(response);
    } catch (error) {
      console.log("🚀 ~ error", error);
      return res.status(500).json({ msg: "Server error", error });
    }
  }

  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   *  */
  static async adminLogin(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ msg: "Please provide email and password" });
      }

      const response = await AuthRepo.adminLogin({ email, password });

      if (response.status === 404) {
        return res.status(404).json(response);
      }

      if (response.status === 200) {
        return res.status(200).json(response);
      }

      return res.status(400).json(response);
    } catch (error) {
      return res.status(500).json({ msg: "Server error", error });
    }
  }

  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   *  */
  static async generalLogin(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ msg: "Email and password are required" });
      }

      const checkLogin = await AuthRepo.login({ email, password });

      if (checkLogin.status === 200) {
        return res.status(200).json(checkLogin);
      }

      if (checkLogin.status === 404) {
        return res.status(404).json(checkLogin);
      }

      return res.status(400).json(checkLogin);
    } catch (error) {
      return res.status(500).json({ msg: "Server error", error });
    }
  }

  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   *  */
  static async verifyOtp(req, res) {
    try {
      const { otp, email } = req.body;

      if (!otp || !email) {
        return res.status(400).json({ msg: "OTP and email are required" });
      }

      const response = await AuthRepo.verifyOtp({ otp, email });

      if (response.status === 200) {
        return res.status(200).json(response);
      }

      return res.status(400).json(response);
    } catch (error) {
      return res.status(500).json({ msg: "Server error", error });
    }
  }

  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   *  */
  static async updatePassword(req, res) {
    try {
      const { id: user_id } = req.user;
      const { oldPassword, newPassword, confirmNewPassword } = req.body;

      const result = await AuthRepo.updatePassword({ user_id, oldPassword, newPassword, confirmNewPassword });

      if (result.status === 200) {
        return res.status(200).json(result);
      }
      return res.status(400).json(result);
    } catch (error) {
      return res.status(500).json({ msg: "Server error", error });
    }
  }

  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   *  */
  static async logout(req, res) {
    try {
      const result = await AuthRepo.logout({ req });

      if (result.status === 200) {
        return res.status(200).json(result);
      }
      return res.status(400).json(result);
    } catch (error) {
      return res.status(500).json({ msg: "Server error", error });
    }
  }
}

module.exports = AuthController;
