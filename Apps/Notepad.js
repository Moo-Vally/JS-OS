class NotepadApp {
    constructor(noteName)
    {
        if (noteName != null) var note = localStorage.getItem(noteName + ".note");
        let window = new System.window(400, 500, "Notepad");
        let fileDrawerOpen = false;

        let notetitle = document.createElement("textarea");
        let input = document.createElement("textarea");
        let savebtn = document.createElement("button");
        let openbtn = document.createElement("button");
        input.id = "notepadBody";
        notetitle.id = "notepadtitle";
        input.placeholder = "note";
        notetitle.placeholder = "title";
        savebtn.className = "savenotebtn";
        openbtn.className = "opennotebtn";
        savebtn.innerText = "Save";
        openbtn.innerText = "Open";
        notetitle.setAttribute("wrap", "off");
        if (noteName != null)
        {
            notetitle.value = noteName;
            input.value = note;
        }
        window.setIgnore(input);
        window.setIgnore(notetitle);
        window.setIgnore(savebtn);
        window.setIgnore(openbtn);
        window.addBody(input);
        window.addBody(notetitle);
        window.addBody(savebtn);
        window.addBody(openbtn);

        savebtn.addEventListener("click", () => {
            const noteBody = document.getElementById("notepadBody").value;
            if (noteBody == null || noteBody == "") return alert("Write Someting Before Saving");
            let articleNum = localStorage.getItem("articleNum") || 1;
            let title = document.getElementById("notepadtitle").value || "unnamed-article-" + articleNum;
            localStorage.setItem(title + ".note", noteBody);
            articleNum++;
            localStorage.setItem("articleNum", articleNum);
        })

        openbtn.addEventListener("click", () => {
            if (fileDrawerOpen) return;
            fileDrawerOpen = true;

            document.getElementById("NotepadMenuItem").onclick = null;

            let body = document.getElementById("Notepad");
            body.parentNode.removeChild(body);
            let index = windows.indexOf("NotepadApp");
            windows.splice(index, 1);

            let window = new System.window(400, 300, "OpenNote");

            const close = () => {
                document.getElementById("NotepadMenuItem").onclick = () => {
                    System.openWindow(NotepadApp);
                }
                fileDrawerOpen = false;
                let body = document.getElementById("OpenNote");
                body.parentNode.removeChild(body);
                window = null;
            }
            window.setCloseAction(close);
            
            let keysToUse = [];
            const keys = Object.keys(localStorage);
            for (let x in keys)
            {
                if (keys[x].endsWith(".note")) keysToUse.push(keys[x]);
            }

            const openFile = (e) => {
                let newWindow = new NotepadApp(e.target.innerText);
                windows.push(newWindow);
                close();
            }

            let fileList = document.createElement("ul");
            fileList.className = "noteFilesList";
            for (let x in keysToUse)
            {
                let listItem = document.createElement("li");
                listItem.className = "noteFilesItem";
                listItem.innerText = (keysToUse[x].substring(0, keysToUse[x].length - 5));
                listItem.addEventListener("click", openFile);
                fileList.appendChild(listItem);
            }
            if (fileList.hasChildNodes())
            {
                window.addBody(fileList);
                window.setIgnore(fileList);
            }
            else
            {
                let message = document.createElement("p");
                message.innerText = "No Saved Notes";
                message.style = "text-align: center;";
                window.addBody(message);
            }
        })

        const close = () => {
            let body = document.getElementById("Notepad");
            body.parentNode.removeChild(body);
            window = null;
            let index = windows.indexOf("NotepadApp");
            windows.splice(index, 1);
        }
        window.setCloseAction(close);
    }
}