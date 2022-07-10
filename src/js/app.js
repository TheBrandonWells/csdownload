async function getData() {
  let url = "http://localhost:5000/data";
  try {
    let res = await fetch(url);
    return res.json();
  } catch (error) {
    console.error("Error: " + error.message);
    //return our error message for proper error handling render
    return { error: error.message };
  }
}

async function app() {
  const chatLogResponse = await getData();

  console.log(chatLogResponse);
}

app();
