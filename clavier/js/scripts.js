

const NBR_CHARS_PER_LINE = 156;

var btn_list = ["btn-1", "btn-2", "btn-3", "btn-4", "btn-5", "btn-6", "btn-7", "btn-8", "btn-9", "btn-10", "btn-11", "btn-12", "btn-13", "btn-14", "btn-15", "btn-16", "btn-17", "btn-18", "btn-19", "btn-20", "btn-21", "btn-22", "btn-23", "btn-24", "btn-25", "btn-26", "btn-27", "btn-28", "btn-29", "btn-30", "btn-31", "btn-32", "btn-33", "btn-34", "btn-35", "btn-36", "btn-37", "btn-38", "btn-39", "btn-40", "btn-41", "btn-42", "btn-43", "btn-44", "btn-45", "btn-46", "btn-47", "btn-48", "btn-49", "btn-50", "btn-51", "btn-52", "btn-53", "btn-54", "btn-55", "btn-56", "btn-57", "btn-58", "btn-59", "btn-60", "btn-61", "btn-62", "btn-63", "btn-64", "btn-65", "btn-66", "btn-67", "btn-68", "btn-69", "btn-70", "btn-71", "btn-72", "btn-73", "btn-74", "btn-75", "btn-76", "btn-77", "btn-77", "btn-78", "btn-79", "btn-80", "btn-81", "btn-82", "btn-83", "btn-84", "btn-85", "btn-86"];
var special_btns = ["btn-14", "btn-15", "btn-19", "btn-37", "btn-50", "btn-54", "btn-66", "btn-71", "btn-72", "btn-73", "btn-74", "btn-75", "btn-76", "btn-78", "btn-82", "btn-80", "btn-83", "btn-84", "btn-70"];
var caracter_btns = [];

//when verr num btn is pressed 1st time, verrnum will be true, 2nd time false, etc.
var verrnum = false;

//when maj btn btn is clicked 1st time, maj will be true, 2nd time false, etc.
var maj = false;

//when shift_clicked btn btn is clicked 1st time, shift_clicked will be true, 2nd time false, etc.
var shift_clicked = false;

//when ctrl_clicked btn btn is clicked 1st time, ctrl_clicked will be true, 2nd time false, etc.
var ctrl_clicked = false;

//when alt_clicked btn btn is clicked 1st time, alt_clicked will be true, 2nd time false, etc.
var alt_clicked = false;

var alt_gr_clicked = false;

/*
the text direction of textarea: 
0: left to right
1: right to left
*/
var text_direction = 0;

/*
the lagnguage of the keyboard:
0: fr
1: ar
*/
var lagnguage = 0;


window.onload = function () {



	//load the caracters stored in the json file
	loadCaracters();
	

	// put the button key values in textarea when they are pressed
	let btns = document.querySelectorAll('button');
	for (i of btns) {		
		i.addEventListener('click', function () {

			// if the cbtn is a special one
			if(special_btns.includes(this.id)){
				switch(this.id){
					//supp
					case "btn-14":
					let currParag = document.getElementById('paragraph').value;
						if(currParag.length > 0){
							document.getElementById('paragraph').value = currParag.substring(0, currParag.length - 1);
						}
						break;
					
					//ver num
					case "btn-15":
						verNumOnclick();
						break;

					//tab
					case "btn-19":
						document.getElementById('paragraph').value += caracter_btns[18].min_fr;
						break;

					//maj
					case "btn-37":
						setMajOnClick();
						break;

					//enter center	
					case "btn-50":
						document.getElementById('paragraph').value += "\n";
						break;
					
					//shift left
					case "btn-54":
						shiftOnClick();
						break;

					//shift right
					case "btn-66":
						shiftOnClick();
						break;

					//enter-bottom
					case "btn-70":
						document.getElementById('paragraph').value += "\n";
						break;	

					//ctrl left
					case "btn-71":
						ctrlOnCLick();
						break;					

					//fn
					case "btn-72":
						//TODO
						break;

					//win-lefft
					case "btn-73":
						//TODO
						break;

					//alt-left
					case "btn-74":
						altOnclick();
						break;

					//space
					case "btn-75":
						document.getElementById('paragraph').value += " ";
						break;

					//alt-gt
					case "btn-76":
						altGrOnClick();
						break;

					//droplist
					case "btn-77":
						alert("special_btns");
						break;


					//crtl right
					case "btn-78":
						ctrlOnCLick();
						break;

					//arrow-top
					case "btn-80":
						arrowTopOnClick();
						break;

					//arrow-left
					case "btn-82":
						arrowLeftOnClick();
						break;

					//arrow-bottom
					case "btn-83":
						arrowBottimOnClick();
						break;

					//arrow-right
					case "btn-84":
						arrowRightOnClick();
						break;
				}
			}	
			else{
				document.getElementById('paragraph').value += this.textContent;
			}		
		});
	}	


	//add event listener to select
	document.querySelector('#text-list').addEventListener("change", function(){		
		document.querySelector('#paragraph').style.fontFamily = this.options[this.selectedIndex].text;
	});	

	// add event listener to input size text
	document.querySelector('#size-text').addEventListener("keypress", function(event) {
	  // If the user presses the "Enter" key on the keyboard
	  if (event.keyCode == 13) {			
			document.querySelector('#paragraph').style.fontSize = this.value+"px";
			console.log(document.querySelector('#paragraph').style.fontSize);

		}
	});

	document.querySelector('#toLeft').addEventListener('click', function() {
		document.getElementById("paragraph").style.textAlign = "left";
		// document.getElementById("paragraph").style.direction = "ltr";
		text_direction = 0;			
	});

	document.querySelector('#center').addEventListener('click', function() {
		document.getElementById("paragraph").style.textAlign = "center";
	});


	document.querySelector('#toRight').addEventListener('click', function() {
		document.getElementById("paragraph").style.textAlign = "right";
		// document.getElementById("paragraph").style.direction = "rtl";
		text_direction = 1;			
	});


}


//""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

/*
get the index of a tbn from his id, ex: index_of_btn('btn-10') = 10;
*/
function index_of_btn(btn_name){
	if(btn_name.substring(0, 4) === 'btn-'){
		return btn_name.substring(4, btn_name.length);
	}
	else{
		return 'nulll';
	}	
}

/*load the different caracters  of the buttons*/
function loadCaracters(){
	const xhttp = new XMLHttpRequest();
	xhttp.open("GET", "json/caracters.json");
	xhttp.send();
	xhttp.onload = function() {
		caracter_btns = JSON.parse(this.responseText);
	}
}


// set caracters in the first ange when ver num btn is pressed 
function verNumOnclick() {
	if(!alt_gr_clicked){
		// if the ver num is pressed the first time, set the bg to green and caracters in the first ange to numbers 
		if(!verrnum){
			document.getElementById("btn-15").style.background = "green";
			verrnum = true;
			for(let i = 1; i<12; i++){
				document.getElementById(btn_list[i]).textContent = caracter_btns[i].chift_fr;
			}
		}
		// if the 2nd time than set the bg and the caracters in the first ange to default
		else{
			document.getElementById("btn-15").style.background = "#eee";
			verrnum = false;
			for(let i = 1; i<12; i++){
				document.getElementById(btn_list[i]).textContent = caracter_btns[i].min_fr;
			}
		}
	}
}

function setMajOnClick() {
	if(!alt_gr_clicked){
		if(!maj){
			document.getElementById("btn-37").style.background = "#f55";
			maj = true;
			for(let i=0; i<86; i++ ){
				if(!special_btns.includes(btn_list[i])){
					document.getElementById(btn_list[i]).textContent = caracter_btns[i].maj_fr;
				}			
			}
		}
		else{
			document.getElementById("btn-37").style.background = "#eee";
			for(let i=0; i<86; i++ ){
				if(!special_btns.includes(btn_list[i])){
					document.getElementById(btn_list[i]).textContent = caracter_btns[i].min_fr;
				}			
			}
			maj = false;
		}
	}		
}


//when a btn shift is pressed or released
//mousedown or mouseup
function shiftOnClick(argument) {
	if(!alt_gr_clicked){
		if(!shift_clicked){
			if(!maj && !ctrl_clicked && !alt_clicked){
				document.getElementById("btn-54").style.background = "#55f";
				document.getElementById("btn-66").style.background = "#55f";
				shift_clicked = true;
				for(let i=0; i<86; i++ ){
					if(!special_btns.includes(btn_list[i])){
						document.getElementById(btn_list[i]).textContent = caracter_btns[i].chift_fr;
					}			
				}
			}	
			else if(ctrl_clicked && !alt_clicked){
				if(text_direction === 0){
					document.getElementById("paragraph").style.textAlign = "right";
					text_direction = 1;
				}
				else{
					document.getElementById("paragraph").style.textAlign = "left";
					text_direction = 0;
				}
				//release ctrl
				ctrlOnCLick();
			}
			else if(alt_clicked){
				//change the language
				if(lagnguage === 0){
					for(let i=0; i<86; i++ ){
						if(!special_btns.includes(btn_list[i])){
							document.getElementById(btn_list[i]).textContent = caracter_btns[i].arabic;
						}			
					}
					lagnguage = 1;
				}
				else{
					if(maj){
						for(let i=0; i<86; i++ ){
							if(!special_btns.includes(btn_list[i])){
								document.getElementById(btn_list[i]).textContent = caracter_btns[i].maj_fr;
							}			
						}
					}
					else{
						for(let i=0; i<86; i++ ){
							if(!special_btns.includes(btn_list[i])){
								document.getElementById(btn_list[i]).textContent = caracter_btns[i].min_fr;
							}			
						}
					}
					lagnguage = 0;
				}

				//release ctrl
				altOnclick();
			}

		}
		else{
			document.getElementById("btn-54").style.background = "#eee";
			document.getElementById("btn-66").style.background = "#eee";
			shift_clicked = false;
			if (!maj && !ctrl_clicked) {
				for(let i=0; i<86; i++ ){
					if(!special_btns.includes(btn_list[i])){
						document.getElementById(btn_list[i]).textContent = caracter_btns[i].min_fr;
					}			
				}
			}
		}		
	}
}


function ctrlOnCLick() {
	if(!alt_gr_clicked){
		if(!ctrl_clicked){
			document.getElementById("btn-71").style.background = "#5ff";
			document.getElementById("btn-78").style.background = "#5ff";
			ctrl_clicked = true;	
		}
		else{
			document.getElementById("btn-71").style.background = "#eee";
			document.getElementById("btn-78").style.background = "#eee";
			ctrl_clicked = false;	
		}
	}
		
}

function altOnclick() {
	if(!alt_gr_clicked){
		if(!alt_clicked){
			document.getElementById("btn-74").style.background = "#f5f";
			alt_clicked = true;	
		}
		else{
			document.getElementById("btn-74").style.background = "#eee";
			alt_clicked = false;	
		}
	}		
}

function altGrOnClick() {
	if(!alt_gr_clicked){
		document.getElementById("btn-76").style.background = "#ff5";
		for(let i=0; i<86; i++){
			if(!special_btns.includes(btn_list[i])){
				document.getElementById(btn_list[i]).textContent = caracter_btns[i].alt_gr;
			}
		}
		alt_gr_clicked = true;	
	}

	else{
		document.getElementById("btn-76").style.background = "#eee";
		for(let i=0; i<86; i++){
			if(!special_btns.includes(btn_list[i])){
				document.getElementById(btn_list[i]).textContent = caracter_btns[i].min_fr;
			}
		}
		alt_gr_clicked = false;	
	}
}

function arrowLeftOnClick() {
	let textarea = document.getElementById('paragraph');
	if(textarea.value.length > 0){
		textarea.focus();
		textarea.setSelectionRange(textarea.selectionStart-1, textarea.selectionEnd-1);
	}
}

function arrowRightOnClick() {
	let textarea = document.getElementById('paragraph');
	textarea.focus();
	textarea.setSelectionRange(textarea.selectionStart+1, textarea.selectionEnd+1);
}


function arrowTopOnClick() {
	let textarea = document.getElementById('paragraph');
	textarea.focus();
	let new_pos = textarea.selectionStart - NBR_CHARS_PER_LINE;
	let pos = (new_pos <= 0 ) ? 0 : new_pos;
	textarea.setSelectionRange(pos, pos);
	console.log("start: "+textarea.selectionStart);
}

function arrowBottimOnClick() {
	let textarea = document.getElementById('paragraph');
	textarea.focus();
	let new_pos = textarea.selectionStart + NBR_CHARS_PER_LINE;
	let pos = (new_pos > textarea.value.length) ? textarea.value.length : new_pos;
	textarea.setSelectionRange(pos, pos);
}

function getCharacterPerLine(target) {
    var w = target.clientWidth;
    var fSize = window.getComputedStyle(target, null).getPropertyValue('font-size');
    fSize = parseFloat(fSize);
    return (w / fSize) * 2;   
 }



function onlyNumbers(size_text) {       
	if(Number.isInteger(size_text)) {
		let size_text_in = Number(size_text);
		if(size_text_in > 0){
			if(size_text_in <= 500){
				return size_text_in;
			}
			else{
				alert("size must be <= 500");
				return 20;
			}
		}else{
			alert("size must be positive integer");
			return 20;
		}
	}  
	else{
		alert("size must be an integer");
		return 20;
	}
}