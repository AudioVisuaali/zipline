"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSlug = generateSlug;
const crypto_1 = __importDefault(require("crypto"));
function generateSlug() {
    return crypto_1.default.randomBytes(6).toString("base64url").slice(0, 8);
}
