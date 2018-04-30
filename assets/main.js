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

  var database = firebase.database();


  database.ref().on("child_added", function(snapshot){

    var addedData = snapshot.val();

    console.log("train name is " + addedData.trainName);
    console.log("train destination is " + addedData.destination);
    console.log("train frequency is " + addedData.frequency);
    console.log("the next arrival is at " + addedData.nextArrival);
    console.log("the next train is " + minutesAway + " minutes away");

    $("tbody").prepend("<tr><td class='text-center'>" + addedData.trainName + "</td>" +
                       "<td class='text-center'>" + addedData.destination + "</td>" +
                       "<td class='text-center'>" + addedData.frequency + "</td>" +
                       "<td class='text-center'>" + addedData.nextArrival + "</td>" +
                       "<td class='text-center'>" + addedData.minutesAway + "</td></tr>");
  });

  // Make the firebase database call simplified by assignment
 

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

    var firstTrainTime = ;
    // get the current time in minutes moment.js in secondsd
    var currentTime = moment().minutes();
    console.log(currentTime);

    // the function should return when the next train will arrive based off of the first train time.
    function calculateNextArrival() {
      nextArrival = firstTrain
    }
    

  /*   database.ref().push({
      trainName: trainName,
      destination: destination,
      frequency: frequency,
      firstTrain: firstTrain,
      nextArrival: nextArrival,
      minutesAway: minutesAway
    });
 */

    event.preventDefault();
  });