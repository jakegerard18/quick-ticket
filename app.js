//Init storage, get tickets from storage, and set ticket number
const ls = window.localStorage;
let ticketNum = ls.length;
let tickets = getTickets();

// UI vars
const uiNewTicketBtn = document.getElementById('new-ticket-btn');
const uiModalSubmitBtn = document.getElementById('modal-submit-btn');
const uiModalCancelBtn = document.getElementById('modal-cancel-btn');
const uiNewTicketModal = document.getElementById('new-ticket-modal');
const uiViewTicketModal = document.getElementById('view-ticket-modal');
const uiViewTicketCloseBtn = document.getElementById('view-ticket-close-btn');
const uiTicketTable = document.getElementById('ticket-table');



//Print tickets on page load
document.addEventListener("DOMContentLoaded", () => {
    printTickets(tickets);
});

//Event to trigger new ticket modal
uiNewTicketBtn.addEventListener('click', () => {
    uiNewTicketModal.style.display = 'block';
});

//Event to add a new ticket
uiModalSubmitBtn.addEventListener('click', () => {
    addTicket();
    uiNewTicketModal.style.display = 'none';
    clearTicketModal();
});


//Event to cancel adding a ticket
uiModalCancelBtn.addEventListener('click', () => {
    uiNewTicketModal.style.display = 'none';
    clearTicketModal();
});

uiViewTicketCloseBtn.addEventListener('click', () => {
    uiViewTicketModal.style.display = 'none';
})

uiTicketTable.addEventListener('click', (e) => {
    let target = e.target;
    if(target.matches("i.far.fa-eye"))
    {
        displayViewTicketModal(target);
    }
});

//Function to add a ticket to local storage and append it to the html table
function addTicket() {
    ticketNum++;
    let name = document.getElementById('issue-name').value;
    let customer = document.getElementById('issue-customer').value;
    let description = document.getElementById('issue-desc').value;
    let ticketObj = {
        ticketNum: ticketNum,
        name: name,
        customer: customer,
        description: description
    }
 
    tickets.push(ticketObj);
    ls.setItem(ticketNum, JSON.stringify(ticketObj));
    uiTicketTable.innerHTML += `            
    <tr class="ticket-row">
        <td class="td-num">${ticketNum}</td>
        <td class="td-name">${name}</td>
        <td class="td-customer">${customer}</td>
        <td class="td-description">${description}</td>
        <td class="td-btn"><a href="#" class="view-task"><i class="far fa-eye"></i></a></td>
        <td class="td-btn"><a href="#" class="complete-task"><i class="fas fa-check"></i></a></td>
        <td class="td-btn"><a href="#" class="cancel-task"><i class="far fa-times-circle"></i></a></td>
    </tr>
    `
}

//Function to load tickets from local storage
function getTickets() {
    let tix = [];
    for(var i = 1; i <= ls.length; i++)
    {
       tix[i-1] = JSON.parse(ls.getItem(`${i}`));
    }

    return tix;
}

//Function to print tickets in ticket array
function printTickets(tickets) {
    tickets.forEach(ticket => {
        uiTicketTable.innerHTML += `            
        <tr class="ticket-row">
            <td class="td-num">${ticket.ticketNum}</td>
            <td class="td-name">${ticket.name}</td>
            <td class="td-customer">${ticket.customer}</td>
            <td class="td-description">${ticket.description}</td>
            <td class="td-btn"><a href="#" class="view-task"><i class="far fa-eye"></i></a></td>
            <td class="td-btn"><a href="#" class="complete-task"><i class="fas fa-check"></i></a></td>
            <td class="td-btn"><a href="#" class="cancel-task"><i class="far fa-times-circle"></i></a></td>
        </tr>
       `
    })
}

function displayViewTicketModal(targ) {
    let target = targ;
    uiViewTicketModal.style.display = 'block';
    let row = target.parentElement.parentElement.parentElement;
    let num = row.children[0].textContent
    let contents = uiViewTicketModal.children[0];
    let heading = contents.children[0];
    let name = contents.children[1].children[1];
    let customer = contents.children[2].children[1]
    let description = contents.children[3].children[1];

    heading.textContent = `Ticket #: ${tickets[num-1].ticketNum}`;
    name.value = tickets[num-1].name;
    customer.value = tickets[num-1].customer;
    description.value = tickets[num-1].description;   
}

//Function to clear modal inputs
function clearTicketModal() {
    document.getElementById('issue-name').value = '';
    document.getElementById('issue-customer').value = '';
    document.getElementById('issue-desc').value = '';
}