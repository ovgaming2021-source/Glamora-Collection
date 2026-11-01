// ========================================================
// Glamora Collection - Cart & Wishlist Management Engine
// ========================================================

const CART_STORAGE_KEY = 'glamora_cart_items';
const WISHLIST_STORAGE_KEY = 'glamora_wishlist_items';
const COUPON_STORAGE_KEY = 'glamora_active_coupon';

// Available coupon codes
const PROMO_CODES = {
  'GLAM15': { discountPercent: 15, description: '15% Off Your Entire Order' },
  'WELCOME10': { discountPercent: 10, description: '10% New Customer Discount' },
  'SUMMER20': { discountPercent: 20, description: '20% Special Summer Sale Discount' }
};

// --------------------------------------------------------
// LocalStorage Handlers
// --------------------------------------------------------
function getCart() {
  try {
    const data = localStorage.getItem(CART_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Cart retrieval error:", e);
    return [];
  }
}

function saveCart(cart) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    updateCartBadges();
    renderCartDrawerItems();
  } catch (e) {
    console.error("Cart save error:", e);
  }
}

function getWishlist() {
  try {
    const data = localStorage.getItem(WISHLIST_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

function saveWishlist(list) {
  try {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(list));
    updateWishlistBadges();
  } catch (e) {
    console.error("Wishlist save error:", e);
  }
}

// --------------------------------------------------------
// Cart Actions
// --------------------------------------------------------
function addToCart(productId, quantity = 1, size = null, color = null) {
  const product = getProductById(productId);
  if (!product) return;

  const chosenSize = size || (product.sizes && product.sizes[0]) || "Free Size";
  const chosenColor = color || (product.colors && product.colors[0] ? product.colors[0].name : "Original");

  let cart = getCart();
  const existingIndex = cart.findIndex(
    item => item.id === product.id && item.size === chosenSize && item.color === chosenColor
  );

  if (existingIndex > -1) {
    cart[existingIndex].quantity += parseInt(quantity, 10);
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      size: chosenSize,
      color: chosenColor,
      quantity: parseInt(quantity, 10)
    });
  }

  saveCart(cart);
  showToast(`Added "${product.name.substring(0, 24)}..." to your bag!`, 'success');
  openCartDrawer();
}

function removeFromCart(index) {
  let cart = getCart();
  if (index >= 0 && index < cart.length) {
    const removed = cart.splice(index, 1)[0];
    saveCart(cart);
    showToast(`Removed "${removed.name.substring(0, 22)}..." from bag`, 'info');
    
    // If on cart.html, re-render cart page table
    if (typeof renderCartPage === 'function') {
      renderCartPage();
    }
  }
}

function updateCartQuantity(index, newQty) {
  let cart = getCart();
  const qty = parseInt(newQty, 10);
  if (index >= 0 && index < cart.length) {
    if (qty <= 0) {
      removeFromCart(index);
    } else {
      cart[index].quantity = Math.min(qty, 20);
      saveCart(cart);
      if (typeof renderCartPage === 'function') {
        renderCartPage();
      }
    }
  }
}

function clearCart() {
  saveCart([]);
  if (typeof renderCartPage === 'function') {
    renderCartPage();
  }
  showToast("Your shopping bag is now empty.", 'info');
}

function getCartSubtotal() {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function getCartCount() {
  const cart = getCart();
  return cart.reduce((count, item) => count + item.quantity, 0);
}

// --------------------------------------------------------
// Wishlist Actions
// --------------------------------------------------------
function toggleWishlist(productId) {
  let wishlist = getWishlist();
  const id = parseInt(productId, 10);
  const index = wishlist.indexOf(id);
  const product = getProductById(id);

  if (index > -1) {
    wishlist.splice(index, 1);
    saveWishlist(wishlist);
    showToast(`Removed "${product ? product.name.substring(0, 20) : 'Item'}..." from wishlist`, 'info');
  } else {
    wishlist.push(id);
    saveWishlist(wishlist);
    showToast(`Saved to your Wishlist ❤️`, 'heart');
  }

  updateWishlistUI();
}

function isWishlisted(productId) {
  const wishlist = getWishlist();
  return wishlist.includes(parseInt(productId, 10));
}

function updateWishlistBadges() {
  const count = getWishlist().length;
  document.querySelectorAll('.wishlist-counter-badge').forEach(badge => {
    badge.textContent = count;
    if (count > 0) {
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }
  });
}

function updateWishlistUI() {
  updateWishlistBadges();
  document.querySelectorAll('[data-wishlist-btn]').forEach(btn => {
    const id = parseInt(btn.getAttribute('data-product-id'), 10);
    const icon = btn.querySelector('i');
    if (isWishlisted(id)) {
      btn.classList.add('text-rose-600', 'fill-current');
      if (icon) {
        icon.classList.remove('fa-regular');
        icon.classList.add('fa-solid');
      }
    } else {
      btn.classList.remove('text-rose-600', 'fill-current');
      if (icon) {
        icon.classList.remove('fa-solid');
        icon.classList.add('fa-regular');
      }
    }
  });
}

// --------------------------------------------------------
// Badge Updates
// --------------------------------------------------------
function updateCartBadges() {
  const count = getCartCount();
  document.querySelectorAll('.cart-counter-badge').forEach(badge => {
    badge.textContent = count;
    if (count > 0) {
      badge.classList.remove('hidden');
      badge.classList.add('flex');
    } else {
      badge.classList.add('hidden');
      badge.classList.remove('flex');
    }
  });
}

// --------------------------------------------------------
// Slide-Out Cart Drawer Controls
// --------------------------------------------------------
function openCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-drawer-overlay');
  if (drawer && overlay) {
    overlay.classList.remove('hidden');
    setTimeout(() => {
      overlay.classList.remove('opacity-0');
      overlay.classList.add('opacity-100');
      drawer.classList.remove('translate-x-full');
    }, 10);
    renderCartDrawerItems();
  }
}

function closeCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-drawer-overlay');
  if (drawer && overlay) {
    drawer.classList.add('translate-x-full');
    overlay.classList.remove('opacity-100');
    overlay.classList.add('opacity-0');
    setTimeout(() => {
      overlay.classList.add('hidden');
    }, 300);
  }
}

function renderCartDrawerItems() {
  const container = document.getElementById('cart-drawer-items');
  const subtotalEl = document.getElementById('cart-drawer-subtotal');
  const footerEl = document.getElementById('cart-drawer-footer');
  const emptyStateEl = document.getElementById('cart-drawer-empty');

  if (!container) return;

  const cart = getCart();

  if (cart.length === 0) {
    container.innerHTML = '';
    if (emptyStateEl) emptyStateEl.classList.remove('hidden');
    if (footerEl) footerEl.classList.add('hidden');
    return;
  }

  if (emptyStateEl) emptyStateEl.classList.add('hidden');
  if (footerEl) footerEl.classList.remove('hidden');

  let html = '';
  cart.forEach((item, index) => {
    html += `
      <div class="flex items-center gap-3 py-3 border-b border-stone-100 group">
        <img src="${item.image}" alt="${item.name}" class="w-16 h-20 object-cover rounded-lg border border-stone-200 bg-stone-50 flex-shrink-0" />
        <div class="flex-1 min-w-0">
          <h4 class="text-sm font-medium text-stone-900 truncate">${item.name}</h4>
          <p class="text-xs text-stone-500 mt-0.5">Size: <span class="font-medium text-stone-700">${item.size}</span></p>
          <div class="flex items-center justify-between mt-2">
            <div class="flex items-center border border-stone-200 rounded-md bg-stone-50 text-xs">
              <button onclick="updateCartQuantity(${index}, ${item.quantity - 1})" class="px-2 py-0.5 text-stone-600 hover:bg-stone-200 rounded-l transition-colors" title="Decrease">−</button>
              <span class="px-2 font-semibold text-stone-800">${item.quantity}</span>
              <button onclick="updateCartQuantity(${index}, ${item.quantity + 1})" class="px-2 py-0.5 text-stone-600 hover:bg-stone-200 rounded-r transition-colors" title="Increase">+</button>
            </div>
            <span class="text-sm font-semibold text-stone-900">${formatCurrency(item.price * item.quantity)}</span>
          </div>
        </div>
        <button onclick="removeFromCart(${index})" class="text-stone-400 hover:text-rose-600 p-1.5 transition-colors self-start" title="Remove item">
          <i class="fa-solid fa-trash-can text-sm"></i>
        </button>
      </div>
    `;
  });

  container.innerHTML = html;
  if (subtotalEl) {
    subtotalEl.textContent = formatCurrency(getCartSubtotal());
  }
}

// --------------------------------------------------------
// Toast Notification System
// --------------------------------------------------------
function showToast(message, type = 'success') {
  let container = document.getElementById('glamora-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'glamora-toast-container';
    container.className = 'fixed bottom-5 right-5 z-[9999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'pointer-events-auto transform translate-y-4 opacity-0 transition-all duration-300 ease-out bg-stone-900 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-stone-800 text-sm font-medium';

  let iconHtml = '<i class="fa-solid fa-circle-check text-emerald-400 text-base"></i>';
  if (type === 'heart') {
    iconHtml = '<i class="fa-solid fa-heart text-rose-500 text-base"></i>';
  } else if (type === 'info') {
    iconHtml = '<i class="fa-solid fa-circle-info text-sky-400 text-base"></i>';
  } else if (type === 'warn') {
    iconHtml = '<i class="fa-solid fa-triangle-exclamation text-amber-400 text-base"></i>';
  }

  toast.innerHTML = `
    ${iconHtml}
    <div class="flex-1">${message}</div>
    <button class="text-stone-400 hover:text-white transition-colors" onclick="this.parentElement.remove()">
      <i class="fa-solid fa-xmark text-xs"></i>
    </button>
  `;

  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-4', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');
  });

  setTimeout(() => {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('translate-y-4', 'opacity-0');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3500);
}

// --------------------------------------------------------
// Quick View Modal
// --------------------------------------------------------
function openQuickView(productId) {
  const product = getProductById(productId);
  if (!product) return;

  const modal = document.getElementById('quickview-modal');
  const content = document.getElementById('quickview-content');
  if (!modal || !content) return;

  content.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      <div class="relative bg-stone-50 rounded-2xl overflow-hidden aspect-[3/4] flex items-center justify-center">
        <img id="qv-main-img" src="${product.image}" alt="${product.name}" class="w-full h-full object-cover" />
        <span class="absolute top-3 left-3 ${product.badgeColor} text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
          ${product.badge}
        </span>
      </div>
      <div class="flex flex-col justify-between">
        <div>
          <span class="text-xs uppercase font-semibold tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full inline-block mb-2">${product.category}</span>
          <h3 class="font-serif text-2xl font-bold text-stone-900">${product.name}</h3>
          
          <div class="flex items-center gap-2 mt-2">
            <div class="flex text-amber-400 text-sm">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star-half-stroke"></i>
            </div>
            <span class="text-xs font-medium text-stone-500">(${product.reviewsCount} customer reviews)</span>
          </div>

          <div class="flex items-baseline gap-3 mt-4">
            <span class="text-3xl font-bold text-stone-900">${formatCurrency(product.price)}</span>
            <span class="text-lg text-stone-400 line-through">${formatCurrency(product.originalPrice)}</span>
            <span class="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">Save ${product.discountPercent}%</span>
          </div>

          <p class="text-sm text-stone-600 mt-3 line-clamp-3 leading-relaxed">${product.description}</p>

          <div class="mt-4 pt-4 border-t border-stone-100">
            <label class="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">Select Size</label>
            <div class="flex flex-wrap gap-2" id="qv-size-options">
              ${product.sizes.map((sz, i) => `
                <button type="button" onclick="selectQuickViewSize(this)" class="qv-size-btn text-xs font-medium px-3 py-1.5 rounded-lg border transition-all ${i === 0 ? 'border-rose-900 bg-rose-950 text-white' : 'border-stone-200 bg-white text-stone-700 hover:border-stone-400'}">
                  ${sz}
                </button>
              `).join('')}
            </div>
          </div>

          <div class="mt-4 flex items-center gap-4">
            <div class="flex items-center border border-stone-200 rounded-xl overflow-hidden bg-white">
              <button type="button" onclick="adjustQuickViewQty(-1)" class="px-3 py-2 text-stone-600 hover:bg-stone-100 transition-colors font-bold">−</button>
              <input type="number" id="qv-quantity" value="1" min="1" max="10" class="w-12 text-center text-sm font-semibold border-none focus:outline-none" readonly />
              <button type="button" onclick="adjustQuickViewQty(1)" class="px-3 py-2 text-stone-600 hover:bg-stone-100 transition-colors font-bold">+</button>
            </div>
            <div class="text-xs text-emerald-600 font-medium flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Ready to dispatch in 24h
            </div>
          </div>
        </div>

        <div class="pt-6 border-t border-stone-100 mt-6 flex flex-col sm:flex-row gap-3">
          <button type="button" onclick="submitQuickViewAdd(${product.id})" class="flex-1 bg-stone-900 hover:bg-rose-950 text-white font-medium py-3 px-6 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2">
            <i class="fa-solid fa-bag-shopping"></i> Add To Bag
          </button>
          <a href="product-detail.html?id=${product.id}" class="inline-flex items-center justify-center px-4 py-3 border border-stone-300 hover:border-stone-900 text-stone-800 text-sm font-medium rounded-xl transition-all">
            Full Details <i class="fa-solid fa-arrow-right ml-2 text-xs"></i>
          </a>
        </div>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');
}

function closeQuickView() {
  const modal = document.getElementById('quickview-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }
}

function selectQuickViewSize(btn) {
  document.querySelectorAll('.qv-size-btn').forEach(b => {
    b.className = 'qv-size-btn text-xs font-medium px-3 py-1.5 rounded-lg border transition-all border-stone-200 bg-white text-stone-700 hover:border-stone-400';
  });
  btn.className = 'qv-size-btn text-xs font-medium px-3 py-1.5 rounded-lg border transition-all border-rose-900 bg-rose-950 text-white shadow-sm';
}

function adjustQuickViewQty(delta) {
  const input = document.getElementById('qv-quantity');
  if (input) {
    let val = parseInt(input.value, 10) + delta;
    if (val < 1) val = 1;
    if (val > 10) val = 10;
    input.value = val;
  }
}

function submitQuickViewAdd(productId) {
  const selectedBtn = document.querySelector('.qv-size-btn.bg-rose-950');
  const size = selectedBtn ? selectedBtn.textContent.trim() : "Free Size";
  const qtyInput = document.getElementById('qv-quantity');
  const qty = qtyInput ? parseInt(qtyInput.value, 10) : 1;

  addToCart(productId, qty, size);
  closeQuickView();
}

// --------------------------------------------------------
// Initialize Shared Listeners
// --------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadges();
  updateWishlistBadges();
  updateWishlistUI();

  // Close cart drawer on backdrop click
  const overlay = document.getElementById('cart-drawer-overlay');
  if (overlay) {
    overlay.addEventListener('click', closeCartDrawer);
  }

  // Quick view backdrop click
  const qvModal = document.getElementById('quickview-modal');
  if (qvModal) {
    qvModal.addEventListener('click', (e) => {
      if (e.target === qvModal) {
        closeQuickView();
      }
    });
  }

  // Escape key closes modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCartDrawer();
      closeQuickView();
    }
  });
});
