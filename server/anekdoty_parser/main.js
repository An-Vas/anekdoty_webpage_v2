const { updateDb } = require('./db');
const { parse } = require('./parser');

const root = 'https://anekdoty.ru/';

async function anekdoty_parser_main() {
    try {
        await parse(root, async (result)=>{ await updateDb(result) })

    } catch (error) {
        console.error(error);

    }
}

module.exports = { anekdoty_parser_main };



