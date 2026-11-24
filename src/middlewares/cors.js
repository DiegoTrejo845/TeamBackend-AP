// CORS sin paquetes extra: permite que la página publicada en otro dominio
// (por ejemplo el hosting del profesor) llame al API.
// CORS_ORIGIN = lista separada por comas, p. ej. https://losfarsantes.hugedata.systems
const allowedOrigins = (process.env.CORS_ORIGIN || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

function cors(req, res, next) {
  const origin = req.get('Origin');
  if (origin && allowedOrigins.includes(origin)) {
    res.set('Access-Control-Allow-Origin', origin);
    res.set('Vary', 'Origin');
    res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.set('Access-Control-Max-Age', '600');
  }
  // Las peticiones de verificación (preflight) del navegador terminan aquí.
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  next();
}

module.exports = cors;
