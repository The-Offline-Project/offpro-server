const { roles } = require("../config/constants");
const CryptoHelper = require("../config/crypto-helper");
const { sendMail } = require("../config/notify");
const Admin = require("../models/admin.model");
const Buyer = require("../models/buyer.model");
const Farmer = require("../models/farmer.model");
const Logistics = require("../models/logistic.model");
const User = require("../models/user.model");

class UserRepo {
  static async deleteProfile({ user_id, role }) {
    try {
      if (role === roles.FARMER) {
        // TODO delete associated models - like products?
        return await Farmer.findOneAndRemove({ user: user_id });
      }

      if (role === roles.BUYER) {
        // TODO delete associated models - like orders?
        return await Buyer.findOneAndRemove({ user: user_id });
      }

      if (role === roles.LOGISTICS) {
        // TODO delete associated models - like deliveries?
        return await Logistics.findOneAndRemove({ user: user_id });
      }

      return null;
    } catch (error) {
      console.log("🚀 ~ error", error);
    }
  }

  static async createProfile({ user_id, role, buyerType }) {
    try {
      if (role === roles.ADMIN) {
        const admin = await Admin.create({ user: user_id });
        return admin;
      }

      if (role === roles.FARMER) {
        const farmer = await Farmer.create({ user: user_id });
        return farmer;
      }

      if (role === roles.BUYER) {
        const buyer = await Buyer.create({ user: user_id, type: buyerType });
        return buyer;
      }

      if (role === roles.LOGISTICS) {
        const logistics = await Logistics.create({ user: user_id });
        return logistics;
      }

      return null;
    } catch (error) {
      console.log("🚀 ~ error", error);
    }
  }

  static async getUserProfile({ user_id, role }) {
    try {
      let response = { msg: "", status: null, data: null };
      switch (role) {
        case roles.BUYER:
          const buyerProfile = await Buyer.findOne({ user: user_id });
          if (!buyerProfile) {
            return { ...response, msg: "Buyer profile not found", status: 404 };
          }

          return { ...response, msg: "Buyer profile retrieved successfully", status: 200, data: buyerProfile };

        case roles.FARMER:
          const farmerProfile = await Farmer.findOne({ user: user_id });
          if (!farmerProfile) {
            return { ...response, msg: "Farmer profile not found", status: 404 };
          }

          return { ...response, msg: "Farmer profile retrieved successfully", status: 200, data: farmerProfile };

        case roles.LOGISTICS:
          const logisticsProfile = await Logistics.findOne({ user: user_id });
          if (!logisticsProfile) {
            return { ...response, msg: "Logistics profile not found", status: 404 };
          }

          return { ...response, msg: "Logistics profile retrieved successfully", status: 200, data: logisticsProfile };

        case roles.ADMIN:
          const adminProfile = await Admin.findOne({ user: user_id });
          if (!adminProfile) {
            return { ...response, msg: "Admin profile not found", status: 404 };
          }

          return { ...response, msg: "Admin profile retrieved successfully", status: 200, data: adminProfile };

        default:
          return response;
      }
    } catch (error) {
      console.log("🚀 ~ error", error);
    }
  }

  static async getAllUsers() {
    try {
      let response = { msg: "", status: null, data: null };

      const users = await User.find().select("-password  -otp");

      if (users.length === 0) {
        return { ...response, msg: "No users found", status: 200 };
      }

      return { ...response, msg: "Users retrieved successfully", status: 200, data: users };
    } catch (error) {
      console.log("🚀 ~ error", error);
    }
  }

  static async createUser({ location, firstname, lastname, username, email, role, phone, buyerType }) {
    try {
      let response = { msg: "", status: null, data: null };

      const existingEmail = await User.findOne({ email });
      const existingUsername = await User.findOne({ username });

      if (existingEmail) {
        return { ...response, msg: "Email already exists", status: 400 };
      }

      if (existingUsername) {
        return { ...response, msg: "Username already exists", status: 400 };
      }

      //  generate password and save in their model
      const generatedPassword = await CryptoHelper.generatePassword();
      console.log("🚀 ~ generatedPassword", generatedPassword);
      const hashedPassword = await CryptoHelper.encryptPassword(generatedPassword);

      const user = await User.create({
        firstname,
        lastname,
        username,
        email,
        role,
        phone,
        password: hashedPassword,
        location,
      });
      console.log("🚀 ~ user", user);

      if (user) {
        await this.createProfile({ user_id: user._id, role: user.role, buyerType });
        const createdUser = await User.findOne({ email: user.email }).select("-token -otp -password");
        // TODO send generated password to the user email/phone
        await sendMail(
          createdUser.email,
          "Account Created",
          `Your account has been set up, your password is ${generatedPassword}. Please log in and update your password.`,
        );
        return { ...response, msg: "User created", status: 201, data: createdUser };
      }
      return { ...response, msg: "Could not create user", status: 400 };
    } catch (error) {
      console.log("🚀 ~ error", error);
    }
  }

  static async editUser({ user_id, location, isVerified, firstname, lastname, role, phone }) {
    try {
      let response = { msg: "", status: null, data: null };

      const existingUser = await User.findOne({ _id: user_id });

      if (!existingUser) {
        return { ...response, msg: "User does not exist", status: 404 };
      }

      const updatedUser = await User.findOneAndUpdate(
        { _id: user_id },
        {
          firstname,
          lastname,
          location,
          phone,
          role,
          isVerified: isVerified ? true : false,
        },
        { new: true },
      ).select("-token -password -otp");

      if (updatedUser) {
        // TODO Update user's profile  IF ONLY the role is also updated
        return {
          ...response,
          msg: isVerified ? "User verified successfully" : "User updated successfully",
          status: 200,
          data: updatedUser,
        };
      }

      return { ...response, msg: "Could not delete user", status: 400 };
    } catch (error) {
      console.log("🚀 ~ error", error);
    }
  }

  static async deleteUser({ user_id }) {
    try {
      let response = { msg: "", status: null, data: null };

      const existingUser = await User.findOne({ _id: user_id });

      if (!existingUser) {
        return { ...response, msg: "User does not exist", status: 404 };
      }

      // const activeUser = { ...existingUser };
      const deletedUser = await User.findOneAndDelete({ _id: user_id });

      if (deletedUser) {
        // delete user's profile
        await this.deleteProfile({ user_id: existingUser._id, role: existingUser.role });

        return { ...response, msg: "User deleted successfully", status: 200, data: deletedUser };
      }

      return { ...response, msg: "Could not delete user", status: 400 };
    } catch (error) {
      console.log("🚀 ~ error", error);
    }
  }
}

module.exports = UserRepo;
