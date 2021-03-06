
	/************************************************
	*												*
	*	All following content ©2020 Daniel Schwab	*
	*	(unless otherwise marked)					*
	*												*
	************************************************/


// INITIATION FUNCTIONS



$(document).ready(function(){

	
	$.ajax({
		url : "media/blog/articles/article_list.txt",
		dataType: "text",
		success : function (response) 
		{
			insertArticles(0,100,response.split("\n"),"#section-home");
		},
		async: false
	});
	
});


function insertArticles(firstArticle,lastArticle,articleArray,intoElement) {
	
	let tempArticle = ""
	let tempDate = ""
	let tempTitle = ""
	let tempImage = ""
	let tempComment = ""
	let tempButtons = ""
	let tempArticles = ""
	let blogHtml = ""
	let j=0;
	
	for (i = firstArticle; i < articleArray.length; i++){
		//loads article into a variable
		
		$.ajax({
            url : "media/blog/articles/" + articleArray[i] + ".article",
            dataType: "text",
            success : function (response) 
			{
				tempArticle = response;
				
			
				j = tempArticle.indexOf("\n")
				tempTitle = $.trim(tempArticle.substring(0, j))
				tempDate = $.trim(tempArticle.substring(j,tempArticle.indexOf("\n",j+1)))
				tempArticle = tempArticle.substring(tempArticle.indexOf("\n",j+1),tempArticle.length)
				
				//alert(tempTitle + " - " + tempDate);
			},
			async: false
		});
		
		$.ajax({
			url:'media/blog/covers/' + articleArray[i] + '.jpg',
			type:'HEAD',
			error: function(){
				// Image doesn't exist - do something else.
				tempImage=""
				
			},
			success: function(){
				// Do something now you know the image exists.
				tempImage="<img data-src='media/blog/covers/" + articleArray[i] + ".jpg' />"
			},
			async: false
		}); 
		//alert(tempImage)
		
		/*
		tempImage=""
		$.get("media/blog/covers/" + articleArray[i] + ".jpg")
		.done(function() { 
			// Do something now you know the image exists.
			tempImage="<img data-src='media/blog/covers/" + articleArray[i] + ".jpg' />"
		}).fail(function() { 
			// Image doesn't exist - do something else.
			tempImage=""
		})
		*/	
		
		
		
		//loads comments to variable
		$.ajax({
			url:'media/blog/comments/' + articleArray[i] + '.comments',
			dataType: "text",
			error: function(){
				tempComment = "";
			},
			success: function(comment){
				// Do something now you know the comment exists.
				tempComment = comment;
				
			},
			async: false
		}); 
		
		//adds articles to temp string
		
		tempArticles = tempArticles.concat("<div class='page' id='page-", articleArray[i], "'>",tempImage,"<div><h2>",tempTitle,"</h2>",tempArticle,"<p class='right-align'> <em>Published ",tempDate,"</em></p><input type='button' class='right-align button shadow comment-button' value='send comment'><form class='comment-area' action='https://formspree.io/dschwabdesign@gmail.com' method='POST'><input type='hidden' name='_article' value='",tempTitle,"'>Email<input type='email' name='_replyto'><br> Name<input type='text' name='_name'><br>Comment <br><textarea name='body'></textarea><input class='button shadow' type='submit' value='Send'><input class='button shadow comment-cancel-button' type='reset' value='Cancel'></form>",tempComment,"</div></div>")
		
		
		//adds button to temp string
		if (tempImage=="") {tempImage="no-cover"}
		else {tempImage=""}
		
		tempButtons = tempButtons.concat("<button class='open-page square article ",tempImage,"' id='button-", articleArray[i], "'>",tempTitle,"<br>", tempDate, "</button>")
		
		
		if (i == lastArticle) break; //stops at last article to show
		
		if ((i+1)%3 == 0)
		{
			//merges buttons and articles for one row
			blogHtml = blogHtml.concat("<div class='article-button-container'>", tempButtons, "</div>", tempArticles)
			//clears temp strings
			tempButtons = ""
			tempArticles = ""
		}
		
	}
	
	//merges last buttons and articles for last row
	blogHtml = blogHtml.concat("<div class='article-button-container'>", tempButtons, "</div>", tempArticles)
	
	$(intoElement).html(blogHtml);
	
	
	
	//sets up button events
	
	
	$( ".comment-button" ).click(function() {
		$(this).addClass("hidden")
	});
	
	$( ".comment-area input[type=submit]" ).click(function() {
		$( ".comment-button" ).removeClass("hidden")
	});
	
	$( ".comment-area input[type=reset]" ).click(function() {
		$( ".comment-button" ).removeClass("hidden")
		
	});
}