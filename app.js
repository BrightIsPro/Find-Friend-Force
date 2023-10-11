const apiPath = "http://localhost:8000/";
const partyNameInput = document.getElementById("01");
const input_party_name = document.getElementById('input-party-name')

// COntain all data 
var allData;
// get template element
const temp = document.getElementById("duplicater");
const destination = document.getElementById("incontent1");
const templateElement = temp.cloneNode(true);
temp.remove()

// Make a GET request to the API endpoint
fetch(`${apiPath}party`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      // You may need to include additional headers, such as authentication tokens.
    },
  })
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Failed to fetch data');
    }
  })
  .then((data) => {
    // Process and use the data here
    allData = data;
    readData(data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });


function readData(data) {
  let length = data.length - 1
  for (let i = length; i > 0; i--) {
    let clone = templateElement.cloneNode(true);
    destination.appendChild(clone);
    clone.id = "clone" + i
    let ab = clone.querySelector('.bright1 > #ab1')
    ab.innerHTML = data[i].party_name
    ab.id = "clild" + clone

    let edit_btn = clone.querySelector('.dotdotdot > .method_edit');
    let delete_btn = clone.querySelector('.dotdotdot > .method_delete');

    edit_btn.addEventListener('click', () => {
      onClickedEdit(data[i].party_id)
    })
    delete_btn.addEventListener('click', () => {
      onClickedDelete(data[i].party_id)
    })
  }

}

//----------- PUT and DELETE
async function onClickedEdit(id) {

  // change data here
  // change data here
  const newData = {
    party_name: "Hello WOrld" // Change here
  }
  
  await fetch(`${apiPath}party/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newData),
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to update data');
      }
    })
    .then(data => {
      console.log('Data updated:', data.message);
    })
    .catch(error => {
      console.error('Error:', error);
    });

  location.reload()
}

async function onClickedDelete(id) {
  console.log(id);
  await fetch(`${apiPath}party/${id}`, {
    method: 'DELETE',
  })
    .then(response => {
      if (response.ok) {
        // The resource was successfully deleted
        console.log('Resource deleted successfully');
      } else {
        throw new Error('Failed to delete data');
      }
    })
    .catch(error => {
      // Handle any errors that occurred during the request
      console.error('Error:', error);
    });

    location.reload()

}


/*--------------------------------------------------*/















































// CREATE
const sumbit_party_elm = document.getElementById('clickcreate')
sumbit_party_elm.addEventListener('click', async function () {
  // Make a GET request to the API endpoint

  if (input_party_name.value == "") {
    return;
  }

  await postParty(input_party_name);
});


const postParty = function (element) {
  fetch(apiPath + "party", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json', // Specify the content type
        // You may need to include additional headers, such as authentication tokens.
      },
      body: JSON.stringify({ // Convert the JavaScript object to a JSON string
        "party_id": 1,
        "user_id": 1,
        "party_name": element.value
      })
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to fetch data');
      }
    })
    .then((data) => {
      // Process and use the data here
      location.reload();
    })
    .catch((error) => {
      console.error('Error:', error);
    });

}











