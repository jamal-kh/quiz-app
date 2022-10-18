const many = document.querySelector(".many"),
      timer = document.querySelector(".timer"),
      quis  = document.querySelector(".question"),
      btn   = document.querySelectorAll(".btn");
const aler = document.querySelector(".alertin");

let where = 0;
let score = 0;
let ra ;
let end;
let times = 1;
let ftime;

function getQ(){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function (){
        if(this.readyState == 4 && this.status == 200){
            let jsob = JSON.parse(this.responseText);
            many.innerHTML = `${jsob.length} / ${where}`;
            quis.textContent = jsob[where].title;

            btn[0].value = jsob[where].answer_1;
            btn[1].value = jsob[where].answer_2;
            btn[2].value = jsob[where].answer_3;
            btn[3].value = jsob[where].answer_4;
            re = jsob[where].right_answer;
            end = jsob.length;
        } 
    }
    xhttp.open("GET" , "quis.json",true);
    xhttp.send();
}
function start(){
    aler.parentElement.classList.add("hidden");
    getQ();
    time();
}
function rightOrNot(event) {
    let th = event.target;
    if(where < end){
        if(th.value == re){
            score++;
        }
        where++;
    }else{
        console.log("the finshed");
    }
    if(where == end) finsh();
    getQ();
}
 function nextq() {
    if(where < end && where >= 0)  where++;
    getQ();
}
function previousq() {
    if(where < end && where > 0)  where--; 
    getQ();
}
function time(){
        setInterval(function ff(){
            let minute = Math.floor(times / 60);
            let second = Math.floor(times % 60);
            times++;
            ftime = `${minute < 10 ? "0" + minute : minute}:${second < 10 ? "0" + second : second}`
            timer.innerHTML = ftime;
        },1000);
}
function finsh(){
    aler.parentElement.classList.remove("hidden")
    aler.innerHTML = `
    your Score : ${score} <br>
    your time  : ${ftime}
    `
}

