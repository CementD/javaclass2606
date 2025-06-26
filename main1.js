window.addEventListener('DOMContentLoaded', () => {
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;
  const path = location.pathname;

  if (path.includes('index') && user?.email) {
    location.href = 'user1.html';
  }
  if (path.includes('user') && !user?.email) {
    location.href = 'index1.html';
  }

  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const confirmInput = document.getElementById('confirm');
  const signupBtn = document.getElementById('signupBtn');

  if (signupBtn) {
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmError = document.getElementById('confirmError');

    function validate() {
      let valid = true;

      emailError.textContent = '';
      passwordError.textContent = '';
      confirmError.textContent = '';

      if (emailInput.value.length < 3 || !emailInput.value.includes('@')) {
        emailError.textContent = 'Wrong email address';
        valid = false;
      }
      if (passwordInput.value.length < 6) {
        passwordError.textContent = '6 symbols required';
        valid = false;
      }
      if (passwordInput.value !== confirmInput.value) {
        confirmError.textContent = 'Passwords must match';
        valid = false;
      }

      signupBtn.disabled = !valid;
    }

    emailInput.addEventListener('input', validate);
    passwordInput.addEventListener('input', validate);
    confirmInput.addEventListener('input', validate);

    signupBtn.addEventListener('click', () => {
      const newUser = {
        email: emailInput.value,
        password: passwordInput.value
      };
      localStorage.setItem('user', JSON.stringify(newUser));
      location.href = 'user1.html';
    });
  }

  const saveBtn = document.getElementById('saveBtn');
  const exitBtn = document.getElementById('exitBtn');

  if (document.getElementById('userEmail') && user?.email) {
    document.getElementById('userEmail').textContent = user.email;
  }

  if (saveBtn && user) {
    const fields = ['firstName', 'lastName', 'year', 'gender', 'phone', 'skype'];
    fields.forEach(f => {
      const el = document.getElementById(f);
      if (user[f]) el.value = user[f];
    });

    saveBtn.addEventListener('click', () => {
      let valid = true;

      fields.forEach(f => {
        const el = document.getElementById(f);
        const err = document.getElementById(f + 'Error');
        err.textContent = '';
        const val = el.value.trim();

        if ((f === 'firstName' || f === 'lastName') && (!val || val.length > 20)) {
          err.textContent = 'Enter max 20 symbols.';
          valid = false;
        }

        if (f === 'year') {
          const y = parseInt(val);
          if (!y || y < 1900 || y > new Date().getFullYear()) {
            err.textContent = 'Incorrect year.';
            valid = false;
          }
        }

        if (f === 'gender' && val === '') {
          err.textContent = 'Enter a gender.';
          valid = false;
        }

        if (f === 'phone' && val && (val.replace(/\D/g, '').length < 10)) {
          err.textContent = 'Incorrect phone number.';
          valid = false;
        }
      });

      if (valid) {
        fields.forEach(f => {
          const el = document.getElementById(f);
          user[f] = el.value;
          const cell = document.getElementById(f + 'Cell');
          if (cell) cell.textContent = el.value;
        });
        localStorage.setItem('user', JSON.stringify(user));
        document.getElementById('userTable').style.display = 'table';
      }
    });

    exitBtn.addEventListener('click', () => {
      localStorage.removeItem('user');
      location.href = 'index1.html';
    });
  }
});