"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const utils_1 = require("../utils");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    var _a;
    const query = ((_a = req.query.q) === null || _a === void 0 ? void 0 : _a.toString()) || '';
    try {
        const filteredData = (0, utils_1.searchCSV)(query);
        res.status(200).json({ data: filteredData });
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao buscar dados.' });
    }
});
exports.default = router;
