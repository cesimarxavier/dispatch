import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export async function sendWhatsAppMessage(grupo, load) {
  const message = `
🚚 NOVA CARGA DISPONÍVEL
Grupo: ${grupo}
Veículo: ${load.vehicle}
Origem: ${load.origin}
Destino: ${load.destination}
Valor: $${load.price}
Contato: ${load.broker?.phone || 'Não informado'}
  `.trim();

  const phone = process.env.WHATSAPP_TO;

  try {
    const url = `https://api.z-api.io/instances/${process.env.ZAPI_INSTANCE_ID}/token/${process.env.ZAPI_TOKEN}/send-text`;

    const response = await axios.post(
      url,
      {
        phone,
        message
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Client-Token': process.env.ZAPI_CLIENT_TOKEN
        }
      }
    );

    console.log('✅ Mensagem enviada via Z-API com sucesso!');
    console.log('🛰️ RESPOSTA Z-API:', response.data);
  } catch (error) {
    console.error('❌ Erro ao enviar mensagem via Z-API:', error.response?.data || error.message);
  }
}