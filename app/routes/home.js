/*jshint loopfunc:true, camelcase:false */
'use strict';
//var User = require('../models/user');

exports.index = function(req, res){
  req.session.destroy(function(){
    res.render('home/index', {title: 'ProjectLapis!'});
  });
};

exports.login = function(req, res){
  res.render('user/auth', {title: 'Welcome back to ProjectLapis! Please Login'});
};
