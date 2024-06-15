import MessengBlock from "./messengBlock.js";

export default class Chat {
  constructor() {
    this.page = document.querySelector("#root");
    this.field = new MessengBlock();
    this.websocket = null;
    this.youName = undefined;
    this.allUsers = undefined;
    this.messenges = undefined;
  }
  init() {
    this.add(this.page);
  }

  add(page) {
    const block = document.createElement("div");
    block.classList.add("block_entry");
    const title = document.createElement("h2");
    title.classList.add("block_entry_title");
    title.textContent = "Выберите псевдоним";
    const error = document.createElement("p");
    error.classList.add("error_mess");
    error.textContent = "выберите другое имя, такой есть)))";
    const inp = document.createElement("input");
    inp.type = "text";
    inp.classList.add("block_entry_input");
    const btn = document.createElement("button");
    btn.classList.add("block_entry_btn");
    btn.textContent = "Продолжить";

    block.append(title);
    block.append(error);
    block.append(inp);
    block.append(btn);

    page.append(block);

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      this.youName = inp.value;
      this.nameChack(inp.value);
    });
  }

  nameChack(value) {
    if (!value.trim()) return;

    const userName = { name: value.trim() };
    fetch("https://chat-back-96ra.onrender.com/new-user", {
      method: "POST",
      body: JSON.stringify(userName),
    }).then((response) => {
      if (response.status === 200) {
        this.clearPage(this.page);
        this.field.addField(this.page);
        this.users = this.page.querySelector(".list_users");
        this.field.addItemListUsers(value.trim(), this.users, this.youName);
        this.loadingPage();
        this.messengeItem();
      }
      if (response.status === 409 || 400) {
        const warning = this.page.querySelector(".error_mess");
        warning.classList.add("error_mess_activ");
      }
    });

    window.addEventListener("unload", () => {
      this.websocket.send(
        JSON.stringify({ msg: "вышел", type: "exit", user: this.youName })
      );
    });
  }

  loadingPage() {
    this.websocket = new WebSocket("https://chat-back-96ra.onrender.com");

    this.websocket.addEventListener("open", (ev) => {
      console.log(ev);
    });

    this.websocket.addEventListener("close", (ev) => {
      console.log(ev);
    });

    this.websocket.addEventListener("error", (ev) => {
      console.log(ev);
    });

    this.websocket.addEventListener("message", (ev) => {
      this.allUsers = JSON.parse(ev.data);
      console.log(this.allUsers);

      if (this.allUsers.type != "send") {
        const users = this.page.querySelector(".list_users");
        this.clearPage(users);

        for (const item of this.allUsers) {
          this.field.addItemListUsers(item.name, this.users, this.youName);
        }
      } else {
        if (this.allUsers.user == this.youName) return;
        this.field.addMessenge(
          this.pageMess,
          this.allUsers.message,
          this.allUsers.user,
          this.youName,
          this.time()
        );
      }
    });
  }

  messengeItem() {
    this.pageMess = this.page.querySelector(".block_messeng");
    const btnMess = this.page.querySelector(".mess_btn");

    console.log(btnMess);

    btnMess.addEventListener("click", () => {
      const textMess = document.querySelector(".mess_text");
      console.log(textMess.value);
      this.field.addMessenge(
        this.pageMess,
        textMess.value,
        this.youName,
        this.youName,
        this.time()
      );

      this.websocket.send(
        JSON.stringify({
          type: "send",
          message: textMess.value,
          user: this.youName,
        })
      );
      textMess.value = "";
    });
  }

  clearPage(page) {
    page.innerHTML = "";
  }

  time() {
    const Data = new Date();
    const Year = Data.getFullYear();
    const Month = Data.getMonth();
    const Day = Data.getDate();
    const Hour = Data.getHours();
    const Minutes = Data.getMinutes();

    return ` ${Hour}:${Minutes} ${Day}-${Month + 1}-${Year}`;
  }
}
