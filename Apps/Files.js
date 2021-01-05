class FilesApp {
    constructor()
    {
        let window = new System.window(400, 500, "Files");

        const fileBtnClick = (type) => {
            this.loadFiles(window, type)
        }

        let allFilesBtn = document.createElement("button");
        let noteFilesBtn = document.createElement("button");
        let listFilesbtn = document.createElement("button");
        allFilesBtn.id = "allFilesBtn";
        noteFilesBtn.id = "noteFilesBtn";
        listFilesbtn.id = "listFilesBtn";
        allFilesBtn.innerText = "All";
        noteFilesBtn.innerText = "Notes";
        listFilesbtn.innerText = "Lists";
        allFilesBtn.onclick = fileBtnClick.bind(fileBtnClick, "all");
        noteFilesBtn.onclick = fileBtnClick.bind(fileBtnClick, "notes");
        listFilesbtn.onclick = fileBtnClick.bind(fileBtnClick, "lists");
        window.setIgnore(allFilesBtn);
        window.setIgnore(noteFilesBtn);
        window.setIgnore(listFilesbtn);
        window.addBody(allFilesBtn);
        window.addBody(noteFilesBtn);
        window.addBody(listFilesbtn);

        const close = () => {
            let body = document.getElementById("Files");
            body.parentNode.removeChild(body);
            window = null;
            let index = windows.find(windows => windows["name"] === "FilesApp");
            windows.splice(index, 1);
        }
        window.setCloseAction(close);

        this.loadFiles(window, "all");
    }

    loadFiles(window, type)
    {
        if (document.getElementById("filesapplist") != null) window.deleteBody(document.getElementById("filesapplist"));
        let list = document.createElement("ul");
        list.className = "filesapplist";
        list.id = "filesapplist";
        window.addBody(list);

	    if (type == "all") {
            document.getElementById("noteFilesBtn").style = "";
            document.getElementById("listFilesBtn").style = "";
            document.getElementById("allFilesBtn").style = "background-color: white; color: black;";
        }
        if (type == "notes") {
            document.getElementById("noteFilesBtn").style = "background-color: white; color: black;";
            document.getElementById("listFilesBtn").style = "";
            document.getElementById("allFilesBtn").style = "";
        }
        if (type == "lists") {
            document.getElementById("noteFilesBtn").style = "";
            document.getElementById("listFilesBtn").style = "background-color: white; color: black;";
            document.getElementById("allFilesBtn").style = "";
        }

        const keys = Object.keys(localStorage);
        const openFile = (e) => {
            function openWindowFromFiles(windowType, params)
            {
                if (windows.find(windows => windows["name"] === windowType)) return;
                let newWindow = new (windowType)(params);
                windows.push({"name": windowType, "window": newWindow});
            }
            if (e.target.innerHTML.substring(e.target.innerHTML.length - 5, e.target.innerHTML.length) == ".list")
            {
                openWindowFromFiles(ListsApp, e.target.innerHTML.substring(0, e.target.innerHTML.length - 5));
            }
            else if (e.target.innerHTML.substring(e.target.innerHTML.length - 5, e.target.innerHTML.length) == ".note")
            {
                openWindowFromFiles(NotepadApp, e.target.innerHTML.substring(0, e.target.innerHTML.length - 5));
            }
        }
        
        for (let x in keys)
        {
            if (keys[x].endsWith(".note") && type == "all" || keys[x].endsWith(".note") && type == "notes") 
            {
                let listItem = document.createElement("li");
                listItem.className = "fileslistitem";
                listItem.innerHTML = keys[x];
                listItem.addEventListener("click", openFile);
                list.appendChild(listItem);
            }
            else if (keys[x].endsWith(".list") && type == "all" || keys[x].endsWith(".list") && type == "lists")
            {
                let listItem = document.createElement("li");
                listItem.className = "fileslistitem";
                listItem.innerHTML = keys[x];
                listItem.addEventListener("click", openFile);
                list.appendChild(listItem);
            }
        }
    }
}