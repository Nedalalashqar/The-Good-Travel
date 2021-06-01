'use strict';

const form = document.getElementById('form');
const table = document.getElementById('table');
const tHeader=['Image' , 'Name' , 'Trip','Type'];

function Travel(name,trip,type){
    this.name=name;
    this.trip=`./img/${trip}.png`;
    this.type=type;
    Travel.all.push(this);
}
Travel.all=[];

function tableHead(){
    let thHead=document.createElement('th');
    for(let i =0; i<tHeader.length;i++){
        let thE1=document.createElement('th');
        thHead.appendChild(thE1);
        thE1.textContent=tHeader[i];
        table.appendChild(thHead);
    }

}

function renderCatagory(){
    table.innerHTML='';
    tableHead();
    for(let i=0; i<Travel.all.length;i++){
        let trE2 = document.createElement('tr');
        let tdE1 = document.createElement('td');
        let deletButton=document.createElement('button');
        deletButton.setAttribute('id' ,Travel.all[i].name);
        deletButton.textContent='x';
        trE2.appendChild(deletButton);
        table.appendChild(trE2);
        let tdE4=document.createElement('td');
        trE2.appendChild(tdE4);
        let img =document.createElement('img');
        img.src=Travel.all[i].trip;
        tdE1.appendChild(img);
        // let tdE3=document.createElement('td')
        tdE4.textContent=Travel.all[i].trip
        trE2.appendChild(tdE1);
        tdE1.textContent=Travel.all[i].name;
        let tdE2=document.createElement('td');
        trE2.appendChild(tdE2);
        tdE2.textContent=Travel.all[i].type;
        deletButton.addEventListener('click' ,deleteRow);
        function deleteRow(){
            Travel.all.splice(i,1);
            getList();
            trE2.innerHTML='';
        }

    }
}

form.addEventListener('submit' , eventButton);
function eventButton(event){
    event.preventDefault();
    let placesName = event.target.name.value;
    let tripPlace=event.target.trip.value;
    let typeOfTransport=event.target.type.value;
    new Travel(placesName,tripPlace,typeOfTransport);
getList();
    renderCatagory();
}

function getList(){
    localStorage.setItem('Travel' , JSON.stringify(Travel.all));

}

function getForm(){
    Travel.all=JSON.parse(localStorage.getItem('Travel')) || [];
}

getForm();