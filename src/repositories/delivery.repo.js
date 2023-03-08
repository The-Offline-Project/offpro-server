const deliveryModel = require("./../models/delivery.model");

class DeliveryRepo {


  static async createDelivery({
    destination,
    source,
    buyer_id,
    order_id,
    logistic,
  }) {
    try {
      const delivery = await deliveryModel.create({
        buyer_id: buyer_id,
        Destination: destination,
        Source: source,
        order_id: order_id,
        logistics_id: logistic,
      });
      return delivery;
    } catch (error) {
        console.log("🚀 ~ error", error);
    }
  }

  static async getAllDelivery(){
     try {
      let response = { msg: "", status: null, data: null };

      const orders = await deliveryModel.find({});

      if (orders.length === 0) {
        return { ...response, msg: "No orders available", status: 200, data: orders };
      }

      return { ...response, msg: "Orders retrieved successfully", status: 200, data: orders };
    } catch (error) {
      console.log("🚀 ~ error", error);
    }
  }
  static async deleteDelivery(id){
    try {
        return await deliveryModel.findOneAndDelete({_id: id});
    } catch (error) {
        console.log("🚀 ~ error", error);
        
    }
  }
}
module.exports=DeliveryRepo