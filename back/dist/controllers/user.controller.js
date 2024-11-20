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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = void 0;
const db_1 = require("../config/db");
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const sql = "SELECT id, email, password FROM user WHERE email = ? AND password = ?";
        const [rows] = yield (0, db_1.query)(sql, [email, password]);
        console.log(rows.length);
        if (rows.length === 0) {
            return res.status(204).json({
                message: "User not found",
            });
        }
        return res.status(200).json({
            message: "User found",
            user: rows[0],
        });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                message: error.message,
            });
        }
    }
});
exports.Login = Login;
