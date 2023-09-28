const navProfile = document.getElementById("navbar-profile");
const profileName = document.getElementById("namePrf");
const profileImage = document.getElementById("imgPrf");
const submitUpdate = document.getElementById("submitUpdate");
const navbarProfile = document.getElementById("navbar-profile");
const backdrop = document.getElementById("backdrop");

const emailPrf = document.getElementById("emailPrf");
const hoursPrf = document.getElementById("hoursPrf");

const profileNameInput = document.getElementById('profile-name-input');
const linkImageInput = document.getElementById('link-image-input');
const passwordInput = document.getElementById('password-input');
const usernameInput = document.getElementById('username-input');
const emailInput = document.getElementById('email-input');

const message_box_p = document.getElementById("message-box-p");


const apiPath = 'http://localhost:8000/';

const defaultImageLink = '';

var getUsernamae = "?";
var getPasswrod = "?";
var getEmail = "?@?";
var getHours = 0;


document.addEventListener('DOMContentLoaded', function () {
  // Your JavaScript code here
  backdrop.style.display = 'none';
});



// On Load
fetch(apiPath + 'users')
  .then(res => res.json())
  .then((data) => {
    console.log(data);
    const {
      name_profile,
      username,
      password,
      email,
      amount_hours,
      profile_picture
    } = data[0];

    getUsernamae = username;
    getPasswrod = password;
    getEmail = email;
    getHours = amount_hours;

    if (
      getUsernamae !== null,
      getPasswrod !== null,
      getEmail !== null,
      getHours != null) {
      emailPrf.innerHTML = getEmail;
      hoursPrf.innerHTML = "time: " + timeToMinutes(getHours) + "s";
    }


    profileImage.src = profile_picture;
    profileName.innerHTML = name_profile;
    navbarProfile.src = profile_picture;
    usernameInput.value = getUsernamae;
    emailInput.value = getEmail;

  })
  .catch(err => {
    console.error("ERROR fetching data.");
  })

/*--------------------------------------------------*/



// Fetch user data using GET
fetch(apiPath + "users/0", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    if (res.ok) {
      // The data was successfully fetched
      return res.json();
    } else {
      // Handle errors here
      throw new Error('Failed to fetch data');
    }
  })
  .then(data => {
    // Use the fetched data as needed

    profileNameInput.value = data.name_profile;
    linkImageInput.value = data.profile_picture;
    passwordInput.value = data.password;

  })
  .catch(error => {
    // Handle any errors that occurred during the request
    console.error(error);
  });

// Update user data using PUT
submitUpdate.addEventListener('click', () => {

  fetch(apiPath + "users/0", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name_profile: profileNameInput.value,
        username: getUsernamae,
        password: passwordInput.value,
        email: getEmail,
        profile_picture: linkImageInput.value,
        amount_hours: getHours
      })
    })
    .then(res => {
      if (res.ok) {
        // The data was successfully updated
        return res.json();
      } else {
        // Handle errors here
        throw new Error('Failed to update data');
      }
    })
    .then(async _data => {
      // Show the message element
      backdrop.style.display = 'flex';

      delay = 1200; // in milliseconds (3 seconds)


      const delayPromise = new Promise((resolve) => {
        backdrop.style.display = 'flex';
        message_box_p.innerHTML = _data.message;
        setTimeout(resolve, delay);
      });

      await delayPromise;
      location.reload();

    })
    .catch(error => {
      // Handle any errors that occurred during the request
      console.error(error);
    });
});


// timer to minites
function timeToMinutes(timeString) {
  const parts = timeString.split(':');

  if (parts.length !== 3) {
    throw new Error('Invalid time format');
  }

  const hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1], 10);
  const seconds = parseInt(parts[2], 10);

  if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
    throw new Error('Invalid time format');
  }

  return hours * 60 + minutes + seconds / 60;
}



/* 
----------- Toggle enable-disable input form
*/
const editButton = document.getElementById('edit');
const formFields = document.querySelectorAll('input');
let isEditing = false;

// Initially hide the "Save" button
submitUpdate.style.display = 'none';

editButton.addEventListener('click', () => {
  isEditing = !isEditing; // Toggle editing mode
  formFields.forEach(field => {
    field.disabled = !isEditing; // Enable/disable form fields
  });

  usernameInput.disabled = true;
  emailInput.disabled = true;

  // Toggle the visibility of the "Save" button
  if (isEditing) {
    submitUpdate.style.display = 'inline-block'; // Show the button
  } else {
    submitUpdate.style.display = 'none'; // Hide the button
  }
});