const navProfile = document.getElementById("navbar-profile");
const profileName = document.getElementById("namePrf");
const profileImage = document.getElementById("imgPrf");
const summitUpdate = document.getElementById("summitUpdate");

const apiPath = 'http://localhost:8000/';

const defaultImageLink = './image/msedge_Z3dZKNX4Yt.png';

var getUsernamae;
var getPasswrod;
var getEmail;
var getHours;

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


    profileName.innerHTML = name_profile;

    if (profile_picture === null) {
      profileImage.src = defaultImageLink;
    }
    profileImage.src = data[0].profile_picture;
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
    profile_name_input.value = data.name_profile;
    link_image_input.value = data.profile_picture;
  })
  .catch(error => {
    // Handle any errors that occurred during the request
    console.error(error);
  });

// Update user data using PUT
summitUpdate.addEventListener('click', () => {
  let profile_name_input = document.getElementById("profile-name-input");
  let link_image_input = document.getElementById("link-image-input");

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