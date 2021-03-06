import {OkPacket, RowDataPacket} from "mysql2";
import {Cashier} from "../types/cashier";
import {db} from "../db";

//Create
export const createMethod = (cashier: Cashier, callback: Function) => {
    const queryString = "INSERT INTO Cashier (cashier_id, cashier_name, cashier_surname, sex, age, years_of_experience, previous_place_of_work, shop_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"

    db.query(
        queryString,
        [cashier.cashier_id, cashier.cashier_name, cashier.cashier_surname, cashier.sex, cashier.age, cashier.years_of_experience, cashier.previous_place_of_work, cashier.shop_id],
        (err, result) => {
            if (err) {
                callback(err)
            }
            ;

            const insertId = (<OkPacket>result).insertId;
            callback(null, insertId);
        }
    );
};

//Read
export const getAllCashiers = (callback: Function) => {
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
                shop_id: row.shop_id
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
        [cashier.cashier_name, cashier.cashier_surname, cashier.sex, cashier.age, cashier.years_of_experience, cashier.previous_place_of_work, cashier.shop_id, cashier.cashier_id],
        (err, result) => {
            if (err) {
                callback(err)
            }
            callback(null);
        }
    );
}

//Delete
export const deleteMethod = (cashierId: number, callback: Function) => {
    const queryString = `DELETE FROM Cashier WHERE cashier_id=?`;
    db.query(
        queryString,
        cashierId,
        (err, result) => {
            if (err) {
                callback(err)
            }
            callback(null);
        }
    );
}

//getTargetCashiers1
/*
???????????? ???????? ?????????????? ???????????????? ???? ?????? ?????????????? ???????????? ??????????????????
ATB ?? ?????????? ??????????,
?????? ?????????? ???????????? 5 ?????????? ?????????????? ????
???????????? ?????????????????? ?? Silpo ?????? Arsen
*/
export const getTargetCashiers1 = (callback: Function) => {
    console.log("getTargetCashiers1 method");
    const queryString =
        `SELECT *
         FROM Cashier
         WHERE years_of_experience > 5 AND (previous_place_of_work="Silpo" OR previous_place_of_work="Arsen")
         AND shop_id IN (
                        SELECT shop_id
                        FROM Shop
                        WHERE shop_name="ATB" AND city="Lviv"
                        )`;
    db.query(queryString, (err, result) => {
        if (err) throw err;

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
                shop_id: row.shop_id
            }
            cashiers.push(cashier);
        });
        callback(null, cashiers);
    });
}

//getTargetCashiers2
/*
???????????? ???????? ?????????????? ????????????????
ATB ???? ?????????????? ?????????????? 100,
?????? ???????????????? ???? ?????????? ?? ???????????????? ????????????
?????????????????????? ?? ?????????? ?????????? (23:00 - 07:00)
 */
export const getTargetCashiers2 = (callback: Function) => {
    console.log("getTargetCashiers2 method");
    const queryString =
        `SELECT *
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
    db.query(queryString, (err, result) => {
        if (err) throw err;

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
                shop_id: row.shop_id
            }
            cashiers.push(cashier);
        });
        callback(null, cashiers);
    });
}
