"use strict";
const http=require("http");
const fs=require("fs");
const path=require("path");
const root=path.join(__dirname,"web");
const dataFile=path.join(__dirname,"ramadan-data.json");
const server=http.createServer(function(req,res){if(req.url==="/ramadan-data.json"){return fs.readFile(dataFile,function(err,data){if(err){res.writeHead(404);return res.end("Not Found");}res.writeHead(200,{"Content-Type":"application/json; charset=utf-8"});res.end(data);});}let file=req.url==="/"?"index.html":req.url.slice(1);file=path.join(root,file);if(!file.startsWith(root)){res.writeHead(403);return res.end("Forbidden");}fs.readFile(file,function(err,data){if(err){res.writeHead(404);return res.end("Not Found");}res.writeHead(200);res.end(data);});});
server.listen(3000,"127.0.0.1",function(){console.log("Ramadan Emsakiah: http://127.0.0.1:3000");});