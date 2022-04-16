var img="";
var status="";
objects=[];
r=0;
g=0;
b=0;
song="";

function preload(){
    song= loadSound("alarm.mp3");
}

function setup(){
    canvas=createCanvas(380,380);
    canvas.position(500,300);
    video=createCapture(VIDEO);
    video.hide();
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Child";
}

function draw(){
    image(video,0,0,380,380);
    if(status !=""){
        r=random(255);
        g=random(255);
        b=random(255);
        objectDetector.detect(video,gotResult);
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="Status: Object/s Detected";
            fill(r,g,b);
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%", objects[i].x+15, objects[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if(objects[i].label=="person"){
                document.getElementById("numberofobjects").innerHTML="Child Found!";
                song.stop();
            }
            else{
                document.getElementById("numberofobjects").innerHTML="!Child NOT Found!";
                song.play();
            }
        }
        if(objects.length==0){
            document.getElementById("numberofobjects").innerHTML="NOBODY FOUND";
            song.play();
        }
    }

}

function modelLoaded(){
    console.log("Model Loaded");
    status=true;
    objectDetector.detect(video,gotResult);
}

function gotResult(error,results){
    console.log("Got result called");
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
    }
    objects=results;
}