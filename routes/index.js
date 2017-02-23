var express = require('express');
var router = express.Router();
const Influx = require('influx');
var async = require('async');

/* GET index page. */
router.get('/', function(req, res,next) {
  var Capture = global.dbHandel.getModel('capture');
  let arr = [];
	const influx = new Influx.InfluxDB({
 		  host: 'apolline.lille.inria.fr',
  		database: 'apolline',
  		port: 8086,
    	schema: [
    	{
      		measurement: 'events.stats.bureau107',
      		fields: {
      			CO2:Influx.FieldType.FLOAT,
      			temperature:Influx.FieldType.FLOAT,
      			voltage:Influx.FieldType.FLOAT
      		},
      		tags: [
      			'location'
      		]
    	}
  		]
	});

  let measurements = [];
  influx.getMeasurements().then(names => {
    measurements = names;
    async.map(measurements,getCoordinates,function(err, results) { 
      console.log(arr);
      res.render('index', { title: 'Express',coordinates:JSON.stringify(arr),length:arr.length}); 
    });
  });

  getCoordinates = function(measurement,callback){
    influx.query('SHOW TAG VALUES FROM ' + '"' + measurement+ '"'+' WITH KEY = location').then(results => {
      location = results[0]["location"];
      Capture.find({"properties.name":location},{'_id':0,'__v':0},{lean:true},function(err,doc) {          
        if(doc.length!=0){
           arr.push(doc[0]["geometry"]["coordinates"]);
        }
        callback(null,arr);
      });
    }); 
  };
/*    getCoordinates = function(measurement,callback){
            influx.query('select CO2 from '+ '"'+measurement+'"'+ ' limit 1').then(results => {
              if(results.length!=0){
              console.log(results[0]["CO2"]);
              let co2 = results[0]["CO2"];
              if(co2<500)
                count = 3;
              else if(co2<1000)
                count = 5;
              else if(co2<1500)
                count = 7;
              else
                count = 8;
              arr.push(count);
            }
            callback(null,arr);
            });
          };*/

           /*getCoordinates = function(measurement,callback){
      influx.query('SHOW TAG VALUES FROM ' + '"' + measurement+ '"'+' WITH KEY = location').then(results => {
        location = results[0]["location"];
        Capture.find({"properties.name":location},{'_id':0,'__v':0},{lean:true},function(err,doc) {
          if(doc.length!=0){
            influx.query('select CO2 from '+ '"'+measurement+'"'+ ' limit 1').then(results => {
              let co2 = results[0]["CO2"];
              if(co2<500)
                count = 3;
              else if(co2<1000)
                count = 5;
              else if(co2<1500)
                count = 7;
              else
                count = 8;
              var temps = doc[0]["geometry"]["coordinates"];
              temps.push(count);
              arr.push(temps);
                        callback(null,arr);

            });
          }
        });
      }); 
    };*/
        
});

/* GET home page. */
router.get("/home",function(req,res){ 
	if(!req.session.user){ 					//verify if authentication first
    req.session.error = "please login first"
    res.redirect("/login");       //if not, direct to /login
	}
	var Capture = global.dbHandel.getModel('capture');
    Capture.find({},{'_id':0,'__v':0},{lean:true},function(err, cursor){
        if (err) {
            console.log("Error:" + err);
        }
        else {
        	res.render("home",{title:'Home',data:JSON.stringify(cursor)});
        }
    });
});


module.exports = router;
