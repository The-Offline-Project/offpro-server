require("dotenv").config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceId = process.env.TWILIO_SERVICE_ID;

const client = require("twilio")(accountSid, authToken);

class TwilioHelper {
  static async sendVerificationSms(phoneNumber) {
    try {
      const response = await client.verify.v2
        .services(serviceId)
        .verifications.create({ to: phoneNumber, channel: "sms" });
      console.log("🚀 ~ response", response);

      return response;
    } catch (error) {
      console.log("🚀 ~ error", error);
    }
  }

  static async verifyCode(phoneNumber, code) {
    try {
      const response = await client.verify.v2.services(serviceId).verificationChecks.create({ to: phoneNumber, code });
      console.log("🚀 ~ response", response);

      return response;
    } catch (error) {
      console.log("🚀 ~ error", error);
    }
  }
}

module.exports = TwilioHelper;
