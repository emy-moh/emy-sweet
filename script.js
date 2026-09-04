// =========================
// اختيار الحجم
// =========================

document.querySelectorAll(".sizes button").forEach(function (button) {

    button.addEventListener("click", function () {

        const product = this.closest(".product");

        const buttons =
            product.querySelectorAll(".sizes button");

        buttons.forEach(function (btn) {

            btn.classList.remove("selected");

        });

        this.classList.add("selected");

        updateProductTotal(product);

    });

});


// =========================
// أزرار الكمية + و -
// =========================

document.querySelectorAll(".product").forEach(function (product) {

    const plusButton =
        product.querySelector(".plus");

    const minusButton =
        product.querySelector(".minus");

    const quantityNumber =
        product.querySelector(".quantity-number");


    // زر +

    if (plusButton) {

        plusButton.addEventListener("click", function () {

            let quantity =
                Number(quantityNumber.textContent);

            quantity++;

            quantityNumber.textContent =
                quantity;

            updateProductTotal(product);

        });

    }


    // زر -

    if (minusButton) {

        minusButton.addEventListener("click", function () {

            let quantity =
                Number(quantityNumber.textContent);

            if (quantity > 1) {

                quantity--;

                quantityNumber.textContent =
                    quantity;

                updateProductTotal(product);

            }

        });

    }

});


// =========================
// حساب إجمالي المنتج
// =========================

function updateProductTotal(product) {

    const selectedButton =
        product.querySelector(
            ".sizes button.selected"
        );

    const quantityNumber =
        product.querySelector(
            ".quantity-number"
        );

    const totalElement =
        product.querySelector(
            ".product-total span"
        );


    if (!selectedButton) {

        totalElement.textContent = "0";

        return;

    }


    const price =
        Number(selectedButton.dataset.price);

    const quantity =
        Number(quantityNumber.textContent);

    const total =
        price * quantity;

    totalElement.textContent =
        total;

}


// =========================
// سلة الطلبات
// =========================

let cart = [];


// =========================
// إضافة منتج للسلة
// =========================

function addToCart(button) {

    const product =
        button.closest(".product");

    const selectedButton =
        product.querySelector(
            ".sizes button.selected"
        );


    if (!selectedButton) {

        showCartMessage(
            "من فضلك اختاري الحجم الأول"
        );

        return;

    }


    const productName =
        product.dataset.product;

    const size =
        selectedButton.dataset.size;

    const price =
        Number(
            selectedButton.dataset.price
        );

    const quantity =
        Number(
            product.querySelector(
                ".quantity-number"
            ).textContent
        );


    // البحث عن نفس المنتج بنفس الحجم

    const existingItem =
        cart.find(function (item) {

            return (
                item.productName === productName &&
                item.size === size
            );

        });


    // لو المنتج موجود بالفعل

    if (existingItem) {

        existingItem.quantity += quantity;

        existingItem.total =
            existingItem.price *
            existingItem.quantity;

    } else {

        // لو المنتج غير موجود، نضيفه كمنتج جديد

        cart.push({

            productName: productName,

            size: size,

            price: price,

            quantity: quantity,

            total: price * quantity

        });

    }


    updateCart();

    updateCartCount();


    // لا تفتح السلة تلقائيًا
    // بدلًا من ذلك تظهر رسالة بها زر للذهاب للسلة

    showCartMessage(
        "تم إضافة المنتج للسلة",
        true
    );

}


// =========================
// تحديث السلة
// =========================

function updateCart() {

    const cartItems =
        document.getElementById(
            "cartItems"
        );

    const cartTotal =
        document.getElementById(
            "cartTotal"
        );


    if (!cartItems || !cartTotal) {

        return;

    }


    cartItems.innerHTML = "";


    // السلة فاضية

    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p>السلة فارغة</p>";

        cartTotal.textContent =
            "0";

        updateCartCount();

        return;

    }


    let totalOrder = 0;


    // عرض المنتجات

    cart.forEach(function (item, index) {

        totalOrder += item.total;


        const itemElement =
            document.createElement(
                "div"
            );


        itemElement.classList.add(
            "cart-item"
        );


        itemElement.innerHTML = `

            <div class="cart-item-info">

                <h3>
                    ${item.productName}
                </h3>

                <div class="cart-item-details">

                    <span>
                        الحجم: ${item.size}
                    </span>

                    <span>
                        الكمية: ${item.quantity}
                    </span>

                    <span>
                        سعر القطعة: ${item.price} جنيه
                    </span>

                </div>

                <div class="cart-item-bottom">

                    <strong>
                        ${item.total} جنيه
                    </strong>

                    <button
                        type="button"
                        onclick="removeFromCart(${index})"
                    >
                        حذف
                    </button>

                </div>

            </div>

        `;


        cartItems.appendChild(
            itemElement
        );

    });


    // إجمالي الطلب

    cartTotal.textContent =
        totalOrder;

    updateCartCount();

}


// =========================
// تحديث عدد المنتجات
// =========================

function updateCartCount() {

    const cartCount =
        document.getElementById(
            "cartCount"
        );


    if (!cartCount) {

        return;

    }


    let totalQuantity = 0;


    cart.forEach(function (item) {

        totalQuantity +=
            item.quantity;

    });


    cartCount.textContent =
        totalQuantity;

}


// =========================
// حذف منتج
// =========================

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

    updateCartCount();


    if (cart.length === 0) {

        showCartMessage(
            "السلة أصبحت فارغة"
        );

    } else {

        showCartMessage(
            "تم حذف المنتج من السلة"
        );

    }

}


// =========================
// فتح السلة
// =========================

function openCart() {

    const cartPopup =
        document.getElementById(
            "cartPopup"
        );

    const cartOverlay =
        document.getElementById(
            "cartOverlay"
        );


    if (!cartPopup || !cartOverlay) {

        return;

    }


    updateCart();


    cartPopup.classList.add(
        "show"
    );

    cartOverlay.classList.add(
        "show"
    );


    document.body.style.overflow =
        "hidden";

}


// =========================
// إغلاق السلة
// =========================

function closeCart() {

    const cartPopup =
        document.getElementById(
            "cartPopup"
        );

    const cartOverlay =
        document.getElementById(
            "cartOverlay"
        );


    if (!cartPopup || !cartOverlay) {

        return;

    }


    cartPopup.classList.remove(
        "show"
    );

    cartOverlay.classList.remove(
        "show"
    );


    document.body.style.overflow =
        "";

}


// =========================
// تأكيد الطلب على واتساب
// =========================

function checkoutWhatsApp() {

    // التأكد أن السلة ليست فارغة

    if (cart.length === 0) {

        showCartMessage(
            "السلة فاضية"
        );

        return;

    }


    // بيانات العميل

    const customerName =
        document.getElementById(
            "customerName"
        ).value.trim();

    const customerPhone =
        document.getElementById(
            "customerPhone"
        ).value.trim();

    const customerAddress =
        document.getElementById(
            "customerAddress"
        ).value.trim();

    const customerNotes =
        document.getElementById(
            "customerNotes"
        ).value.trim();


    // التحقق من البيانات

    if (!customerName) {

        showCartMessage(
            "من فضلك اكتبي اسمك"
        );

        document
            .getElementById(
                "customerName"
            )
            .focus();

        return;

    }


    if (!customerPhone) {

        showCartMessage(
            "من فضلك اكتبي رقم الموبايل"
        );

        document
            .getElementById(
                "customerPhone"
            )
            .focus();

        return;

    }


    if (!customerAddress) {

        showCartMessage(
            "من فضلك اكتبي عنوان التوصيل"
        );

        document
            .getElementById(
                "customerAddress"
            )
            .focus();

        return;

    }


    // رقم واتساب Emy Sweet

    const phoneNumber =
        "201001979538";


    // =========================
    // إنشاء رسالة الطلب
    // =========================

    let message =
        "*EMY SWEET*\n" +
        "━━━━━━━━━━━━━━━━\n\n";


    message +=
        "*تفاصيل الطلب*\n\n";


    let totalOrder = 0;


    // المنتجات

    cart.forEach(function (item, index) {

        message +=
            `*${index + 1}. ${item.productName}*\n` +
            `الحجم: ${item.size}\n` +
            `الكمية: ${item.quantity}\n` +
            `سعر القطعة: ${item.price} جنيه\n` +
            `إجمالي المنتج: ${item.total} جنيه\n\n`;

        totalOrder +=
            item.total;

    });


    // إجمالي الطلب

    message +=
        "━━━━━━━━━━━━━━━━\n" +
        `*إجمالي الطلب: ${totalOrder} جنيه*\n` +
        "━━━━━━━━━━━━━━━━\n\n";


    // بيانات العميل

    message +=
        "*بيانات العميل*\n\n" +
        `الاسم: ${customerName}\n` +
        `رقم الموبايل: ${customerPhone}\n` +
        `عنوان التوصيل: ${customerAddress}\n`;


    // الملاحظات

    if (customerNotes) {

        message +=
            `ملاحظات: ${customerNotes}\n`;

    }


    // نهاية الرسالة

    message +=
        "\n━━━━━━━━━━━━━━━━\n" +
        "شكرًا لاختيارك Emy Sweet";


    // =========================
    // فتح واتساب
    // =========================

    const whatsappURL =
        "https://wa.me/" +
        phoneNumber +
        "?text=" +
        encodeURIComponent(message);


    window.open(
        whatsappURL,
        "_blank"
    );

}


// =========================
// زر واتساب العام
// =========================

function openWhatsApp() {

    const phoneNumber =
        "201001979538";


    const message =
        "*EMY SWEET*\n\n" +
        "مرحبًا، أريد طلب منتجات من المنيو.";


    const whatsappURL =
        "https://wa.me/" +
        phoneNumber +
        "?text=" +
        encodeURIComponent(message);


    window.open(
        whatsappURL,
        "_blank"
    );

}


// =========================
// Toast Message
// =========================

function showCartMessage(message, showCartButton) {

    const oldMessage =
        document.querySelector(
            ".cart-message"
        );


    if (oldMessage) {

        oldMessage.remove();

    }


    const messageBox =
        document.createElement(
            "div"
        );


    messageBox.className =
        "cart-message";


    // نص الرسالة

    const messageText =
        document.createElement(
            "div"
        );


    messageText.textContent =
        message;


    messageBox.appendChild(
        messageText
    );


    // زر الذهاب للسلة

    if (showCartButton) {

        const cartButton =
            document.createElement(
                "button"
            );


        cartButton.type =
            "button";


        cartButton.textContent =
            "🛒 الذهاب إلى السلة وتأكيد الطلب";


        // تنسيق بسيط للزر بدون الحاجة لتعديل CSS

        cartButton.style.marginTop =
            "10px";

        cartButton.style.padding =
            "8px 14px";

        cartButton.style.border =
            "none";

        cartButton.style.borderRadius =
            "8px";

        cartButton.style.cursor =
            "pointer";

        cartButton.style.fontWeight =
            "bold";


        cartButton.addEventListener(
            "click",
            function () {

                openCart();

                messageBox.remove();

            }
        );


        messageBox.appendChild(
            cartButton
        );

    }


    document.body.appendChild(
        messageBox
    );


    setTimeout(function () {

        messageBox.classList.add(
            "show"
        );

    }, 10);


    // الرسالة العادية تختفي بعد ثانيتين
    // رسالة إضافة المنتج تفضل مدة أطول عشان العميل يقدر يضغط على الزر

    const messageDuration =
        showCartButton ? 5000 : 2000;


    setTimeout(function () {

        messageBox.classList.remove(
            "show"
        );


        setTimeout(function () {

            if (messageBox) {

                messageBox.remove();

            }

        }, 300);

    }, messageDuration);

}


// =========================
// تشغيل السلة أول مرة
// =========================

updateCart();

updateCartCount();



