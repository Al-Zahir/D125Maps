#pragma strict

var agent : NavMeshAgent; //the person
var target : Transform; //the ending target
var startClassNumber : String; //the starting point
var endClassNumber : String; //the ending point
var line : LineRenderer; //the path

function Start () {
	agent = GetComponent(NavMeshAgent); //set the person
	line.enabled = false; //disable the line
	line.SetWidth(0.2, 0.2); //set the size of the line
}

//set the starting and ending class number
function setClassNumber (s1 : String, s2 : String) {
	startClassNumber = s1;
	endClassNumber = s2;
}

//get the path
function getPath(){
	agent.Warp(GameObject.Find(startClassNumber).transform.position); //set the person to the starting point
	target = GameObject.Find(endClassNumber).transform; //set the target to the ending point
	
	line.SetPosition(0, transform.position); //set the first position of the line to the person
	
	navigate(); //start to navigate
	//wait for the path to generate
	yield WaitForEndOfFrame(); 
	yield WaitForEndOfFrame();
	yield WaitForEndOfFrame();
	yield WaitForEndOfFrame(); 
	yield WaitForEndOfFrame();
	yield WaitForEndOfFrame();
	
	DrawPath(agent.path); //draw the path 
	
	endPath(); //stop moving
}

function navigate(){
	agent.SetDestination(target.position); //set the destination and start moving
	resume();
}

function endPath(){
	agent.Stop(); //stop moving
}

function resume(){
	agent.Resume(); //resume moving
}

function DrawPath(path : NavMeshPath){
	if(path.corners.Length < 2) //if the path is too close to the target
		return; //don't do anything
		
	line.SetVertexCount(path.corners.Length); //set the amount of curves in the line to the amount of corners in the path
	line.enabled = true; //show the line
	
	for(var i = 1; i < path.corners.Length; i++){ //go through each corner 
		line.SetPosition(i, path.corners[i]); //set the next position in the line to the corner
	}
	
	line.enabled = true; //disable the line
}