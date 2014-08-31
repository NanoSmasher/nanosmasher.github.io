$(document).ready(makeSpecial);		//run code once all elements are ready.

$(document).ajaxError(function() {
  $("#out").text(" Triggered ajaxError handler.");
});

function makeSpecial(){
	// Add a css property to all <h2> elements.
	$("h1").addClass("special");

	// Cause the text to be a click-able element
	$("#reveal").click(function() {getTxt1("data.txt")} );
}

function printit(data,num){
	$("#out").empty();
	var lines = data.split('\n');
	$.each(lines, function(n, elem){
		elem = elem.replace(/\t/g, "&#8195;");	//	the / /g is a global modifier so it replaces all occurrences
		$("#out").append(elem+'</br>');
	});
	$("#out").append('Method '+num+' Sucessful')
}

// Ajax using success
function getTxt1(file){
	$.ajax({
		url:file,
		success: function(data) { printit(data,1) }
	});
}

// Ajax using success and MIME type
function getTxt2(file){
	$.ajax({
		url:file,
		success: function(data) { printit(data,2) }
	});
}

//Ajax using done
function getTxt3(file) {
	$.ajax({
		url:file
	})
	.done( function(data) { printit(data,3) });
}

//Ajax using done and MIME type
function getTxt4(file) {
	$.ajax({
		url:file,
		dataType: "text",
	})
	.done( function(data) { printit(data,4) });
}

//Get
function getTxt5(file) {
	$.get(file,function(data) { printit(data,5) });
}

//Get and MIME type
function getTxt6(file) {
	$.get(file,function(data) { printit(data,6) }, 'text');
}

//Post and MIME type
function getTxt7(file) {
	$.post(file).done( function(data) { printit(data,7) });
}