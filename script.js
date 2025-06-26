const base_url="https://latest.currency-api.pages.dev/v1/currencies/"

const dropdown = document.querySelectorAll(".dropdown select");
const btn= document.querySelector("form button");
let fromcurr= document.querySelector(".from select");
let tocurr= document.querySelector(".to select");
const message = document.querySelector(".msg");
const swap = document.querySelector("#swap");

for(let select of dropdown){
    for (code in countrylist){
        let newoption = document.createElement("option"); 
        newoption.innerText = code;
        newoption.value = code;
        if(select.name==="from" && code==="USD"){
            newoption.selected="selected";
        }
        else if(select.name==="to" && code==="INR"){
            newoption.selected="selected";
        }
        select.append(newoption);
    }

    select.addEventListener("change",(evt)=>{
        updateflag(evt.target);
    })
}

window.addEventListener("load", () => {
    updateRate();
})

const updateflag = (element) =>{
    let code=element.value;
    let countrycode=countrylist[code];
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let source = element.parentElement.querySelector("img");
    source.src=newsrc;
}

btn.addEventListener("click",(evt) => {
    evt.preventDefault();
    updateRate();
})

swap.addEventListener("click",() => {
    let temp = fromcurr.value;
    fromcurr.value = tocurr.value;
    tocurr.value = temp;
    updateRate();
    updateflag(fromcurr);
    updateflag(tocurr);
})

const updateRate = async () => {
    let amt = document.querySelector("form input");
    let amtval = amt.value;
    if(amtval==="" || amtval < 1) {
        amtval=1;
        amt.value=1;
    }

    const url = `${base_url}${fromcurr.value.toLowerCase()}.json`;
    let response = await fetch(url);
    console.log(response);
    let data = await response.json();
    console.log(data);
    let rate = data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()]; 
    // let finalamt = amtval * rate;
    let finalamt = (amtval * rate).toFixed(2);

    message.innerHTML = `<b>${amtval} ${fromcurr.value} = ${finalamt} ${tocurr.value}</b>`;
};