Template.home.events({
	'click #makeCall': function() {
		var outgoingCall = peer.call($("#remotePeerId").val(), window.localStream);
		window.currentCall = outgoingCall;
		outgoingCall.on('stream', function(remoteStream){
			window.remoteStream = remoteStream;
			var video = document.getElementByid('theirVideo');
			video.src = URL.createObjectURL(remoteStream)
		})
	},

	'click #endCall': function() {
		window.currentCall.close();
	}
})