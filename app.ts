import * as dotenv from "dotenv";
import express from "express";
import * as bodyParser from "body-parser";
import {cashierRouter} from "./routes/cashierRouter";
import {getTargetCashiers1, getTargetCashiers2, getAllCashiers} from "./models/cashierQueries";

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use("/cashier", cashierRouter);

getTargetCashiers1((err: Error, result: Object) => {
    if (err) throw err;
    console.log("Result of getTargetCashiers1 DB request:");
    console.log(result);
});

getTargetCashiers2((err: Error, result: Object) => {
    if (err) throw err;
    console.log("Result of getTargetCashiers2 DB request:");
    console.log(result);
});

getAllCashiers((err: Error, result: Object[]) => {
        if (err) throw err;
        console.log("Result of getAllCashiers DB request:");
        console.log(result);
});

app.listen(process.env.PORT, () => {
    console.log(`Server started running on port ${process.env.PORT}`);
});