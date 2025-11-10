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
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const morgan_1 = __importDefault(require("morgan"));
const config_helper_1 = require("./common/helper/config.helper");
(0, config_helper_1.loadConfig)();
const error_handler_middleware_1 = __importDefault(require("./common/middleware/error-handler.middleware"));
const database_services_1 = require("./services/database.services");
const router_1 = __importDefault(require("./router"));
const ratelimit_middleware_1 = require("./common/middleware/ratelimit.middleware");
const port = Number(process.env.port) || 3000;
const app = (0, express_1.default)();
// middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(ratelimit_middleware_1.limiter);
const initApp = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_services_1.initDB)();
    app.use("/api", router_1.default);
    app.get("/", (req, res) => {
        res.send("ready for backend");
    });
    app.use(error_handler_middleware_1.default);
    app;
    http_1.default.createServer(app).listen(port, () => {
        console.log(`server is running at port ${port}`);
    });
});
void initApp();
