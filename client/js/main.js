key = Meteor.settings;

Template.home.onCreated(function(){
	window.peer = new Peer({
		key: 's2b0v17d1s8aor',
		debug: 3,
		config: {'iceServers':[
			{url: 'stun:stun.1.google.com:19302'},
			{url: 'stun:stun1.1.google.com:19302'},
		]}
	});

	peer.on('open', function(){
		$('#myPeerId').text(peer.id);
	});

	peer.on('call', function(incomingCall){
		window.currentCall = incomingCall;
		incomingCall.answer(window.localStream);
		incomingCall.on('stream', function(remoteStream){
			window.remoteStream = remoteStream;
			var video = $("#theirVideo")
			video.attr({'src':URL.createObjectURL(remoteStream)})
		})
	})

	navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

	navigator.getUserMedia({audio:true, video:true}, function(stream){
		var video = document.getElementById("myVideo");
		video.src = URL.createObjectURL(stream);
		window.localStream = stream;
	}, function(error){
		console.log(error);
	})
})