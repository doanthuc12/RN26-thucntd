window.onload = function (
    e //onload đảm bảo các elements đã chạy xong rồi mới bắt đầu chạy JS
  ) {
    // addRowJs();
    // deleteRowJs();
    //   addRowJq();
    //   addCollumnJquery();
    getListUsers();
  };
  function getListUsers() {
    let url =
      "https://634ea35d4af5fdff3a62d2a4.mockapi.io/api/v1users?page=1&limit=10";
    //thêm ?page=1&limit=10 để ghan data lấy về --> giảm tgian call API, dễ kiểm soát
    //phân trang
  
    fetch(url, {
      method: "GET", //chi doc du lieu
    })
      .then((response) => response.json())
      .then((data) => {
        data?.map((user) => addRowJs(user));
        //cách dùng for
        // for (let index = 0; index < array.length; index++) {
        //   addRowJs()
        // }
        // console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  
  //ADD ROWS
  function gotoDetail(id) {
    console.log("gotoDetail", id);
    window.location.href = "./detail.html?id=" + id;
  }
  
  // function deleteRowJs(elm) {
  //   let elmRow = elm.parentElement.parentElement;
  //   console.log(elmRow);
  //   elmRow.remove();
    // document.getElementById("table_users").deleteRow(index);
  // }
  
  function deleteRowAPI(elm, id) {
    fetch("https://634ea35d4af5fdff3a62d2a4.mockapi.io/api/v1/users/" + id, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        resetTbody();
        getListUsers();
        // deleteRowJs(elm);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  
  const htmlContent = `
  <th scope="row">1</th>
  <td>Mark</td>
  <td>Otto</td>
  <td>@mdo</td>
  <td style="width: 25%">
    <div class="button" style="text-align: right">
      <button 
        style="background-color: rgb(54, 117, 29); border-radius: 13%"
      >
        <a style="color: white; font-size: medium; margin-right: 0"
          >Detail</a
        >
      </button>
      <button
        style="background-color: rgb(211, 82, 50); border-radius: 13%"
      >
        <a style="color: white; font-size: medium; margin-right: 0"
          >Delete</a
        >
      </button>
    </div>
  </td>
  `; //dùng dấu ` ` để add ko bị báo lỗi!
  function formatRow(user) {
    return `
    <th scope="row">${user?.id}</th>
    <td>${user?.name}</td>
    <td>${user?.avatar}</td>
    <td>${user?.name.split(" ")[0]}</td>
    
    <td style="width: 25%">
      <div class="button"  style="text-align: right">
        <button onclick = "gotoDetail(${user?.id}) "
          style="background-color: rgb(54, 117, 29); border-radius: 13%"
        >
          <a style="color: white; font-size: medium; margin-right: 0"
            >Detail</a
          >
        </button>
        <button onclick="deleteRowAPI(this, ${user?.id})"
          style="background-color: rgb(211, 82, 50); border-radius: 13%"
        >
          <a style="color: white; font-size: medium; margin-right: 0"
            >Delete</a
          >
        </button>
      </div>
    </td>
    `;
  }
  function resetTbody() {
    var tableRef = document
      .getElementById("table_users")
      .getElementsByTagName("tbody")[0];
    tableRef.innerHTML = "";
  }
  
  function addRowJs(user) {
    // console.log(user);
    var tableRef = document
      .getElementById("table_users") //id trả về 1 element html
      .getElementsByTagName("tbody")[0]; //tagname trả về 1 mảng arr[]//trỏ đến ptu tbody
  
    var newRow = tableRef.insertRow(tableRef.rows.length); //insert row
    // newRow.innerHTML = htmlContent; --> //insert <td> vào <tr>
    newRow.innerHTML = formatRow(user);
  }
  