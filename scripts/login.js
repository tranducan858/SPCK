const form = document.getElementById('loginForm');
        const username = document.getElementById('username');
        const password = document.getElementById('password');

        const usernameError = document.getElementById('usernameError');
        const passwordError = document.getElementById('passwordError');

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
        password.addEventListener('input', () => clearError(password, passwordError));

        // Xử lý submit form
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Reset tất cả lỗi
            clearError(username, usernameError);
            clearError(password, passwordError);

            let isValid = true;

            // Validate username
            if (username.value.trim() === '') {
                showError(username, usernameError, 'Vui lòng nhập username');
                isValid = false;
            }

            // Validate password
            if (password.value === '') {
                showError(password, passwordError, 'Vui lòng nhập password');
                isValid = false;
            }

            // Nếu tất cả hợp lệ, kiểm tra với localStorage
            if (isValid) {
                try {
                    // Lấy dữ liệu từ localStorage
                    const storedData = localStorage.getItem('userData');
                    
                    if (!storedData) {
                        alert('Không tìm thấy tài khoản!\nVui lòng đăng ký trước.');
                        return;
                    }

                    const userData = JSON.parse(storedData);

                    // So sánh username và password
                    if (userData.username === username.value.trim() &&
                        userData.password === password.value) {
                        localStorage.setItem('loginSuccess', 'true');
                        form.reset();
                        setTimeout(() => {
                            window.location.href = 'index.html';
                        });
                    } else {
                        // Kiểm tra username sai hay password sai
                        if (userData.username !== username.value.trim()) {
                            showError(username, usernameError, 'Username không đúng');
                        }
                        if (userData.password !== password.value) {
                            showError(password, passwordError, 'Password không đúng');
                        }
                    }

                } catch (error) {
                    alert('Không thể đăng nhập!');
                }
            }
        });

        // Xử lý link "Don't have an account?"
        document.querySelector('.account-link').addEventListener('click', function(e) {
            window.location.href = 'register.html';
        });