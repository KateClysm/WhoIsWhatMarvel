"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const charactersController_1 = require("../controllers/charactersController");
const charactersRoutes = (0, express_1.Router)();
charactersRoutes.get('/data', charactersController_1.CharactersController.getCharacters);
exports.default = charactersRoutes;
