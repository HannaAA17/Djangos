const axios = require("axios");

const DOMAIN = "http://localhost:5000"


async function makeReq(url="/", type="get", resp_type="json") {
  return await axios({
    method: type,
    url: DOMAIN + url,
    responseType: resp_type,
  });
}

async function task_10() {
  const resp = await makeReq("/");
  console.log(resp.data)
};

async function task_11() {
  const resp = await makeReq("/isbn/1");
  console.log(resp.data)
};

async function task_12() {
  const resp = await makeReq("/author/Unknown");
  console.log(resp.data)
};

async function task_13() {
  const resp = await makeReq("/title/One Thousand and One Nights");
  console.log(resp.data)
};



// task_10();
// task_11();
// task_12();
// task_13();