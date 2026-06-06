const addCartBtn = document.querySelectorAll(".add-cart");
const quantitySpan = document.querySelector(".cart-quantity");
let localQuantity = localStorage.getItem("quantity") * 1;

console.log(addCartBtn);
if (localQuantity) {
  toggleCart();
  quantitySpan.innerHTML = localQuantity;
}

function getCart() {
  return JSON.parse(localStorage.getItem("cartItems") || "[]");
}

function setCart(cart) {
  localStorage.setItem("cartItems", JSON.stringify(cart));

  const totalQty = cart.reduce((sum, item) => sum + (item.qty || 0), 0);
  quantitySpan.innerHTML = totalQty;
  quantitySpan.style.display = totalQty ? "block" : "none";
}

setCart(getCart());

addCartBtn.forEach((btn) => {
  btn.addEventListener("click", function () {
    const isLoggedIn = !!localStorage.getItem("currentUser");
    if (!isLoggedIn) {
      alert("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng");
      window.location.href = "/login.html";
      return;
    }
    const product = {
      id: btn.dataset.id,
      name: btn.dataset.name,
      price: Number(btn.dataset.price),
      img: btn.dataset.img,
      qty: 1,
    };
    if (!product.id || !product.name || !product.price || !product.img) {
      alert("Thiếu data sản phẩm");
      return;
    }
    const cart = getCart();
    const found = cart.find((x) => x.id === product.id);
    if (found) {
      found.qty += 1;
    } else {
      cart.push(product);
    }
    setCart(cart);
  });
});

const buyNowBtns = document.querySelectorAll('.btn[href="thanhtoan.html"]');

buyNowBtns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();

    const isLoggedIn = !!localStorage.getItem("currentUser");
    if (!isLoggedIn) {
      alert("Bạn cần đăng nhập để mua sản phẩm");
      window.location.href = "/login.html";
      return;
    }

    const productCard = this.closest(".product-card");
    const product = {
      id: productCard.getAttribute("id"),
      name: productCard.querySelector("h3").innerText,
      price: Number(
        productCard.querySelector("p").innerText.replace(/[^0-9]/g, ""),
      ),
      img: productCard.querySelector("img").src,
      qty: 1,
    };

    localStorage.setItem("cartItems", JSON.stringify([product]));

    window.location.href = "thanhtoan.html";
  });
});
function getBotResponse(userInput, trainingData) {
  const found = trainingData.find((item) =>
    userInput.toLowerCase().includes(item.input.toLowerCase()),
  );
  if (found) {
    return found.output;
  } else {
    return "Xin lỗi, mình chưa hiểu. Bạn có thể hỏi về sản phẩm, giá, cách mua hàng hoặc liên hệ.";
  }
}
