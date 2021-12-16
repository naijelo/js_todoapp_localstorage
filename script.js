const content = document.querySelector(".content-wrapper"),
      form = document.querySelector(".form-wrapper"),
      input = document.querySelector(".input-text"),
      itemText = document.querySelectorAll(".item-text"),
      completeBtn = document.querySelectorAll(".complete-btn"),
      loginBtn = document.querySelector(".login-btn"),
      modalWrapper = document.querySelector(".modal-wrapper"),
      modal = document.querySelector(".modal"),
      closeModalBtn = document.querySelector(".close-modal"),
      itemList = document.querySelector(".item-list-wrapper");

let data = [];

// actions with local storage
window.addEventListener("load", () => {
    data = JSON.parse(localStorage.getItem("data")) ?? []; 
    updateList();
    })

//update list of items from localstorage
function updateList() {
    data = JSON.parse(localStorage.getItem("data")) ?? []; 
    data.map((el, index) => {
        let newPost = document.createElement("section");
        if (el.completed === false){
            newPost.classList.add("wrapper", "item-wrapper");
        } else {
            newPost.classList.add("wrapper", "item-wrapper", "strikethrough");
        }
        newPost.setAttribute('data-key', el.id);
        newPost.innerHTML = `
    <div class="item-text">${index + 1}.${el.text}</div>
    <button class="btn complete-btn">Complete</button>
    <button class="btn delete-btn">Delete</button>
`
        itemList.append(newPost);
    })
}

// work with TODO items
const addNewPost = function() {
    form.addEventListener("submit", (event) => {
        event.preventDefault(); 
        if (input.value.trim()) {
            itemList.innerHTML = "";
            data.push({
                id: Date.now(),
                text: input.value,
                completed: false,
            })
            localStorage.setItem("data", JSON.stringify(data));
            input.value = "";
            updateList();
        }
    });
}
addNewPost();

const completeTask = function() {
    content.addEventListener("click", (event) => {
        if (event.target.classList.contains("complete-btn")) {
            itemList.innerHTML = "";
            data = JSON.parse(localStorage.getItem("data"));
            id = event.target.parentElement.getAttribute("data-key");
            for (let i = 0; i < data.length; i++) {
                if (data[i].id == id) {
                    data[i].completed = !data[i].completed;
                    localStorage.setItem("data", JSON.stringify(data));
                } 
            }
            updateList();
        };
    });
}
completeTask();

const deleteTask = function() {
    content.addEventListener("click", (event, index) => {
        if (event.target.classList.contains("delete-btn")) {
            // const node = event.target.closest(".item-wrapper");
            // node.remove();
            itemList.innerHTML = "";
            data = JSON.parse(localStorage.getItem("data"));
            id = event.target.parentElement.getAttribute("data-key");
            for (let i = 0; i < data.length; i++) {
                if (data[i].id == id) {
                    data.splice(i, 1);
                    localStorage.setItem("data", JSON.stringify(data));
                } 
            }
            updateList();
        };
    });
}
deleteTask();