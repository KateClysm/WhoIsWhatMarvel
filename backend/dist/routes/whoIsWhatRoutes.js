"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const charactersController_1 = require("../controllers/charactersController");
const taskRouter = (0, express_1.Router)();
taskRouter.get('/characters', charactersController_1.CharactersController.getCharacters);
exports.default = taskRouter;
