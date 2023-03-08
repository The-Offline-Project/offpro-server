const Order = require("../models/order.model");

class OrdersRepo {
  static async getAllOrders() {
    try {
      let response = { msg: "", status: null, data: null };

      const orders = await Order.find({});

      if (orders.length === 0) {
        return { ...response, msg: "No orders available", status: 200, data: orders };
      }

      return { ...response, msg: "Orders retrieved successfully", status: 200, data: orders };
    } catch (error) {
      console.log("🚀 ~ error", error);
    }
  }

  static async editOrder({ order_id, status }) {
    try {
      let response = { msg: "", status: null, data: null };

      const existingOrder = await Order.findOne({ _id: order_id });

      if (!existingOrder) {
        return { ...response, msg: "Order not found", status: 404 };
      }

      const updatedOrder = await Order.findOneAndUpdate({ _id: order_id }, { status }, { new: true });

      if (updatedOrder) {
        return { ...response, msg: "Order updated successfully", status: 200, data: updatedOrder };
      }
      return { ...response, msg: "Could not update order", status: 400 };
    } catch (error) {
      console.log("🚀 ~ error", error);
    }
  }

  static async deleteOrder({ order_id }) {
    try {
      let response = { msg: "", status: null, data: null };

      const existingOrder = await Order.findOne({ _id: order_id });

      if (!existingOrder) {
        return { ...response, msg: "Order not found", status: 404 };
      }

      const deleteOrder = await Order.findOneAndDelete({ _id: order_id });

      if (deleteOrder) {
        return { ...response, msg: "Order deleted successfully", status: 200, data: deleteOrder };
      }
      return { ...response, msg: "Could not delete order", status: 400 };
    } catch (error) {
      console.log("🚀 ~ error", error);
    }
  }

  static async getSingleOrder({ order_id }) {
    try {
      let response = { msg: "", status: null, data: null };

      const order = await Order.findOne({ _id: order_id });

      if (!order) {
        return { ...response, msg: "Order not found", status: 404 };
      }

      return { ...response, msg: "Order retrieved successfully", status: 200, data: order };
    } catch (error) {
      console.log("🚀 ~ error", error);
    }
  }

  static async getSingleBuyerOrder({ buyer_id, order_id }) {
    try {
      let response = { msg: "", status: null, data: null };

      const buyerOrder = await Order.findOne({
        _id: { $eq: order_id },
        $and: [{ buyer_id: { $eq: buyer_id } }],
      });

      if (!buyerOrder) {
        return { ...response, msg: "Order not found", status: 404 };
      }

      return { ...response, msg: "Order retrieved successfully", status: 200, data: buyerOrder };
    } catch (error) {
      console.log("🚀 ~ error", error);
    }
  }

  static async listBuyerOrders({ buyer_id }) {
    try {
      let response = { msg: "", status: null, data: null };

      const buyerOrders = await Order.find({
        buyer_id: { $eq: buyer_id },
      });

      if (buyerOrders.length === 0) {
        return { ...response, msg: "Buyer has no orders", status: 200, data: buyerOrders };
      }

      return { ...response, msg: "Buyer orders retrieved successfully", status: 200, data: buyerOrders };
    } catch (error) {
      console.log("🚀 ~ error", error);
    }
  }

  static async placeBuyerOrder({ buyer_id, amount, products, farmer_id, buyer_location }) {
    try {
      let response = { msg: "", status: null, data: null };

      const order = await Order.create({ buyer_id, farmer_id, amount, products, region: buyer_location });

      if (order) {
        // here, we can send a notification to the delivery/logistics company...
        // should we use the data to create a delivery model instance ?
        return { ...response, msg: "Order placed successfully", status: 201, data: order };
      }

      return { ...response, msg: "Could not place order", status: 400 };
    } catch (error) {
      console.log("🚀 ~ error", error);
    }
  }
}

module.exports = OrdersRepo;
