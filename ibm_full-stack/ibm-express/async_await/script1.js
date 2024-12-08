const axios = require("axios");

// first method
const connectToURL = (url) => {
  const req = axios.get(url);
  console.log(req); // Promise { <pending> }

  req
    .then((resp) => {
      let listOfEntries = resp.data.entries;
      listOfEntries.forEach((entry) => {
        console.log(entry.Category);
      });
    })
    .catch((err) => {
      console.log(err.toString());
    });
};

const connectToURL_2 = async(url)=>{
  const req = axios.get(url);
  console.log(req); // Promise { <pending> }
  
  let listOfEntries = (await req).data.entries;
  listOfEntries.forEach((entry)=>{
    console.log(entry.Category);
  });
}

console.log("Before connect URL");
// connectToURL("https://api.publicapis.org/entries");
connectToURL_2("https://api.publicapis.org/entries");
console.log("After connect URL");
