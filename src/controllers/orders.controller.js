const OrdersRepo = require("../repositories/order.repo");
const sendMail = require("../config/notify");

class OrdersController {
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   *  */
  static async getAllOrders(req, res) {
    try {
      const response = await OrdersRepo.getAllOrders();

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   *  */
  static async editOrder(req, res) {
    try {
      const { order_id } = req.params;
      const { status } = req.query;

      if (!["pending", "paid", "cancelled"].includes(status)) {
        return res.status(400).json({ msg: "Status must be either 'pending', 'paid' or 'cancelled'" });
      }

      if (!order_id) {
        return res.status(400).json({ msg: "Order ID is required" });
      }

      const response = await OrdersRepo.editOrder({ order_id, status });

      if (response.status === 404) {
        return res.status(404).json(response);
      }

      if (response.status === 200) {
        return res.status(200).json(response);
      }

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   *  */
  static async deleteOrder(req, res) {
    try {
      const { order_id } = req.params;

      if (!order_id) {
        return res.status(400).json({ msg: "Order ID is required" });
      }

      const response = await OrdersRepo.deleteOrder({ order_id });

      if (response.status === 404) {
        return res.status(404).json(response);
      }

      if (response.status === 200) {
        return res.status(200).json(response);
      }

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   *  */
  static async getSingleBuyerOrder(req, res) {
    try {
      const { id } = req.user;
      const { order_id } = req.params;

      if (!order_id) {
        return res.status(400).json({ msg: "Order ID is required" });
      }

      const response = await OrdersRepo.getSingleBuyerOrder({ buyer_id: id, order_id });

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   *  */
  static async getSingleOrder(req, res) {
    try {
      const { order_id } = req.params;
      if (!order_id) {
        return res.status(400).json({ msg: "Order ID is required" });
      }
      const response = await OrdersRepo.getSingleOrder({ order_id });

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   *  */
  static async getBuyerOrders(req, res) {
    try {
      const { id } = req.user;

      const response = await OrdersRepo.listBuyerOrders({ buyer_id: id });

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   *  */
  static async placeBuyerOrder(req, res) {
    try {
      const { id: buyer_id, location: buyer_location } = req.user; // this will be the buyer_id and location
      const { farmer_id, products, amount } = req.body;

      if (!farmer_id) {
        return res.status(400).json({ msg: "Farmer ID is required" });
      }

      if (products.length === 0) {
        return res.status(400).json({ msg: "Products are required to place an order" });
      }

      const response = await OrdersRepo.placeBuyerOrder({
        farmer_id,
        products,
        amount,
        buyer_id,
        buyer_location,
      });

      if (response.status === 201) {
        let to = "blinkztyler@gmail.com";
        let subject = " an order has been made";
        let textBody = " an order has been made successfully";
        // when order is completed , farmer receives an email notification
        sendMail(to, subject, textBody);
        return res.status(201).json(response);
      }

      return res.status(400).json(response);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }
}

module.exports = OrdersController;
