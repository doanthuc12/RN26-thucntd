window.onload = function () {
  getUser(id);
};

function getUser(id) {
  let url = getIdUrl();
  fetch("https://634ea35d4af5fdff3a62d2a4.mockapi.io/api/v1/users/" + id, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      document.getElementById("input__name").value = data.name;
      document.getElementById("btn__submit").textContent = "Update";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  console.log(id);
}

// function getIdUrl() {
//   let url = new URL(window.location.href);
//   let id = url.searchParams.get("id");
//   return id;
// }

// function renderInfo(user) {
//   const contentHTML = `
//       <p>${user?.id}</p>
//       <p>${user?.name}</p>
    
//       <a href="./form.html?id=${user?.id}">Update</a>
//     `;
//   const elm = document.getElementById("info");
//   elm.innerHTML = contentHTML;
// }
