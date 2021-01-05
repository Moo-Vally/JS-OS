let System = {
    registeredApps: [{"class": "FilesApp", "file": "Files.js"}, {"class": "NotepadApp", "file": "Notepad.js"}, {"class": "CalculatorApp", "file": "Calculator.js"}, {"class": "ListsApp", "file": "Lists.js"}],
    window: class Window {
        constructor(width, height, title)
        {
            const mouseup = () => {
                screen.removeEventListener("mousemove", mousemove);
                screen.removeEventListener("mouseup", mouseup);
            }
            const mousemove = (e) => {
                let windowQuerySelector = document.querySelector(`#${title}`);
                let newX = this.prevX - e.clientX;
                let newY = this.prevY - e.clientY;
                const rect = windowQuerySelector.getBoundingClientRect();
                this.window.style.left = rect.left - newX + "px";
                this.window.style.top = rect.top - newY + "px";
                this.prevX = e.clientX;
                this.prevY = e.clientY;
            }
            const mousedown = (e) => {
                for (let x in this.ignore)
                {      
                    if (e.target === this.ignore[x]) return;
				}
                screen.addEventListener("mousemove", mousemove);
                screen.addEventListener("mouseup", mouseup);
                this.prevX = e.clientX;
                this.prevY = e.clientY;
            }

            this.ignore = [];
    
            this.window = document.createElement("div");
            this.window.className = "window";
            this.window.id = title;
            this.window.style.height = height;
            this.window.style.width = width;
            this.window.style.left = "40%";
            this.window.style.top = "30%";
            this.window.addEventListener("mousedown", mousedown);
            this.window.style.top = "100px";
            this.closeBtn = document.createElement("button");
            this.closeBtn.className = "closeBtn";
            this.closeBtn.innerHTML = "X";
            this.title = title;
            this.window.appendChild(this.closeBtn);
            screen.appendChild(this.window);
            this.setIgnore(this.closeBtn);
        }
        addBody(body) {
            this.window.appendChild(body);
        }
        deleteBody(body) {
            this.window.removeChild(body);
        }
        setCloseAction(action) {
            this.closeBtn.addEventListener("click", action);
        }
        setIgnore(ignore) {
            this.ignore.push(ignore);
        }
    },
    openWindow: (windowType) => {
    if (windows.find(windows => windows["name"] === windowType)) return;
    let newWindow = new (windowType);
    windows.push({"name": windowType, "window": newWindow});
    },
    loadClock: () => {
        const clock = document.getElementById("clock");
        const checkTime = (i) => {
            return i < 10 ? `0${i}` : i;
        }
        const startTime = () => {
            let today = new Date();
            var h = today.getHours();
            var m = today.getMinutes();
            var s = today.getSeconds();
            m = checkTime(m);
            s = checkTime(s);
            clock.innerText = `${h}:${m}:${s}`;
            var t = setTimeout(startTime, 500);
        }
        startTime();
    },
    loadApps: () => {
        const div = document.getElementById("dropdownApps");
        for (let x in System.registeredApps)
        {
            document.write(`<script src="Apps/${System.registeredApps[x].file}"></script>`);
            let dropdownItem = document.createElement("p");
            dropdownItem.className = "menuitem";
            dropdownItem.setAttribute("onclick", `System.openWindow(${System.registeredApps[x].class});`);
            let title = System.registeredApps[x].file.substring(0, System.registeredApps[x].file.length - 3);
            dropdownItem.id = `${title}MenuItem`;
            dropdownItem.innerText = title;
            div.appendChild(dropdownItem);
        }
    }
}