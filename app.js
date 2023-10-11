const apiPath = "http://localhost:8000/";
const pratyNameInput = document.getElementById("01");
const party_name = document.getElementById("01").value;
const submitCreate = document.getElementById("");
var allData;

// get template element
var source = document.getElementById("duplicater");
var destination = document.getElementById("incontent1");
var templateElement = source.cloneNode(true);

source.remove();









// On Load ----------------------------------------------- VVV
fetch(apiPath + "party")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    const pn = document.getElementById("ab1");

    const { party_name, party_id } = data[0];

    pn.innerHTML = party_name;
    getPartid = party_id;

    console.log();

    allData = data;


  })
  .catch((err) => {
    console.error("ERROR fetching data.");
  });


/*--------------------------------------------------*/


const create_party =document.getElementById('create-party');
// CREATE party
create_party.addEventListener("click", () => {
  fetch(apiPath + "party", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: 1,
      party_name: party_name,
    }),
  })
    .then((res) => {
      if (res.ok) {
        // The data was successfully updated
        return res.json();
      } else {
        // Handle errors here
        throw new Error("Failed to update data");
      }
    })
    .then((_data) => {
      console.log(_data);
    })
    .catch((error) => {
      // Handle any errors that occurred during the request
      console.error(error);
    });
});