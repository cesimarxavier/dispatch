import { fetchLoads } from './fetchLoads.js';
import { sendWhatsAppMessage } from './sendWhatsApp.js';

const filtros = [
  {
    nomeGrupo: "Cargas Sul-SUV",
    filtro: {
      origemEstado: "RS",
      tipo: "SUV",
      valorMinimo: 500
    }
  },
  {
    nomeGrupo: "Cargas Nordeste-Carro",
    filtro: {
      origemEstado: "PE",
      tipo: "Sedan",
      valorMinimo: 400
    }
  }
];

const main = async () => {
  for (const filtro of filtros) {
    const cargas = await fetchLoads(filtro.filtro);
    if (cargas.length > 0) {
      const melhores = cargas.slice(0, 3);
      for (const carga of melhores) {
        await sendWhatsAppMessage(filtro.nomeGrupo, carga);
      }
    } else {
      console.log(`Nenhuma carga encontrada para grupo: ${filtro.nomeGrupo}`);
    }
  }
};

main();