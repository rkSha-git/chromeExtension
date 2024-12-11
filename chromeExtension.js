const inputEl = document.getElementById('input');
const btnEl = document.getElementById('btn');
const listEl = document.getElementById('list');
let delEl = document.getElementById('del');
let tabEl = document.getElementById('tab');
let myList = [];
let leads = JSON.parse(localStorage.getItem("myList"));

if(leads){
  myList = leads;
  render(myList);
}

tabEl.addEventListener('click', function(){
     chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myList.push(tabs[0].url);
        localStorage.setItem("myList", JSON.stringify(myList));
        listEl.innerHTML = "";
        render(myList);
     })
});

delEl.addEventListener("dblclick",  function(){
   localStorage.clear();
   myList = [];
   listEl.innerHTML = "";
});



btnEl.addEventListener("click", function(){
    myList.push(inputEl.value);
    listEl.innerHTML = "";
    localStorage.setItem("myList", JSON.stringify(myList));
    render(myList);
});

function render(list){
    for(let i = 0; i < list.length; i++){
        listEl.innerHTML += `<li>
        <a target='_blank' href='${list[i]}'>${list[i]}</a>
        </li>`;
    };
    inputEl.value = "";
};