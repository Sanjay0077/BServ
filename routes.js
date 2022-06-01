const router = require("express").Router();
const { body } = require("express-validator");
const usercontroller = require("./controllers/userController"); //to connect usercontroller

const {
    homePage,
    homePage1,
    register,
    registerPage,
    login,
    loginPage,
    loginPage1,
    login1,
    adminpage,
    datapage
    
} = require("./controllers/userController");
//user not logged in
const ifNotLoggedin = (req, res, next) => {
    if(!req.session.userID){
        return res.redirect('/login');
    }
    next();
}
//after login redirect page
const ifLoggedin = (req,res,next) => {
    if(req.session.userID){
        console.log(userID);
        return res.redirect('/');
    }
    next();
}
//router for homepage
router.get('/', ifNotLoggedin, homePage);
// router.get('/datapage', ifLoggedin, datapage);

//login
router.get("/login", ifLoggedin, loginPage);
router.post("/login",
ifLoggedin,
    [
        body("_email", "Invalid email address")
            .notEmpty()
            .escape()
            .trim()
            .isEmail(),
        body("_password", "The Password must be of minimum 8 characters length")
            .notEmpty()
            .trim()
            .isLength({ min: 8 }),
    ],
    login
);
//signup
router.get("/signup", ifLoggedin, registerPage);
router.post(
    "/signup",
    ifLoggedin,
    [
        body("_name", "The name must be of minimum 3 characters length")
            .notEmpty()
            .escape()
            .trim()
            .isLength({ min: 3 }),
        body("_email", "Invalid email address")
            .notEmpty()
            .escape()
            .trim()
            .isEmail(),
        body("_password", "The Password must be of minimum 8 characters length")
            .notEmpty()
            .trim()
            .isLength({ min: 8 }),
    ],
    register
);

router.get('/logout', (req, res, next) => {
    req.session.destroy((err) => {
        next(err);
    });
    res.redirect('/login');
});




//view all record
router.get("/admin", usercontroller.adminpage);

//add user record in admin page
router.get("/adduser", usercontroller.adduser);
router.post("/adduser", usercontroller.save);

//update user

router.get("/editusers/:id",usercontroller.editusers);
router.post("/editusers/:id",usercontroller.edit);

//delete
router.get("/deleteuser/:id",usercontroller.delete);

//add user in user page
//add record
router.get("/home", usercontroller.home);
router.post("/home", usercontroller.save1);

router.get("/adminmail/:id",usercontroller.adminmail);

//admin login

const ifNotLoggedin1 = (req, res, next) => {
    if(!req.session.userID){
        return res.redirect('adminlogin');
    }
    next();
}

const ifLoggedin1 = (req,res,next) => {
    if(req.session.userID){
        console.log(userID);
        return res.redirect('admin');
    }
    next();
}

router.get('/admin', ifNotLoggedin1, homePage1);
// router.get('/datapage', ifLoggedin, datapage);


router.get("/adminlogin", ifLoggedin1, loginPage1);
router.post("/adminlogin",
ifLoggedin1,
    [
        body("_email", "Invalid email address")
            .notEmpty()
            .escape()
            .trim()
            .isEmail(),
        body("_password", "The Password must be of minimum 4 characters length")
            .notEmpty()
            .trim()
            .isLength({ min: 8 }),
    ],
    login1
);
//admin logout
router.get('/logout1', (req, res, next) => {
    req.session.destroy((err) => {
        next(err);
    });
    res.redirect('/adminlogin');
});
module.exports = router;