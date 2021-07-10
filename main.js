song="";
song1="";
leftwristX="";
leftwristY="";
rightwristX="";
rightwristY="";
scorerightwrist = "";
scoreleftwrist = "";
song_status = "";
song1_status = "";

function setup(){
    canvas = createCanvas(650, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, modelloaded);
    posenet.on("pose", gotPoses);
}

function draw(){
    image(video, 0, 0, 650, 500)
    song_status = song.isPlaying();
    song1_status = song.isPlaying();
    fill(204, 60, 55);
    stroke(204, 143, 57);

    if(scorerightwrist > 0.2){
        circle(rightwristX, rightwristY, 20);
        song1.stop();
        if(song_status == false){
            song.play();
            document.getElementById("song").innerHTML = "Playing Mood by 24KGoldn";
        }
    }
    if(scoreleftwrist > 0.2){
        circle(leftwristX, leftwristY, 20);
        song.stop();
        if(song1_status == false){
            song1.play();
            document.getElementById("song").innerHTML = "Playing Sorry by Alan Walker";
        }
    }
}

function preload(){
    song = loadSound("mood.mp3");
    song1 = loadSound("sorry.mp3");
}

function modelloaded(){
    console.log("model loaded!");
}

function gotPoses(results){
    if(results.length > 0){
        scoreleftwrist = results[0].pose.keypoints[9].score;
        console.log("Score Left Wrist = "+scoreleftwrist);
        scorerightwrist = results[0].pose.keypoints[10].score;
        console.log("Score Right Wrist = "+scorerightwrist);
        console.log(results);
        leftwristX = results[0].pose.leftWrist.x;
        leftwristY = results[0].pose.leftWrist.y;
        rightwristY = results[0].pose.rightWrist.y; 
        rightwristX = results[0].pose.rightWrist.x;

        console.log("Left Wrist X = "+leftwristX+" Left Wrist Y = "+leftwristY);
        console.log("Right Wrist X = "+rightwristX+" Right Wrist Y = "+rightwristY);
       }
}