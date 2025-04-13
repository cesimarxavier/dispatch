import fs from 'fs/promises';

export async function fetchLoads(filtro) {
  const data = await fs.readFile('./src/cargas.json', 'utf-8');
  const cargas = JSON.parse(data);

  // Retorna uma carga aleatória
  const aleatoria = cargas[Math.floor(Math.random() * cargas.length)];
  return [aleatoria];
}