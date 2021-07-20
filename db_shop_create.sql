-- tables
CREATE TABLE CashRegister (
    cashregister_id int NOT NULL,
    cashregister_number int NOT NULL,
    terminal_working bool NOT NULL,
    shop_id int NOT NULL,
    CONSTRAINT cashregister_id PRIMARY KEY (cashregister_id)
);

CREATE TABLE Cashier (
    cashier_id int NOT NULL,
    cashier_name varchar(20) NOT NULL,
    cashier_surname varchar(20) NOT NULL,
    sex varchar(10) NOT NULL,
    age int NOT NULL,
    years_of_experience int NOT NULL,
    previous_place_of_work varchar(20) NULL,
    shop_id int NOT NULL,
    CONSTRAINT cashier_id PRIMARY KEY (cashier_id)
);

CREATE TABLE Scheduler (
    scheduler_id int NOT NULL,
    day_of_week varchar(10) NOT NULL,
    shift_time varchar(10) NOT NULL,
    cashier_id int NOT NULL,
    cashregister_id int NOT NULL,
    CONSTRAINT Scheduler_pk PRIMARY KEY (scheduler_id)
);

CREATE TABLE Shop (
    shop_id int NOT NULL,
    shop_name varchar(20) NOT NULL,
    city varchar(10) NOT NULL,
    address varchar(50) NOT NULL,
    CONSTRAINT shop_id PRIMARY KEY (shop_id)
);

-- foreign keys
-- Reference: CashRegister_Shop (table: CashRegister)
ALTER TABLE CashRegister ADD CONSTRAINT CashRegister_Shop FOREIGN KEY CashRegister_Shop (shop_id)
    REFERENCES Shop (shop_id);

-- Reference: Cashier_Shop (table: Cashier)
ALTER TABLE Cashier ADD CONSTRAINT Cashier_Shop FOREIGN KEY Cashier_Shop (shop_id)
    REFERENCES Shop (shop_id);

-- Reference: Scheduler_CashRegister (table: Scheduler)
ALTER TABLE Scheduler ADD CONSTRAINT Scheduler_CashRegister FOREIGN KEY Scheduler_CashRegister (cashregister_id)
    REFERENCES CashRegister (cashregister_id);

-- Reference: Scheduler_Cashier (table: Scheduler)
ALTER TABLE Scheduler ADD CONSTRAINT Scheduler_Cashier FOREIGN KEY Scheduler_Cashier (cashier_id)
    REFERENCES Cashier (cashier_id);

INSERT INTO Shop VALUES (1,"ATB","Lviv","Shevchenka 100");
INSERT INTO Shop VALUES (2,"Silpo","Kyiv","Bazhana 3A");
INSERT INTO Shop VALUES (3,"Metro","Lviv","Maiborody 11/12");
INSERT INTO Shop VALUES (4,"ATB","Kherson","Yabluneva 5");
INSERT INTO Shop VALUES (5,"ATB","Lviv","Lvivska 77");

INSERT INTO Cashier VALUES (1,"Dasha","Harashchuk","female",20,2,"ATB",1);
INSERT INTO Cashier VALUES (2,"Ihor","Lozhka","male",26,6,"Silpo",1);
INSERT INTO Cashier VALUES (3,"Vika","Zhuk","female",18,0,null,1);
INSERT INTO Cashier VALUES (4,"Masha","Vasilenko","female",38,10,"Metro",2);
INSERT INTO Cashier VALUES (5,"Serhii","Hohlov","male",29,7,"Silpo",2);
INSERT INTO Cashier VALUES (6,"Lena","Mask","female",22,1,"Velmart",3);
INSERT INTO Cashier VALUES (7,"Kolia","Vasilenko","intersex",38,1,"Arsen",4);
INSERT INTO Cashier VALUES (8,"Serhii","Muha","male",29,2,"Silpo",1);
INSERT INTO Cashier VALUES (9,"Lena","Mask","female",22,7,"Arsen",5);

INSERT INTO CashRegister VALUES (1,1,true,1);
INSERT INTO CashRegister VALUES (2,2,true,1);
INSERT INTO CashRegister VALUES (3,3,false,1);
INSERT INTO CashRegister VALUES (4,4,true,1);
INSERT INTO CashRegister VALUES (5,1,true,2);
INSERT INTO CashRegister VALUES (6,2,true,2);
INSERT INTO CashRegister VALUES (7,3,false,2);
INSERT INTO CashRegister VALUES (8,1,true,3);
INSERT INTO CashRegister VALUES (9,2,true,3);
INSERT INTO CashRegister VALUES (10,3,true,3);
INSERT INTO CashRegister VALUES (11,4,false,3);
INSERT INTO CashRegister VALUES (12,5,true,3);

INSERT INTO Scheduler VALUES (1,"Mo","night",1,1);
INSERT INTO Scheduler VALUES (2,"We","day",1,2);
INSERT INTO Scheduler VALUES (3,"Sa","night",1,3);
INSERT INTO Scheduler VALUES (4,"Fr","day",2,4);
INSERT INTO Scheduler VALUES (5,"We","day",3,1);
INSERT INTO Scheduler VALUES (6,"Tu","night",3,2);
INSERT INTO Scheduler VALUES (7,"Mo","day",4,7);
INSERT INTO Scheduler VALUES (8,"Fr","night",4,5);
INSERT INTO Scheduler VALUES (9,"Tu","day",5,6);
INSERT INTO Scheduler VALUES (10,"Su","night",5,7);
INSERT INTO Scheduler VALUES (11,"Mo","night",6,8);
INSERT INTO Scheduler VALUES (12,"We","day",6,10);
INSERT INTO Scheduler VALUES (13,"Sa","night",6,12);
