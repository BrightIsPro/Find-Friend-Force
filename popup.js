const popup = document.getElementsByClassName('popupbox');

const dotdotdot = document.getElementsByTagName('popupbox')

const popupOpen = () => {
    popup.style.display = "block";
}
const popupClose = () => {
    popup.style.display = "none";
}

let popupUpdate = document.querySelector('#popupbox');
let popupUpdateToggle = () => {
    popupUpdate.classList.toggle('active')
}

console.log(popup.length);