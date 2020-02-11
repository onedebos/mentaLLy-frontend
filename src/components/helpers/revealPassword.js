const revealPass = () => {
  const pwdField = document.getElementById('password');
  if (pwdField.type === 'password') {
    pwdField.type = 'text';
  } else {
    pwdField.type = 'password';
  }
};

export default revealPass;
