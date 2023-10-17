"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharactersModel = void 0;
const marvel_json_1 = __importDefault(require("../../data/marvel.json"));
class CharactersModel {
    static getCharacters(q) {
        const characters = marvel_json_1.default.slice(0, q);
        return characters;
    }
}
exports.CharactersModel = CharactersModel;
