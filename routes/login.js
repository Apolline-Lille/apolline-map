var express = require('express');
var router = express.Router();

/* GET login page. */
router.route('/').get(function(req,res){    
	res.render("login",{title:'User Login'});
}).post(function(req,res){ 					   
	var User = global.dbHandel.getModel('user');  
	var uname = req.body.uname;				
	User.findOne({name:uname},function(err,doc){   
		if(err){ 										
			res.send(500);
			console.log(err);
		}else if(!doc){ 								
			req.session.error = 'Cannot find the user';
			res.send(404);							
		}else{ 
			if(req.body.upwd != doc.password){ 	
				req.session.error = "Your password is wrong";
				res.send(404);
			}else{ 									
				req.session.user = doc;
				res.send(200);
			}
		}
	});
});

module.exports = router;