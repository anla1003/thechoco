const quantityTitle = document.querySelector(".quantity");
const quantitySpan = document.querySelector(".cart-quantity");
const cartItemsDiv = document.getElementById("cart-items");
const proceedPaymentBtn = document.getElementById("proceed-payment");

function getCart() {
  return JSON.parse(localStorage.getItem("cartItems") || "[]");
}

function setCart(cart) {
  localStorage.setItem("cartItems", JSON.stringify(cart));

  const totalQty = cart.reduce((sum, item) => sum + (item.qty || 0), 0);
  quantitySpan.innerHTML = totalQty;
  quantitySpan.style.display = totalQty ? "block" : "none";

  if (quantityTitle) {
    quantityTitle.textContent = totalQty
      ? `Số lượng trong giỏ hàng hiện tại là ${totalQty}`
      : "Bạn không có sản phẩm nào trong giỏ hàng";
  }

  renderCart(cart);
}

function renderCart(cart) {
  if (!cartItemsDiv) return;

  if (!cart.length) {
    cartItemsDiv.innerHTML = "<p>Giỏ hàng trống.</p>";
    return;
  }

  cartItemsDiv.innerHTML = cart
    .map(
      (item) => `
      <div class="d-flex align-items-center justify-content-between border p-2 mb-2">
        <div class="d-flex align-items-center gap-3">
          <img src="${item.img}" style="width:80px;height:auto;" alt="${
            item.name
          }">
          <div>
            <div><b>${item.name}</b></div>
            <div>Đơn giá: ${Number(item.price).toLocaleString("vi-VN")}đ</div>
            <div>Thành tiền: ${(
              Number(item.price) * Number(item.qty)
            ).toLocaleString("vi-VN")}đ</div>
          </div>
        </div>

        <div class="d-flex align-items-center gap-2">
          <button class="btn btn-dark btn-sm" onclick="decreaseQty('${
            item.id
          }')">-</button>
          <span>${item.qty}</span>
          <button class="btn btn-dark btn-sm" onclick="increaseQty('${
            item.id
          }')">+</button>
        </div>
      </div>
    `,
    )
    .join("");
}

window.increaseQty = function (id) {
  const cart = getCart();
  const found = cart.find((x) => x.id === id);
  if (found) found.qty += 1;
  setCart(cart);
};

window.decreaseQty = function (id) {
  const cart = getCart();
  const found = cart.find((x) => x.id === id);
  if (!found) return;

  found.qty -= 1;
  const newCart = cart.filter((x) => x.qty > 0);
  setCart(newCart);
};

setCart(getCart());

if (proceedPaymentBtn) {
  proceedPaymentBtn.onclick = function () {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) window.location.href = "./xacnhan.html";
    else window.location.href = "./thanhtoan.html";
  };
}
