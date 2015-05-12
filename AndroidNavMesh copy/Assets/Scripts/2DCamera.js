#pragma strict

var speed : float = 0.1F; //the speed of the touch movement

//the boundaries of the camera movement
var clampXNeg : float; 
var clampXPos : float;
var clampYNeg : float;
var clampYPos : float;

var acceleration : float; //the acceleration of the panning
var scrolling : boolean; //the scrolling of the camera

var script : mainGraphics; //the graphics script

var touchDeltaPosition : Vector2; //the change in position of he touch
var swipeSpeed : float = 0; //the speed of the swipe

var orthoZoomSpeed : float = 0.1f; //the zoom speed

function Start(){
	//get the script
	script = GameObject.Find("GUI").GetComponent(mainGraphics);
}

function Update() {
	if(script.isNavigate){ //if navigating
		
		//the moving of the camera
		if (Input.touchCount > 0){ //if touching
			scrolling = false; 
			
			if(Input.GetTouch(0).phase == TouchPhase.Moved) { //if moved
			    touchDeltaPosition = Input.GetTouch(0).deltaPosition; //get the change in position
			    swipeSpeed = touchDeltaPosition.magnitude / Input.GetTouch(0).deltaTime; //the speed of the swipe
			    transform.Translate(-touchDeltaPosition.x * speed, -touchDeltaPosition.y * speed, 0); //move the camera 
			}  	
			
			if(Input.GetTouch(0).phase == TouchPhase.Ended) //when finished touch
				scrolling = true;
	 	}
	 	
	 	
 		//the ending scroll of the camera
	 	if(scrolling && swipeSpeed < 100000){ //if scrolling and not too much swipe
	 		//continue moving
	    	transform.Translate(-touchDeltaPosition.x * swipeSpeed / 100000, -touchDeltaPosition.y * swipeSpeed / 100000, 0);
	    	swipeSpeed -= acceleration * Time.deltaTime; //decelerate the speed
	    	if(swipeSpeed <= 0){
	    		scrolling = false;
	    		swipeSpeed = 0;
	    	}
		}
		
		
		//the zoom of the camera
		if (Input.touchCount == 2){
	        // Store both touches.
	        var touchZero = Input.GetTouch(0);
	        var touchOne = Input.GetTouch(1);

	        // Find the position in the previous frame of each touch.
	        var touchZeroPrevPos = touchZero.position - touchZero.deltaPosition;
	        var touchOnePrevPos = touchOne.position - touchOne.deltaPosition;

	        // Find the magnitude of the vector (the distance) between the touches in each frame.
	        var prevTouchDeltaMag = (touchZeroPrevPos - touchOnePrevPos).magnitude;
	        var touchDeltaMag = (touchZero.position - touchOne.position).magnitude;

	        // Find the difference in the distances between each frame.
	        var deltaMagnitudeDiff = prevTouchDeltaMag - touchDeltaMag;
	        
            // ... change the orthographic size based on the change in distance between the touches.
            transform.GetComponent.<Camera>().orthographicSize += deltaMagnitudeDiff * orthoZoomSpeed;

            // Make sure the orthographic size never drops below zero.
            transform.GetComponent.<Camera>().orthographicSize = Mathf.Max(GetComponent.<Camera>().orthographicSize, 0.1f);
        }
	}
 	
 	//making sure the camera doesn't exit specific bounds
 	transform.position.x = Mathf.Clamp(transform.position.x, clampXNeg, clampXPos);
 	transform.position.z = Mathf.Clamp(transform.position.z, clampYNeg, clampYPos);
}
