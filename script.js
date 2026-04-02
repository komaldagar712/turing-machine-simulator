let tape = [];
let head = 0;
let state = "q0";
let stepCount = 0;

// DEFAULT RULES
function getDefaultTransitions(){
    return {
        "q0_1": ["q1", "0", "R"],
        "q0_0": ["q0", "0", "R"],
        "q0__": ["q_accept", "_", "R"],

        "q1_1": ["q1", "0", "R"],
        "q1_0": ["q0", "0", "R"],
        "q1__": ["q_accept", "_", "R"]
    };
}

let transitions = getDefaultTransitions();

// RESET TABLE
function resetTable(){
    stepCount = 0;
    let table = document.getElementById("stateTable");

    if(!table) return;

    table.innerHTML = `
    <tr>
    <th>Step</th>
    <th>State</th>
    <th>Read</th>
    <th>Write</th>
    <th>Move</th>
    </tr>`;
}

// ADD RULE (DROPDOWN)
function addRule(){

let cs = document.getElementById("curState")?.value;
let read = document.getElementById("readSym")?.value;
let ns = document.getElementById("nextState")?.value;
let write = document.getElementById("writeSym")?.value;
let move = document.getElementById("moveDir")?.value;

if(!cs || !read || !ns || !write){
    alert("Fill all fields");
    return;
}

let key = cs + "_" + read;
transitions[key] = [ns, write, move];

// show rules
let list = document.getElementById("rulesList");
if(list){
    list.innerHTML += `<p>${cs}, ${read} → ${ns}, ${write}, ${move}</p>`;
}
}

// START
function startMachine(){

let input = document.getElementById("tapeInput")?.value.trim();

if(!input){
    alert("Enter input");
    return;
}

if(!/^[01]+$/.test(input)){
    alert("Only 0 and 1 allowed");
    return;
}

// reset to default every time
transitions = getDefaultTransitions();

tape = input.split("");
head = 0;
state = "q0";

resetTable();
drawTape();
}

// STEP
function stepMachine(){

if(state === "q_accept"){
    alert("ACCEPTED");
    return;
}

if(head >= tape.length) tape.push("_");

let symbol = tape[head];
let key = state + "_" + symbol;

if(!(key in transitions)){
    alert("REJECTED (missing rule: " + key + ")");
    return;
}

let rule = transitions[key];

// table
stepCount++;
let table = document.getElementById("stateTable");

if(table){
    let row = table.insertRow();

    row.insertCell(0).innerText = stepCount;
    row.insertCell(1).innerText = state;
    row.insertCell(2).innerText = symbol;
    row.insertCell(3).innerText = rule[1];
    row.insertCell(4).innerText = rule[2];
}

// apply
state = rule[0];
tape[head] = rule[1];

if(rule[2] === "R") head++;
if(rule[2] === "L") head--;

drawTape();
}

// AUTO
function startAuto(){

let input = document.getElementById("tapeInput")?.value.trim();

if(!input){
    alert("Enter input");
    return;
}

if(!/^[01]+$/.test(input)){
    alert("Only 0 and 1 allowed");
    return;
}

// reset default
transitions = getDefaultTransitions();

tape = input.split("");
head = 0;
state = "q0";

resetTable();
runStep();
}

// RUN
function runStep(){

if(state === "q_accept") return;

if(head >= tape.length) tape.push("_");

let symbol = tape[head];
let key = state + "_" + symbol;

if(!(key in transitions)){
    alert("REJECTED (missing rule: " + key + ")");
    return;
}

let rule = transitions[key];

// table
stepCount++;
let table = document.getElementById("stateTable");

if(table){
    let row = table.insertRow();

    row.insertCell(0).innerText = stepCount;
    row.insertCell(1).innerText = state;
    row.insertCell(2).innerText = symbol;
    row.insertCell(3).innerText = rule[1];
    row.insertCell(4).innerText = rule[2];
}

// apply
state = rule[0];
tape[head] = rule[1];

if(rule[2] === "R") head++;
if(rule[2] === "L") head--;

drawTape();

let speed = document.getElementById("speedControl")?.value || 500;
setTimeout(runStep, speed);
}

// DRAW
function drawTape(){

let output = document.getElementById("output");
if(!output) return;

output.innerHTML = "";

for(let i=0;i<tape.length;i++){

    let cell = document.createElement("div");
    cell.className = "cell";

    if(i === head) cell.classList.add("head");

    cell.innerText = tape[i];
    output.appendChild(cell);
}

let stateBox = document.getElementById("stateDisplay");
if(stateBox) stateBox.innerText = state;
}

// SLIDER
window.onload = function(){

let slider = document.getElementById("speedControl");

if(slider){
    slider.oninput = function(){
        let val = document.getElementById("speedValue");
        if(val) val.innerText = this.value + " ms";
    }
}

};