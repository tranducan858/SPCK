import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getAuth,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyDe82pSIdDKPSMcnDDjnU9U-kaJzdOr5u8",
    authDomain: "spck-59ebe.firebaseapp.com",
    projectId: "spck-59ebe",
    storageBucket: "spck-59ebe.firebasestorage.app",
    messagingSenderId: "966038431061",
    appId: "1:966038431061:web:64a54630250d41a53b3bdc",
    measurementId: "G-1GEHBEHFLG"
};


// Init Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();


// DOM
const form = document.getElementById('loginForm');

const username = document.getElementById('username');

const password = document.getElementById('password');

const googleBtn = document.getElementById('googleLogin');

const usernameError = document.getElementById('usernameError');

const passwordError = document.getElementById('passwordError');


// Show error
function showError(input, errorElement, message) {

    input.classList.add('error');

    errorElement.textContent = message;

    errorElement.classList.add('show');
}


// Clear error
function clearError(input, errorElement) {

    input.classList.remove('error');

    errorElement.textContent = '';

    errorElement.classList.remove('show');
}


// Input event
username.addEventListener('input', () => {

    clearError(username, usernameError);

});

password.addEventListener('input', () => {

    clearError(password, passwordError);

});


// LOGIN EMAIL/PASSWORD
form.addEventListener('submit', async (e) => {

    e.preventDefault();

    clearError(username, usernameError);

    clearError(password, passwordError);

    let isValid = true;


    if (username.value.trim() === '') {

        showError(
            username,
            usernameError,
            'Vui lòng nhập email'
        );

        isValid = false;
    }


    if (password.value === '') {

        showError(
            password,
            passwordError,
            'Vui lòng nhập mật khẩu'
        );

        isValid = false;
    }


    if (!isValid) return;


    try {

        await signInWithEmailAndPassword(
            auth,
            username.value.trim(),
            password.value
        );


        alert('Đăng nhập thành công');

        window.location.href = 'index.html';

    }

    catch (error) {

        if (error.code === 'auth/invalid-credential') {

            alert('Sai email hoặc mật khẩu');

        }

        else {

            alert(error.message);

        }

    }

});


// LOGIN GOOGLE
googleBtn.addEventListener('click', async () => {

    try {

        await signInWithPopup(auth, provider);

        alert('Đăng nhập Google thành công');

        window.location.href = 'index.html';

    }

    catch (error) {

        alert(error.message);

    }

});