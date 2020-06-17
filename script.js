const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.querySelector("#count");
const total = document.querySelector("#total");
const movieSelect = document.querySelector("#movie");

let ticketPrice = +movieSelect.value;
populatUI();
//----------------------------------function ----------------------------------
/*
function One
     1. Save seleceted movie index and price 
*/
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

/*
function Two
  1. Update total and counts
  2. grab all selected seats, and count the length of it
  3. change the innerHTML of targeted elements 
*/
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    //in order to find the selected seats' index,
    //1st to copy the selected seats nodeList,
    //2nd loop through the selected seats, and find the index number of it in the whole seats nodeList
    // use map function to get a array of that index
    const seatsIndex = [...selectedSeats].map(seat => {
        return [...seats].indexOf(seat);
    })
    console.log(seatsIndex);
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;
    count.innerHTML = selectedSeatsCount;
    total.innerHTML = selectedSeatsCount * ticketPrice;
}

/*
FUnction Three
  1. get data from localStorage and populate UI
*/
function populatUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

//----------------------------------Event Listener ----------------------------------
/*
EventListener One
  1. listen to the whole container, if the clicked target has seat class 
  2. add doesn't have occupied class, 
  3. then toggel selected class to that e.target 
  4. also update the counts
*/
container.addEventListener('click', e => {
    if (e.target.classList.contains('seat') &&
        !e.target.classList.contains('occupied')
    ) {
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
});

/*
Event Listen Two
  1. Moive select event
*/
movieSelect.addEventListener('change', e => {
    //clear all seleceted when load new movie
    // seats.forEach(seat => {
    //     seat.classList.remove("selected");
    // })
    //change the price of selected item
    ticketPrice = +e.target.value;
    updateSelectedCount();
    setMovieData(e.target.selectedIndex, e.target.value);
})

updateSelectedCount();