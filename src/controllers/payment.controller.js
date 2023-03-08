const PaymentRepo = require("../repositories/payment.repo");
const generateAPISignature = require("./../config/payment-helper")
class PaymentController {
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   *  */
  static async createProductPaymentLink(req, res) {
    try {
      let body = req.body;
      let url = "https://sandbox.payfast.co.za​/eng/process";
      const data = { merchant_id: "21837196",
                  merchant_key: "dty3fwajpbrsq",
                  amount: body.amount,
                  item_name: body.item_name,
                  email_address:body.email,
                  item_description:body.item_description,
                  email_confirmation:"1",
                  confirmation_address:"shadrack@coronet.africa",
                  payment_method:"cc"

    };
    data["signature"] = generateAPISignature(data);
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) =>  res.status(200).json(response))
       

      return res.status(200).json(url);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   *  */
  static async deleteProductPriceLink(req, res) {
    try {
      const { id } = req.body;
      return PaymentRepo.deleteProduct(id);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }
}
module.exports = PaymentController;
