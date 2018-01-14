// Copyright 2018 Juniper Networks, Inc. All rights reserved.
// Licensed under the Juniper Networks Script Software License (the "License"). 
// You may not use this script file except in compliance with the License, which is located at 
// http://www.juniper.net/support/legal/scriptlicense/
// Unless required by applicable law or otherwise agreed to in writing by the parties, 
// software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, 
// either express or implied.

var cors = require('cors');
var express = require('express');
var app = require('express')();
var server = require('http').Server(app);
var bodyParser = require('body-parser');
var multer = require('multer');


app.use(cors());
app.options('*', cors());
app.use(express.static('./public', {redirect:false}));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

server.listen(9595, "0.0.0.0");

app.get('*', function (req, res) {
    res.sendFile('./index.html', {root: __dirname + '/public/'});
});