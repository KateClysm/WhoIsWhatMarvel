"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharactersController = void 0;
const charactersModel_1 = require("../models/charactersModel");
class CharactersController {
    static getCharacters(req, res) {
        try {
            const q = parseInt(req.query.qParam, 10);
            if (isNaN(q)) {
                return res.status(400).json({ error: 'Invalid quantity parameter' });
            }
            const characters = charactersModel_1.CharactersModel.getCharacters(q);
            res.json(characters);
        }
        catch (error) {
            console.error('Error getting characters:', error);
            res.status(500).json({ error: 'Error getting characters' });
        }
    }
}
exports.CharactersController = CharactersController;
