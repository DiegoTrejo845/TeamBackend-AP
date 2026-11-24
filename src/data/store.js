const seed = require('./seed.json');
const { generateId } = require('../utils/id');

// Base de datos en memoria: una copia del seed que se carga al iniciar.
// Reiniciar el servidor regresa los datos al estado del seed.
const db = structuredClone(seed);

// Copia un registro para que nadie fuera de esta capa modifique los arreglos.
const copy = (item) => (item ? structuredClone(item) : null);

// Crea las funciones de acceso para una colección (speakers, events, ...).
function createRepository(collection) {
    if (!Array.isArray(db[collection])) {
        throw new Error(`La colección "${collection}" no existe en seed.json`);
    }

    const items = () => db[collection];

    return {
        findAll(predicate) {
            const list = predicate ? items().filter(predicate) : items();
            return list.map(copy);
        },

        findById(id) {
            return copy(items().find((item) => item.id === id));
        },

        findOne(predicate) {
            return copy(items().find(predicate));
        },

        exists(predicate) {
            return items().some(predicate);
        },

        create(data) {
            const item = { id: generateId(), ...data };
            items().push(item);
            return copy(item);
        },

        update(id, changes) {
            const index = items().findIndex((item) => item.id === id);
            if (index === -1) {
                return null;
            }
            items()[index] = { ...items()[index], ...changes, id };
            return copy(items()[index]);
        },

        remove(id) {
            const index = items().findIndex((item) => item.id === id);
            if (index === -1) {
                return false;
            }
            items().splice(index, 1);
            return true;
        },
    };
}

module.exports = {
    speakers: createRepository('speakers'),
    events: createRepository('events'),
    attendees: createRepository('attendees'),
    registrations: createRepository('registrations'),
};
