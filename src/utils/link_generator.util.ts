import crypto  from "crypto";

// Generate a random secret key string with 256 bits (32 bytes)
const secretKey = crypto.randomBytes(32).toString('hex');

console.log('Generated Secret Key:', secretKey);
