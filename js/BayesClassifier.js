"use strict";

var BayesClassifier = function () {
	this.labels = {};
	this.words = {};
	this.docNum = 0;
	this.tokenize = function (doc) {
		var temp = doc.toLowerCase().replace('.','')
									.replace(',','')
									.replace('\'','')
									.replace('!','')
									.replace('?','')
									.replace(':','')
									.replace(';','')
									.split(' ');
		for (var i = 0; i < temp.length; i++) {
			for (var x = temp.length - 1; x > i; x--) {
				if (temp[i] === temp[x])
					temp.splice(x, 1);
			}
		}
		return temp;
	};
};

BayesClassifier.prototype.train = function(label, doc) {
	this.labels[label] = this.labels[label] || {words: {}};
	this.labels[label].docNum = this.labels[label].docNum + 1 || 1;
	this.docNum++;
	var arr = this.tokenize(doc);
	//console.log('this.labels:', this.labels);
	for (var i in arr) {
		//console.log('this.labels[' + label + '].words[' + arr[i] + ']:', this.labels[label].words[arr[i]]);
		this.labels[label].words[arr[i]]
		if (this.labels[label].words[arr[i]])
			this.labels[label].words[arr[i]]++;
		else
			this.labels[label].words[arr[i]] = 1;
		if (this.words[arr[i]])
			this.words[arr[i]]++;
		else
			this.words[arr[i]] = 1;
	}
};

BayesClassifier.prototype.classify = function(doc) {
	var wordsArr = this.tokenize(doc);
	var logSum = 0;
	var probLabel = {};
	for (var currentLabel in this.labels) {
		var label = this.labels[currentLabel];
		//console.log('this.labels[' + currentLabel + ']:', label);
		for (var i = wordsArr.length - 1; i >= 0; i--) {
			var wordOccurences = label.words[wordsArr[i]];
			//console.log('wordOccurences:', wordOccurences);
			if (!wordOccurences)
				continue;
			else {
				var pWordOccurInLabelDoc = wordOccurences / label.docNum;
				var pWordOccurInNonLabelDoc = (this.words[wordsArr[i]] - wordOccurences) / (this.docNum - label.docNum);
				var pDocIsLabelGivenWord = pWordOccurInLabelDoc / (pWordOccurInLabelDoc + pWordOccurInNonLabelDoc);
				logSum += Math.log(pDocIsLabelGivenWord) - Math.log(1 - pDocIsLabelGivenWord + pDocIsLabelGivenWord);
			}
		}
		probLabel[currentLabel] = Math.exp(logSum);
	}
	return probLabel;
};