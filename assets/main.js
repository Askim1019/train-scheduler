 // Initialize Firebase with special api key and config
 var config = {
    apiKey: "AIzaSyDUilhun_95xoPLV1uh2MeWwf9_RlBtXfE",
    authDomain: "train-scheduler-5e8ed.firebaseapp.com",
    databaseURL: "https://train-scheduler-5e8ed.firebaseio.com",
    projectId: "train-scheduler-5e8ed",
    storageBucket: "train-scheduler-5e8ed.appspot.com",
    messagingSenderId: "1027948051918"
  };

  firebase.initializeApp(config);


  // Make the firebase database call simplified by assignment
  var database = firebase.database();

  // Create submit button function to post data
  $("#add-data").click(function(){

    //Create variables for each data point in the train schedule table
    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var frequency = $("#frequency").val().trim();
    var firstTrain = $("#firstTrainTime").val().trim();
    var nextArrival;
    var minutesAway;

    console.log(trainName + " will arrive at " + destination + " in " + minutesAway + " minutes.");

    

    database.ref().push({
      trainName: trainName,
      destination: destination,
      frequency: frequency,
      firstTrain: firstTrain,
     /*  nextArrival: nextArrival,
      minutesAway: minutesAway */
    });


    event.preventDefault();
  });