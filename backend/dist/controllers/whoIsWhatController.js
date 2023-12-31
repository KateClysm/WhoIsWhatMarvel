"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacterController = void 0;
const whoIsWhatModel_1 = require("../models/whoIsWhatModel");
class CharacterController {
    //Este método se encargará de manejar las solicitudes HTTP para obtener personajes.
    static getCharacters(req, res) {
        try {
            //Recibe la cantidad elegida de personajes y la convierte en entero.
            const q = parseInt(req.query.q, 10);
            //Si no es un número, da error
            if (isNaN(q)) {
                return res.status(400).json({ error: 'Invalid quantity parameter' });
            }
            //Se llama al método getCharacters del modelo CharacterModel para obtener los personajes.
            const characters = whoIsWhatModel_1.CharacterModel.getCharacters(q);
            //Devuelve los personajes.
            res.json(characters);
        }
        catch (error) {
            //Si hubo un error lo notifica.
            console.error('Error getting characters:', error);
            res.status(500).json({ error: 'Error getting characters' });
        }
    }
}
exports.CharacterController = CharacterController;
