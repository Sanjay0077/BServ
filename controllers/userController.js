const { validationResult } = require("express-validator");//middlewares it warpsvalidator.js and sanitizer.js
const bcrypt = require('bcryptjs');//create hash password
const dbConnection = require("../utils/dbConnection"); //databaseconnection




//after login enter into  Home Page 
exports.homePage = async (req, res, next) => {
    const [row] = await dbConnection.execute("SELECT * FROM `users` WHERE `id`=?", [req.session.userID]);

    if (row.length !== 1) {
        return res.redirect('/logout');
    }

    res.render('home', {
        user: row[0]
    });
}

//render user signup Register Page
exports.registerPage = (req, res, next) => {
    res.render("register");
};
//database connection
var mysql = require('mysql2');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tws'
});

//admin page view user details
exports.adminpage = (req, res, next) => {


    conn.connect(function (err) {
        if (err) throw err
        conn.query("select * from u_details", function (err, rows, fields) {
            if (err) throw err;
            // console.log(rows);

            res.render("admin", { rows });

        });
    });

};


// User signup Registration
exports.register = async (req, res, next) => {
    const errors = validationResult(req);
    const { body } = req;

    if (!errors.isEmpty()) {
        return res.render('register', {
            error: errors.array()[0].msg
        });
    }

    try {

        const [row] = await dbConnection.execute(
            "SELECT * FROM `users` WHERE `email`=?",
            [body._email]
        );

        if (row.length >= 1) {
            return res.render('register', {
                error: 'This email already in use.'
            });
        }

        const hashPass = await bcrypt.hash(body._password, 12);

        const [rows] = await dbConnection.execute(
            "INSERT INTO `users`(`name`,`email`,`password`) VALUES(?,?,?)",
            [body._name, body._email, hashPass]
        );

        if (rows.affectedRows !== 1) {
            return res.render('register', {
                error: 'Your registration has failed.'
            });
        }

        res.render("register", {
            msg: 'You have successfully registered.'
        });

    } catch (e) {
        next(e);
    }
};

// render Login Page
exports.loginPage = (req, res, next) => {
    res.render("login");
};

// Login User
exports.login = async (req, res, next) => {

    const errors = validationResult(req);
    const { body } = req;

    if (!errors.isEmpty()) {
        return res.render('login', {
            error: errors.array()[0].msg
        });
    }

    try {

        const [row] = await dbConnection.execute('SELECT * FROM `users` WHERE `email`=?', [body._email]);

        if (row.length != 1) {
            return res.render('login', {
                error: 'Invalid email address.'
            });
        }

        const checkPass = await bcrypt.compare(body._password, row[0].password);

        if (checkPass === true) {
            req.session.userID = row[0].id;
            return res.redirect('/');
        }

        res.render('login', {
            error: 'Invalid Password.'
        });


    }
    catch (e) {
        next(e);
    }

}

//add customer in admin page

exports.adduser = (req, res) => {
    res.render("adduser");
}
//insert
exports.save = (req, res) => {
    conn.connect((err, Connection) => {
        if (err) throw err

        const { name, email, phone, gender, vm, vn, ln, service, status } = req.body;
        conn.query("INSERT INTO u_details (name, email, contact_no, gender, v_model, v_no, license_no, service_type,status) VALUES (?,?,?,?,?,?,?,?,?)", [name, email, phone, gender, vm, vn, ln, service, status], (err, rows) => {
            // Connection.release();
            if (!err) {

                res.render("adduser", { msg: "Customer Service booked Successfully" });
            } else {
                console.log("Error in Listing Data" + err);
            }

        });
    });
}


////book service in user page

exports.home = (req, res) => {
    res.render("home");
}
//insert
exports.save1 = (req, res) => {
    conn.connect((err, Connection) => {
        if (err) throw err

        const { name, email, phone, gender, vm, vn, ln, service, status } = req.body;
        conn.query("INSERT INTO u_details (name, email, contact_no, gender, v_model, v_no, license_no, service_type,status) VALUES (?,?,?,?,?,?,?,?,?)", [name, email, phone, gender, vm, vn, ln, service, status], (err, rows) => {
            // Connection.release();
            if (!err) {

                res.render("home", { msg: "Service booked Successfully" });
            } else {
                console.log("Error in Listing Data" + err);
            }

        });
    });
}


//edit user fetch part
exports.editusers = (req, res) => {

    conn.connect(function (err) {
        if (err) throw err
        let id = req.params.id;

        conn.query("select * from u_details where id=?", [id], function (err, rows, fields) {
            if (err) throw err;
            // console.log(rows);
            res.render("editusers", { rows });
        });
    });
}

//edit part-edit user data in admin page
exports.edit = (req, res) => {
    conn.connect(function (err) {
        if (err) throw err
        let id = req.params.id;
        const { name, email, phone, vm, vn, ln, ddate, status } = req.body;
        conn.query("update u_details set name=?, email=?, contact_no=?, v_model=?, v_no=?, license_no=?,delivery_date=?,status=? where id=?", [name, email, phone, vm, vn, ln, ddate, status, id], (err, rows) => {
            // Connection.release();
            if (!err) {
                conn.connect((err, conn) => {
                    if (err) throw err
                    let id = req.params.id;

                    conn.query("select * from u_details where id=?", [id], (err, rows) => {

                        if (!err) {

                            res.render("editusers", { rows, msg: "Customer Details updated Successfully" });
                        } else {
                            console.log("Error in Listing Data" + err);
                        }

                    });
                });

            } else {
                console.log("Error in Listing Data" + err);
            }

        });
    });
}

//delete user in admin page

exports.delete = (req, res) => {
    conn.connect((err, Connection) => {
        if (err) throw err
        let id = req.params.id;
        conn.query("delete from u_details where id=?", [id], (err, rows) => {

            if (!err) {
                res.redirect("/admin");
            } else {
                console.log(err);
            }

        });

    });

};





//admin login page
// enter into admin Page after successfull admin login
exports.homePage1 = async (req, res, next) => {
    const [row] = await dbConnection.execute("SELECT * FROM `admin` WHERE `id`=?", [req.session.userID]);

    if (row.length !== 1) {
        return res.redirect('/logout1');
    }

    res.render('admin', {
        user: row[0]
    });
}

// render adminLogin Page
exports.loginPage1 = (req, res, next) => {
    res.render("adminlogin");
};

//admin Login
exports.login1 = async (req, res, next) => {

    const errors = validationResult(req);
    const { body } = req;

    if (!errors.isEmpty()) {
        return res.render('adminlogin', {
            error: errors.array()[0].msg
        });
    }

    try {

        const [row] = await dbConnection.execute('SELECT * FROM `admin` WHERE `email`=?', [body._email]);

        if (row.length != 1) {
            return res.render('adminlogin', {
                error: 'Invalid email address!.'
            });
        }

        const checkPass = await bcrypt.compare(body._password, row[0].password);

        if (checkPass === true) {
            req.session.userID = row[0].id;
            return res.redirect('admin');
        }

        res.render('adminlogin', {
            error: 'Invalid Password!.'
        });


    }
    catch (e) {
        next(e);
    }

}
//user mail fetch part
exports.adminmail = (req, res) => {

    conn.connect(function (err) {
        if (err) throw err
        let id = req.params.id;

        conn.query("select * from u_details where id=?", [id], function (err, rows, fields) {
            if (err) throw err;
            // console.log(rows);
            res.render("adminmail", { rows });
        });
    });
}