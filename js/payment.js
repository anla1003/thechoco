const form = document.getElementById("payment-form");

let userInfo = {};

form.onsubmit = function (event) {
  event.preventDefault();

  const data = new FormData(form);

  for (let pairs of data.entries()) {
    userInfo[pairs[0]] = pairs[1];
  }

  localStorage.setItem("userInfo", JSON.stringify(userInfo));
  window.location.href = "./cart.html";
};

function xuLyThongTin() {
  var name = document.getElementById("fullname").value;
  var phone = document.getElementById("phone").value;
  var city = document.getElementById("city").value;
  var ward = document.getElementById("ward").value;
  var address = document.getElementById("address").value;

  if (name == "" || phone == "" || city == "" || ward == "" || address == "") {
    alert("Vui lòng nhập đủ thông tin!");
    return false;
  }
}

function xuLyThanhToan() {
  var luaChon = document.getElementById("chon-phuong-thuc").value;
  document.getElementById("box-momo").style.display = "none";
  document.getElementById("box-nganhang").style.display = "none";
  if (luaChon === "momo") {
    document.getElementById("box-momo").style.display = "block";
  } else if (luaChon === "nganhang") {
    document.getElementById("box-nganhang").style.display = "block";
  }
}
