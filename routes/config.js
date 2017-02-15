var express = require('express');
var router = express.Router();


/* GET config page. */
router.route("/").get(function(req,res){    
    if(!req.session.user){                  
        req.session.error = "please login first"
        res.redirect("/login");             
    } 
    var Capture = global.dbHandel.getModel('capture');
    Capture.find({},{'_id':0,'__v':0},{lean:true},function(err, cursor){
        if (err) {
            console.log("Error:" + err);
        }
        else {
            res.render("config",{title:'Config',data:JSON.stringify(cursor)});
        }
    });
}).post(function(req,res){
	var cname = req.body.cname;
	var lat = Number(req.body.lat);	
	var lng = Number(req.body.lng);
    var Capture = global.dbHandel.getModel('capture');
    if(cname != -1){// insert or update a sensor
        Capture.findOne({'properties.name':cname},function(err,doc){   
            if(err){                                        
                res.send(500);
                console.log(err);
            }else {
                Capture.findOne({"geometry.coordinates":[lng,lat]},function(err,doc){ 
                    if(err){                                        
                        res.send(500);
                        console.log(err);
                    }else {
                        if(doc!=null){//update a sensor
                            var whereStr = {"geometry.coordinates":[lng,lat]};
                            var update     = {$set : {'properties.name' : cname}};
                            var options    = {upsert : true};
                            Capture.update(whereStr, update, options, function(error){
                                if(error) {
                                    console.log(error);
                                } else {
                                    console.log('update ok!');
                                }
                            });
                        }
                        else{//insert a sensor
                            var data = {
                                'type' : 'Feature',
                                'geometry' : {
                                    'type' : 'Point',
                                    'coordinates' : [lng, lat],
                                },
                                'properties' : {
                                    'name' :cname
                                }
                            };
                            Capture.create(data,function(err,doc){ 
                                if (err) {
                                    res.send(500);
                                    console.log(err);
                                } else {
                                    req.session.error = 'success！';
                                    res.send(200);
                                }
                            });
                        }                       
                    }
                });    
    	    }
        });
    }
    else{//delete a sensor
        var whereStr = {"geometry.coordinates":[lng,lat]};
        Capture.remove(whereStr,function(err,result) {
            if(err){
                res.send(500);
                console.log(err);
            }
            else{
                 req.session.error = 'success！';
                 res.send(200);
            }
        });
    }   
});
module.exports = router;
