(function() {
	var http = require("http"),
		url = require("url");

	/*                               url.parse(string).query
	                                           |
	           url.parse(string).pathname      |
	                       |                   |
	                       |                   |
	                     ------ -------------------
	http://localhost:8888/iniciar?foo=bar&hello=world
	                                ---       -----
	                                 |          |
	                                 |          |
	              querystring(string)["foo"]    |
	                                            |
	                         querystring(string)["hello"]
	*/

	exports.iniciar = function(route, handle) {
		var onRequest = function(request, response) {
			var pathname = url.parse(request.url).pathname;
			console.log("Petición para " + pathname + " recibida.");

			request.setEncoding("utf8");
			var dataPosteada = '';
			
			request.addListener("data", function(trozoPosteado) {
				dataPosteada += trozoPosteado;
				console.log("Recibido trozo POST '" + trozoPosteado + "'.");
			});

			request.addListener("end", function() {
				route(handle, pathname, response, dataPosteada);
			});

			/*
			response.writeHead(200, {
				"Content-Type": "text/html"
			});
			response.write("<h1>" + content + "</h1>");
			response.end();
			*/
		};

		http.createServer(onRequest).listen(8888);
		console.log("Servidor Iniciado.");
	};
})();