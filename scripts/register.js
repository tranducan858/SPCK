const form = document.getElementById('registerForm');
        const username = document.getElementById('username');
        const email = document.getElementById('email');
        const password = document.getElementById('password');

        const usernameError = document.getElementById('usernameError');
        const emailError = document.getElementById('emailError');
        const passwordError = document.getElementById('passwordError');

        // Hàm validate email
        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(String(email).toLowerCase());
        }

        // Hàm hiển thị lỗi
        function showError(input, errorElement, message) {
            input.classList.add('error');
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }

        // Hàm xóa lỗi
        function clearError(input, errorElement) {
            input.classList.remove('error');
            errorElement.textContent = '';
            errorElement.classList.remove('show');
        }

        // Xóa lỗi khi người dùng bắt đầu nhập
        username.addEventListener('input', () => clearError(username, usernameError));
        email.addEventListener('input', () => clearError(email, emailError));
        password.addEventListener('input', () => clearError(password, passwordError));

        // Xử lý submit form
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Reset tất cả lỗi
            clearError(username, usernameError);
            clearError(email, emailError);
            clearError(password, passwordError);

            let isValid = true;

            // Validate username
            if (username.value.trim() === '') {
                showError(username, usernameError, 'Vui lòng nhập username');
                isValid = false;
            } else if (username.value.trim().length < 3) {
                showError(username, usernameError, 'Username phải có ít nhất 3 ký tự');
                isValid = false;
            }

            // Validate email
            if (email.value.trim() === '') {
                showError(email, emailError, 'Vui lòng nhập email');
                isValid = false;
            } else if (!validateEmail(email.value.trim())) {
                showError(email, emailError, 'Email không hợp lệ');
                isValid = false;
            }

            // Validate password
            if (password.value === '') {
                showError(password, passwordError, 'Vui lòng nhập password');
                isValid = false;
            } else if (password.value.length < 6) {
                showError(password, passwordError, 'Password phải có ít nhất 6 ký tự');
                isValid = false;
            }

            // Nếu tất cả hợp lệ
            if (isValid) {
                const userData = {
                    username: username.value.trim(),
                    email: email.value.trim(),
                    password: password.value,
                    registeredAt: new Date().toISOString()
                };

                // LƯU Ý: localStorage không hoạt động trong Claude.ai
                // Khi bạn copy code này ra ngoài, phần này sẽ hoạt động bình thường
                try {
                    localStorage.setItem('userData', JSON.stringify(userData));
                    alert('Đăng ký thành công!');
                    form.reset();
                    setTimeout(() => {
                        window.location.href = 'login.html';
                    });
                } catch (error) {
                    alert('Đăng ký thất bại!');
                }
            }
        });

        // Xử lý link "Already have an account?"
        document.querySelector('.account-link').addEventListener('click', function(e) {
            window.location.href = 'login.html';
        });