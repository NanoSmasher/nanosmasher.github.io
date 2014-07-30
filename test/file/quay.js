$(document).ready(makeSpecial);		//run code once all elements are ready.

$(document).ready(); //run code once all non-picture/media files are ready

/*

#IdIsSelected{}
.ClassIsSelected{}
ElementTagIsSelected{}

$(".about-me p")			//Selects all <p> in class=about-me (Descendant selection)

*/
function makeSpecial(){
	//regular selector business
	$(".about-me").addClass("special");
	$(".about-me p").addClass("lame");
	$("h2").addClass("pretty");
	$("#qey").addClass("boring");
	
	//first-child, nth child, last child
	$("ul li:first-child").addClass("first");
	$("ul li:last-child").addClass("first");
	$("ul li:nth-child(2)").addClass("nnn");
	
	//Event handling
	$("#qey").click(no);
	//Some other events: .blur .change .click .dbclick .keydown .keypress .mouseover .scroll .submit .select 
	
	// relative offsettinger
	//var pos = $("#my-element").position();
	//$("#another-element").append(pos.left);
	
	// gets the value of the css. If css(a,b) then b will set a new value [but return nothing].
	var f = $(".about-me p").css("font-family");
	$("#qey").html(f);
	
	//to the end of the current html. prepend also; after and before (the element tag, not between it)
	$("#qey").append(f);
	
	//hide within one second
	$("h2").hide(2000);
	
	//Stop the animation by skipping to the end. It can also be stopped at that point, and stuff.
	$("ul").hover( function(){
		$("h2").stop(false,true);
		}
	);
	
	//XML Ajax support
	$("#wow").click( function(){
		$.get("copy.xml", function(dom) {
			var phtml = '';
			$(dom).find('char').each(function(){ //loop through each char tag found
				var $c = $(this); //reassigns $(this) 
				phtml += '<h2 class="character">';
				phtml += $c.find('name').text()+ '</h2>'
				phtml += '<p>';
				phtml += $c.find('leader').text() + '</p>';
			});
			$("#rwby").empty().hide().append(phtml).slideDown(1000);
		});
		
	});
	
	/*file = "lesson1.txt"
	$("#por").click(function(){
		$.get(file, function(txt) {    
			var lines = txt.split("\n");
			var x=lines.length;
			$.each(lines, function(n, elem) {
			   lily[n] = elem;
			});
			for (var i = 0; i < x; i++) {
				$("#tal").append("<br />"+lily[i]);
				if (i==x-1) $("#tal").append("truly");
			}
		});
	});*/
	
	file = "lesson1.txt";
	$("#por").click(function() {$.get(file, preparef);});
	$("#tal").click(function() {$("#tal").addClass("boring");})
}

function preparef(txt) {
	var lines = txt.split("\n");
	var x=lines.length;
	var phtml = '';
	$.each(lines, function(n, elem) {
		if (elem=='\r');
		else {
			var n=elem.indexOf("QUOTE:");
			if (n!=-1) phtml += elem.substring(6);
			else{
				elem = elem.replace( /\t/g, "&#8195;");
				phtml += elem;
			}
		}
		phtml += '<br />';
	});
	
	$("#tal").empty().append(phtml);
}


function no(){
	$("#qey").html("this id tag says qey");
	$("h2").show();
	$("h2").animate({"font-size":"+=0.3em"},100,"linear",function(){
		$("h2").animate({"font-size":"-=0.2em"},100,"linear");
	}
	);
}
