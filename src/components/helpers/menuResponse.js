let state = false;
const expand = () => {
  if (state === false) {
    document.getElementById('items').style.transform = 'scaleX(1)';
    document.getElementById('MenuIcon').style.transform = 'rotate(90deg)';
    document.getElementById('HomeMenu').style.backgroundColor = 'rgba(140, 170, 13, 0.7)';
    document.getElementById('HomeMenu').style.opacity = '0.8';
    state = true;
  } else {
    document.getElementById('items').style.transform = 'scaleX(0)';
    document.getElementById('MenuIcon').style.transform = 'rotate(0deg)';
    document.getElementById('HomeMenu').style.backgroundColor = '';
    state = false;
  }
};

export default expand;
