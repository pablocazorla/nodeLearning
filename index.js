var server = require("./server"),
	router = require("./router"),
	requestHandlers = require("./requestHandlers");


var handle = {};

handle["/"] = requestHandlers.iniciar;
handle["/iniciar"] = requestHandlers.iniciar;
handle["/formulario"] = requestHandlers.formulario;
handle["/subir"] = requestHandlers.subir;

server.iniciar(router.route, handle);