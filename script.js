const balance=document.getElementById("balance");

const money_plus=document.getElementById("money_plus");
const money_minus=document.getElementById("money-minus");
const list=document.getElementById("list");
const form=document.getElementById("form");
const text=document.getElementById("text");
const amount=document.getElementById("amount");



let Transactions=[];
//add transaction


function addTransaction(e){
    e.preventDefault();
    if(
        text.value.trim() === "" || amount.value.trim() === ""
    ){
        alert("please enter text and value");
    }else{
        const transaction ={
            id:generateID(),
            text:text.value,
            amount: +amount.value,
        };

        Transactions.push(transaction);
        addTransactionDOM(transaction);
        updateValues();
        text.value="";
        amount.value="";
    }
}

//generate id
function generateID(){
    return Math.floor(Math.random()*10000000);
}

function addTransactionDOM(transaction){
    const sign=transaction[0].amount < 0 ? "-" : "+";
    const item=document.createElement("li");


    item.classList.add(
        transaction[0].amount < 0 ? "minus" : "plus"
    );

    item.innerHTML= `
    ${transaction[0].text}<span>${sign}${Math.abs(transaction[0].amount)}</span>
    <button class="btn-delete" onclick="">X</button>
    `;

    list.appendChild(item);
}


//update

function updateValues(){
    const amounts=Transactions.map(transaction => transaction.amount);
    const total=amounts.reduce((acc,item) => (acc +=item),0).toFixed(2);
    const income=amounts.filter(item => item > 0).reduce((acc,item)=>(acc += item),0).toFixed(2);
    const expense=(amounts.filter(item => item < 0).reduce((acc,item) => (acc += item),0)* -1).toFixed(2);


    balance.innerText=`$${total}`;
    money_plus.innerText=`$${income}`;
    money_minus.innerText=`$${expense}`;
}

//init app

function Init(){
    list.innerHTML="";
    Transactions.forEach(addTransactionDOM);

    updateValues();
}
Init();



form.addEventListener("submit",addTransaction);