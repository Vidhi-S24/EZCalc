// console.log("COOL CALCULATOR");
let buttons = document.querySelector(`.buttons`);

let prevDisp = document.querySelector(`.prev-result`);
let currDisp = document.querySelector(`.current-result`);

let num1 = "";
let operator = "";
let num2 = "";
let ans = "";

let expString = "";

let num1IsNegative = false;
let num2IsNegative = false;

function performOperation(num1, operator, num2) {
    switch (operator) {
        case `+`:
            ans = Number(num1) + Number(num2);
            break;
        case `-`:
            ans = Number(num1) - Number(num2);
            break;
        case `×`:
            ans = Number(num1) * Number(num2);
            break;
        case `÷`:
            ans = Number(num1) / Number(num2);
            break;
        case `%`:
            ans = Number(num1) % Number(num2);
            break;
    }
    expString = "";
    num1 = "";
    num2 = "";
}

buttons.addEventListener("click", (e) => {
    switch (e.target.id) {
        case `AC`:
            allClear();
            break;

        case `C`:
            clear();
            break;

        case `=`:
            performOperation(num1, operator, num2);
            updateDisplay("", ans);
            console.log(ans);
            num1 = ans;
            num2 = "";
            operator = "";
            expString = ans;
            break;

        default:
            if (['+', '-', '×', '÷', '%'].includes(e.target.id)) {
                if (num1 && num2) {
                    performOperation(num1, operator, num2);
                    num1 = ans;
                    operator = e.target.id;

                    expString = ans + e.target.id;

                    updateDisplay(expString, "");
                    num2 = "";
                }
                else if (!num1 && e.target.id === `-`) {

                    num1IsNegative = true;
                    expString += e.target.id;
                    updateDisplay("", e.target.id);

                } else if (!num1 && e.target.id !== `-`) {
                    return;
                } else if (num1 && operator && !num2 && e.target.id === `-`) {
                    num2IsNegative = true;
                    expString += e.target.id;
                    updateDisplay(prevDisp.innerHTML, e.target.id + num2);
                }
                else {
                    if (operator) return;

                    operator = e.target.id;

                    expString += e.target.id;

                    updateDisplay(num1 + operator, "");
                    console.log(`operator=${operator}`);
                    num2 = "";
                }
            }
            else if (e.target.classList.contains(`number`)) {
                if (!operator && e.target.id === `0` && expString === `-`) {
                    expString += e.target.id;
                    num1 = expString;
                    updateDisplay("", expString);
                }
                //if operator is present
                else if (operator) {
                    // it will append in num2
                    if (e.target.id === `.` && num2.toString().includes(`.`)) return;
                    if (e.target.id === `.` && !num2) return;
                    if (e.target.id === `.` && expString.slice(expString.length - 2, expString.length).includes(`-0`)) {
                        num2 += `.`; 
                        console.log(`num2 is now ${num2}`);
                        expString += e.target.id;
                        num2 = `-`.concat(num2);
                        console.log(`num2 now ${num2}`);
                        num2IsNegative = false;
                        updateDisplay(prevDisp.innerHTML, num2);
                        return;
                    }
                    num2 += e.target.id;

                    expString += e.target.id;

                    if (num2IsNegative) {
                        num2 = Number(`-`.concat(num2));
                        num2IsNegative = false;
                    }

                    updateDisplay(num1 + operator, num2);
                    console.log(`num1=${num1}`);
                    console.log(`num2=${num2}`);
                    console.log(`operator=${operator}`);
                }
                else {
                    // it will append in num1
                    if (e.target.id === `.` && num1.toString().includes(`.`)) return;
                    if (e.target.id === `.` && !num1) return;
                    if (e.target.id === `.` && num1 && expString.includes(`-0`)) {
                        num1 += `.`;
                        expString = `-0.`;
                        num1IsNegative = false;
                        updateDisplay("", num1);
                        return;
                    }

                    num1 += e.target.id;
                    console.log(`num1 now is ${num1}`);

                    expString += e.target.id;

                    console.log(`expString = ${expString}`);

                    if (num1IsNegative) {
                        num1 = Number(`-`.concat(num1));
                        num1IsNegative = false;
                    }
                    updateDisplay("", num1);

                    console.log(`num1=${num1}`);
                    console.log(`num2=${num2}`);
                    console.log(`operator=${operator}`);
                }
            }
    }
})

function allClear() {
    num1 = "";
    operator = "";
    num2 = "";
    ans = "";
    expString = "";
    updateDisplay("", "");
}

function clear() {
    if (operator) num2 = num2.slice(0, -1);
    else num1 = num1.slice(0, -1);
    currDisp.innerHTML = currDisp.innerHTML.slice(0, -1);

    expString = expString.slice(0, -1);

    if (expString === "") allClear();
    if (!num2) {
        operator = "";
        updateDisplay(expString, "");
        return;
    }

    console.log(`Expression String: ${expString}`);
}

function updateDisplay(prevDisplay, currDisplay) {
    prevDisp.innerHTML = prevDisplay;
    currDisp.innerHTML = currDisplay;
    console.log(`Expression String: ${expString}`);
}