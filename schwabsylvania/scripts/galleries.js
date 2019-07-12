
  ////////////////////////////////////////////////
  //											//
  //	Gallery functions for Schwabsylvania	//
  //											//
  ////////////////////////////////////////////////


function setGalCurrent(el){

	$("#g1").removeClass("current")
	$("#g2").removeClass("current")
	$("#g3").removeClass("current")
	$("#g4").removeClass("current")

	$(el).addClass("current")
}


function splash(elem){
	var imgTxt = elem.firstChild.nextSibling.firstChild.innerHTML;
	var imgSrc = elem.firstChild.getAttribute('src');
	imgSrc = imgSrc.replace('thumbs/','');
	
	$("#light-box").html("");
	$("#light-box").html("<img src='" + imgSrc + "' alt='picture missing'/><p>" + imgTxt + " Click anywhere to close.</p>");
	$("#light-box").addClass('visible');
}
function clickClose(){
	$("#light-box").removeClass('visible');
}


function loadFile(gal){
	
	jQuery.get("media/gallery/" + gal + "/arrangement.txt", function(stringData) {
		
		document.getElementById("gallery_pictures").innerHTML = ""; //clear gallery
		stringData += "\n#end"; 									//set up string to end
		//alert(stringData);
		var galleryData = stringData.split("\n");					//split string into array for incrimental reading
		var temp = "";	//temporary variable for saving html segments
		var i = 0;	//initiate loop variable
		while (galleryData[i] != "#end") { //loop until reached end
			//alert(galleryData[i]);
			while (galleryData[i] == "") {i++;} //skip blank spaces
			
			//alert("Sent=   " + galleryData[i]);
			
			if (galleryData[i].indexOf("image=") > -1){ //is this an image
				galleryData[i]=galleryData[i].replace("image=", ""); //remove image indicator
				temp = "";
				//alert("image");
				temp += "<div class='frame' onclick='splash(this);'>"; //start image div
				temp += "<img width='1000' height='750' src='media/gallery/" + gal + "/thumbs/" + galleryData[i] + "' alt=''/>"; //create image
				
				if (galleryData[i+1] != "#end") { //go deeper if the next space is not the end
					i++;
					while (galleryData[i] == "") {i++;} //skip blank spaces
					
					if (galleryData[i].indexOf("caption=") > -1) { //is this a caption
						galleryData[i]=galleryData[i].replace("caption=", ""); //remove caption indicator
						
						temp += "<div><p>" + galleryData[i] + "</p></div>"; //create caption
					}
					else
					{
						temp += "<div><p></p></div>"; //create dummy caption
						i--;
					}
				}
				
				temp += "</div>"; //end image div
				document.getElementById("gallery_pictures").innerHTML += temp; //put it in the dom
			}
			else if ((galleryData[i].indexOf("video=") > -1) && (canPlayVideo = true)){ //is this an video
				galleryData[i]=galleryData[i].replace("video=", ""); //remove video indicator
				
				temp = "";
				temp += "<div class='video'>";
				temp += "<video width=100% controls><source src='media/gallery/" + gal + "/" + galleryData[i] + "' type='video/mp4'>Your browser does not support the video tag.</video>"; //create vid
				
				if (galleryData[i+1] != "#end") { //go deeper if the next space is not the end
					i++;
					while (galleryData[i] == "") {i++;} //skip blank spaces
					
					if (galleryData[i].indexOf("caption=") > -1) { //is this a caption
						galleryData[i]=galleryData[i].replace("caption=", ""); //remove caption indicator
						
						temp += "<p>" + galleryData[i] + "</p>"; //create caption
					}
					else
					{
						i--;
					}
				}
				
				temp += "</div>"; //end video div
				
				document.getElementById("gallery_pictures").innerHTML += temp; //put it in the dom
			}
			else if (galleryData[i].indexOf("title=") > -1){ //is this a title
				galleryData[i]=galleryData[i].replace("title=", ""); //remove title indicator
				temp = "";
				//alert("title");
				temp += "<div class='content'>"; //start content div
				temp += "<h2>" + galleryData[i] + "</h2>"; //create title
				
				if (galleryData[i+1] != "#end") { //go deeper if the next space is not the end
					i++;
					while (galleryData[i] == "") {i++;} //skip blank spaces
					
					if ((galleryData[i].indexOf("text=") > -1) || (galleryData[i].indexOf("caption=") > -1)) { //is this text
						galleryData[i]=galleryData[i].replace("text=", ""); //remove text indicator
						galleryData[i]=galleryData[i].replace("caption=", ""); //remove text indicator
						
						temp += "<p>" + galleryData[i] + "</p>"; //create text
					}
					else {i--;}
				}
				
				temp += "</div>"; //end content div
				document.getElementById("gallery_pictures").innerHTML += temp; //put it in the dom
			}
			else if ((galleryData[i].indexOf("text=") > -1) || (galleryData[i].indexOf("caption=") > -1)) { //is this text
				galleryData[i]=galleryData[i].replace("text=", ""); //remove text indicator
				galleryData[i]=galleryData[i].replace("caption=", ""); //remove text indicator
				
				document.getElementById("gallery_pictures").innerHTML += "<div class='content'><p>" + galleryData[i] + "</p></div>"; //create text in content div
			}
			
			i++; //next line in array
		}
	});
}