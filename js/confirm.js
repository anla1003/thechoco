const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");
const cart = JSON.parse(localStorage.getItem("cartItems") || "[]");

const infoContainer = document.getElementById("info-container");
const productsDiv = document.getElementById("products");
const totalPriceEl = document.getElementById("total-price");
const backBtn = document.getElementById("backBtn");

if (userInfo && infoContainer) {
  infoContainer.innerHTML = "";
  for (let key in userInfo) {
    infoContainer.innerHTML += `<p><b>${key}:</b> ${userInfo[key]}</p>`;
  }
}

if (productsDiv) {
  if (!cart.length) {
    productsDiv.innerHTML = "<p>Giỏ hàng đang trống.</p>";
  } else {
    productsDiv.innerHTML = cart
      .map(
        (item) => `
      <div class="product-card border p-2" style="width: 220px;">
        <img src="${item.img}" class="card-img-top img-fluid" alt="${
          item.name
        }">
        <h5 class="mt-2">${item.name}</h5>
        <div>Đơn giá: ${Number(item.price).toLocaleString("vi-VN")}đ</div>
        <div>Số lượng: ${item.qty}</div>
        <div>Thành tiền: ${(
          Number(item.price) * Number(item.qty)
        ).toLocaleString("vi-VN")}đ</div>
      </div>
    `
      )
      .join("");
  }
}

if (totalPriceEl) {
  const total = cart.reduce(
    (sum, it) => sum + Number(it.price) * Number(it.qty),
    0
  );
  totalPriceEl.innerHTML = total.toLocaleString("vi-VN") + "đ";
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

if (backBtn) {
  backBtn.onclick = function () {
    localStorage.removeItem("cartItems");
    window.location.href = "./trangchu.html";
  };
}
