"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTargetCashiers2 = exports.getTargetCashiers1 = exports.deleteMethod = exports.updateMethod = exports.getAllCashiers = exports.createMethod = void 0;
const db_1 = require("../db");
//Create
const createMethod = (cashier, callback) => {
    console.log("Create method");
    const queryString = "INSERT INTO Cashier (cashier_id, cashier_name, cashier_surname, sex, age, years_of_experience, previous_place_of_work, shop_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    db_1.db.query(queryString, [cashier.cashier_id, cashier.cashier_name, cashier.cashier_surname, cashier.sex, cashier.age, cashier.years_of_experience, cashier.previous_place_of_work, cashier.shop_id], (err, result) => {
        if (err) {
            callback(err);
        }
        ;
        const insertId = result.insertId;
        callback(null, insertId);
    });
};
exports.createMethod = createMethod;
//Read
const getAllCashiers = (callback) => {
    console.log("getAllCashiers method");
    const queryString = `SELECT * FROM Cashier`;
    db_1.db.query(queryString, (err, result) => {
        if (err) {
            callback(err);
        }
        const rows = result;
        const cashiers = [];
        rows.forEach(row => {
            const cashier = {
                cashier_id: row.cashier_id,
                cashier_name: row.cashier_name,
                cashier_surname: row.cashier_surname,
                sex: row.sex,
                age: row.age,
                years_of_experience: row.years_of_experience,
                previous_place_of_work: row.previous_place_of_work,
                shop_id: row.shop_id
            };
            cashiers.push(cashier);
        });
        callback(null, cashiers);
    });
};
exports.getAllCashiers = getAllCashiers;
//Update
const updateMethod = (cashier, callback) => {
    console.log("Update method");
    const queryString = `UPDATE Cashier SET cashier_name=?, cashier_surname=?, sex=?, age=?, years_of_experience=?, previous_place_of_work=?, shop_id=? WHERE cashier_id=?`;
    db_1.db.query(queryString, [cashier.cashier_name, cashier.cashier_surname, cashier.sex, cashier.age, cashier.years_of_experience, cashier.previous_place_of_work, cashier.shop_id, cashier.cashier_id], (err, result) => {
        if (err) {
            callback(err);
        }
        callback(null);
    });
};
exports.updateMethod = updateMethod;
//Delete
const deleteMethod = (cashierId, callback) => {
    console.log("Delete method");
    const queryString = `DELETE FROM Cashier WHERE cashier_id=?`;
    db_1.db.query(queryString, cashierId, (err, result) => {
        if (err) {
            callback(err);
        }
        callback(null);
    });
};
exports.deleteMethod = deleteMethod;
//getTargetCashiers1
/*
вертає усіх касирів магазину за всю історію роботи магазинів
ATB у місті Львів,
які мають більше 5 років досвіду та
раніше працювали у Silpo або Arsen
*/
const getTargetCashiers1 = (callback) => {
    console.log("getTargetCashiers1 method");
    const queryString = `SELECT *
         FROM Cashier
         WHERE years_of_experience > 5 AND (previous_place_of_work="Silpo" OR previous_place_of_work="Arsen")
         AND shop_id IN (
                        SELECT shop_id
                        FROM Shop
                        WHERE shop_name="ATB" AND city="Lviv"
                        )`;
    db_1.db.query(queryString, (err, result) => {
        if (err)
            throw err;
        const rows = result;
        const cashiers = [];
        rows.forEach(row => {
            const cashier = {
                cashier_id: row.cashier_id,
                cashier_name: row.cashier_name,
                cashier_surname: row.cashier_surname,
                sex: row.sex,
                age: row.age,
                years_of_experience: row.years_of_experience,
                previous_place_of_work: row.previous_place_of_work,
                shop_id: row.shop_id
            };
            cashiers.push(cashier);
        });
        callback(null, cashiers);
    });
};
exports.getTargetCashiers1 = getTargetCashiers1;
//getTargetCashiers2
/*
вертає усіх касирів магазину
ATB за адресою Шевенка 100,
які працюють на касах з непарним числом
щопонеділка у нічну зміну (23:00 - 07:00)
 */
const getTargetCashiers2 = (callback) => {
    console.log("getTargetCashiers2 method");
    const queryString = `SELECT *
         FROM Cashier
         WHERE cashier_id IN (
                        SELECT cashier_id
                        FROM Scheduler
                        WHERE day_of_week="Mo" AND shift_time="night" AND cashregister_id IN (
                            SELECT cashregister_id
                            FROM CashRegister
                            WHERE mod(cashregister_number,2) <> 0 AND shop_id IN (
                                SELECT shop_id
                                FROM Shop
                                WHERE shop_name="ATB" AND address="Shevchenka 100"
                            )
                        )
         )`;
    db_1.db.query(queryString, (err, result) => {
        if (err)
            throw err;
        const rows = result;
        const cashiers = [];
        rows.forEach(row => {
            const cashier = {
                cashier_id: row.cashier_id,
                cashier_name: row.cashier_name,
                cashier_surname: row.cashier_surname,
                sex: row.sex,
                age: row.age,
                years_of_experience: row.years_of_experience,
                previous_place_of_work: row.previous_place_of_work,
                shop_id: row.shop_id
            };
            cashiers.push(cashier);
        });
        callback(null, cashiers);
    });
};
exports.getTargetCashiers2 = getTargetCashiers2;
