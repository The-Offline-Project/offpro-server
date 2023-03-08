const crypto = require("crypto");

// Signature generation
const generateAPISignature = (data, passPhrase = null) => {
    // Arrange the array by key alphabetically for API calls
    let ordered_data = {};
    Object.keys(data).sort().forEach(key => {
        ordered_data[key] = data[key];
    });
    data = ordered_data;

    // Create the get string
    let getString = '';
    for (let key in data) {
        getString += key + '=' + encodeURIComponent(data[key]).replace(/%20/g,'+') + '&';
    }

    // Remove the last '&'
    getString = getString.substring(0, getString.length - 1);
    if (passPhrase !== null) {getString +=`&passphrase=${encodeURIComponent(passPhrase.trim()).replace(/%20/g, "+")}`;}

    // Hash the data and create the signature
    return crypto.createHash("md5").update(getString).digest("hex");
}


module.exports= generateAPISignature