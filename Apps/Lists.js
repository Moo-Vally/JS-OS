class ListsApp {
    constructor(listToOpen)
    {
        let window = new System.window(400, 500, "Lists");

        let newListInput = document.createElement("textarea");
        let newListBtn = document.createElement("button");
        let listOfLists = document.createElement("ul");
        newListInput.className = "newlistinput";
        newListBtn.className = "createlistbtn";
        newListInput.setAttribute("wrap", "off");
        listOfLists.id = "listoflists";
        newListInput.id = "newListItem";
        newListBtn.id = 'createlistbtn';
        window.setIgnore(newListInput);
        window.setIgnore(newListBtn);
        window.addBody(newListInput);
        window.addBody(newListBtn);
        window.addBody(listOfLists);

        if (listToOpen != null)
        {
            newListInput.placeholder = "new list item";
            newListBtn.innerHTML = "Add";
            newListBtn.addEventListener("click", () => {
                let text = document.getElementById("newListItem").value;
                if (text == null || text == "") return alert("item cannot be empty");
                retrievedList.push(text);
                localStorage.setItem(`${list}.list`, JSON.stringify(retrievedList));
                this.loadList(window, retrievedList, "list");
                document.getElementById('newListItem').value = '';
            });

            let retrievedList = localStorage.getItem(`${listToOpen}.list`);
            if (retrievedList == "empty" || retrievedList == "[]") retrievedList = [];
            else retrievedList = JSON.parse(retrievedList);
            this.loadList(window, retrievedList, "list");
        }
        else
        {
            newListInput.placeholder = "new list name";
            newListBtn.innerText = "Create";
            newListBtn.addEventListener("click", () => {
                newListInput.placeholder = "new list item";
                newListBtn.innerHTML = "Add";
                newListBtn.addEventListener("click", () => {
                    let text = document.getElementById("newListItem").value;
                    if (text == null || text == "") return alert("item cannot be empty");
                    retrievedList.push(text);
                    localStorage.setItem(`${list}.list`, JSON.stringify(retrievedList));
                    this.loadList(window, retrievedList, "list");
                    document.getElementById('newListItem').value = '';
                });
                const listTitle = document.getElementById("newListItem").value;
                if (listTitle == null || listTitle == "") return alert("Please Enter Title First");
                localStorage.setItem(`${listTitle}.list`, "empty");
                document.getElementById('newListItem').value = '';
                let retrievedList = localStorage.getItem(`${listToOpen}.list`);
                if (retrievedList == "empty" || retrievedList == "[]") retrievedList = [];
                else retrievedList = JSON.parse(retrievedList);
                this.loadList(window, retrievedList, "list");
            });

            let keys = [];
            const keysRetrieved = Object.keys(localStorage);
            for (let x in keysRetrieved) if (keysRetrieved[x].endsWith(".list")) keys.push(keysRetrieved[x]);
            this.loadList(window, keys, "lists");
        }

        const close = () => {
            let body = document.getElementById("Lists");
            body.parentNode.removeChild(body);
            window = null;
            let index = windows.find(windows => windows["name"] === "ListsApp");
            windows.splice(index, 1);
        }
        window.setCloseAction(close);
    }

    loadList(window, list, type)
    {
        if (list == "[]") return;
        const listobject = document.getElementById("listoflists");
        listobject.innerHTML = "";

        for (let x in list)
        {
            let listItem = document.createElement("li");
            listItem.id = `id${list[x]}`;
            listobject.appendChild(listItem);

            if (type == "list")
            {
                const deleteItem = (e) => {
                    let index = list.indexOf(e.target.id);
                    list.splice(index, 1);
                    localStorage.setItem(`${list}.list`, JSON.stringify(list));
                    displayListItems(list);
                }
                const markAsDone = (e) => {
                    let item = e.target.innerText.substring(0, e.target.innerText.length - 1);
                    e.target.style = "text-decoration: line-through;";
                    e.target.removeEventListener("click", markAsDone);
                    document.getElementById(e.target.id.substring(2, e.target.id.length)).removeEventListener("click", deleteItem);
                    
                    setTimeout(() => {
                        let index = list.indexOf(e.target.innerText.substring(0, e.target.innerText.length - 1));
                        list.splice(index, 1);
                        localStorage.setItem(`${list}.list`, JSON.stringify(list));
                        displayListItems(list);
                    }, 3000);
                }
                listItem.innerHTML = `${list[x]}<button class="listitembutton" id="${list[x]}">X</button>`;
                document.getElementById(list[x]).addEventListener("click", deleteItem);
                listItem.addEventListener("click", markAsDone);
                listItem.className = "listOfListItem";
			}
            else if (type == "lists")
            {
                const openList = (e) => {
                    document.getElementById('newListItem').placeholder = "new list item";
                    document.getElementById('createlistbtn').innerHTML = "Add";
                    document.getElementById('createlistbtn').addEventListener("click", () => {
                        let text = document.getElementById("newListItem");
                        if (text.value == null || text.value == "") return alert("item cannot be empty");
                        retrievedList.push(text.value);
                        localStorage.setItem(`${list}.list`, JSON.stringify(retrievedList));
                        this.loadList(window, retrievedList, "list");
                        document.getElementById('newListItem').value = '';
                    });

                    let retrievedList = localStorage.getItem(`${e.target.innerHTML}.list`);
                    if (retrievedList == "empty" || retrievedList == "[]") retrievedList = [];
                    else retrievedList = JSON.parse(retrievedList);
                    this.loadList(window, retrievedList, "list");
                }
                listItem.innerText = (list[x].substring(0, list[x].length - 5));
                listItem.addEventListener("click", openList);
                listItem.className = "ListItem";
			}
        }
	}
}