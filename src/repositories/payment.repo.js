const stripe = require('stripe')('sk_test_51MJJLuFHE9pQA6NWxCONP5A9mOhhLDxIelaAd4JHV2ZLmkE7pOFp9DJYDu15PwrZSvGs3U1s0jxjUlN9akCWInsu00vEDZiTP2');

class PaymentRepo{
    static async createProduct({ product_name }) {
        const product = await stripe.products.create({
  name: product_name,
});
return product
    }
    static async createPrice({ product_name , price }){
        return await stripe.prices.create({
            unit_amount: price,
            currency: 'usd',
            product_data: {
                name:product_name
            },
          });
}
static async createPaymentLInk(price_id,quantity){
    return await stripe.paymentLinks.create({
        line_items: [
          {
            price: price_id,
            quantity,
          },
        ],
      });
}
static async deleteProduct(id){
    return await stripe.products.del(
        id
      );
}
}
module.exports=PaymentRepo