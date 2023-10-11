const apiPath = "http://localhost:8000/";
const partyNameInput = document.getElementById("01");

// COntain all data 
var allData;
// get template element
const temp = document.getElementById("duplicater");
const destination = document.getElementById("incontent1");
const templateElement = temp.cloneNode(true);
temp.remove()

const sumbit_party_elm = document.getElementById('clickcreate')

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


/*--------------------------------------------------*/

function readData(data) {
  for(let i = 0; i < data.length; i++) {
    let clone = templateElement.cloneNode(true);
    destination.appendChild(clone);
    clone.id = "clon" + i
  }

  update()


}

function update() {
  const bright11 = document.getElementsByClassName("bright11");
  
  for(let i = 0; i < bright11.length; i++) {
    bright11[i].innerHTML = allData[i].party_name;
  }


}



















sumbit_party_elm.addEventListener('click', function() {
// Make a GET request to the API endpoint

})

fetch(`${apiPath}party`, {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    // You may need to include additional headers, such as authentication tokens.
  },
  body: {
    user_id: 1,
    party_name: "123"
  }
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
    
  })
  .catch((error) => {
    console.error('Error:', error);
  });  