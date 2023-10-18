var exp = require('express');
//for makking connection with db
var mysql = require('mysql2');

var app = exp();
//for application /url-encoded parsing 
var bp = require('body-parser');

app.use(bp.urlencoded({
	extended: true
}));



// CONNECTION  FOR DATABSE
var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root",
	database: "shoppingdb"
})

//connection established
con.connect(function (err) {
	if (!err)
		console.log('db connected for smart ship crud rest api');
	else
		console.log('db connection failed');
})

//for Get/users api all type of users get selected
app.get('/users', function (req, res) {
	con.query('select * from emp ', function (err, result) {
		if (!err) {
			res.write("<table border=1>");
			result.forEach(function (v) {
				res.write("<tr>");
				res.write("<td>" + v.EMPNO + "</td>");
				res.write("<td>" + v.ENAME + "</td>");
				res.write("<td>" + v.JOB + "</td>");
				res.write("<td>" + v.DEPTNO + "</td>");
				res.write("</tr>");
			});
			res.write("</table>");
			res.end();
		}
	})
});


//NOTE U_id is fname (FIRST NAME)

//GET USER BY USER NAME 
/// API - http://localhost:9000/users/arjun
app.get('/users/:id', function (req, res) {
	const id = req.params.id;
	console.log(id);
	con.query('select * from users where u_id = ?;', [id], function (err, result) {
		if (err) {
			console.error('Error executing the SQL query: ' + err);
			res.status(500).send("Internal Server Error");
		} else if (result.length === 0) {
			res.send("User not found");
		} else {
			res.write("<table border=1>");
			res.write("<tr>");
			res.write("<td>" + "fname" + "</td>");
			res.write("<td>" + "mname" + "</td>");
			res.write("<td>" + "lname" + "</td>");
			res.write("</tr>");
			result.forEach(function (v) {
				res.write("<tr>");
				res.write("<td>" + v.fname + "</td>");
				res.write("<td>" + v.mname + "</td>");
				res.write("<td>" + v.lname + "</td>");
				res.write("</tr>");
			});
			res.write("</table>");
			res.end();
		}
	})
});


// /deleteuser/arjun
/// API - http://localhost:9000/deleteuser/arjun

app.get('/deleteuser/:id', function (req, res) {
	const id = req.params.id;
	console.log(id);
	con.query('delete from users where u_id = ?;', [id], function (err, result) {

		if (err) {
			console.error('Error executing the SQL query: ' + err);
			res.status(500).send("Internal Server Error");
		} else {
			if (result.affectedRows === 0) {
				res.send("User not found");
			} else {
				res.send("User DELETED");
			}
		}

	});

})



// update form 
app.post('/updateuser', function (req, res) {

	const u_id = req.body.u_id;
	const fname = req.body.fname;
	const mname = req.body.mname;
	const lname = req.body.lname;

	console.log(u_id, fname, mname, lname);
	con.query('update  users set fname=?, mname=? , lname=?  where u_id = ?;', [fname, mname, lname, u_id], function (err, result) {

		if (err) {
			console.error('Error executing the SQL query: ' + err);
			res.status(500).send("Internal Server Error");

		} else {
			if (result.affectedRows === 0) {
				res.send("User not update");
			} else {
				res.send("User successfully update");
			}

		}
	})
})


// check for id and retrun form for update
/// API - http://localhost:9000/userup/arjun

app.get('/userup/:u_id', function (req, res) {
	const id = req.params.u_id;
	console.log(id);
	con.query('select *  from users where u_id = ?;', [id], function (err, result) {

		if (err) {
			console.error('Error executing the SQL query: ' + err);
			res.status(500).send("Internal Server Error");

		} else {
			if (result.length === 0) {
				res.send("User not found");
			} else {
				res.sendFile(__dirname + "/updateuser.html");
			}

		}

	})

})

//for Login credintials
/// API - http://localhost:9000/login

app.get('/login', function (req, res) {
	res.sendFile(__dirname + "/loginform.html");
})

//actually i didnt get actual database that y i didnt get complete put and post methods
//for checking by post method  
app.post('/logincheck', function (req, res) {

	const u_id = req.body.uid;
	const pass = req.body.pwd;

	con.query('select *  from users where u_id = ? and password = ? ;', [u_id, pass], function (err, result) {

		if (err) {
			console.error('Error executing the SQL query: ' + err);
			res.status(500).send("Internal Server Error");

		} else {
			if (result.length == 0) {
				res.send("unccessful login");
			} else {
				res.send("succesfull to achieve your goal");
			}
		}
	});
})

//this is for error handling
app.all('*', function (req, res) {
	res.send("URL incorrect")
})


app.listen(9000, function () {
	console.log("exp server started at 9000 for smart ship rest api");
})
// I am applying
// for the above position with your company as it role I can perform exceptionally well to a high standard.

// In addition to being a strong communicator and team worker, I am the type of person who understands how vital my performance within the role is to the success of your company.

// If I succeed in my application, I assure you that I will perform all my duties to an exemplary standard to quickly became a team member who contributes positively to the organization 's objectives.

// Your faithfully.
// Tarun Rathore