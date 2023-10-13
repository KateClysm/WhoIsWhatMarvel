"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacterModel = void 0;
//El modelo contiene la lógica para obtener datos relacionados con los personajes.
const marvel_json_1 = __importDefault(require("../../data/marvel.json"));
class CharacterModel {
    static getCharacters(q) {
        const characters = marvel_json_1.default.slice(0, q);
        return characters;
    }
}
exports.CharacterModel = CharacterModel;
