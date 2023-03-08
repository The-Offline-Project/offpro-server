const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");

class CryptoHelper {
  static async encryptPassword(password, saltRounds = 10) {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    return hashedPassword ? hashedPassword : false;
  }

  static async comparePassword(input, passwordFromDatabase) {
    const validPassword = await bcrypt.compare(input, passwordFromDatabase);

    return validPassword ? true : false;
  }

  static async generateOtp(numberOfDigits = 4) {
    const code = otpGenerator.generate(numberOfDigits, {
      digits: true,
      alphabets: false,
      specialChars: false,
      upperCase: false,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
    });

    return code;
  }

  static async generatePassword(numberOfCharacters = 10) {
    const password = otpGenerator.generate(numberOfCharacters, {
      digits: false,
      alphabets: true,
      specialChars: true,
      upperCase: true,
      lowerCaseAlphabets: true,
      upperCaseAlphabets: true,
    });

    return password;
  }

  static async generatePromoCode(numberOfCharacters = 10) {
    const promoCode = otpGenerator.generate(numberOfCharacters, {
      digits: true,
      alphabets: true,
      specialChars: false,
      upperCase: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: true,
    });

    return promoCode;
  }

  static async generateCouponCode(numberOfCharacters = 10) {
    const couponCode = otpGenerator.generate(numberOfCharacters, {
      digits: true,
      alphabets: true,
      specialChars: false,
      upperCase: true,
      lowerCaseAlphabets: true,
      upperCaseAlphabets: true,
    });

    return couponCode;
  }
}

module.exports = CryptoHelper;
