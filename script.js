let tape = [];
let head = 0;
let state = "q0";
let stepCount = 0;

const transitions = {
    "q0_1": ["q1", "0", "R"],
    "q0_0": ["q0", "0", "R"],
    "q0__": ["q_accept", "_", "R"],

    "q1_1": ["q1", "0", "R"],
    "q1_0": ["q0", "0", "R"],
    "q1__": ["q_accept", "_", "R"]
};

// RESET TABLE
function resetTable(){
    stepCount = 0;
    document.getElementById("stateTable").innerHTML = `
    <tr>
    <th>Step</th>
    <th>State</th>
    <th>Read</th>
    <th>Write</th>
    <th>Move</th>
    </tr>
    `;
}

// START (manual)
function startMachine(){

let input = document.getElementById("tapeInput").value.trim();

if(input === ""){
    alert("Please enter input");
    return;
}

if(!/^[01]+$/.test(input)){
    alert("Only 0 and 1 allowed");
    return;
}

tape = input.split("");
head = 0;
state = "q0";

resetTable();
drawTape();
}

// STEP MODE
function stepMachine(){

if(state === "q_accept"){
    document.getElementById("output").innerHTML += "<br><b>ACCEPTED</b>";
    return;
}

if(head >= tape.length){
    tape.push("_");
}

let symbol = tape[head];
let key = state + "_" + symbol;

if(!(key in transitions)){
    document.getElementById("output").innerHTML += "<br><b>REJECTED</b>";
    return;
}

let rule = transitions[key];

// remove highlight safely
let rows = document.querySelectorAll("#stateTable tr");
rows.forEach((r, i) => {
    if(i !== 0) r.classList.remove("highlight");
});

// add new row
stepCount++;
let table = document.getElementById("stateTable");
let row = table.insertRow();

row.insertCell(0).innerText = stepCount;
row.insertCell(1).innerText = state;
row.insertCell(2).innerText = symbol;
row.insertCell(3).innerText = rule[1];
row.insertCell(4).innerText = rule[2];

row.classList.add("highlight");

// apply rule
state = rule[0];
tape[head] = rule[1];

if(rule[2] === "R") head++;
if(rule[2] === "L") head--;

drawTape();
}

// AUTO BUTTON
function startAuto(){

let input = document.getElementById("tapeInput").value.trim();

if(input === ""){
    alert("Please enter input");
    return;
}

if(!/^[01]+$/.test(input)){
    alert("Only 0 and 1 allowed");
    return;
}

tape = input.split("");
head = 0;
state = "q0";

resetTable();
runStep();
}

// AUTO ENGINE
function runStep(){

if(state === "q_accept"){
    document.getElementById("output").innerHTML += "<br><b>ACCEPTED</b>";
    return;
}

if(head >= tape.length){
    tape.push("_");
}

let symbol = tape[head];
let key = state + "_" + symbol;

if(!(key in transitions)){
    document.getElementById("output").innerHTML += "<br><b>REJECTED</b>";
    return;
}

let rule = transitions[key];

// remove highlight safely
let rows = document.querySelectorAll("#stateTable tr");
rows.forEach((r, i) => {
    if(i !== 0) r.classList.remove("highlight");
});

// add new row
stepCount++;
let table = document.getElementById("stateTable");
let row = table.insertRow();

row.insertCell(0).innerText = stepCount;
row.insertCell(1).innerText = state;
row.insertCell(2).innerText = symbol;
row.insertCell(3).innerText = rule[1];
row.insertCell(4).innerText = rule[2];

row.classList.add("highlight");

// apply rule
state = rule[0];
tape[head] = rule[1];

if(rule[2] === "R") head++;
if(rule[2] === "L") head--;

drawTape();

let speed = document.getElementById("speedControl").value;
setTimeout(runStep, speed);
}

// DRAW
function drawTape(){

let outputDiv = document.getElementById("output");
outputDiv.innerHTML = "";

for(let i = 0; i < tape.length; i++){

    let cell = document.createElement("div");
    cell.className = "cell";

    if(i === head){
        cell.classList.add("head");
    }

    cell.innerText = tape[i];
    outputDiv.appendChild(cell);
}

document.getElementById("stateDisplay").innerText = state;
}

// SLIDER
window.onload = function(){

let slider = document.getElementById("speedControl");

if(slider){
    slider.oninput = function(){
        document.getElementById("speedValue").innerText = this.value + " ms";
    }
}

};