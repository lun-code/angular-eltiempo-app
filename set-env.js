const fs = require('fs');

// Vercel inyectará esto desde su panel
const apiKey = process.env.AEMET_API_KEY;

const envConfigFile = `
export const environment = {
  production: true,
  apiKey: '${apiKey || ''}'
};
`;

const dir = './src/environments';

// Si no existe la carpeta, la crea
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

// Escribe el archivo que Angular necesita para compilar
fs.writeFileSync(`${dir}/environment.ts`, envConfigFile);
console.log('✅ environment.ts generado');