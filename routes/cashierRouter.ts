import express, {Request, Response} from "express";
import * as cashierModel from "../models/cashierQueries";
import {Cashier} from "../types/cashier";

const cashierRouter = express.Router();

//create new cashier
cashierRouter.post("/", async (req: Request, res: Response) => {
    const newCashier: Cashier = req.body;
    cashierModel.createMethod(newCashier, (err: Error, cashierId: number) => {
        if (err) {
            return res.status(500).json({"message": err.message});
        }

        res.status(200).json({"cashierId": cashierId});
    });
});

//get all cashiers
cashierRouter.get("/", async (req: Request, res: Response) => {
    cashierModel.getAllCashiers((err: Error, cashiers: Cashier[]) => {
        if (err) {
            return res.status(500).json({"errorMessage": err.message});
        }
        res.status(200).json({"data": cashiers});
    });
});

//update cashier be cashier id
cashierRouter.put("/:id", async (req: Request, res: Response) => {
    req.body.cashier_id = req.params.id;
    const cashier: Cashier = req.body;
    cashierModel.updateMethod(cashier, (err: Error) => {
        if (err) {
            return res.status(500).json({"message": err.message});
        }

        res.status(200).send();
    })
});

//delete cashier be cashier id
cashierRouter.delete("/:id", async (req: Request, res: Response) => {
    const cashierId: number = Number(req.params.id);
    cashierModel.deleteMethod(cashierId,(err: Error) => {
        if (err) {
            return res.status(500).json({"message": err.message});
        }

        res.status(200).send();
    })
});

export {cashierRouter};