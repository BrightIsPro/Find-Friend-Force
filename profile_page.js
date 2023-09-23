const navProfile = document.getElementById("navbar-profile");
const profileName = document.getElementById("namePrf");
const profileImage = document.getElementById("imgPrf");
const submitUpdate = document.getElementById("submitUpdate");
const navbarProfile = document.getElementById("navbar-profile");

const emailPrf = document.getElementById("emailPrf");
const hoursPrf = document.getElementById("hoursPrf");


const apiPath = 'http://localhost:8000/';

const defaultImageLink = '';

var getUsernamae = "?";
var getPasswrod = "?";
var getEmail = "?@?";
var getHours = 0;

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

    if(
      getUsernamae !== null,
      getPasswrod !== null,
      getEmail !== null,
      getHours != null) {
        emailPrf.innerHTML = getEmail;
        hoursPrf.innerHTML = "time: "+ timeToMinutes(getHours) + "mins";
      }


    profileImage.src = profile_picture;
    profileName.innerHTML = name_profile;
    navbarProfile.src = profile_picture;

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
    let profile_name_input = document.getElementById("profile-name-input");
    let link_image_input = document.getElementById("link-image-input");
    let email_user_input = document.getElementById('email-input');
    let password_user_input = document.getElementById('password-input');

    email_user_input.value = data.email;
    password_user_input.value = data.password;
    profile_name_input.value = data.name_profile;
    link_image_input.value = data.profile_picture;
  })
  .catch(error => {
    // Handle any errors that occurred during the request
    console.error(error);
  });

// Update user data using PUT
submitUpdate.addEventListener('click', () => {
  let profile_name_input = document.getElementById("profile-name-input");
  let link_image_input = document.getElementById("link-image-input");
  let email_user_input = document.getElementById('email-input');
  let password_user_input = document.getElementById('password-input');

  fetch(apiPath + "users/0", {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name_profile: profile_name_input.value,
      username: getUsernamae,
      password: getPasswrod,
      email: getEmail,
      profile_picture: link_image_input.value,
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
    .then(_data => {
      alert(_data.message)
      location.reload();
    })
    .catch(error => {
      // Handle any errors that occurred during the request
      console.error(error);
    });
});


// Drop down
document.getElementById("Edit").addEventListener("click",function(){
  document.querySelector(".popup").style.display="flex";
})
document.querySelector(".close").addEventListener("click",function(){
  document.querySelector(".popup").style.display="none";
})

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
