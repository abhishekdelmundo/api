const express = require('express')
const compiler = require('compilex')
const bodyP = require('body-parser')
const options = { stats: true}
compiler.init(options)



const app = express()
const port = 3006



app.use(bodyP.json())
app.get('/', (req, res) => res.send('Hello World!'))


app.post('/api', (req, res)=> {
   var code = req.body.code
   var input = req.body.input
   var lang = req.body.lang
   try {
      if(lang == "Cpp"){
         if(!input){
            var envData = { OS : "linux" , cmd : "gcc" }; // ( uses gcc command to compile )
            compiler.compileCPP(envData , code , function (data) {
               
               if(data.output){
                  res.send(data);
               } else {
                  res.send({message : "Data not synced"})
               }
            });
         } else {
            var envData = { OS : "linux" , cmd : "gcc" }; // ( uses gcc command to compile )
            compiler.compileCPPWithInput(envData , code , input , function (data) {
               if(data.output){
                  res.send(data);
               } else {
                  res.send({message : "Data not synced"})
               }
            });
         }
      } else if(lang == "Java"){
         if(!input){
            var envData = { OS : "linux" }; // (Support for Linux in Next version)
            compiler.compileJava( envData , code , function(data){
               if(data.output){
                  res.send(data);
               } else {
                  res.send({message : "Data not synced"})
               }
            });
         } else{
            var envData = { OS : "linux" }; 
            compiler.compileJavaWithInput( envData , code , input ,  function(data){
               if(data.output){
                  res.send(data);
               } else {
                  res.send({message : "Data not synced"})
               }
            });
         }
      } else if(lang == "Python") {
         if(!input){
            var envData = { OS : "linux" }; // (Support for Linux in Next version)
            compiler.compilePython( envData , code , function(data){
               if(data.output){
                  res.send(data);
               } else {
                  res.send({message : "Data not synced"})
               }
            });
         } else {
            var envData = { OS : "linux" }; 
            compiler.compilePythonWithInput( envData , code , input ,  function(data){
               if(data.output){
                  res.send(data);
               } else {
                  res.send({message : "Data not synced"})
               }       
            });
         }
      }

   } catch(e){
      console.log(e);
   }
})

app.listen(3009, ()=> console.log("server started"))