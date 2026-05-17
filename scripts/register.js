import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getAuth,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile
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


// INIT FIREBASE
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();


// DOM
const form = document.getElementById('registerForm');

const username = document.getElementById('username');

const email = document.getElementById('email');

const password = document.getElementById('password');

const googleBtn = document.getElementById('googleRegister');


// ERROR DOM
const usernameError = document.getElementById('usernameError');

const emailError = document.getElementById('emailError');

const passwordError = document.getElementById('passwordError');


// VALIDATE EMAIL
function validateEmail(email) {

    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return re.test(String(email).toLowerCase());

}


// SHOW ERROR
function showError(input, errorElement, message) {

    input.classList.add('error');

    errorElement.textContent = message;

    errorElement.classList.add('show');

}


// CLEAR ERROR
function clearError(input, errorElement) {

    input.classList.remove('error');

    errorElement.textContent = '';

    errorElement.classList.remove('show');

}


// INPUT EVENTS
username.addEventListener('input', () => {

    clearError(username, usernameError);

});

email.addEventListener('input', () => {

    clearError(email, emailError);

});

password.addEventListener('input', () => {

    clearError(password, passwordError);

});


// REGISTER EMAIL/PASSWORD
form.addEventListener('submit', async function (e) {

    e.preventDefault();


    clearError(username, usernameError);

    clearError(email, emailError);

    clearError(password, passwordError);


    let isValid = true;


    // USERNAME
    if (username.value.trim() === '') {

        showError(
            username,
            usernameError,
            'Vui lòng nhập username'
        );

        isValid = false;

    }

    else if (username.value.trim().length < 3) {

        showError(
            username,
            usernameError,
            'Username phải có ít nhất 3 ký tự'
        );

        isValid = false;

    }


    // EMAIL
    if (email.value.trim() === '') {

        showError(
            email,
            emailError,
            'Vui lòng nhập email'
        );

        isValid = false;

    }

    else if (!validateEmail(email.value.trim())) {

        showError(
            email,
            emailError,
            'Email không hợp lệ'
        );

        isValid = false;

    }


    // PASSWORD
    if (password.value === '') {

        showError(
            password,
            passwordError,
            'Vui lòng nhập password'
        );

        isValid = false;

    }

    else if (password.value.length < 6) {

        showError(
            password,
            passwordError,
            'Password phải có ít nhất 6 ký tự'
        );

        isValid = false;

    }


    if (!isValid) return;


    try {

        // Tạo tài khoản Firebase
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email.value.trim(),
            password.value
        );


        // Update username
        await updateProfile(userCredential.user, {

            displayName: username.value.trim()

        });


        alert('Đăng ký thành công!');


        // Chuyển trang
        window.location.href = 'login.html';

    }

    catch (error) {

        console.log(error.code);


        // Email đã tồn tại
        if (error.code === 'auth/email-already-in-use') {

            showError(
                email,
                emailError,
                'Email đã tồn tại'
            );

        }


        // Password yếu
        else if (error.code === 'auth/weak-password') {

            showError(
                password,
                passwordError,
                'Mật khẩu quá yếu'
            );

        }


        else {

            alert(error.message);

        }

    }

});


// REGISTER GOOGLE
googleBtn.addEventListener('click', async () => {

    try {

        await signInWithPopup(auth, provider);

        alert('Đăng ký Google thành công!');

        window.location.href = 'index.html';

    }

    catch (error) {

        alert(error.message);

    }

});