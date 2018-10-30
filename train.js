 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyC2HlSxsvLFU81AR_zmcClhKDFg21UxEqs",
    authDomain: "train-schedule-c6385.firebaseapp.com",
    databaseURL: "https://train-schedule-c6385.firebaseio.com",
    projectId: "train-schedule-c6385",
    storageBucket: "",
    messagingSenderId: "497219245197"
  };
  firebase.initializeApp(config);

  var database = firebase.database();


  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    // YOUR TASK!!!
    // Code in the logic for storing and retrieving the most recent user.
    // Don't forget to provide initial data to your Firebase database.
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var startTime = $("#start-input").val().trim();
    var frequency = $("#frequency-input").val().trim();

    var newTrain = {

        trainName: trainName,
        destination: destination,
        startTime: startTime,
        frequency: frequency,


};
database.ref().push(newTrain);




  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#start-input").val("");
  $("#frequency-input").val("");


  });


  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var startTime = childSnapshot.val().startTime;
    var frequency = childSnapshot.val().frequency;

    console.log(trainName);
    

    var firstTimeConverted = moment(startTime, "hh:mm").subtract(1, "years");
    var currentTime = moment();
    currentTime = moment(currentTime).format("hh:mm")
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % frequency;
    var tMinutesTillTrain = frequency - tRemainder;
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
     nextTrain = moment(nextTrain).format("HH:mm")
console.log(firstTimeConverted);

function update() {
    $('#currentTime').html(moment().format('H:mm:ss'));
  }
  
  setInterval(update, 1000);
  $('#currentDate').html(moment().format('D. MMMM YYYY'));

 

    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(nextTrain),
        $("<td>").text(tMinutesTillTrain)
    )
    $("#train-table > tbody").append(newRow);
  });




