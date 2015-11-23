var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// our db models
var TrailEntry = require("../models/trail.js");

/**
 * GET '/'
 * Default home route. Just relays a success message back.
 * @param  {Object} req
 * @return {Object} json
 */
router.get('/', function(req, res) {

  var jsonData = {
  	'name': 'trail-entry-apiv1',
  	'api-status':'OK'
  }

  // respond with json data
  res.json(jsonData)
});

router.get('/add', function(req,res){

  res.render('add.html')

})

router.get('/directory', function(req,res){

  res.render('directory.html')

})


router.post('/api/create', function(req,res){

console.log("This is the body as requested"+req.body);
 
 var stepObj = {
    stepID: req.body.stepID,
    siteTile: req.body.title,
    favicon: req.body.favicon,
    url: req.body.url,
    note: req.body.note,
  }

  var trailObj = {
    trailID: req.body.trailID,
    title: req.body.title,
    steps: [stepObj], 
  }

 


  // var step = new stepEntry(stepObj);


  var trail = new TrailEntry(trailObj);

  trail.save(function(err,data){
    if(err){
      var error = {
        status: "ERROR",
        message: err
      }
      return res.json(err)
    }

    var jsonData = {
      status: "OK",
      trail: data
    }

    return res.json(jsonData);

  })

})

router.post('/api/add', function(req,res){

console.log("This is the body as requested"+req.body);
 
 var stepObj = {
    stepID: req.body.stepID,
    siteTile: req.body.title,
    favicon: req.body.favicon,
    url: req.body.url,
    note: req.body.note,
  }

  var trailObj = {
    trailID: req.body.trailID,
    title: req.body.title,
    steps: [stepObj], 
  }


  // post.stepEntry.push(stepObj)
  // var stepAdd = post.stepEntry[0];
  // console.log("Step Added" + stepAdd);
  // stepAdd.isNew;
  // post.save(function(err,data){
  //   if(err){
  //     var error = {
  //       status: "ERROR",
  //       message: err
  //     }
  //     return res.json(err)
  //   }

  //   var jsonData = {
  //     status: "OK",
  //     trail: data
  //   }

  //   return res.json(jsonData);

  // })

})

router.get('/api/get-all', function(req,res){

  TrailEntry.find(function(err,data){

      if(err){
        var error = {
          status: "ERROR",
          message: err
        }
        return res.json(err)
      }

      var jsonData = {
        status: "OK",
        trail: data
      }

      return res.json(jsonData);

  })

})

router.get('/', function(req,res){

  // respond with json 
  // res.json(jsonData)

  // render html
  // res.render('directory.html')

  // redirect to new website
  // res.redirect('website url');

})

router.get('/api/get/:trailId', function(req,res){

  // for queries like '/api/get?trailId=123'
  //var requestedTrailId = req.query.trailID;

  // for queries like /api/get/123
  var requestedTrailId = req.params.trailId;


  TrailEntry.find({trailID: requestedTrailId},function(err,data){

      if(err){
        var error = {
          status: "ERROR",
          message: err
        }
        return res.json(error)
      }

      if(data==null || data==""){
        
        var error = {
          status: "NO_RESULTS",
          message: "no results found"
        }
        return res.json(error)        
      }

      var jsonData = {
        status: "OK",
        trail: data
      }

      return res.json(jsonData);

  })

})





module.exports = router;







