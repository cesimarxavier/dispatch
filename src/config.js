import dotenv from 'dotenv';
dotenv.config();

export default {
  cdToken: process.env.CENTRAL_DISPATCH_TOKEN,
  twilio: {
    sid: process.env.TWILIO_ACCOUNT_SID,
    token: process.env.TWILIO_AUTH_TOKEN,
    from: process.env.TWILIO_FROM,
    to: process.env.WHATSAPP_TO
  }
};