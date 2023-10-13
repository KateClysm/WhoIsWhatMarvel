"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WinnersModel = void 0;
const db_1 = __importDefault(require("../db"));
class WinnersModel {
    static getWinner() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [rows] = yield db_1.default.promise().query('SELECT * FROM winner WHERE id = 1');
                const arrayWinner = rows;
                if (arrayWinner.length > 0) { //Si se encontró un ganador
                    return arrayWinner[0];
                }
                return null; //Si no, se devuelve null
            }
            catch (error) {
                throw error;
            }
        });
    }
    static updateWinner(nickname, score, time) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('Updating winner data...');
                const [result] = yield db_1.default.promise().execute('UPDATE winner SET nickname = ?, score = ?, time = ? WHERE id = 1', [nickname, score, time]);
                console.log('Update result:', result);
                if ('affectedRows' in result && result.affectedRows > 0) {
                    return `Successful update for the winner`;
                }
                return `No rows were affected by the update`;
            }
            catch (error) {
                console.error('Error in updateWinner:', error);
                throw error;
            }
        });
    }
}
exports.WinnersModel = WinnersModel;
