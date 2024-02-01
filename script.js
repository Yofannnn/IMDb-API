// //menggunakan ajax jquery =====> start
// $('.search-button').on('click', function() {
//   $.ajax({
//     url: 'http://www.omdbapi.com/?apikey=3a86d8a7&s=' + $('.input-keyword').val(),
//     success: results => {
//       const movie = results.Search;
//       let cards = '';
//       movie.forEach(m => {
//         cards += showCards(m);
//       });
//       $('.container-movie').html(cards);
//       $('.modal-detail-button').on('click', function() {
//         $.ajax({
//           url: 'http://www.omdbapi.com/?apikey=3a86d8a7&i=' + $(this).data('imdbid'),
//           success: m => {
//             const movieDetail = showMovieDetail(m)
//             $('.modal-body').html(movieDetail)
//           },
//           error: e => {
//             console.log(e.responeText)
//           },
//         });
//       });
//     },
//     error: e => {
//       console.log(e.responeText)
//     },
//   });
// });
// //menggunakan ajax jquery =====> end





//menggunakan vanilla js  ===> start
// fetch('source')
// .then(response => response.json())
// .then(response => console.log(response))

// const searchButton = document.querySelector('.search-button')
// searchButton.addEventListener('click', function() {
//   const inputKeyword = document.querySelector('.input-keyword')
//   fetch('http://www.omdbapi.com/?apikey=3a86d8a7&s=' + inputKeyword.value)
//     .then(response => response.json())
//     .then(response => {
//       const movie = response.Search;
//       let card = '';
//       movie.forEach(m => card += showCards(m));
//       const containerMovie = document.querySelector('.container-movie');
//       containerMovie.innerHTML = card;

//       //show detail movie
//       const modalDetailButton = document.querySelectorAll('.modal-detail-button');
//       modalDetailButton.forEach(btn => {
//         btn.addEventListener('click', function() {
//           const imdbid = this.dataset.imdbid;
//           fetch('http://www.omdbapi.com/?apikey=3a86d8a7&i=' + imdbid)
//             .then(response => response.json())
//             .then(m => {
//               const movieDetail = showMovieDetail(m);
//               const modalBody = document.querySelector('.modal-body');
//               modalBody.innerHTML = movieDetail;
//             });
//         });
//       });

//     });

// });
//menggunakan vanilla js  ===> end




// async await  ====>  start
const searchButton = document.querySelector('.search-button'); 
const inputSearch = document.querySelector('.input-keyword');  

searchButton.addEventListener('click', async function(e) {      //if btn click
    try{
      const movie = await getMovies(inputSearch.value);
      updateUI(movie);
    } catch(err){
      // alert(err);
      const containerMovie = document.querySelector('.container-movie');
      const alertError = showAlert(err);
      containerMovie.innerHTML = alertError
    };
});

inputSearch.addEventListener('keypress', async function(e) {   //if press enter
  if(e.keyCode == 13){
    try{
      const movie = await getMovies(inputSearch.value);
      updateUI(movie);
    } catch(err){
      // alert(err);
      const containerMovie = document.querySelector('.container-movie');
      const alertError = showAlert(err);
      containerMovie.innerHTML = alertError
    };
  };
});

// event binding 
document.addEventListener('click' , async function(e){
  if(e.target.classList.contains('modal-detail-button')){
    const imdbid = e.target.dataset.imdbid;
    const movieDetail = await getMovieDetail(imdbid);
    updateUIDetail(movieDetail);
  };
});

function getMovies(inputkeyword){
  return fetch('http://www.omdbapi.com/?apikey=3a86d8a7&s=' + inputkeyword)
      .then(response => {
        if(!response.ok){
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(response => {
        if(response.Response === 'False'){
          throw new Error(response.Error)
        }
        return response.Search;
      })
};

function updateUI(movies){
      let card = '';
      movies.forEach(m => card += showCards(m));
      const containerMovie = document.querySelector('.container-movie');
      containerMovie.innerHTML = card;
};

function getMovieDetail (id){
  return fetch('http://www.omdbapi.com/?apikey=3a86d8a7&i=' + id)
      .then(response => response.json())
      .then(m => m)
};

function updateUIDetail(moviedetail){
  const movieDetail = showMovieDetail(moviedetail);
  const modalBody = document.querySelector('.modal-body');
  modalBody.innerHTML = movieDetail;
};
// async await  ====>  end






function showCards(m) {
  return ` <div class="col-md-4 my-5">
                          <div class="card">
                            <img src="${m.Poster}" class="card-img-top">
                            <div class="card-body">
                              <h5 class="card-title">${m.Title}</h5>
                              <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                              <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-imdbid="${m.imdbID}">Show Details</a>
                             </div>
                          </div>
                      </div> `
};

function showMovieDetail(m) {
  return `<div class="container-fluid">
            <div class="row">
              <div class="col-md-3">
                <img src="${m.Poster}" class="img-fluid">
              </div>
              <div class="col-md">
                <ul class="list-group">
                  <li class="list-group-item"><strong>Title : </strong>${m.Title} (${m.Year})</li>
                  <li class="list-group-item"><strong>Genre : </strong>${m.Genre}</li>
                  <li class="list-group-item"><strong>Director : </strong>${m.Director}</li>
                  <li class="list-group-item"><strong>Actors : </strong>${m.Actors}</li>
                  <li class="list-group-item"><strong>Writer : </strong>${m.Writer}</li>
                  <li class="list-group-item"><strong>Plot : </strong>${m.Plot}</li>
                </ul>
              </div>
            </div>
          </div> `
};

function showAlert(err){
  return `<div class="alert alert-danger text-center w-75 m-auto" role="alert">
            ${err}
          </div>`
}

// 10-06-22