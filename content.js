function cleanURL(url) {
  let moddedHref;

  if (href[4] === "s") {
    moddedHref = href.slice(8);
  } else {
    moddedHref = href.slice(7);
  }

  let slashIdx = moddedHref.indexOf("/");

  //TODO: It is broken when it is foo.com/bar

  //   alert(`${slashIdx}, ${moddedHref.length - 1}`);

  moddedHref = moddedHref.slice(0, slashIdx);
  // slashIdx === moddedHref.length - 1
  //!   ? moddedHref.slice(0, slashIdx)
  //!   : moddedHref.slice(0, slashIdx);

  return moddedHref;
}

const href = location.href;
const cleanHref = cleanURL(href);

const websiteArray = chrome.storage.sync.get(
  "websites",
  (data) => (data.websites || []) ?? []
);

if (websiteArray.includes(cleanHref)) {
  const page = document.querySelector("html");
  document.removeChild(page);

  const newPage = document.createElement("html");
  newPage.innerHTML = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
        body {
          background-color: rgb(0, 0, 37);
          text-align: center;
        }
        h1 {
          color: red;
          font-size: 5rem;
        }
        h2 {
          color: white;
          font-size: 4rem;
          font-weight: 600;
        }
        a {
          color: cyan;
          :visited {
            color: cyan;
          }
        }
      </style>
      <title>Blocked Page!</title>
    </head>
    <body>
      <h1>Blocked Page!</h1>
      <h2>
        You have visited <a href="${href}">${cleanHref}</a>, which has been
        blocked by the <em>Website Blocker</em> chrome extension <br />
        Remove it from the list to access this website!
      </h2>
    </body>
  </html>
  
  
  `;

  document.appendChild(newPage);
}
