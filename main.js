//https://teachablemachine.withgoogle.com/models/kEiSSGslo/
prediction_1 = "";
prediction_2 = "";

Webcam.set({
    width:330,
    height:330,
    image_format:'png',
    png_quality:100
});

camera = document.getElementById("camera");
Webcam.attach('#camera');


function capture(){
    Webcam.snap(function(data_uri){
        document.getElementById("selfie").innerHTML = '<img id="captured_img" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/kEiSSGslo/model.json', modelLoaded);

function modelLoaded(){
    console.log("Model loaded");
}

function predict(){
    image = document.getElementById("captured_img");
    classifier.classify(image, gotResult );
    
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }else{
        console.log(results);
        document.getElementById("result_name").innerHTML = results[0].label;
        document.getElementById("result_2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();
        if(results[0].label == "Happy"){
            document.getElementById("emoji_result").innerHTML = "&#128512";
        }
        if(results[0].label == "Sad"){
            document.getElementById("emoji_result").innerHTML = "&#128577";
        }
        if(results[0].label == "Angry"){
            document.getElementById("emoji_result").innerHTML = "&#128545";
        }
        if(results[0].label == "Normal"){
            document.getElementById("emoji_result").innerHTML = "&#128528";
        }

        if(results[1].label == "Happy"){
            document.getElementById("emoji_3").innerHTML = "&#128512";
        }
        if(results[1].label == "Sad"){
            document.getElementById("emoji_3").innerHTML = "&#128577";
        }
        if(results[1].label == "Angry"){
            document.getElementById("emoji_3").innerHTML = "&#128545";
        }
        if(results[1].label == "Normal"){
            document.getElementById("emoji_3").innerHTML = "&#128528";
        }
    }
    

}


function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediciton is"+prediction_1;
    speak_data_2 = "The second prediction is"+prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
    
}




    
