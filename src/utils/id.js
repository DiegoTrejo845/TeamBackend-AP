const { randomUUID } = require('node:crypto');

// Genera un identificador único (UUID v4), como pide la Propuesta.
function generateId() {
    return randomUUID();
}


module.exports = { generateId };
