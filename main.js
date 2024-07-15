song = "";
scoreLeftWrist = 0;
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
function preload() {
  song = loadSound("music.mp3");
}

function setup() {
  canvas = createCanvas(600, 500);
  canvas.center();

  video = createCapture(VIDEO);
  video.hide();

  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
}

function modelLoaded() {
  console.log('PoseNet Is Initialized');
}
function draw() {
  image(video, 0, 0, 600, 500);
  fill('#FF0000');
  stroke('#FF0000');
  circle(rightWristX, rightWristY, 20);
  if (rightWristY > 0 && rightWristY <= 500) {
    document.getElementById("speed").innerHTML = "Velocidad = 0.5x";
    song.rate(0.5);
  }
  circle(leftWristX, leftWristY, 20);

  if (scoreLeftWrist > 0.2) {
  
    InNumberleftWristY = Number(leftWristY);
    remove_decimals = floor(InNumberleftWristY);
    volume = remove_decimals / 500;
    document.getElementById("volume").innerHTML = "Volume =" + volume;
    song.setVolume(volume);
  }

}



function play() {
  song.play();
  song.setVolume(1);
  song.rate(1);
}

function gotPoses(results) {
  if (results.length > 0) {
    console.log(results);
    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    scoreRightWrist =  results[0].pose.keypoints[10].score;
    scoreLeftWrist =  results[0].pose.keypoints[9].score;
    console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);
    console.log("scoreLeftWrist =" +scoreLeftWrist)
    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);
  }
}

