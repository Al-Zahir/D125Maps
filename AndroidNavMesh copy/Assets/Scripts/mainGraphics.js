#pragma strict
import UnityEngine.UI; //used for the ui

var script : UserScript; //the user script
var isNavigate : boolean; //if navigating
//var camera2D : Camera; //the top view camera
var camera3D : Camera; //the front view camera

var mainCanvas : GameObject; //the main canvas
var navCanvas : GameObject; //the nav canvas
var inputFieldE : InputField; //the ending input field
var inputFieldS : InputField; //the starting input field

function Start(){
	mainCanvas.SetActive(true); //start up the main canvas
	navCanvas.SetActive(false); //hide the nav canvas
	isNavigate = false; //set navigating to false
	//camera2D.enabled = true; //start with the top view
	//camera2D.GetComponent.<Camera>().orthographicSize = 18; //set the zoom
	camera3D.enabled = true; //set the 3d view to false
}

function clickedNavigate(){ //if navigate button is clicked
	isNavigate = true; //set navigate to true
	script.setClassNumber(inputFieldS.text, inputFieldE.text); //set the start and end class number
	script.getPath(); //get the path 
	switchCanvas(); //swtich the canvas
}

function clickedAnimate(){ //if animate button is clicked
	//switch the camera
	//camera2D.enabled = false;
	camera3D.enabled = true;
	script.navigate(); //start navigating
}

function clickedCancel(){ //if cancel is clicked
	script.endPath(); //stop moving
		
	//if(!camera3D.enabled){ //if top view
		switchCanvas(); //switch the canvas back
		isNavigate = false; //set navigate to false
	//}else{ //if 3d view
		//switch the camera back
		//camera2D.enabled = true; 
		//camera3D.enabled = false;
	//}
}

//switch the canvas
function switchCanvas(){
	if(mainCanvas.activeSelf){
		mainCanvas.SetActive(false);
		navCanvas.SetActive(true);
	}else{
		mainCanvas.SetActive(true);
		navCanvas.SetActive(false);
	}
}

function clickedButton(num : int){ //when a button is clicked
	if(num == 0){ //if it is the bathroom
		inputFieldE.placeholder.enabled = false;
		inputFieldE.text = "9000";
	}else{//if not the bathroom
		if(inputFieldS.text == ""){ //if first input field is blank
			inputFieldS.placeholder.enabled = false;
			
			if(num < 10)
				inputFieldS.text = "900" + num;
			else
				inputFieldS.text = "90" + num;
				
		}else if(inputFieldE.text == ""){ //if first input field is filled and second is blank
			inputFieldE.placeholder.enabled = false;
			
			if(num < 10)
				inputFieldE.text = "900" + num;
			else
				inputFieldE.text = "90" + num;
				
		}	
	}
}