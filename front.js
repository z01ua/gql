const { config }	= require('./serv-config');

exports.front			= `<html>
	<head>
		<title>Graphql</title>
		<script type="text/javascript">
			window.onload = function() {
				const request 	= document.getElementById('request'),
					response_data = document.getElementById('response-data'),
					response 			= document.getElementById('response'),
					send 			= document.getElementById('send');
				console.log(request, response_data, response);

				request.addEventListener("keyup", function(event) {
				  // Cancel the default action, if needed
				  event.preventDefault();
				  // Number 13 is the "Enter" key on the keyboard
				  if (event.keyCode === 13) {
				    // Trigger the button element with a click
				    send.click();
				  }
			}); 

				send.onclick = function() {
					sendRequest (request.value);
				}

				function sendRequest (request) {
					var xhr = new XMLHttpRequest();
					xhr.responseType = 'json';
					xhr.open("POST", "${config.protocol + config.host + ':' + config.port + config.url}");
					xhr.setRequestHeader("Content-Type", "application/json");
					xhr.setRequestHeader("Accept", "application/json");
					xhr.onload = function () {
					  console.log('data returned:', xhr.response.data);


					  if(response_data && response_data.value && xhr.response.data) {
					  	var data = xhr.response.data;

					  	response_data.value.split('.').forEach(function(key) {
					  		if(data[key]) {
					  			data = data[key];
					  		}
					  		else {
					  			data = false;
					  		}
					  	});

					  	if(data) {
							  response.innerHTML = JSON.stringify(data);
					  	}
					  	else {
							  response.innerHTML = JSON.stringify(xhr.response.data[response_data.value]);
					  	}
					  }
					  else if(xhr.response.data) {
						  response.innerHTML = JSON.stringify(xhr.response.data);
					  }
					  else {
						  response.innerHTML = JSON.stringify(xhr.response);
					  	console.log(xhr);
					  }
					}
					//xhr.send(JSON.stringify({query: "{hotels{items{code}}}"}));
					xhr.send(JSON.stringify({query: request, variables: {filter: {code: "1"}} }));
				}

			};
		</script>
		<style>
			.float-50 {
				float: left;
				width: 50%;	
			}
			.width-90 {
				width: 90%;
			}
			.height-400 {
				height: 400px;
			}
		</style>
	</head>
	<body>
		<h1>
			Graphql
		</h1>
		<div>
			<div class="float-50">
				<h2>requst</h2>
				<div>
					<textarea class="width-90 height-400" id="request">
					</textarea>
				</div>
				<div>
					<button id="send">
						Send
					</button>
				</div>
			</div>
			<div class="float-50">
				<h2>resonse</h2>
				<div>
					<input class="width-90" id="response-data">
				</div>
				<div id="response">
				</div>
			</div>
		</div>
	</body>
</html>`;
