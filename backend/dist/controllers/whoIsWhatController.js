"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCharacters = void 0;
const marvel_json_1 = __importDefault(require("../../data/marvel.json"));
console.log('Datos de Marvel cargados:', marvel_json_1.default);
const getCharacters = (req, res) => {
    try {
        console.log('Parámetros de solicitud:', req.query);
        const count = req.query.count;
        const parsedCount = parseInt(count, 10);
        if (isNaN(parsedCount)) {
            return res.status(400).json({ error: 'Invalid count parameter' });
        }
        // Modifica la respuesta para enviar solo los primeros N personajes
        const characters = marvel_json_1.default.slice(0, parsedCount);
        res.json(characters);
    }
    catch (error) {
        console.error('Error al obtener personajes:', error);
        res.status(500).json({ error: 'Error al obtener personajes' });
    }
};
exports.getCharacters = getCharacters;
