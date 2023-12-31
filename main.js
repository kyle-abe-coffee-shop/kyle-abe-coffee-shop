"use strict"

// variable assignment
let tbody = document.querySelector('#coffees');
let submitButton = document.querySelector('#submit');
let roastSelection = document.querySelector('#roast-selection');
let search = document.querySelector('#search')
let modelFormName = document.querySelector("#coffeeName");
let modelFormRoast = document.querySelector("#roastType");
let modelBtn = document.querySelector("#addCardBtn");
let closeForm = document.querySelector("#closeModal");

function renderCoffee(coffee) {
    let html = '<div class="card col-3 p-0 m-3">';
    html += '<div class="card-header text-center">';
    html += '<h3>' + coffee.name + '<h3>';
    html += '</div><div>';
    html += '<blockquote class="blockquote mb-0 text-center">';
    html += '<p>' + coffee.roast + '</p>';
    html += '</blockquote></div></div>'

    return html
}

function renderCoffees(coffees) {
    let html = '';
    for(let i = 0; i < coffees.length; i++) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}
//coffee filter by dropdown
function updateCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    let selectedRoast = roastSelection.value;
    let filteredCoffees = [];
    coffees.forEach(function(coffee) {
        if (coffee.roast === selectedRoast) {
            filteredCoffees.push(coffee);
            tbody.innerHTML = renderCoffees(filteredCoffees);
        } else if(selectedRoast === 'all'){
            tbody.innerHTML = renderCoffees(coffees);
        }
    });
}
// coffee search by searchbar
search.addEventListener('keyup', function (){
    let filteredCoffees = [];
    coffees.forEach(function(coffee) {
        let name = coffee.name.toLowerCase()
        let check = search.value.toLowerCase()
        if (name.includes(check)) {
            filteredCoffees.push(coffee);
        }
    });
    tbody.innerHTML = renderCoffees(filteredCoffees);
})

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
let coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];

tbody.innerHTML = renderCoffees(coffees);

submitButton.addEventListener('click', updateCoffees);
roastSelection.addEventListener('change', updateCoffees)

// use modal to create a new object and push to array
modelBtn.addEventListener("click", function (event){
    let newCoffee = {
        id: coffees.length + 1,
        name: modelFormName.value,
        roast: modelFormRoast.value
    }
    coffees.push(newCoffee);
    console.log(coffees);
    tbody.innerHTML = renderCoffees(coffees);
    closeForm.click();

})