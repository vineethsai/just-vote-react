'use strict';

let state = {
    'results': '',
    'searchTerm': '',
    'displayOrder': 'true'
};


d3.csv('https://data.bloomington.in.gov/datastore/dump/d4aa517d-3d2a-46f6-93b5-6d43345e9bf5?bom=True')
    .then((op) => {
        console.log('op');
        console.log(op);
        state.results = op;
        displayOps(state.results);

        let button = document.querySelector('#search');
        button.addEventListener('click', (event) => {
            state.results = op;
            let input = document.querySelector('input');
            state.searchTerm = input.value;
            state.results = searchOps(state.searchTerm);
            displayOps(state.results);
            event.preventDefault();
        })

        document.querySelector('#ascending').addEventListener('click', (event) => {
            state.displayOrder = true;
            changeOrder();
            displayOps(state.results);
            event.preventDefault();
        });

        document.querySelector('#descending').addEventListener('click', (event) => {
            state.displayOrder = false;
            changeOrder();
            displayOps(state.results);
            event.preventDefault();
        })

        document.querySelector('#show-all').addEventListener('click', (event) => {
            state.results = op;
            displayOps(state.results);
            event.preventDefault();
        })

    })
    .then((op) => {
        console.log(op);
        return op;
    })
    .catch((err) => {
        console.error(err);
    })

function displayOps(opportunities) {
    document.querySelector('#search-results').innerHTML = '';
    opportunities.forEach((opportunity) => {
        let parent = document.querySelector('#search-results');
        let container = document.createElement('div');
        let heading = document.createElement('h3');
        heading.textContent = opportunity.AgencyName;
        container.appendChild(heading);
        let description = document.createElement('p');
        description.textContent = opportunity.WhatWeDo;
        container.appendChild(description);
        let address = document.createElement('address');
        address.innerHTML = opportunity.Address + '<br> <a href="tel:' + opportunity.AgencyPhone + '">' + opportunity.AgencyPhone + '</a><br><a href"' + opportunity.AgencyUrl + '">Website</a>';
        container.appendChild(address);
        parent.appendChild(container);
    })
}


function searchOps(searchTerm) {
    return state.results.filter((opportunity) => {
        if (opportunity.AgencyName.toLowerCase().indexOf(searchTerm) >= 0) {
            return true;
        } else if (opportunity.WhatWeDo.toLowerCase().indexOf(searchTerm) >= 0) {
            return true;
        } else {
            return false;
        }
    });
}

function changeOrder() {
    if (state.displayOrder) {
        state.results.sort((a, b) => {
            if (a.AgencyName < b.AgencyName) { return -1 }
            else if (a.AgencyName > b.AgencyName) { return 1 }
            else { return 0 }
        });
    } else {
        state.results.sort((a, b) => {
            if (a.AgencyName < b.AgencyName) { return 1 }
            else if (a.AgencyName > b.AgencyName) { return -1 }
            else { return 0 }
        });
    }
}