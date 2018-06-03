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
    const jwt = require("jsonwebtoken");
    const cors = require("cors");
    const simulation = require("./simulation.js");
    const https = require('https');

    let user;
    let available;
    let devices = {};

    let invalid_tokens = [];

    app.set('secret', 'superSecret_key');
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(cors());

    app.get("/devices/available", getAvailable);
    app.post("/authentication", authenticate);
    app.post("/logout", logout);
    app.put("/password", changePassword);

    app.get("/devices", getDevices);
    app.post("/devices", addDevice);
    app.delete("/devices/:index", deleteDevice);
    app.patch("/devices/:index", moveDevice);
    app.post("/devices/:index/successors", addSuccessor);
    app.delete("/devices/:predecessor/successors/:successor", deleteSuccessor);

    // TODO Create a WebSocket that clients can connect to
    // TODO Check validity of JWT tokens on requests
    var options = {
        key: fs.readFileSync('./cert/localhost.key'),
        cert: fs.readFileSync('./cert/localhost.crt')
    };

    const server = https.createServer(options, app).listen(8081,()=>{
        console.log('HTTPS server started!');
        readUser();
        readAvailable();
        simulation.simulateSmartProduction(devices, sendUpdatedValue);

        const host = server.address().address;
        const port = server.address().port;

        console.log("Server for HTTPS listening at http://%s:%s", host, port);
    });
    var expressWs = require('express-ws');
    var expressWs = expressWs(app, server);
    var aWss = expressWs.getWss('/subscribe');

    app.use(function (req, res, next) {
      console.log('middleware');
      req.testing = 'testing';
      return next();
    });

    app.get('/', function(req, res, next){
      console.log('get route', req.testing);
      res.end();
    });

    app.ws('/subscribe', function(ws, req) {
      ws.on('message', function(msg) {
        var token = JSON.parse(msg).token;
        console.log(token);
        if(token){
          jwt.verify(token, app.get('secret'), {ignoreExpiration: false}, function (err, decoded) {
            if(err || typeof decoded === "undefined" || invalid_tokens.indexOf(token) >= 0){
              ws.send(JSON.stringify({type: 'error'}));
              ws.close();
            }else{
              ws.flag = true;
              var device = JSON.parse(msg).device;
              var value = JSON.parse(msg).value;
              devices[device.index].control.current = value;
              ws.send(JSON.stringify({type: 'success'}));
            }
          });
        }else{
          ws.send(JSON.stringify({type: 'error'}));
          ws.close();
        }
          // try{
          //     var device = JSON.parse(msg).device;
          //     var value = JSON.parse(msg).value;
          //     devices[device.index].control.current = value;
          //     ws.send(JSON.stringify({type: 'success'}));
          // } catch(err) {
          //     ws.send(JSON.stringify({type: 'error'}));
          // }

      });
      console.log('socket', req.testing);
    });

    function logout(req, res){
      var token = req.body.token;
        if (token) {
          jwt.verify(token, app.get('secret'), {ignoreExpiration: false}, function (err, decoded) {
            if (err || typeof decoded === "undefined") {
              res.json({status: 401, message: "Unauthorized"});
            } else {
              invalid_tokens.push(token);
              res.json({status: 200, message: "Logout successfully"});
            }
          });
      } else {
        res.json({status: 401, message: "Unauthorized"});
      }
    }


    /**
     * Send the list of available devices to the client
     * @param req The request
     * @param res The response
     */
    function getAvailable(req, res) {
      if (!available) {
          res.status(500).json({message: "Devices not loaded"});
      } else {
          res.status(200).json(available);
      }
    }

    /**
     * Send the list of previously added devices to the client
     * @param req The request
     * @param res The response
     */
    function getDevices(req, res) {
        res.status(200).json(Object.keys(devices).map(index => devices[index]));
    }

    /**
     * Add a new device
     * @param req The request
     * @param res The response
     */
    function addDevice(req, res) {
        if (devices[req.body.index]) {
            res.status(415).json({message: "Device already exists"});
        } else {
            devices[req.body.index] = {
                index: req.body.index,
                type: req.body.type,
                title: req.body.title,
                position: req.body.position,
                control: req.body.control,
                successors: req.body.successors || []
            };
            res.status(200).json({message: "Device added"});
        }
    }

    /**
     * Delete a previously added device
     * @param req The request
     * @param res The response
     */
    function deleteDevice(req, res) {
        if (!devices[req.params.index]) {
            res.status(404).json({message: "Device does not exist"});
        } else {
            delete devices[req.params.index];
            Object.entries(devices).forEach(([key, device]) => deleteArrayEntry(device.successors, +req.params.index));
            res.status(200).json({message: "Device deleted"});
        }
    }

    /**
     * Update a device's position
     * @param req The request
     * @param res The response
     */
    function moveDevice(req, res) {
        if (!devices[req.params.index]) {
            res.status(404).json({message: "Device does not exist"});
        } else {
            devices[req.params.index].position = req.body.position;
            res.status(200).json({message: "Device position updated"});
        }
    }

    /**
     * Add a connection between two devices
     * @param req The request
     * @param res The response
     */
    function addSuccessor(req, res) {
        if (!devices[req.params.index]) {
            res.status(404).json({message: "Start device does not exist"});
        } else if (!devices[req.body.index]) {
            res.status(400).json({message: "End does not exist"});
        } else {
            devices[req.params.index].successors.push(req.body.index);
            res.status(200).json({message: "Arrow added"});
        }
    }

    /**
     * Delete a connection between two devices
     * @param req The request
     * @param res The response
     */
    function deleteSuccessor(req, res) {
        const device = devices[req.params.predecessor];
        if (device) {
            deleteArrayEntry(device.successors, +req.params.successor);
        }
        res.status(200).json({message: "Arrow deleted"});
    }

    function deleteArrayEntry(array, entry) {
        const index = array.indexOf(entry);
        if (index >= 0) {
            array.splice(index, 1);
        }
    }

    /**
     * Authenticate the user specified in the request
     * @param req The request
     * @param res The response
     */
    function authenticate(req, res) {
        const username = req.body.username, password = req.body.password;

        if (!user) {
            res.status(500).json({message: "User data not loaded"});
        } else if (!username || !password) {
            res.status(400).json({message: "Bad request"});
        } else if (username !== user.username || password !== user.password) {
            res.status(401).json({message: "Bad credentials", errors: {credentials: true}});
        } else {
            // TODO Send a JWT back to the client
            var token = jwt.sign({user}, app.get('secret'), {expiresIn: "10m"});
            res.status(200).json({state: 200, message: "Successfully logged in", token: token});
        }
    }

    /**
     * Change the users password and store it to the login config file
     * @param req The request
     * @param res The response
     */
    function changePassword(req, res) {
        const oldPassword = req.body.oldPassword, newPassword = req.body.newPassword;

        if (!user) {
            res.status(500).json({message: "User data not loaded"});
        } else if (!oldPassword || !newPassword) {
            res.status(400).json({message: "Bad request"});
        } else if (oldPassword !== user.password) {
            res.status(400).json({message: "Old password wrong", errors: {oldPassword: true}});
        } else {
            const data = `username: ${user.username}\npassword: ${newPassword}`;
            fs.writeFile("./resources/login.config", data, {}, function(err) {
                if (err) {
                    console.log("Error writing user config: ", err);
                    res.status(500).json({message: "Password could not be stored"});
                } else {
                    user.password = newPassword;
                    res.status(200).json({message: "Password successfully updated"});
                }
            });
        }
    }

    /**
     * Send the updated value to all connected WebSocket clients
     * @param {number} index The index of the updated device
     * @param value The new value for the device
     */
    function sendUpdatedValue(index, value) {
        // TODO Send the data to connected WebSocket clients
        aWss.clients.forEach(function (client) {
          client.send(JSON.stringify({type: 'data', index: index, value: value}));
        });
    }

    /**
     * Read the user data from the login config file, parse it and store it in 'user'
     */
    function readUser() {
        fs.readFile("./resources/login.config", "utf8", function(err, data) {
            if (err) {
                console.log("Error reading user config: ", err);
            } else {
                const lines = data.split(/\r?\n/),
                    userLine = lines[0],
                    passwordLine = lines[1],
                    username = userLine.substr(userLine.indexOf(":") + 2),
                    password = passwordLine.substr(passwordLine.indexOf(":") + 2);
                user = {
                    username: username,
                    password: password
                };
            }
        });
    }

    /**
     * Read the available devices data from the json file and store it in 'available'
     */
    function readAvailable() {
        fs.readFile("./resources/devices.json", "utf8", function(err, data) {
            if (err) {
                console.log("Error reading available devices: ", err);
            } else {
                available = JSON.parse(data).devices;
            }
        });
    }


})();
