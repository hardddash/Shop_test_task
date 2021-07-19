import {OkPacket, RowDataPacket} from "mysql2";
import {Cashier} from "../types/cashier";
import {db} from "../db";

//Create
export const createMethod = (cashier: Cashier, callback: Function) => {
    const queryString = "INSERT INTO Cashier (cashier_id, cashier_name, cashier_surname, sex, age, years_of_experience, previous_place_of_work, shop_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"

    db.query(
        queryString,
        [cashier.cashier_id, cashier.cashier_name, cashier.cashier_surname, cashier.sex, cashier.age, cashier.years_of_experience, cashier.previous_place_of_work, cashier.shop.shop_id],
        (err, result) => {
            if (err) {
                callback(err)
            };

            const insertId = (<OkPacket>result).insertId;
            callback(null, insertId);
        }
    );
};

//Read
export const readMethod = (callback: Function) => {
    const queryString = `SELECT * FROM Cashier`

    db.query(queryString, (err, result) => {
        if (err) {
            callback(err)
        }

        const rows = <RowDataPacket[]>result;
        const cashiers: Cashier[] = [];

        rows.forEach(row => {
            const cashier: Cashier = {
                cashier_id: row.cashier_id,
                cashier_name: row.cashier_name,
                cashier_surname: row.cashier_surname,
                sex: row.sex,
                age: row.age,
                years_of_experience: row.years_of_experience,
                previous_place_of_work: row.previous_place_of_work,
                shop: row.shop.shop_id
            }
            cashiers.push(cashier);
        });
        callback(null, cashiers);
    });
}

//Update
export const updateMethod = (cashier: Cashier, callback: Function) => {
    const queryString = `UPDATE Cashier SET cashier_name=?, cashier_surname=?, sex=?, age=?, years_of_experience=?, previous_place_of_work=?, shop_id=? WHERE cashier_id=?`;

    db.query(
        queryString,
        [cashier.cashier_id, cashier.cashier_name, cashier.cashier_surname, cashier.sex, cashier.age, cashier.years_of_experience, cashier.previous_place_of_work, cashier.shop.shop_id],
        (err, result) => {
            if (err) {
                callback(err)
            }
            callback(null);
        }
    );
}

//Delete
export const deleteMethod = (cashier: Cashier, callback: Function) => {
    const queryString = `DELETE Cashier WHERE cashier_id=?`;
    db.query(
        queryString,
        (err, result) => {
            if (err) {
                callback(err)
            }
            callback(null);
        }
    );
}