"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const whoIsWhatController_1 = require("../controllers/whoIsWhatController");
const taskRouter = (0, express_1.Router)();
taskRouter.get('/characters', whoIsWhatController_1.getCharacters);
exports.default = taskRouter;
