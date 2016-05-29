
(function() {
	var currentTextType = 'No data loaded yet';
	function getRandomInt(min, max) {return Math.floor(Math.random() * (max - min + 1) + min);}
	function randomBool () {return Math.random()<.5;}

	//bayes = new BayesClassifier ();
	
	var tempTextI, tempSpamI;
	/*for (var i = 0; i < 200; i++) {
		tempTextI = getRandomInt(0, hamArr.length);
		bayes.train('text', hamArr[tempTextI].text);
		hamArr.splice(tempTextI, 1);
		tempSpamI = getRandomInt(0, spamArr.length)
		bayes.train('spam', spamArr[tempSpamI].text);
		spamArr.splice(tempSpamI, 1);
	}*/

	for (var i = 0; i < 200; i++) {
		tempTextI = getRandomInt(0, hamArr.length);
		Bayes.train(hamArr[tempTextI].text, 'text');
		hamArr.splice(tempTextI, 1);
		tempSpamI = getRandomInt(0, spamArr.length)
		Bayes.train(spamArr[tempSpamI].text, 'spam');
		spamArr.splice(tempSpamI, 1);
	}

	/*for (var i in hamArr)
		bayes.train('happy', hamArr[i].text);
	for (var i in spamArr)
		bayes.train('sad', spamArr[i].text);*/
	/*for (var i in boyNames)
		bayes.train('boy', boyNames[i]);
	for (var i in girlNames)
		bayes.train('girl', girlNames[i]);*/

	$("#submitSentence").on('click', function () {
		//var probObj = bayes.classify ($('#userSentence').val());
		var probObj = Bayes.guess ($('#userSentence').val());
		console.log(probObj);
		if (probObj.text > probObj.spam)
			$("#moodVisualization").attr("src","img/happy.png");
		else
			$("#moodVisualization").attr("src","img/sad.png");

		$('#happyValue').html('Text: ' + probObj.text);
		$('#sadValue').html('Spam: ' + probObj.spam);
	});

	$("#newSentence").on('click', function () {
		var tempArr = [];
		if (randomBool()) tempArr = hamArr;
		else tempArr = spamArr;
		var tempNum = getRandomInt(0, tempArr.length);
		currentTextType = tempArr[tempNum].label === 'ham' ? 'Text' : 'Spam';
		$('#userSentence').val(tempArr[tempNum].text);
		tempArr.splice(tempNum, 1);
	});

	$('#realAnswer').on('click', function() {
		Messenger().info(currentTextType);
	});
})();