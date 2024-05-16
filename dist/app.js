"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const notFound_1 = require("./app/middleware/notFound");
const routes_1 = __importDefault(require("./app/routes"));
const globalErrorHandler_1 = __importDefault(require("./app/middleware/globalErrorHandler"));
//parser
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173"],
}));
app.use((0, cookie_parser_1.default)());
//application routes
app.use("/api/v1/", routes_1.default);
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to server",
    });
});
//global error handler
app.use(globalErrorHandler_1.default);
//not found routes
app.use(notFound_1.notFound);
exports.default = app;
