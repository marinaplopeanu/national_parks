// $(function(){
//   $('h1').toggle();
//   });

'use strict';

const apiKey ='UJ7XHqywFxKNwsvBpI8xl2r2G5IvFNRNpAkNKNlO';

const searchURL = 'https://developer.nps.gov/api/v1/parks/'

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}


function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the items array
  for (let i = 0; i < responseJson.data.length; i++){
    
    $('#results-list').append(
      `<li><h3>${responseJson.data[i].fullName}</h3>
      <p>${responseJson.data[i].description}</p>
      <a href="${responseJson.data[i].url}" target="_blank"><p>${responseJson.data[i].url}</p></a>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function getTheParks() {
  const searchTerm = $('#js-search-term').val();
  const limit = $('#js-max-results').val();
  const params = {
    stateCode: searchTerm, 
    limit,
    api_key: apiKey,
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const limit = $('#js-max-results').val();
    getTheParks(searchTerm, limit);
    console.log(searchTerm);
    console.log(limit);
  });
}

$(watchForm);