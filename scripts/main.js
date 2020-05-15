$(document).ready(function(){
	//sets page if page was open
	if (location.hash != "#" && location.hash != ""){
		locationHashNavigate(location.hash)
	}
	
	//executes on hash change (aka: browser back button)
	window.onpopstate = function(event) {
		let locationHash = location.hash
		if (locationHash == "#" || locationHash == "") locationHash = "#section-product-design";
		if (!$(location.hash).hasClass("open")) locationHashNavigate(locationHash);
	};
	
	$(window).on("hashchange", function() {
		let locationHash = location.hash
		if (locationHash == "#" || locationHash == "") locationHash = "#section-product-design";
		if (!$(location.hash).hasClass("open")) locationHashNavigate(locationHash);
	});
	

	
	
	$(".slideshow").each(function(){
		generateSlideshowControls(this.id);
    });
	$(".lightbox").each(function(){
		generateLightbox(this);
    });
	
	openPageButtonThumbnails();
	
	$(".open-page").click(function(e) {
		e.preventDefault();
		
		openPage(this);
	});
	
	$(".nav-tab").click(function(e) {
		e.preventDefault();
		
		openSection(this);
	});
	
	$("#main-menu #cover").click(function() {
		$("#main-menu-open").removeClass('open');
	});
	
	$("#page-top").click(function() {
		scrollBody('.open-page.open',500);
	});
	
	
	$("#page-close").click(function() {
		scrollBody($('.page.open'),0);
		scrollBody($('.open-page.open'),200);
		//scrollBody($('.page.open').prevAll('h1:first'),500);
		$(".open-page").removeClass("open");
		$(".page").removeClass("open");
		setPage("#");
	});
	
	
	//SCROLL LISTENER
	
	window.addEventListener('scroll', function() {
		
		$(".lightbox.open").removeClass('open');
		//hideIcons("#portfolio-home span");
		//hideIcons("#page-top");
		hideIcons("#page-close");
		
		
		//if ($("#portfolio-home").offset().top > $("main").offset().top + 64) $("#portfolio-home").removeClass("hidden");
		//else $("#portfolio-home").addClass("hidden");
		
		//this accomplishes the color shifting of the pages
		
		if ($(window).width() < 1100) $("#main-menu-open").removeClass('open'); //CHANGED 12/25/17
		//setAccent();
	});
	
	
	
	//KEY LISTENER
	
	$(document).keyup(function(e) {
		if (e.keyCode == 27) { // escape key
			
			if ($(".lightbox.open")[0]){
				$(".lightbox.open").removeClass('open');
			} else if ($(".open-page.open")[0]){
				scrollBody($('.page.open'),0);
				scrollBody($('.open-page.open'),200);
				//scrollBody($('.page.open').prevAll('h1:first'),500);
				$(".open-page").removeClass("open");
				$(".page").removeClass("open");
				setPage("#");
			}
			
		}
		
		if (e.keyCode == 37) { // left key
			if ($(".lightbox.open")[0]){
				prevLightBox();
			}
		}
		if (e.keyCode == 39) { // right key
			if ($(".lightbox.open")[0]){
				nextLightBox();
			}
		}

	});
	
});



function locationHashNavigate(locationHash) {

	try {
		if (locationHash.indexOf("page") >= 0) {
			try { openSection("#button-product-design",false,false); }
			catch(err) { openSection("#button-home",false,false); }

			openPage(findButton(locationHash),true,false);
		}
		else openSection(findButton(locationHash),false,false);
	}
	catch(err) {
		//alert("The tab or page that you had open: "+ location.hash +" does not exist.");
		$("section").removeClass("open");
		$(".nav-tab").removeClass("open");
		$("section#error-404").addClass("open");
		location.hash="error-404"
	}
}



function hideIcons(icon) {
	if ($(".page.open").length > 0){
		var iconLoc = $(icon).offset().top;
		var pageTop = $(".page.open").offset().top;
		var pageBottom = $(".page.open").height() + (pageTop - $(icon).height());
		
		//alert(pageTop + " : icon-" + iconLoc + " : " + pageBottom);
		
		/*if ($(window).scrollTop() > pageBottom){
			scrollBody($('.page.open'),1000);
			$(".open-page").removeClass("open");
			$(".page").removeClass("open");
			setPage("#");
		}*/
		
		
		if ((iconLoc < pageTop) || (iconLoc > pageBottom)) {
			$(icon).addClass("hidden");
		}
		else {
			$(icon).removeClass("hidden");
			$(".edge-button").css('--accent-color',$(".open-page.open").css('--accent-color')); 
			//alert($(".open-page.open").css('--accent-color'));
		}
	}
	else {
		$(icon).addClass("hidden")
	}
	
	
}


function scrollBody(id,transition){
	let offset = $(id).offset().top;
	//alert(offset + ":" + $(window).scrollTop());
	if (transition==0){
		$('html, body').scrollTop(offset);
	}
	else{
		$(window).stop();
		if ($(window).scrollTop() != (offset)){
			$('html, body').animate({
				scrollTop: offset
			}, transition);
		}
	}
}


// this is for section tabs

function openSection(sect, scrollTo=true, setHash=true){

	//close open pages
	$(".open-page").removeClass("open");
	$(".page").removeClass("open");
	
	//if ($(window).scrollTop() > $("#section-navigation").scrollTop()){
	if (scrollTo) scrollBody("#section-navigation",400)
	//}
	
	//close all tabs
	$(".nav-tab").removeClass("open");
	
	//open correct tab
	$(sect).addClass("open");
	$(findSectionTabAlt(sect)).addClass("open");
	
	//close all sections
	$("section").removeClass("open");
	
	//open correct section
	sect = findSection(sect)
	$(sect).addClass("open");
	
	//set url to include page
	if (setHash) setPage(sect);
	

}

function findSectionTabAlt(id){
	
	id = ($(id).attr('id'))
	if (id.indexOf("button2-") >= 0) {
		id = id.replace("button2-","button-")
	}
	else {
		id = id.replace("button-","button2-")
	}
	
	return "#" + id
}




//this is for pages

function openPage(page,scrollTo=false , setHash=true){
	if ($(page).hasClass("open")){
		//scrollBody($(page).prevAll('h1:first'),201);
		$(".open-page").removeClass("open");
		$(".page").removeClass("open");
		if (setHash) setPage("#");
	}
	else {

		let pageHeight = 0;
		let windowPosition = $(window).scrollTop();
		if ($(".page.open").length > 0){
			if ($('.page.open').offset().top < windowPosition){
				pageHeight = $('.page.open').height();
			}
		}
		//alert("loc1-" + $(window).scrollTop() + " : " + pageHeight);
		$(".open-page").removeClass("open");
		$(".page").removeClass("open");
		$(".slideshow").each(function(){setSlide(page.id,1);});
		$(page).addClass("open");
		
		page=findPage(page)
		
		$(page).addClass("open");
		if (setHash) setPage(page);
		//alert("loc-" + $(window).scrollTop() + " : " + ($(window).scrollTop() - pageHeight))
		$("html, body").scrollTop(windowPosition - pageHeight,200);
		loadPageImages(".page.open");
	}
	
	//setAccent();
	if (scrollTo) {
		scrollBody(page,500)
	}
}



function openPageButtonThumbnails() {

	$(".open-page").each(function(){
		if (!($(this).hasClass('no-thumb'))){
			let path = ""
			if (!($(this).hasClass('article'))){
				path = ($(this).attr('id')).replace("button-","media/thumbs/thumb_")
			}
			else if (($(this).hasClass('no-cover'))) {
				path = "media/blog/covers/thumbs/ruins"
			}
			else {
				path = ($(this).attr('id')).replace("button-","media/blog/covers/thumbs/")
			}
			
			path += ".jpg"
			let html = $(this).html();
			html = '<img src="' + path + '"/><span>' + html + '</span>';
			$(this).html(html);
			//alert($(this).html());

		}
	});
	
}

function findPage(id){
	id = ($(id).attr('id')).replace("button-","page-")
	
	return "#" + id
}
function findButton(id){
	id = ($(id).attr('id')).replace("page-","button-")
	id = id.replace("section-","button-")
	
	return "#" + id
}
function findSection(id){
	id = ($(id).attr('id')).replace("button-","section-")
	id = id.replace("button2-","section-")
	
	return "#" + id
}





function loadPageImages(page){
	var src = "";
	$(page + " img").each(function(e) {
		$(this).attr('src', $(this).attr('data-src'));
	});
	$(page + " .lightbox img").each(function(e) {
		$(this).attr('src', $(this).attr('data-src') + "thumbs/" + $(this).attr('data-file'));
	});
}


function setPage(page){
	if(history.pushState) {
		history.pushState(page, null, page);
	}
	else {
		location.hash = page;
	}
}

//this is for lightbox elements

function generateLightbox(elem) {
	//alert("<div onclick='$(" + elem + ").removeClass("+'"open"'+")'></div><img onclick='$(" + elem + ").removeClass("+'"open"'+")'/>");
	var content = "<div><div onclick='$("+'".lightbox.open"'+").removeClass("+'"open"'+")'></div><img />"
	if ($(elem).prev().prev('.lightbox').length) content += "<button class='prev' onclick='prevLightBox()' ></button>";
	if ($(elem).next('.lightbox').length) content += "<button class='next' onclick='nextLightBox()' ></button>";
	content += "<button class='close' onclick='$("+'".lightbox.open"'+").removeClass("+'"open"'+")' ></button>";
	content += "</div>";
	$(elem).after(content);
	
	$(elem).click(function() {
		$(this).addClass('open');
		loadLightboxImage();
	});
}

function nextLightBox() {
	elem = $('.lightbox.open');
	elem.removeClass('open');
	if (elem.next().next('.lightbox')) elem.next().next('.lightbox').addClass('open');
	loadLightboxImage();
}
function prevLightBox() {
	elem = $('.lightbox.open');
	elem.removeClass('open');
	if (elem.prev().prev('.lightbox')) elem.prev().prev('.lightbox').addClass('open');
	loadLightboxImage();
}
function loadLightboxImage() {
	elem = $('.lightbox.open');
	if (!elem.next().children('img').attr('src')) elem.next().children('img').attr('src', elem.children('img').attr('data-src') + elem.children('img').attr('data-file'));
	if (!elem.prev().children('img').attr('src')) elem.prev().children('img').attr('src', elem.prev().prev().children('img').attr('data-src') + elem.prev().prev().children('img').attr('data-file'));
	if (!elem.next().next().next().children('img').attr('src')) elem.next().next().next().children('img').attr('src', elem.next().next().children('img').attr('data-src') + elem.next().next().children('img').attr('data-file'));
	//alert(elem.prev().prev().children('img').attr('data-src') + elem.prev().prev().children('img').attr('data-file')+"---"+elem.next().next().children('img').attr('data-src') + elem.next().next().children('img').attr('data-file'));
}
//this is for slideshow elements

function plusSlides(id,n) {
	var slide = currentSlide(id);
	var max = countSlides(id);
	
	//alert("current: "+slide+" maximum:"+max+" adding:"+n);
	
	if (slide + n == max + 1) slide = 1;
	else if (slide + n == 0) slide = max;
	else slide = slide + n;
	
	setSlide(id,slide);
}

function setSlide(id,n) {
	$("#" + id + " img").removeClass('open');
	$("#" + id + " input").removeClass('open');
	//alert("#" + id + " img:nth-of-type(" + n + ")");
	$("#" + id + " img:nth-of-type(" + n + ")").addClass('open');
	//alert("#" + id + " div input:nth-of-type(" + (n+1) + ")");
	$("#" + id + " div input:nth-of-type(" + (n+1) + ")").addClass('open');
}

function currentSlide(id){
	return $('#' + id + " img.open").index() + 1;
}
function countSlides(id) {
	return $('#' + id + ' img').length;
}

function generateSlideshowControls(id) {
	idq='"' + id + '"';
	//alert(idq);
	
	var num = countSlides(id);
	var controls = "<div class='controls'><input type='button' value=' ' onclick='plusSlides(" + idq + ",-1)' />";
	for (i = 0; i < num; i++) {
		controls += "<input value='" + (i+1) + "' type='button' onclick='setSlide(" + idq + "," + (i+1) + ")' />";
	}
	controls += "<input type='button' value=' ' onclick='plusSlides(" + idq + ",1)' /></div>" +
			"<div>" + $('#' + id).html() + "<button class='prev' onclick='plusSlides(" + idq + ",-1)' >" +
			"</button><button class='next' onclick='plusSlides(" + idq + ",1)' ></button></div>";
	
	$('#' + id).html(controls);
	setSlide(id,1)
}
