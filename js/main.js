
(function() {
	bayes = new BayesClassifier ();
	for (var i in happySentences)
		bayes.train('happy', happySentences[i]);
	for (var i in sadSentences)
		bayes.train('sad', sadSentences[i]);

	$("#submitSentence").on('click', function () {
		var probObj = bayes.classify ($('#userSentence').val());
		if (probObj.happy > probObj.sad)
			$("#moodVisualization").attr("src","img/happy.png");
		else
			$("#moodVisualization").attr("src","img/sad.png");
		$('#happyValue').html('Happy: ' + probObj.happy);
		$('#sadValue').html('Sad: ' + probObj.sad);
	});
})();