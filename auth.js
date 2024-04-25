const firebaseConfig = {
    apiKey: "AIzaSyDT6mRe_U7mMrowuBloBgE5fjfc2hGCJ1M",
    authDomain: "gamiway-5d982.firebaseapp.com",
    projectId: "gamiway-5d982",
    databaseURL: "https://gamiway-5d982-default-rtdb.asia-southeast1.firebasedatabase.app/",
    storageBucket: "gamiway-5d982.appspot.com",
    messagingSenderId: "495989155315",
    appId: "1:495989155315:web:cd492682bfdab0d2ec1e86",
    measurementId: "G-L0YXZLTT4B"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

let container = document.getElementById('container')

function register(){
    const username = document.getElementById('username').value;
    const mail = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (validate_email(mail) == false || validate_password(password, confirmPassword) == false){
        return;
    }
    if (validate_fields(username) == false){
        return;
    }

    auth.createUserWithEmailAndPassword(mail, password).then(function (){
        var user = auth.currentUser;
        var database_ref = database.ref();
        var user_data = {
            username: username,
        }
        database_ref.child('users/' + user.uid).set(user_data);
        toggle();
    }).catch(function (error){
        console.log(error.message);
    });
}

function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/;
    if (expression.test(email) == true) {
      return true;
    } else {
      return false;
    }
  }

function validate_password(password, confirmPassword){
    if (password < 6 || password != confirmPassword){
        return false;
    }else{
        return true;
    }
}

function validate_fields(field){
    if (field == null) {
        return false;
    }
    if (field.length <= 0){
        return false;
    }else{
        return true;
    }
}

toggle = () => {
    container.classList.toggle('sign-in')
    container.classList.toggle('sign-up')
}

setTimeout(() => {
    container.classList.add('sign-in')
}, 200)

