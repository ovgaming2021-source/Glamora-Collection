// ========================================================
// Glamora Collection - Global UI & Navigation Controller
// ========================================================

// Reusable Product Card Component Generator
function renderProductCard(product, options = {}) {
  const isWish = isWishlisted(product.id);
  const showBadge = options.showBadge !== false;

  return `
    <div class="product-card bg-white rounded-2xl border border-stone-100 overflow-hidden shadow-sm flex flex-col group relative" data-product-id="${product.id}">
      <!-- Image & Badges -->
      <div class="product-image-container relative aspect-[3/4] bg-stone-50 overflow-hidden cursor-pointer" onclick="window.location.href='product-detail.html?id=${product.id}'">
        <img 
          src="${product.image}" 
          alt="${product.name}" 
          loading="lazy" 
          class="w-full h-full object-cover object-top"
        />
        
        <!-- Top Badges -->
        <div class="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          ${showBadge && product.badge ? `
            <span class="${product.badgeColor} text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-sm">
              ${product.badge}
            </span>
          ` : ''}
          ${product.discountPercent ? `
            <span class="bg-rose-950/80 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
              ${product.discountPercent}% OFF
            </span>
          ` : ''}
        </div>

        <!-- Wishlist Toggle Button -->
        <button 
          type="button" 
          data-wishlist-btn 
          data-product-id="${product.id}"
          onclick="event.stopPropagation(); toggleWishlist(${product.id})"
          class="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-stone-700 hover:text-rose-600 shadow-md transition-all hover:scale-110 z-10 ${isWish ? 'text-rose-600' : ''}"
          title="Save to Wishlist"
        >
          <i class="${isWish ? 'fa-solid' : 'fa-regular'} fa-heart text-sm"></i>
        </button>

        <!-- Quick View Overlay Button (Hover on Desktop) -->
        <div class="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 hidden sm:flex gap-2 z-10">
          <button 
            type="button" 
            onclick="event.stopPropagation(); openQuickView(${product.id})"
            class="flex-1 bg-white/95 hover:bg-white text-stone-900 text-xs font-semibold py-2.5 px-3 rounded-xl shadow-lg backdrop-blur-sm transition-colors flex items-center justify-center gap-1.5"
          >
            <i class="fa-regular fa-eye"></i> Quick View
          </button>
        </div>
      </div>

      <!-- Content Area -->
      <div class="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          <!-- Category & Ratings -->
          <div class="flex items-center justify-between text-xs mb-1.5">
            <span class="text-stone-500 uppercase tracking-wider font-medium text-[11px]">${product.category}</span>
            <div class="flex items-center text-amber-500 gap-1 font-semibold text-xs">
              <i class="fa-solid fa-star text-[11px]"></i>
              <span>${product.rating}</span>
              <span class="text-stone-400 font-normal">(${product.reviewsCount})</span>
            </div>
          </div>

          <!-- Title -->
          <h3 class="font-serif text-base sm:text-lg font-semibold text-stone-900 leading-snug hover:text-rose-900 transition-colors line-clamp-1">
            <a href="product-detail.html?id=${product.id}">${product.name}</a>
          </h3>

          <!-- Fabric Tag -->
          <p class="text-xs text-stone-500 mt-1 line-clamp-1"><i class="fa-solid fa-leaf text-emerald-600 text-[10px] mr-1"></i>${product.fabric}</p>

          <!-- Price Row -->
          <div class="flex items-baseline gap-2 mt-2.5">
            <span class="text-lg sm:text-xl font-bold text-stone-950">${formatCurrency(product.price)}</span>
            <span class="text-xs sm:text-sm text-stone-400 line-through">${formatCurrency(product.originalPrice)}</span>
          </div>
        </div>

        <!-- Action Row -->
        <div class="mt-4 pt-3 border-t border-stone-100 flex items-center gap-2">
          <button 
            type="button" 
            onclick="addToCart(${product.id}, 1)"
            class="flex-1 bg-stone-900 hover:bg-rose-950 text-white text-xs sm:text-sm font-semibold py-2.5 px-3 rounded-xl transition-all shadow-sm hover:shadow flex items-center justify-center gap-2"
          >
            <i class="fa-solid fa-bag-shopping text-xs"></i> Add to Bag
          </button>
          
          <button 
            type="button" 
            onclick="openQuickView(${product.id})"
            class="sm:hidden w-10 h-10 border border-stone-200 rounded-xl flex items-center justify-center text-stone-700 hover:bg-stone-50"
            title="Quick View"
          >
            <i class="fa-regular fa-eye text-xs"></i>
          </button>
        </div>
      </div>
    </div>
  `;
}

// Global Navigation Menu Handler
function initNavigation() {
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileClose = document.getElementById('mobile-menu-close');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
    });
  }

  if (mobileClose && mobileMenu) {
    mobileClose.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    });
  }

  // Search input handler
  const searchForms = document.querySelectorAll('.search-form');
  searchForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="search"], input[name="q"]');
      if (input && input.value.trim()) {
        window.location.href = `clothes.html?q=${encodeURIComponent(input.value.trim())}`;
      }
    });
  });

  // Newsletter Subscription Modal / Toast
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = form.querySelector('input[type="email"]');
      if (email && email.value) {
        showToast(`🎉 Welcome to the Glamora Circle! Use code <b>GLAM15</b> for 15% off.`, 'success');
        email.value = '';
      }
    });
  });
}

// Auto-run on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
});
