const DeliveryRepo = require("./../repositories/delivery.repo");

class DeliveryController {
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   *  */
  static async getAllDelivery(req, res) {
    try {
      const response = await DeliveryRepo.getAllDelivery();

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   *  */
  static async createDelivery(req, res) {
    try {
        const {destination,
            source,
            buyer_id,
            order_id,
            logistic,}= req.body
      const response = await DeliveryRepo.createDelivery({
        destination,
        source,
        buyer_id,
        order_id,
        logistic,
      });
      if (response.status === 201) {
        return res.status(201).json(response);
      }
      return res.status(200).json(response);
    } catch (error) {
      console.error("🚀 ~ error", error);
      return res
        .status(500)
        .json({ msg: "Server error", error: error.message });
    }
  }


  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   *  */
  static async deleteDelivery(req,res){
    try{
        let {id}= req.params;
        const response = await DeliveryRepo.deleteDelivery(
            id
          );
    
          if (response.status === 404) {
            return res.status(404).json(response);
          }
    
          if (response.status === 200) {
            return res.status(200).json(response);
          }
    
          return res.status(200).json(response);
        } catch (error) {
          console.log("🚀 ~ error", error);
          return res.status(500).json({ msg: "Server error", error });
        }
      }
  }

module.exports = DeliveryController;
