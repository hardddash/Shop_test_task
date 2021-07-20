"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const cashierRouter_1 = require("./routes/cashierRouter");
const cashierQueries_1 = require("./models/cashierQueries");
const app = express_1.default();
dotenv.config();
app.use(bodyParser.json());
app.use("/cashier", cashierRouter_1.cashierRouter);
cashierQueries_1.getTargetCashiers1((err, result) => {
    if (err)
        throw err;
    console.log("Result of getTargetCashiers1 DB request:");
    console.log(result);
});
cashierQueries_1.getTargetCashiers2((err, result) => {
    if (err)
        throw err;
    console.log("Result of getTargetCashiers2 DB request:");
    console.log(result);
});
app.listen(process.env.PORT, () => {
    console.log(`Server started running on port ${process.env.PORT}`);
});
