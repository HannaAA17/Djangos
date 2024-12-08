const axios = require("axios");

/*
In the following code we try to get list of all entries from remote url and then based on that make request about 
each of the category. Finally print them all out. We are using axios get, which returns a promise. 
*/
const connectToURL = (url) => {
  const req = axios.get(url);

  req
    .then((resp) => {
      let listOfEntries = resp.data.entries;
      // extract the categories
      return listOfEntries.map((entry) => {
        return entry.Category;
      });
    })
    .then((categories) => {
      // remove duplicates
      let Categories = categories.filter(function (item, pos, self) {
        return self.indexOf(item) == pos;
      });

      // for each category
      Categories.forEach((category) => {
        const req = axios.get(
          "https://api.publicapis.org/entries?Category=" + category
        );

        req
          .then((resp) => {
            console.log(category + " - " + resp.data.count);
          })
          .catch((err) => {});
      });
    })
    .catch((err) => {
      console.log(err.toString());
    });
};

async function connectToURL_2(url) {
  const resp = await axios.get(url);

  let listOfEntries = resp.data.entries;
  let Categories = listOfEntries.map((entry) => {
    return entry.Category;
  });

  // remove the duplicates
  Categories = [...new Set(Categories)];

  // make the requests
  Categories.forEach(async (Category) => {
    if (Category.startsWith("A")) {
      try {
        const resp = await axios({
          method: "get",
          url: "https://api.publicapis.org/entries?Category=" + Category,
          responseType: "json",
        });
        console.log(Category + "   " + resp.data.count);
      } catch (e) {
        console.log(e);
      }
    }
  });
}

// connectToURL("https://api.publicapis.org/entries");

connectToURL_2("https://api.publicapis.org/entries").catch(err => {
	console.log(err.toString())
});