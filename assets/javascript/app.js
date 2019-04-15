// ============== Linking the database ==============

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

function googleSignin() {
   firebase.auth()
   
   .signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
		
      console.log(token)
      console.log(user)
   }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;

      var email = error.email;
      var credential = error.credential;
		
      console.log(error.code)
      console.log(error.message)
   });
}

function googleSignout() {
   firebase.auth().signOut()
	
   .then(function() {
      console.log('Signout Succesfull')
   }, function(error) {
      console.log('Signout Failed')  
   });
}