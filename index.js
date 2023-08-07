const express = require('express');
const app = express();
const passport = require('passport');
const cookieSession = require('cookie-session');
require('./db/googleauth')
require('./db/config');
const cors = require('cors');
const User = require('./db/User');
const Userdetail = require('./db/Userdetail');
const Problems = require('./db/Problem');
const bodyParser = require('body-parser');
const Jwt = require('jsonwebtoken');
const Key = "rohit#1290";
const bcrypt = require('bcrypt');
require('./forgetpass');
const nodemailer = require('nodemailer');



app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))
app.use(express.json());
app.use(cors());



// signup api.............
app.post('/register', async (req, resp) => {
    const {name, email, password,cpassword
        } = req.body;
            // resp.send("nothing")

        const existingUser = await User.findOne({email});
        const usernm = await User.findOne({name});
        if(existingUser){
            return resp.status(400).json({
                success:false,
                message:'User already Exists',
            });
        }
        if(usernm){
            return resp.status(400).json({
                success:false,
                message:'Username not available',
            });
        }


    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    delete result.cpassword;
    Jwt.sign({ result }, Key, { expiresIn: '50h' }, (err, token) => {
        if (err) {
            return resp.status(400).json({
                success:false,
                message:'something went wrong please try again...',
            });

        }
        return resp.status(400).json({
            success:true,
            result,
            verify:token
        });

    });
});

// Login api*******************************************************
app.post('/login', async (req, resp) => {
    if (req.body.email && req.body.name && req.body.password) {
        let user = await User.findOne({ email: req.body.email });

        if (user) {
            const checkpassword = await bcrypt.compare(req.body.password, user.password);
            console.log(checkpassword);
            if (checkpassword) {
                Jwt.sign({ user }, Key, { expiresIn: '50h' }, (err, token) => {
                    if (err) {
                        resp.send({ result: "something went wrong please try again..." })
                    }
                    resp.send({ user, verify: token });
                });
            }
        }
        else {
            resp.send({ result: "user not found" });
        }
    }
    else {
        resp.send({ result: "please provide all details" });
    }

});

// to save user personal details.........****************************************

app.put('/profilepage/:id', verifytoken, async (req, resp) => {
    // const id=req.params.id;

    let result = await Userdetail.findOne({ username: req.params.id });
    if (result) {
        let result = await Userdetail.updateOne(
            { username: req.params.id },
            {
                $set: req.body
            }
        )
        resp.send(result).status(200);
    }
    else {
        let userdetail = new Userdetail(req.body);
        userdetail.username = req.params.id;
        let result = await userdetail.save();
        resp.send(result);
    }


});

// to show personal info saved in db.........************************************

app.get("/profilepage/:id", verifytoken, async (req, resp) => {
    let result = await Userdetail.findOne({ username: req.params.id });
    if (result) {
        return resp.status(400).json({
            success:true,
            result,
        });

    }
    else {
        return resp.status(400).json({
            success:false,
            message:'nothing found',
        });

    }
});

// To display list of the questions.......*************************************

app.get("/:type", verifytoken, async (req, resp) => {

    let problems = await Problems.find(
        {
            "$or": [
                { type: { $regex: req.params.type } },
                { topic: { $regex: req.params.type } }

            ]
        }
    );
    if (problems.length > 0) {
        resp.send(problems);
    }
    else {
        resp.send("no question found");
    }

});
//to post problem .......************************************************
app.post('/', verifytoken, async (req, resp) => {
    let problem = new Problems(req.body);
    let result = await problem.save();
    resp.send(result);
});

// to render the content of the problem................********************

app.get('/problem/:id', verifytoken, async (req, resp) => {
    let result = await Problems.findOne({ _id: req.params.id });
    if (result) {
        resp.send(result);
    }
    else
        resp.send({ result: "no record found" });
});


// api to update status of the problem.......************************************
app.put('/problem/:id', async (req, resp) => {
    let result = await Problems.findOne({ _id: req.params.id });
    if (result) {
        let result = await Problems.updateOne(
            { _id: req.params.id },
            {
                $set: req.body
            }
        )
        resp.send(result).status(200);
    }
    // resp.send("working");
});

// Api to show the solved question list and favorites.........********************

app.get("/user/lists", async (req, resp) => {

    let problems = await Problems.find({});
    if (problems.length > 0) {
        resp.send(problems);
    }
    else {
        resp.send("no question found");
    }

});



// // middleware fuction of authentication........********************************

function verifytoken(req, resp, next) {
    let token = req.headers['authorization'];

    if (token) {
        token = token.split(' ')[1];
        console.log(token);
        Jwt.verify(token, Key, (err, valid) => {
            if (err) {
                resp.status(401).send({ result: "Please provide correct token to moov ahead..." });
            }
            else {
                next();
            }
        })
    }
    else {
        resp.status(403).send({ result: "Please provide token with headrs" });
    }
};



// auth google


// var session = require('express-session')
// app.use(session({
//     secret: 'rohitsinghgour',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false }
//   }))

// app.use(passport.initialize());
// app.use(passport.session());

// app.get('/auth' , passport.authenticate('google', { scope:
//     [ 'email', 'profile' ]
// }));

// // Auth Callback
// app.get( '/auth/callback',
//     passport.authenticate( 'google', {
//         successRedirect: '/auth/callback/success',
//         failureRedirect: '/auth/callback/failure'
// }));
// // Success 
// app.get('/auth/callback/success' , (req , res) => {
//     if(!req.user)
//         res.redirect('/auth/callback/failure');
//     res.send("Welcome " + `${req.user.displayName}`);
// });

// // failure
// app.get('/auth/callback/failure' , (req , res) => {
//     res.send("Error");
// })
// app.get('/', (req, res) => {
//     res.send("<button><a href='/auth'>Login With Google</a></button>")
// });

// API for getting data and managing forget password

app.post('/forget-link', async (req, resp) => {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        return resp.send({ result: "user not found" });
    }
    const resetToken = Jwt.sign({ user }, Key, { expiresIn: '5m' });
    user.resetToken = resetToken;
    console.log(user.resetToken);
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 465,
    secure: true,
        auth: {
            user: 'rsg.050804@gmail.com',
            pass: 'kqnppmtqdzsgifoh'
        }
    });

    // Send an email to the user with a link that includes the reset token
    const resetUrl = `http://localhost:3000/reset-link/?email=${req.body.email}`;
    var mailOptions = {
        from: 'rsg.050804@gmail.com',
        to: req.body.email,
        subject: 'Reset Your Password',
        text: `Click this link to reset your password: ${resetUrl}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            return resp.status(500).send({ result: 'Error sending email' });
        }
        console.log('Email sent:', info.response);
        resp.send({ user: resetToken });
    });


})

// API to reset the password.......**********************************
app.put('/reset-link', async (req, resp) => {
    let result = await User.findOne({ email: req.query.email });
    const {password,cpassword}=req.body;
    if (result) {
      let  hashedPassword = await bcrypt.hash(password, 10);
        let result = await User.updateOne(
            { email: req.query.email },
            {
                $set: {password:hashedPassword, cpassword:hashedPassword}
            }
        )
        resp.send(result).status(200);
    }
    
});

// API to display solved problems .......*****************************
app.get("/user/:tag", async (req, resp) => {

    let problems = await Problems.find(
        {
            "$or": [
                { solvers: { $in: [req.params.tag] }  }
            ]
        }
    );
    if (problems.length > 0) {
        resp.send(problems);
    }
    else {
        resp.send({problems:"not found"});
    }

});
app.get("/liked/:tag", async (req, resp) => {

    let problems = await Problems.find(
        {
            "$or": [
                { starlist: { $in: [req.params.tag] }  }
            ]
        }
    );
    if (problems.length > 0) {
        resp.send(problems);
    }
    else {
        resp.send({problems:"not found"});
    }

});


app.listen(5800);



