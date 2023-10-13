"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const winnersController_1 = require("../controllers/winnersController");
const winnersRoutes = (0, express_1.Router)();
winnersRoutes.get('/winner', winnersController_1.WinnersController.getWinner);
winnersRoutes.put('/updateWinner', winnersController_1.WinnersController.updateWinner);
exports.default = winnersRoutes;
