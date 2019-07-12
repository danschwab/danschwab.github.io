
  ////////////////////////////////////////////////////
  //												//
  //	Java script functions for Schwabsylvania	//
  //												//
  ////////////////////////////////////////////////////
var canPlayVideo = false;
  
  
$(document).ready(function(){
	
	
	
	
	var v = document.createElement('video');
	if(v.canPlayType && v.canPlayType('video/mp4').replace(/no/, '')) {
		canPlayVideo = true;
	}
	
	if (canPlayVideo == true) {
		document.getElementById("backgroundvideo").innerHTML = "<video  height=100% autoplay loop><source src='media/header.mp4' type='video/mp4'></video>";
	}
	
	
	$("#openicon").click(function(){
		$("div#sidebar").toggleClass("open");
		$("#openicon").toggleClass("fa-times");
		$("#openicon").toggleClass("fa-bars");
	});
	$("div#page").click(function(){
		$("div#sidebar").removeClass("open");
		$("#openicon").removeClass("fa-times");
		$("#openicon").addClass("fa-bars");
	});
	$("div#page").scroll(function(){
		$("div#sidebar").removeClass("open");
		$("#openicon").removeClass("fa-times");
		$("#openicon").addClass("fa-bars");
	});
	
	
	
	$('#page').scroll(function(){ // scroll listener
		
		//header fade
		
		if ($('#page').scrollTop() > 0) {
			//$('#downarrow').fadeOut();
			//$('#title').fadeOut();
		} else {
			$('#downarrow').fadeIn();
			$('#title').fadeIn();
		}
		
		//footer fade
		
		if($('#page').scrollTop() > $('main').height() + $('footer').height() - 1) {
			$('#footer-quote').fadeIn();
			$('#uparrow').fadeIn();
		}
		else {
			$('#footer-quote').fadeOut();
			$('#uparrow').fadeOut();
		}

		//current section
		
		el = "#section_family";
		if ($('#page').scrollTop() > $(el).position().top + $('header').height()/2) {
			setCurrent("#"+el.substring(9));
		} else {
			setCurrent('#topbutton');
		}
		el = "#section_pictures";
		if ($('#page').scrollTop() > $(el).position().top + $('header').height()/2) {
			setCurrent("#"+el.substring(9));
		}
	});	
	
	
	$("span#downarrow").click(function(){
		$('#page').stop();
		$('#page').animate({
			scrollTop: $("main").position().top + 5
		}, 800);
	});
	$("span#uparrow").click(function(){
		$('#page').stop();
		$('#page').animate({
			scrollTop: $("#section_pictures").position().top + $('header').height() + 5
		}, 800);
	});
	$("#topbutton").click(function(){
		$('#page').stop();
		$('#page').animate({
			scrollTop: $("header").position().top
		}, 800);
	});
	
});

function internalNav(Clicked){
	$('#page').stop();
	if ($("#page").scrollTop() != $('#section_'+Clicked.id).position().top + $('header').height() + 5){
		$('#page').animate({
			scrollTop: $('#section_'+Clicked.id).position().top + $('header').height() + 5
		}, 800);
	}
}

function setCurrent(el){

	$("#topbutton").removeClass("current")
	$("#family").removeClass("current")
	$("#pictures").removeClass("current")

	$(el).addClass("current")
}
