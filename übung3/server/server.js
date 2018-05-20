/*jslint node: true */
/*jslint esversion: 6*/
/*jslint eqeqeq: true */

/* global require */

(function() {
    "use strict";

    const express = require("express");
    const app = express();
    const fs = require("fs");

    const bodyParser = require("body-parser");
    const cors = require("cors");

    let user = {username: "", password: ""}
    let available;

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(cors());

    // TODO add REST methods
    app.post('/authenticate', function (req, res) {
      authenticate(req,res);
    });
    app.post('/changePassword', function (req, res) {
      changePassword(req,res);
    });
    app.get('/getAvailable', function (req, res) {
      getAvailable(req,res);
    });

    /**
     * Send the list of available devices to the client
     * @param req The request
     * @param res The response
     */
    function getAvailable(req, res) {
        res.send(available);
    }

    /**
     * Authenticate the user specified in the request
     * @param req The request
     * @param res The response
     */
    function authenticate(req, res) {
        res.send(req.body.username == user.username && req.body.password == user.password);
    }

    /**
     * Change the users password and store it to the login config file
     * @param req The request
     * @param res The response
     */
    function changePassword(req, res) {

        if (user.password == req.body.oldPassword){

          user.password = req.body.newPassword;
          var credentials = "username: "+user.username+"\npassword: "+user.password;

          fs.writeFile('./resources/login.config', credentials, 'utf8', (err) => {
            if (err) throw err;


            res.send(true);
          });


        }else{
          //TODO error: Passwörter stimmen nicht überein
          res.send(false);
        }


    }

    /**
     * Read the user data from the login config file, parse it and store it in 'user'
     */
    function readUser() {

        fs.readFile('./resources/login.config', 'utf8', function(err, data) {
          if (err) throw err;


          var startIndexU = 10;//username:
          var endIndexU = -1;
          var startIndexP = data.search("password: ") + 10;
          var endIndexP = data.length;

          //line-Endings \n oder \r\n
          if (data.search("\r\n") == -1){
            endIndexU = data.indexOf("\n");

          }else{
            endIndexU = data.indexOf("\r\n");
          }

          if (endIndexU == -1){
            //error
          }

          user.username = data.slice(startIndexU, endIndexU);
          user.password = data.slice(startIndexP, endIndexP);


        });


    }

    /**
     * Read the available devices data from the json file and store it in 'available'
     */
    function readAvailable() {

        fs.readFile('./resources/devices.json', 'utf8', function(err, data) {
          if (err) throw err;
          available = JSON.parse(data);

        });

    }

    const server = app.listen(8081, function() {
        readUser();
        readAvailable();

        const host = server.address().address;
        const port = server.address().port;
        console.log("Big Smart Production Server listening at http://%s:%s", host, port);
    });
})();
