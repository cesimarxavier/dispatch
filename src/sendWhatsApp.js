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

  const url = `https://api.twilio.com/2010-04-01/Accounts/${config.twilio.sid}/Messages.json`;

  try {
    const response = await axios.post(
      url,
      new URLSearchParams({
        From: config.twilio.from,
        To: config.twilio.to,
        Body: message
      }),
      {
        auth: {
          username: config.twilio.sid,
          password: config.twilio.token
        }
      }
    );

    console.log('Mensagem enviada com sucesso para grupo:', grupo);
  } catch (error) {
    console.error('Erro ao enviar WhatsApp:', error.message);
  }
}