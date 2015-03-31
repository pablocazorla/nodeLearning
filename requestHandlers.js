(function() {
	var exec = require("child_process").exec,
		querystring = require("querystring");


	var iniciar = function(response) {
			console.log("Manipulador de petición 'iniciar' ha sido llamado.");
			// funciones no bloqueantes
			exec("find /", {
					timeout: 10000,
					maxBuffer: 20000 * 1024
				},
				function(error, stdout, stderr) {
					response.writeHead(200, {
						"Content-Type": "text/html"
					});
					response.write(stdout);
					response.end();
				});
		},
		formulario = function(response) {
			console.log("Manipulador de peticiones 'formulario' fue llamado.");

			var ht = '<html><head><meta http-equiv="Content-Type" content="text/html; charset = UTF - 8 " /></head><body>';

			ht += '<form action="/subir" method="post"><textarea name="text" rows="20" cols="60"></textarea><br><input type="submit" value="Enviar texto" /></form>';
			ht += '</body></html>';

			response.writeHead(200, {
				"Content-Type": "text/html"
			});
			response.write(ht);
			response.end();
		},
		subir = function(response, postData) {
			console.log("Manipulador de petición 'subir' ha sido llamado.");
			// funciones no bloqueantes
			exec("ls -lah", function(error, stdout, stderr) {
				response.writeHead(200, {
					"Content-Type": "text/html"
				});
				response.write("Tu enviaste el texto: : " +
					querystring.parse(postData)["text"]);

				response.end();
			});
		};

	exports.iniciar = iniciar;
	exports.formulario = formulario;
	exports.subir = subir;
})();