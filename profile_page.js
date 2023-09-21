const navProfile = document.getElementById("navbar-profile");
const profileName = document.getElementById("namePrf");

// Update profile name
fetch('http://localhost:8000/users')
  .then(res => res.json() )
  .then( (data) => {
    const {name_profile} = data[0];
    profileName.innerHTML = name_profile;
  })
  .catch(err => {
    console.error("ERROR fetching data.");
  })