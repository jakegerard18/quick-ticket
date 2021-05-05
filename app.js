//Ticketing vars
let ticketNum = 0;

//Storage
let ls = window.localStorage;

// UI vars
let uiNewTicketBtn = document.getElementById('new-ticket-btn');
let uiModalSubmitBtn = document.getElementById('modal-submit-btn');
let uiModalCancelBtn = document.getElementById('modal-cancel-btn');
let uiNewTicketModal = document.getElementById('new-ticket-modal');
let uiTicketTable = document.getElementById('ticket-table');


uiNewTicketBtn.addEventListener('click', () => {
    uiNewTicketModal.style.display = 'block'
})

uiModalSubmitBtn.addEventListener('click', () => {
    addNewTicket();
    uiNewTicketModal.style.display = 'none';
    clearTicketModal();

    });

uiModalCancelBtn.addEventListener('click', () => {
    uiNewTicketModal.style.display = 'none';
    clearTicketModal();
})

function addNewTicket() {
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

function clearTicketModal() {
    document.getElementById('issue-name').value = '';
    document.getElementById('issue-customer').value = '';
    document.getElementById('issue-desc').value = '';
}