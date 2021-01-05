class CalculatorApp {
    constructor()
    {
        let window = new System.window(300, 385, "Calculator");

        let calcBody = document.createElement("div");
        let calcDisplay = document.createElement("div");
        let calcKeys = document.createElement("div");
        calcDisplay.className = "calculator-display";
        calcBody.className = "calculator-body";
        calcKeys.className = "calculator-keys";
        calcDisplay.innerHTML = "0";
        calcKeys.innerHTML = "<button class='key-operator btn' data-action='add'>+</button><button class='key-operator btn' data-action='subtract'>-</button><button  class='key-operator btn' data-action='multiply'>&times;</button><button  class='key-operator btn' data-action='divide'>/</button><button  class='btn'>7</button><button  class='btn'>8</button><button  class='btn'>9</button><button  class='btn'>4</button><button class='btn'>5</button><button  class='btn'>6</button><button class='btn'>1</button><button  class='btn'>2</button><button  class='btn'>3</button><button  class='btn'>0</button><button  data-action='decimal' class='btn'>.</button><button data-action='clear' class='btn key-clear'>AC</button><button class='key-equal btn' data-action='calculate'>=</button>";
        calcBody.appendChild(calcDisplay);
        calcBody.appendChild(calcKeys);
        window.addBody(calcBody);

        const close = () => {
            let body = document.getElementById("Calculator");
            body.parentNode.removeChild(body);
            window = null;
            let index = windows.find(windows => windows["name"] === "CalculatorApp");
            windows.splice(index, 1);
        }
        window.setCloseAction(close);

        const calculator = document.querySelector(".calculator-body");
        const keys = document.querySelector(".calculator-keys");
        const display = document.querySelector('.calculator-display');
        const calculate = (n1, operator, n2) => {
            const firstNum = parseFloat(n1)
            const secondNum = parseFloat(n2)
            if (operator === 'add') return firstNum + secondNum
            if (operator === 'subtract') return firstNum - secondNum
            if (operator === 'multiply') return firstNum * secondNum
            if (operator === 'divide') return firstNum / secondNum
        }

        keys.addEventListener("click", e => {
            if (e.target.matches("button")) {
                const key = e.target;
                const action = key.dataset.action;
                const keyContent = key.textContent;
                const displayedNum = display.textContent;
                const previousKeyType = calculator.dataset.previousKeyType;

                if (!action) {
                    if (displayedNum === "0" || previousKeyType === 'operator') display.textContent = keyContent;
                    else display.textContent = displayedNum + keyContent;
                    calculator.dataset.previousKeyType = 'number';
                }
                if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide')
                {
                    const firstValue = calculator.dataset.firstValue;
                    const operator = calculator.dataset.operator;
                    const secondValue = displayedNum;

                    if (firstValue && operator && previousKeyType !== 'operator' && previousKeyType !== 'calculate')
                    {
                        const calcValue = calculate(firstValue, operator, secondValue);
                        display.textContent = calcValue;
                        calculator.dataset.firstValue = calcValue;
                    }
                    else calculator.dataset.firstValue = displayedNum;

                    key.classList.add('is-depressed');
                    calculator.dataset.previousKeyType = 'operator';
                    calculator.dataset.operator = action;
                }
                if (action === 'decimal')
                {
                    if (!displayedNum.includes('.')) display.textContent = displayedNum + '.';
                    else if (previousKeyType === 'operator'|| previousKeyType === 'calculate') display.textContent = '0.';
                    calculator.dataset.previousKeyType = 'decimal';
                }
                  
                if (action === 'clear')
                {
                    if (key.textContent === 'AC')
                    {
                        calculator.dataset.firstValue = '';
                        calculator.dataset.modValue = '';
                        calculator.dataset.operator = '';
                        calculator.dataset.previousKeyType = '';
                    }
                    else key.textContent = 'AC';
                      
                    display.textContent = 0;
                    calculator.dataset.previousKeyType = 'clear';
                }

                if (action !== 'clear')
                {
                    const clearButton = calculator.querySelector('[data-action=clear]');
                    clearButton.textContent = 'CE';
                }
                  
                if (action === 'calculate')
                {
                    const firstValue = calculator.dataset.firstValue;
                    const operator = calculator.dataset.operator;
                    const secondValue = displayedNum;

                    if (firstValue)
                    {
                        if (previousKeyType === 'calculate')
                        {
                            firstValue = displayedNum;
                            secondValue = calculator.dataset.modValue;
                        }
                        display.textContent = calculate(firstValue, operator, secondValue);
                    }
                    calculator.dataset.modValue = secondValue;
                    calculator.dataset.previousKeyType = 'calculate';
                }
                Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'));
            }
        })
    }
}