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


  database.ref().on("child_added", function(snapshot){

    var addedData = snapshot.val();

    console.log("train name is " + addedData.trainName);
    console.log("train destination is " + addedData.destination);
    console.log("train frequency is " + addedData.frequency);
    console.log("the next arrival is at " + addedData.nextArrival);
    console.log("the next train is " + addedData.minutesAway + " minutes away");

    $("tbody").prepend("<tr><td class='text-center'>" + addedData.trainName + "</td>" +
                       "<td class='text-center'>" + addedData.destination + "</td>" +
                       "<td class='text-center'>" + addedData.frequency + "</td>" +
                       "<td class='text-center'>" + addedData.nextArrival + "</td>" +
                       "<td class='text-center'>" + addedData.minutesAway + "</td></tr>");
  });

  
 

  // Create submit button function to post data
  $("#add-data").click(function(){

    //Create variables for each data point in the train schedule table
    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var frequency = $("#frequency").val().trim();
    var firstTrain = $("#firstTrainTime").val().trim();
    var nextArrival;
    var minutesAway;

    // First Train of the Day is 3:00 AM
    // Assume Train comes every 7 minutes.
    // Assume the current time is 3:16 AM....
    // What time would the next train be...? (Use your brain first)
    // It would be 3:21 -- 5 minutes away


    // Solved Mathematically
    // Test case 2:
    // 16 - 00 = 16
    // 16 % 7 = 2 (Modulus is the remainder)
    // 7 - 2 = 5 minutes away
    // 5 + 3:16 = 3:21
   
    // make a time object of the firstTrain input in 24 hour (capital 'HH') and minute format of current day
    var firstTrainTime = moment(firstTrain, 'HH:mm').subtract(1, 'years');
    console.log("The First train time: " + firstTrainTime);
    // get the current time in minutes moment.js in seconds
    var currentTime = moment();
    console.log("Current Time: " + moment(currentTime).format("hh:mm"));
    // get the difference in the time now and the first train time
    var diffTime = moment().diff(moment(firstTrainTime), "minutes");
    console.log("The difference in time: " + diffTime);
    // get the remainder of the difference and the frequency the train comes
    var remainder = diffTime % frequency;
    console.log("the remainder is: " + remainder);
    // Subtract to get how many minutes until the next train arrives
    minutesAway = frequency - remainder;
    console.log("minutes till train: " + minutesAway);
    // When the next train is due to arrive after calculating how far away it is.
    nextArrival = moment().add(minutesAway, "minutes").format('hh:mm');
    console.log("Next train arrival: " + nextArrival);

    console.log(trainName + " will arrive at " + destination + " in " + minutesAway + " minutes.");

    database.ref().push({
      trainName: trainName,
      destination: destination,
      frequency: frequency,
      firstTrain: firstTrain,
      nextArrival: nextArrival,
      minutesAway: minutesAway
    });
    
    $("#trainName").val('');
    $("#destination").val('');
    $("#frequency").val('');
    $("#firstTrainTime").val('');
    
    

    event.preventDefault();
  });