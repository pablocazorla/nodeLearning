(function() {
	exports.route = function(handle, pathname,response,postData) {
		console.log("A punto de rutear una peticion para " + pathname);
		if (typeof handle[pathname] === 'function') {
			handle[pathname](response,postData);
		} else {
			console.log("No se encontro manipulador para " + pathname);
			response.writeHead(404, {
				"Content-Type": "text/html"
			});
			response.write("<h1>Error 404</h1>");
			response.end();
		}
	};
})();