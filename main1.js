window.addEventListener('DOMContentLoaded', () => {
  const email = localStorage.getItem('email');
  const path = location.pathname;

  if (path.includes('index') && email) {
    location.href = 'user1.html';
  }

  if (path.includes('user') && !email) {
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
      localStorage.setItem('email', emailInput.value);
      localStorage.setItem('password', passwordInput.value);
      location.href = 'user1.html';
    });
  }

  const saveBtn = document.getElementById('saveBtn');
  const exitBtn = document.getElementById('exitBtn');

  if (document.getElementById('userEmail') && email) {
    document.getElementById('userEmail').textContent = email;
  }

  if (saveBtn) {
    const fields = ['firstName', 'lastName', 'year', 'gender', 'phone', 'skype'];

    fields.forEach(f => {
      const el = document.getElementById(f);
      const val = localStorage.getItem(f);
      if (val) el.value = val;
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
          localStorage.setItem(f, el.value);
          const cell = document.getElementById(f + 'Cell');
          if (cell) cell.textContent = el.value;
        });
        document.getElementById('userTable').style.display = 'table';
      }
    });

    exitBtn.addEventListener('click', () => {
      const all = ['email', 'password', 'firstName', 'lastName', 'year', 'gender', 'phone', 'skype'];
      all.forEach(name => {
        localStorage.removeItem(name);
      });
      location.href = 'index1.html';
    });
  }
});
