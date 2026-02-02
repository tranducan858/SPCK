    const form = document.getElementById('loginForm');
    const username = document.getElementById('username');
    const password = document.getElementById('password');

    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');

    function showError(input, errorElement, message) {
      input.classList.add('error');
      errorElement.textContent = message;
      errorElement.classList.add('show');
    }

    function clearError(input, errorElement) {
      input.classList.remove('error');
      errorElement.textContent = '';
      errorElement.classList.remove('show');
    }

    username.addEventListener('input', () => clearError(username, usernameError));
    password.addEventListener('input', () => clearError(password, passwordError));

    form.addEventListener('submit', function(e) {
      e.preventDefault();

      clearError(username, usernameError);
      clearError(password, passwordError);

      let isValid = true;

      if (username.value.trim() === '') {
        showError(username, usernameError, 'Vui lòng nhập username');
        isValid = false;
      }

      if (password.value === '') {
        showError(password, passwordError, 'Vui lòng nhập password');
        isValid = false;
      }

      if (isValid) {
        const storedData = localStorage.getItem('userData');

        if (!storedData) {
          alert('Không tìm thấy tài khoản!\nVui lòng đăng ký trước.');
          return;
        }

        const userData = JSON.parse(storedData);

        if (
          userData.username === username.value.trim() &&
          userData.password === password.value
        ) {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('loginSuccess', 'true'); // 👈 quan trọng
          form.reset();
          window.location.href = 'index.html';
        } else {
          if (userData.username !== username.value.trim()) {
            showError(username, usernameError, 'Username không đúng');
          }
          if (userData.password !== password.value) {
            showError(password, passwordError, 'Password không đúng');
          }
        }
      }
    });

    document.querySelector('.account-link').addEventListener('click', () => {
      window.location.href = 'register.html';
    });