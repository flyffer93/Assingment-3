const computersElement = document.getElementById("computers");
const priceElement = document.getElementById("price");
const payButtonElement = document.getElementById("pay");
const loanElement = document.getElementById("loanbank");
const workButtonElement = document.getElementById("work");
const repayButtonElement = document.getElementById("repay");
const addElement = document.getElementById("add");
const payCheckElement = document.getElementById("paycheck");
const bankBalanceElement = document.getElementById("bankbalance");
const payElement = document.getElementById ("paypc");
const imageElement = document.getElementById ("image");
const shopDivElement = document.getElementById("shopdiv");
const messageElement = document.getElementById("message");
const descriptionElement = document.getElementById("description");
const featuresElement = document.getElementById("features");

let computers = [];
let cart = [];
let totalDue = 0.0;



fetch("https://noroff-komputer-store-api.herokuapp.com/computers")
    .then(reponse => reponse.json())
    .then(data => computers = data)
    .then(computers => addComputersToMenu(computers)); 

const addComputersToMenu = (computers) => {
    computers.forEach(x => addComputerToMenu(x));
}

const addComputerToMenu = (computer) =>{
    const computerElement = document.createElement("option");
    computerElement.value = computer.id;
    computerElement.appendChild(document.createTextNode(computer.title));
    computersElement.appendChild(computerElement);

}



const handleComputerMenuChange = e => {
    const selectedComputer = computers[e.target.selectedIndex];
    priceElement.innerHTML = selectedComputer.price;
    const descriptionElement = document.getElementById("description");
    descriptionElement.innerHTML = selectedComputer.description;
    descriptionElement.hidden = false;
    const apiurl = "https://noroff-komputer-store-api.herokuapp.com/";
    imageElement.src = apiurl + selectedComputer.image;
    imageElement.hidden = false; 
    messageElement.hidden = true;
    var features = "";
    selectedComputer.specs.forEach (x => features = features + x +"\n");
    featuresElement.hidden = false;
    featuresElement.innerHTML = features;
}

computersElement.addEventListener("change",handleComputerMenuChange);


function workButton(){
    var paycheck = parseInt (payCheckElement.innerHTML);
    paycheck += 100;
    payCheckElement.innerHTML = paycheck;
    
}

function bankButton(){
    var paycheck = parseInt (payCheckElement.innerHTML);
    var loan = parseInt (loanElement.innerHTML);
    if (loan > 0) {
        var loanpayment = 0.1*paycheck;
        paycheck -= 0.1*paycheck;
        loan -= loanpayment;
        if (loan < 0)  {
            paycheck -= loan;
            loan = 0; 
        }
        
    } 
    var bankbalance = parseInt (bankBalanceElement.innerHTML);
    bankbalance += paycheck;
    bankBalanceElement.innerHTML = bankbalance;
    payCheckElement.innerHTML = 0;
    loanElement.innerHTML = loan;
    
        
}

function loanButton(){
    var loan = parseInt (loanElement.innerHTML);
    var bankBalance = parseInt (bankBalanceElement.innerHTML);
    if (loan == 0){
        var input = prompt ("You can only borrow money once and you can borrow money up to twice your bankbalance") 
        var loanamount = parseInt (input);
        if (loanamount <= 2*bankBalance){

            bankBalanceElement.innerHTML = bankBalance + loanamount;
            loanElement.innerHTML = loanamount;
            repayButtonElement.hidden = false;
        } else {
            alert ("you tried to borrow more money than you could");
    
        } 
    } else {
        alert ("you already have a loan");
    }
    
    
}


function repayButton(){
    var payback = parseInt (loanElement.innerHTML);
    var bankBalance = parseInt(bankBalanceElement.innerHTML);
    if (payback <= bankBalance){
        bankBalance -= payback;
        payback = 0;
        repayButtonElement.hidden = true;
    } else {
         payback -= bankBalance;
         bankBalance = 0; 

    }
    loanElement.innerHTML = payback;
    bankBalanceElement.innerHTML = bankBalance;
    
        

    

}

function payButton(){
    messageElement.hidden = false;
    var price = parseInt (priceElement.innerHTML);
    var bankbalance = parseInt (bankBalanceElement.innerHTML);
    if  (bankbalance >= price) {
        bankbalance -= price; 
        bankBalanceElement.innerHTML = bankbalance;
        messageElement.innerHTML = "You just got yourself a new computer";
    } else {
        messageElement.innerHTML = "You dont have enough money to buy this computer";
    }
    
    
}
