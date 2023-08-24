// cart

let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

// Open e Close
cartIcon.onclick = () => {
    cart.classList.add("active")
};

closeCart.onclick = () => {
    cart.classList.remove("active")
};


// Cart Working js
if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();
}

// Making  fuction
function ready(){
    //Remove Items from cart
    var removeCartButtons = document.getElementsByClassName('cart-remove');
    console.log(removeCartButtons)
    for (var i = 0; i < removeCartButtons.length; i++){
        var buttom = removeCartButtons[i]
        buttom.addEventListener('click', removeCartItem)
    }
    //quantity changes
    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for (var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i]
        input.addEventListener("change", quantityChanged)
    }
    // add to cart
    var addCart = document.getElementsByClassName('add-cart')
    for (var i = 0; i < addCart.length; i ++){
        var buttom = addCart[i]
        buttom.addEventListener('click', addCartClicked);
    }
    // buy button work
    document
    .getElementsByClassName('bnt-buy')[0]
    .addEventListener('click', buyButtomClicked);
}
// buy buttom
function buyButtomClicked(){
    alert('Seu Pedido Foi Feito')
    var cartContent = document.getElementsByClassName('cart-content')[0]
    while (cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updatetotal();
}



// Remove items form cart
function removeCartItem(event) {
    var buttomClicked = event.target;
    buttomClicked.parentElement.remove();
    updatetotal();
}

//quantity changes
function quantityChanged(event){
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updatetotal();
}

// add to Cart
function addCartClicked(event){
    var buttom = event.target;
    var shopProducts = buttom.parentElement;
    var title = shopProducts.getElementsByClassName("produtos-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var productsImg = shopProducts.getElementsByClassName("produtos-img")[0].src;
    addProductToCart(title, price, productsImg);
    updatetotal();
}

function addProductToCart(title, price, productsImg) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    for (var i = 0; i < cartItemsNames.length; i++){
        if (cartItemsNames[i].innerText == title) {
            alert("Você Já Adicionou Este Item Ao Carrinho");
            return;
        }
    }

    var cartBoxContent = `
                            <img src="${productsImg}" alt="" class="produtos-img">
                            <div class="detail-box">
                                <div class="cart-produtos-title">${title}</div>
                                <div class="cart-price">${price}</div>
                                <input type="number" value="1" class="cart-quantity">
                            </div>
                            <!-- Remove Cart -->
                            <i class='bx bxs-trash cart-remove'></i>`;
    cartShopBox.innerHTML = cartBoxContent
    cartItems.append(cartShopBox)
    cartShopBox
        .getElementsByClassName('cart-remove')[0]
        .addEventListener("click", removeCartItem);
    cartShopBox
        .getElementsByClassName('cart-quantity')[0]
        .addEventListener("change", quantityChanged);
}

// Update Total
function updatetotal() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("R$", ""));
        var quantity = quantityElement.value;
        total = total + price * quantity;
    }
        // if price contain some cents value
        total = Math.round(total *100) / 100;



        document.getElementsByClassName("total-price")[0].innerText = "R$"  + total;
    
}