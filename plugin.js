
var Converter = require("csvtojson").Converter;
 var converter = new Converter({});
 var fs = require('fs');

     var result = {};
	   const internals = {};
 	
	internals.onPostAuth = function (options) {
		console.log("Enter in function");

   return function (request, reply) {
	  
            	 
	 request.payload.file = request.payload.file.pipe(converter);
          

		converter.on("end_parsed", function (jsonArray) {
    console.log(jsonArray);  
      return reply.continue();
		});
 
// converter.on("record_parsed", function(resultRow, rawRow, rowIndex) {
  // var i=0;
    // for (var key in resultRow) {
		
        // if (!result[key] || !result[key] instanceof Array) {
            // result[key] = [];
        // }
        // result[key][rowIndex] = resultRow[key];
    // }
	// )

   // }
  return request.payload.file; 
	   
		 }
	}
 
 exports.register = function (server, options, next) {
	 
	 console.log("start working plugin");
	
        server.ext('onPostAuth', internals.onPostAuth(options));
      next();

 } 



	


exports.register.attributes = {
     name :'test',
		version :'1.0.0'
};

// 'use strict';
  
// var basicRoute = {
	// register: function(server,options,next){
		
		// server.route
		// ({
			// method: 'GET',
			// path :'/',
			// handler:function(){
				 
                    // reply(JSON.stringify("working plugin"));
              
	
              	// }
		// });
	// next();	
		
		
	// }
	
	
// }
// basicRoute.register.attributes={
		// name :'route',
		// version :'1.0.0',
		
	// }
// module.exports = basicRoute;
