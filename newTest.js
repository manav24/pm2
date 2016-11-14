var fs = require('fs');
var Hapi = require('hapi');
var zlib = require('zlib');
var replaceExt = require('replace-ext');

const server = new Hapi.Server();
const route = server.select('route');
	
	  const plugin = {
      register: require('./plugin'),
  
  };
server.connection({ port:3000 ,});
  
   server.register(plugin, (err) => {
	    options: {
          
           properties: ['payload']        
			}
    });
 
	  // server.register({
		
		// register: require('./plugin'),
		
		
	 // }, function(err){
		  // if(err) console.log("error in registering the plugin");
	  // });
	  
	  
	  
	  
  
  server.route({
	  method:'POST',
	  path : '/index.html',
	
		  config:{
		  payload:{
			  
			  output :'stream',
			  parse :true,
			  allow :'multipart/form-data', 
			  
		  },
	
		  
		   handler: function(request,reply)
		   {
			   
			   console.log("request received");
			   var data = request.payload;
			   
			     if (data.file) {
                var name = data.file;
                var path = __dirname + "/temp/" + name;
             
				   // var newPath = replaceExt(path, '.json');
 
                     // console.log(newPath);
				
               var file = fs.createWriteStream(path);
                  
                file.on('error', function (err) { 
                    console.error(err) 
                });
                 
                data.file.pipe(file);

                data.file.on('end', function (err) { 
                    var ret = {
                        filename: data.file.hapi.filename,
                        headers: data.file.hapi.headers
                    }
                    reply(JSON.stringify(ret));
                });
            }
			 reply(JSON.stringify("sucessfull"));
		   // }
		   }
	  }  
	  
  });
  
  
  server.start(function () {
    console.log('info', 'Server running at: ' + server.info.uri);
});
