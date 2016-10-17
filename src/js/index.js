// ToDo
// [X] Load JSON immediately after the page loads
// [X] add shine.js
// [X] add smooth transition effect to the quote words - their container
// [X] add tweet functionality
// [X] ensure, that the quote text and author are always actual in the tweet
// [X] remove quotes from the displayed random quote and author; add emdash
// [ ] make sure the random quote button stays in then same vertical position

$(document).ready(function() {

	var quoteText = "";
	var quoteAuthor = "";
	var maxJSONID = 10;
	var minJSONID = 1;
	var random = 0;
	var JSONsrc = "https://gist.githubusercontent.com/selrond/fcfee82f158c80048fab95a23c7cf180/raw/5773a9b63e6f00b5540158822a472f8118a7248a/quote-machine.js";

	function getRandomInt() {
		random = Math.floor(Math.random() * (maxJSONID - minJSONID + 1)) + minJSONID;
	};

	getRandomInt();
	$.getJSON(JSONsrc, loadAndShow);

	function loadAndShow(json) {
		var randomQuote = json.filter(function(value) {
			return (value.ID === random);
		});
		quoteText = randomQuote[0].Quote;
		quoteAuthor = randomQuote[0].Author;
		$("#quote-text").html(quoteText);
		$("#quote-author").html("—" + quoteAuthor);
	};

	$("#generate").on("click", bringValue);

	function bringValue() {
		getRandomInt();
		console.log(random);
		$.getJSON(JSONsrc, loadAndShow);

		function loadAndShow(json) {
			var randomQuote = json.filter(function(value) {
				return (value.ID === random);
			});
			quoteText = randomQuote[0].Quote;
			quoteAuthor = randomQuote[0].Author;
			// var oldQuoteHeight = $("#quote-content").height();
			// console.log(quoteHeight);
			// $("#quote-content").animate({height:"200px"},400);
			$("#quote-content").fadeOut("slow", function(){
				$("#quote-text").html(quoteText);
				$("#quote-author").html("—" + quoteAuthor);	
				$("#quote-content").fadeIn("slow");
			});
			// $("#quote-text").html(quoteText);
			// $("#quote-author").html("—" + quoteAuthor);
		};
	};

	$(".fa-twitter").on("click", tweet);

	function tweet() {
		var tweetQuote = quoteText;
		var tweetAuthor = "—" + quoteAuthor;
		var tweetHashtags = "quote%2Clife";
		var tweetRelated = "Selrond%3ACreator%20of%20the%20Quote%20Machine";

		var url = "https://twitter.com/intent/tweet?" + "text=" + tweetQuote + "%0a" + tweetAuthor + "%0a" + "&" + "hashtags=" + tweetHashtags + "&" + "related=" + tweetRelated;
		window.open(url, "_blank");
	};
});
