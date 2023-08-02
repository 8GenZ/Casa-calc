function getValues() {
    let loan = parseFloat(document.getElementById('loanAmount').value);
    let term = parseInt(document.getElementById('term').value);
    let rate = parseFloat(document.getElementById('rate').value);

    let newLoan = {
        loan,
        term,
        rate,
    }


    if (isNaN(loan) || isNaN(term) || isNaN(rate)
        || loan <= 0 || term <= 0 || rate <= 0) {
        Swal.fire({
            icon: 'error',
            title: 'Woops!',
            text: 'Please Enter Valid Loan Details'
        });

    } else {
        return newLoan;
    }
}

function displayPayments() {

    let loan = getValues();


    let monthlyPayment = (loan.loan) * (loan.rate / 1200) / (1 - (1 + loan.rate / 1200) ** (-loan.term));

    let totalPrin = loan.loan;
    let totalCost = monthlyPayment * loan.term;
    let totalint = totalCost - totalPrin;

    document.getElementById('monthlyPayment').innerText = '$' + monthlyPayment.toFixed(2);
    document.getElementById('totalPrin').innerText = '$' + totalPrin.toFixed(2);
    document.getElementById('totalint').innerText = '$' + totalint.toFixed(2);
    document.getElementById('totalCost').innerText = '$' + totalCost.toFixed(2);

    displayTable(loan);

}

function generateStats(loan) {

    let stats = [];

    

    for (let month = 1; month <= loan.term; month++) {

        // calculate my numbers here
        let monthlyPayment = (loan.loan) * (loan.rate / 1200) / (1 - (1 + loan.rate / 1200) ** (-loan.term));
        let totalCost = monthlyPayment * loan.term;
        let balance = totalCost - monthlyPayment;
        let interest = balance * loan.rate / 1200;
        let principalPayment = monthlyPayment - interest;
        let totalint = interest + interest;


        let payment = {
            month,
            monthlyPayment,
            principal: principalPayment,
            interest,
            totalInterest: totalint,
            balance,
        }

        stats.push(payment);
        // push the payment into an array
    }
    return stats;
    // return the array
}

function displayTable(loan) {


    let tableContent = document.getElementById("table-content");
    let tableTemplate = document.getElementById('table-row-template');

    tableContent.innerHTML = "";

    let payments = generateStats(loan);

    payments.forEach(payment => {
        // copy template and display on table
        let tableRow = tableTemplate.content.cloneNode(true);

        tableRow.querySelector('[data-id="month"]').innerText = payment.month;
        tableRow.querySelector('[data-id="payment"]').innerText = '$' + payment.monthlyPayment.toFixed(2);
        tableRow.querySelector('[data-id="principal"]').innerText = '$' + payment.principal.toFixed(2);
        tableRow.querySelector('[data-id="Interest"]').innerText = '$' + payment.interest.toFixed(2);
        tableRow.querySelector('[data-id="totalint"]').innerText = '$' + payment.totalInterest.toFixed(2);
        tableRow.querySelector('[data-id="balance"]').innerText = '$' + Math.abs(payment.balance).toFixed(2);

        tableContent.appendChild(tableRow);
    });

}