import axios from 'axios';
import config from './config.js';

export async function sendWhatsAppMessage(grupo, load) {
  const message = `
🚚 NOVA CARGA DISPONÍVEL
Grupo: ${grupo}
Veículo: ${load.vehicle}
Origem: ${load.origin}
Destino: ${load.destination}
Valor: $${load.price}
Contato: ${load.broker?.phone || 'Não informado'}
  `;

  const auth = Buffer.from(`${config.twilio.sid}:${config.twilio.token}`).toString('base64');

  try {
    const response = await axios.post(
      `https://api.twilio.com/2010-04-01/Accounts/${config.twilio.sid}/Messages.json`,
      new URLSearchParams({
        From: config.twilio.from,
        To: config.twilio.to,
        Body: message
      }),
      {
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    console.log('✅ Mensagem enviada com sucesso para grupo:', grupo);
  } catch (error) {
    console.error('❌ Erro ao enviar WhatsApp:', error.response?.data || error.message);
  }
}
