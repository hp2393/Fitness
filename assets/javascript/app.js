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
        console.log(userID + " vs " + profile.uid);
        userID = profile.uid;
        database.ref(userID+"/login").push(true);  
      }
    });
  } else {

  }
});

// ============ Footer Button to display remaining description of site ============

function moreInfo () {

  // ----- Adding the fitness section to the main page -----
  var fDiv = $("<div id= 'fitness-desc-row' class= 'row justify-content-start'>");
    var fCol1 = $("<div id= 'desc-col' class= 'col-md-2'>");
      $(fCol1).append("<img src='assets/images/main-fitness.jpg' width='100%' height='100%' class='d-inline-block' alt=''>");
    var fCol2 = $("<div id= 'desc-col' class= 'col-md-6 my-auto'>");
      $(fCol2).append("<p id= 'desc-text' class= 'h6 d-flex text-left'>Giving you the information available to perform a workout to your choosing</p>");

    $(fDiv).append(fCol1);
    $(fDiv).append(fCol2);    

  // ----- Adding the fitness section to the main page -----
  var mDiv = $("<div id= 'meals-desc-row' class= 'row justify-content-end'>");
    var mCol1 = $("<div id= 'desc-col' class= 'col-md-6 my-auto'>");
      $(mCol1).append("<p id= 'desc-text' class= 'h6 d-flex text-right'>Assisting in planning your meals based on calories <br> & ingredients</p>");
    var mCol2 = $("<div id= 'desc-col' class= 'col-md-2'>");
      $(mCol2).append("<img src='assets/images/main-food.jpg' width='100%' height='100%' class='d-inline-block' alt=''>");

    $(mDiv).append(mCol1);
    $(mDiv).append(mCol2);
    
  // ----- Adding the fitness section to the main page -----
  var pDiv = $("<div id= 'personalize-desc-row' class= 'row justify-content-start'>");
    var pCol1 = $("<div id= 'desc-col' class= 'col-md-2'>");
      $(pCol1).append("<img src='assets/images/main-personalized.jpg' width='100%' height='100%' class='d-inline-block' alt=''>");
    var pCol2 = $("<div id= 'desc-col' class= 'col-md-6 my-auto'>");
      $(pCol2).append("<p id= 'desc-text' class= 'h6 d-flex text-left'>A free approach to fitness logging that allows you to make all the choices while we assist with providing the information you need!</p>");

    $(pDiv).append(pCol1);
    $(pDiv).append(pCol2);
   
  // ----- Adding all 3 Divs to the Aspects container -----   
  $("#aspects-container").append(fDiv);
  $("#aspects-container").append(mDiv);
  $("#aspects-container").append(pDiv);

  // ----- Clearing the More Info Button from the HTML ----- 
  $("#footer-container").empty();

};