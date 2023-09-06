const websiteList = document.querySelector(".websites");

let websiteArray = chrome.storage.sync.get(
  "websites",
  (data) => (data.websites || []) ?? []
);

for (let i = 0; i < websiteArray.length(); i++) {
  const newItem = document.createElement("div");
  newItem.classList = ["item", websiteArray[i][0]];
  newItem.innerHTML = `
  <a href="${websiteArray[i][1]}" target="_blank">${websiteArray[i][0]}</a>
  <button onclick="removeListItems(${websiteArray[i][0]})" type="button">Remove</button>
  `;
}

function removeListItems(className) {
  const websites = document.querySelector(".websites");
  const items = websites.querySelectorAll(`.${className}`);
  for (const item in items) {
    websites.removeChild(item);
  }
}

const addButton = document.querySelector("button.add");
const addInput = document.querySelector("input.add");

addButton.onClick = () => {
  websiteArray.push(addInput.value);
  chrome.storage.sync.set({ websites: [] });
  addInput.value;
};
