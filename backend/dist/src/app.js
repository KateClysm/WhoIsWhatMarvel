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
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db")); // Importa la conexión desde db.ts
const marvel_json_1 = __importDefault(require("../public/marvel.json"));
const app = (0, express_1.default)();
const port = 8080;
app.use(express_1.default.static('public'));
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
function loadCharactersData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Establece la conexión utilizando la exportación desde db.ts
            yield db_1.default.connect();
            for (const character of marvel_json_1.default) {
                const { Id, Name, Image, Alignment, Quote } = character;
                yield db_1.default.execute('INSERT INTO characters (Id, Name, Image, Alignment, Quote) VALUES (?, ?, ?, ?, ?)', [Id, Name, Image, Alignment, Quote]);
            }
            console.log('Data loaded in the Data Base');
        }
        catch (error) {
            console.error('Error loading data:', error);
        }
        finally {
            db_1.default.end(); // Cierra la conexión después de cargar los datos
        }
    });
}
loadCharactersData();
