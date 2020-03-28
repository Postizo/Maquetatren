var socket = io.connect('http://192.168.1.44:8080', { 'forceNew': true });
//Conectamos con el socket y recibimos los datos
socket.on('Seccion1', function(data) {
   console.log(' Me esta llegando este valor: ' + 'Ciudad_' + data.id + ' Estado del led: ' + data.estadoled );
   document.getElementById('Ciudad_' + data.id).checked = data.estadoled;
});

window.onload = function() {
  ini();
 };
 
function ini() {
            fetch('http://192.168.1.44:8080/estadoled')
            .then(res => res.json())
            .then(data => {
				data.forEach(function(element) {
					document.getElementById('Ciudad_' + element.id).checked = element.estadoled;
					document.getElementById('Nombre_' + element.id).innerHTML  = element.Nombre;

				})	                
            })
        } 

// funcion 	ue envia el valor del input
function addMessage(e) {
   
	var idelemento =  e.id.split("_")[1]; 
	var estadoelemento = document.getElementById(e.id).checked;
	var Ciudad = {
		id: idelemento,
		estadoled: estadoelemento		
	}
	console.log(Ciudad);
	socket.emit('Seccion1', Ciudad);
	return false;

}

    

