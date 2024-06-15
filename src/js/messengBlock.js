export default class MessengBlock {
  constructor() {}
  addField(page) {
    const field = document.createElement("div");
    field.classList.add("field_block");
    const usersBox = document.createElement("div");
    usersBox.classList.add("field_box_users");
    const usersList = document.createElement("ul");
    usersList.classList.add("list_users");
    usersBox.append(usersList);
    const boxMess = document.createElement("div");
    boxMess.classList.add("field_box_messenge");
    const blockMess = document.createElement("div");
    blockMess.classList.add("block_messeng");
    boxMess.append(blockMess);
    const mess = document.createElement("div");
    mess.classList.add("mess");
    const messText = document.createElement("input");
    messText.type = "text";
    messText.classList.add("mess_text");
    mess.append(messText);
    const messBtn = document.createElement("button");
    messBtn.classList.add("mess_btn");
    messBtn.textContent = "Отправить";
    mess.append(messBtn);
    boxMess.append(mess);
    field.append(usersBox);
    field.append(boxMess);

    page.append(field);
  }

  addItemListUsers(name, page, youName) {
    const li = document.createElement("li");
    if (name === youName) {
      li.classList.add("item_user_you");
      li.textContent = "YOU";
    } else {
      li.classList.add("item_user");
      li.textContent = `${name}`;
    }

    page.append(li);
  }

  addMessenge(page, value, user, youName, time) {
    const mess = document.createElement("div");
    const nameData = document.createElement("p");
    if (user === youName) {
      mess.classList.add("item_mess_you");
      nameData.textContent = `YOU, ${time}`;
    } else {
      mess.classList.add("item_mess");
      nameData.textContent = `${user}, ${time}`;
    }

    nameData.classList.add("name_and_data");
    const text = document.createElement("p");
    text.classList.add("item_text");
    text.textContent = `${value}`;
    mess.append(nameData);
    mess.append(text);
    page.append(mess);
  }
}
