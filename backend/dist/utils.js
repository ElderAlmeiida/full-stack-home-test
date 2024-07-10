"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchCSV = exports.parseCSV = void 0;
const csv_parser_1 = __importDefault(require("csv-parser"));
const database_1 = require("./database");
const parseCSV = (buffer) => {
    return new Promise((resolve, reject) => {
        const results = [];
        const stream = (0, csv_parser_1.default)();
        stream.on('data', (data) => results.push(data));
        stream.on('end', () => resolve(results));
        stream.on('error', reject);
        stream.write(buffer);
        stream.end();
    });
};
exports.parseCSV = parseCSV;
const searchCSV = (query) => {
    if (!query)
        return database_1.data.rows;
    const lowerCaseQuery = query.toLowerCase();
    return database_1.data.rows.filter(row => Object.values(row).some(val => typeof val === 'string' && val.toLowerCase().includes(lowerCaseQuery)));
};
exports.searchCSV = searchCSV;
