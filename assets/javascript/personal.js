var userID;

// ============ Linking the Database ============

var config = {
    apiKey: "AIzaSyDomvPd1Clur-_hGFZnN1Dos42Qk7op018",
    authDomain: "gainzcity-abc37.firebaseapp.com",
    databaseURL: "https://gainzcity-abc37.firebaseio.com",
    projectId: "gainzcity-abc37",
    storageBucket: "gainzcity-abc37.appspot.com",
    messagingSenderId: "723793258419"
  };
    
firebase.initializeApp(config);
  
// Create a variable to reference the database.
var database = firebase.database();

var provider = new firebase.auth.GoogleAuthProvider();

var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    'signInSuccessUrl': '/user.html',
    'signInOptions': [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    // Terms of service url.
    tosUrl: '',
    // Privacy policy url.
    privacyPolicyUrl: ''
};

ui.start('#firebaseui-auth-container', uiConfig);

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log("this is happening");
    
    user.providerData.forEach(function (profile) {
      
      if (userID != profile.uid){
        userID = profile.uid;
        database.ref(userID+"/login").push(true);  
      }

      console.log(userID);

// ============ Firebase On-Change Stuff ===========

      database.ref(userID + "/Starting").on("value", function(snapshot){

        if (snapshot.val().set) {
          writeValues( "Starting", snapshot );
        }
      });
      
      database.ref(userID + "/Current").on("value", function(snapshot){
      
        if (snapshot.val().set) {
          writeValues( "Current", snapshot );
        }
      
      });

// ==================================================

    });
  } else {

  }
});


// ============ CALENDAR STUFF ===========
today = new Date();
currentMonth = today.getMonth();
currentYear = today.getFullYear();
months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);


function showCalendar(month, year) {

    let firstDay = (new Date(year, month)).getDay();

    tbl = document.getElementById("calendar-body"); // body of the calendar

    // clearing all previous cells
    tbl.innerHTML = "";

    // filing data about month and in the page via DOM.
    monthAndYear.innerHTML = months[month] + " " + year;
    currentYear.value = year;
    currentMonth.value = month;

    // creating all cells
    let date = 1;
    for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = document.createElement("tr");

        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                cell = document.createElement("td");
                cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            else if (date > daysInMonth(month, year)) {
                break;
            }

            else {
              var workOutPlanBtn = document.createElement('input');
                workOutPlanBtn.type = "button";
                workOutPlanBtn.className = "btn btn-primary btn-sm workOutPlanBtn";
                workOutPlanBtn.value = 'Workout';
                
                var mealPlanBtn = document.createElement('input');
                mealPlanBtn.type = "button";
                mealPlanBtn.className = "btn btn-light btn-sm mealPlanBtn";
                mealPlanBtn.value = 'Meal';
                
                $('.workOutPlanBtn').click(function() {
                    window.open('./workouts.html');
                });
                
                $('.mealPlanBtn').click(function() {
                    window.open('./meal.html');
                });
            
                cell = document.createElement("td");
                cellText = document.createTextNode(date);
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("highlight-today");
                } // color today's date
                cell.appendChild(cellText);
                cell.appendChild(workOutPlanBtn);
                cell.appendChild(mealPlanBtn);
                row.appendChild(cell);
                date++;
            }


        }

        tbl.appendChild(row); // appending each row into calendar body.
    }

}
// check how many days in a month code from https://dzone.com/articles/determining-number-days-month
function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
}


// ============ ADDING PERSONAL DETAILS ============

function settingStarting( location ) {

  console.log(userID);
  var bench = 0;
  var push = 0;
  var dead = 0;
  var plank = 0;
  var squat = 0;
  var lcurl = 0;

  if (location === "Starting") {
    bench = $("#bench-input").val();
    push = $("#push-input").val();
  
    dead = $("#dead-input").val();
    plank = $("#plank-input").val();
  
    squat = $("#squat-input").val();
    lcurl = $("#lcurl-input").val();


  
  } else if (location === "Current") {
    bench = $("#bench2-input").val();
    push = $("#push2-input").val();
  
    dead = $("#dead2-input").val();
    plank = $("#plank2-input").val();
  
    squat = $("#squat2-input").val();
    lcurl = $("#lcurl2-input").val();

  }

  database.ref(userID+"/" + location + "/bench").set(bench);
  database.ref(userID+"/" + location + "/push").set(push);

  database.ref(userID+"/" + location + "/dead").set(dead);
  database.ref(userID+"/" + location + "/plank").set(plank);

  database.ref(userID+"/" + location + "/squats").set(squat);
  database.ref(userID+"/" + location + "/legcurl").set(lcurl);

  database.ref(userID+"/" + location + "/set").set(true);

}

function writeValues ( location, snapshot ) {
  var snapshot = snapshot;

  console.log(snapshot.val());

  if (location === "Starting") {
    var abr = "sta";

  } else if (location === "Current") {
    var abr = "cur";

  }

  $("#"+abr+"-ben-row").empty();
  $("#"+abr+"-pus-row").empty();
  $("#"+abr+"-dea-row").empty();
  $("#"+abr+"-pla-row").empty();
  $("#"+abr+"-squ-row").empty();
  $("#"+abr+"-lcu-row").empty();
  $("#"+abr+"-sub-btn").empty();

  $("#"+abr+"-ben-row").append("<p id= 'starting-set-values' class= 'text-left'> Bench : " + snapshot.val().bench + "</p>");
  $("#"+abr+"-pus-row").append("<p id= 'starting-set-values' class= 'text-left'> Pushups : " + snapshot.val().push + "</p>");
  $("#"+abr+"-dea-row").append("<p id= 'starting-set-values' class= 'text-left'> Deadlifts : " + snapshot.val().dead + "</p>");
  $("#"+abr+"-pla-row").append("<p id= 'starting-set-values' class= 'text-left'> Planks : " + snapshot.val().plank + "</p>");
  $("#"+abr+"-squ-row").append("<p id= 'starting-set-values' class= 'text-left'> Squats: " + snapshot.val().squats + "</p>");
  $("#"+abr+"-lcu-row").append("<p id= 'starting-set-values' class= 'text-left'> Leg Curls: " + snapshot.val().legcurl + "</p>");

  if (location === "Current") {
    $("#"+abr+"-sub-btn").append("<button id= 'reset' class= 'btn btn-outline-success' onclick='resetCurrent()'> RESET </button>");
  }
}

function resetCurrent() {
  database.ref(userID + "/Current/set").set(false);
}
