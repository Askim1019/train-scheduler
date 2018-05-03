$(document).ready(function(){
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
  // get the current time in minutes moment.js in seconds
  var currentTime = moment();
  console.log("Current Time: " + moment(currentTime).format("hh:mm"));

  database.ref().on("child_added", function(snapshot){

    var addedData = snapshot.val();
    var id = snapshot.key;
    console.log(id);
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
    var firstTrainTime = moment(addedData.firstTrain, 'HH:mm').subtract(1, 'years');
    console.log("The First train time: " + firstTrainTime);
    // get the difference in the time now and the first train time
    var diffTime = currentTime.diff(moment(firstTrainTime), "minutes");
    console.log("The difference in time: " + diffTime);
    // get the remainder of the difference and the frequency the train comes
    var remainder = diffTime % addedData.frequency;
    console.log("the remainder is: " + remainder);
    // Subtract to get how many minutes until the next train arrives
    minutesAway = addedData.frequency - remainder;
    console.log("minutes till train: " + minutesAway);
    // When the next train is due to arrive after calculating how far away it is.
    nextArrival = currentTime.add(minutesAway, "minutes").format('hh:mm');
    console.log("Next train arrival: " + nextArrival);

    // Add rows of data from firebase call "on child_added"
    $("tbody").prepend("<tr><td class='text-center'>" + addedData.trainName + "</td>" +
                       "<td class='text-center'>" + addedData.destination + "</td>" +
                       "<td class='text-center'>" + addedData.frequency + "</td>" +
                       "<td class='text-center'>" + nextArrival+ "</td>" +
                       "<td class='text-center'>" + minutesAway + "</td>" +
                       "<td class='text-center'><button class='icon-btn' id=trashBtn><i class='fa fa-trash'></i></button>" + 
                       "<td class='text-center'><a id='editLink'><button class='icon-btn' id=editBtn><i class='fa fa-edit'></i></button></td></tr>");

    $("#editLink").attr("href", "#myModal");
    $("#editLink").attr("rel","modal:open");
    
    
    $("#trashBtn").click(function(){
      database.ref(id).remove();
      $("tbody").empty();
    });

  });



  
 

  // Create submit button function to post data
  $("#add-data").click(function(){

    //Create variables for each data point in the train schedule table
    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var frequency = $("#frequency").val().trim();
    var firstTrain = $("#firstTrainTime").val().trim();
   

  
    database.ref().push({
      trainName: trainName,
      destination: destination,
      frequency: frequency,
      firstTrain: firstTrain
    });
    
    $("#trainName").val('');
    $("#destination").val('');
    $("#frequency").val('');
    $("#firstTrainTime").val('');
    
    

    event.preventDefault();
  });
});