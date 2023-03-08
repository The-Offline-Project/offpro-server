const UserRepo = require("../repositories/user.repo");

class UserController {
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   *  */
  static async getUserProfile(req, res) {
    try {
      const { id: user_id, role } = req.user;

      const response = await UserRepo.getUserProfile({ user_id, role });

      if (response.status === 404) {
        return res.status(404).json(response);
      }

      if (response.status === 200) {
        return res.status(200).json(response);
      }

      return res.status(400).json(response);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   *  */
  static async getAllUsers(req, res) {
    try {
      const response = await UserRepo.getAllUsers();

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   *  */
  static async createUser(req, res) {
    try {
      const { firstname, lastname, username, email, role, phone, location, buyerType } = req.body;

      if (!firstname || !lastname || !username || !email || !role || !phone || !location) {
        return res.status(400).json({ msg: "All fields are required" });
      }

      if (!["commercial", "consumer"].includes(buyerType)) {
        return res.status(400).json({ msg: "Buyer type must be either 'commercial' or 'consumer'" });
      }

      const response = await UserRepo.createUser({
        firstname,
        lastname,
        location,
        username,
        email,
        role,
        phone,
        buyerType,
      });

      if (response.status === 201) {
        return res.status(201).json(response);
      }
      return res.status(400).json(response);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   *  */
  static async verifyUser(req, res) {
    try {
      const { user_id } = req.params;
      const { firstname, lastname, role, phone, location } = req.body;

      if (!user_id) {
        return res.status(400).json({ msg: "User ID is required" });
      }

      const response = await UserRepo.editUser({
        user_id,
        firstname,
        lastname,
        location,
        role,
        phone,
      });

      if (response.status === 404) {
        return res.status(404).json(response);
      }

      if (response.status === 200) {
        return res.status(200).json(response);
      }

      return res.status(400).json(response);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   *  */
  static async editUser(req, res) {
    try {
      const { user_id } = req.params;
      const { firstname, lastname, role, phone, location, isVerified } = req.body;

      if (!user_id) {
        return res.status(400).json({ msg: "User ID is required" });
      }

      const response = await UserRepo.editUser({
        user_id,
        firstname,
        lastname,
        location,
        role,
        phone,
        isVerified,
      });

      if (response.status === 404) {
        return res.status(404).json(response);
      }

      if (response.status === 200) {
        return res.status(200).json(response);
      }

      return res.status(400).json(response);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   *  */
  static async deleteUser(req, res) {
    try {
      const { user_id } = req.params;

      if (!user_id) {
        return res.status(400).json({ msg: "User ID is required" });
      }

      const response = await UserRepo.deleteUser({ user_id });

      if (response.status === 404) {
        return res.status(404).json(response);
      }

      if (response.status === 200) {
        return res.status(200).json(response);
      }
      return res.status(400).json(response);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }
}

module.exports = UserController;
