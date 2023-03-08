const Buyer = require("../models/buyer.model");
const Order = require("../models/order.model");
const Review = require("../models/review.model");

class RatingRepo {
  static async rateOrder({ buyer_id, farmer_id, order_id, comment, rating }) {
    try {
      let response = { msg: "", status: null, data: null };

      const existingOrder = await Order.findOne({ _id: order_id });

      if (!existingOrder) {
        return { ...response, msg: "Order not found", status: 404 };
      }

      // using the buyer_id(user-id), search through the buyer table and return the user with that related user_id
      const buyer = await Buyer.findOne({ user: buyer_id });
      const createdReview = await Review.create({
        buyer: buyer._id,
        farmer: farmer_id,
        order: order_id,
        rating,
        comment,
      });

      if (createdReview) {
        return { ...response, msg: "Order rated successfully", status: 201, data: createdReview };
      }

      return { ...response, msg: "Could not rate order", status: 400 };
    } catch (error) {
      console.log("🚀 ~ error", error);
    }
  }

  static async editReview({ user_id, review_id, comment, rating }) {
    try {
      let response = { msg: "", status: null, data: null };

      const existingReview = await Review.findOne({ _id: review_id });

      if (!existingReview) {
        return { ...response, msg: "Review not found", status: 404 };
      }

      // use the buyerid above to search for the buyer profile through the buyer model
      const buyerProfile = await Buyer.findOne({ user: user_id });
      if (!buyerProfile) {
        return { ...response, msg: "You cannot edit this review", status: 400 };
      }

      const updatedReview = await Review.findOneAndUpdate(
        { _id: { $eq: review_id }, $and: [{ buyer: { $eq: buyerProfile._id } }] },
        { rating, comment },
        { new: true },
      );
      console.log("🚀 ~ updatedReview", updatedReview);

      if (updatedReview) {
        return { ...response, msg: "Review updated successfully", status: 200, data: updatedReview };
      }

      return { ...response, msg: "Could not update review", status: 400 };
    } catch (error) {
      console.log("🚀 ~ error", error);
    }
  }

  static async deleteReview({ user_id, review_id }) {
    try {
      let response = { msg: "", status: null, data: null };

      const existingReview = await Review.findOne({ _id: review_id });

      if (!existingReview) {
        return { ...response, msg: "Review not found", status: 404 };
      }

      // use the buyerid above to search for the buyer profile through the buyer model
      const buyerProfile = await Buyer.findOne({ user: user_id });
      if (!buyerProfile) {
        return { ...response, msg: "You cannot delete this review", status: 400 };
      }

      const deletedReview = await Review.findOneAndDelete({
        _id: { $eq: review_id },
        $and: [{ buyer: { $eq: buyerProfile._id } }],
      });
      console.log("🚀 ~ deletedReview", deletedReview);

      if (deletedReview) {
        return { ...response, msg: "Review deleted successfully", status: 200, data: deletedReview };
      }

      return { ...response, msg: "Could not deleted review", status: 400 };
    } catch (error) {
      console.log("🚀 ~ error", error);
    }
  }
}

module.exports = RatingRepo;
