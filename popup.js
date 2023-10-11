const popup = document.getElementById('popupform');

const dotdotdot = document.getElementById('dotdotdot')

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


