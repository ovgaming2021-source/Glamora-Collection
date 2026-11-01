// ========================================================
// Glamora Collection - Central Product Database
// ========================================================

const GLAMORA_PRODUCTS = [
  {
    id: 1,
    name: "Royal Maroon Elephant Heritage Lounge Maxi Dress",
    slug: "royal-maroon-elephant-heritage-dress",
    tagline: "Timeless traditional elegance meets all-day breathable pure cotton comfort.",
    category: "Maxi & Lounge",
    categorySlug: "maxi-lounge",
    price: 799,
    originalPrice: 1299,
    discountPercent: 38,
    currencySymbol: "₹",
    rating: 4.9,
    reviewsCount: 142,
    badge: "Bestseller",
    badgeColor: "bg-rose-600",
    image: "images/dress-maroon-elephant.jpg",
    secondaryImage: "images/dress-maroon-elephant.jpg",
    colors: [
      { name: "Royal Maroon", hex: "#631d2e", active: true }
    ],
    sizes: ["Free Size (Up to 44\")", "M (Bust 38\")", "L (Bust 40\")", "XL (Bust 42\")", "XXL (Bust 44\")"],
    fabric: "100% Breathable Combed Cotton",
    length: "Full Maxi Length (54 inches)",
    sleeves: "Comfort Short Sleeves",
    neckline: "Flattering V-Neckline with Contrast Piped Finish",
    pockets: "1 Convenient Right Side Seam Pocket",
    description: "Immerse yourself in everyday luxury with our signature Royal Maroon Elephant Heritage Lounge Dress. Cut from 100% pure combed cotton that softens with every wash, this piece boasts authentic Indian heritage elephant borders interspersed with intricate geometric jaal motifs. Perfect for relaxed daytime lounging, serene evenings at home, or sunny vacation strolls.",
    features: [
      "Crafted from 100% pure, natural pre-shrunk cotton for maximum breathability",
      "Traditional regal elephant procession print using skin-safe, fade-resistant color dyes",
      "Relaxed A-line cut with generous ease for ultimate movement and comfort",
      "Deep right-side concealed pocket to carry essentials like smartphone and keys",
      "Reinforced V-neck collar and armhole stitching for long-lasting durability"
    ],
    careInstructions: [
      "Gentle machine wash or hand wash in cold water (30°C)",
      "Wash with similar dark colors",
      "Dry in shade to preserve vibrant textile dyes",
      "Warm iron on reverse side if desired",
      "Do not bleach or dry clean"
    ],
    inStock: true,
    isFeatured: true,
    isSale: true,
    isNewArrival: false,
    shippingInfo: "Dispatches within 24 hours. Delivery in 3-5 business days."
  },
  {
    id: 2,
    name: "Indigo Royal Elephant Print Midi Maxi Dress",
    slug: "indigo-royal-elephant-print-dress",
    tagline: "Calm indigo hues adorned with majestic royal heritage motifs.",
    category: "Maxi & Lounge",
    categorySlug: "maxi-lounge",
    price: 849,
    originalPrice: 1399,
    discountPercent: 39,
    currencySymbol: "₹",
    rating: 4.8,
    reviewsCount: 98,
    badge: "Trending",
    badgeColor: "bg-indigo-600",
    image: "images/dress-navy-elephant.jpg",
    secondaryImage: "images/dress-navy-elephant.jpg",
    colors: [
      { name: "Royal Indigo Navy", hex: "#1e293b", active: true }
    ],
    sizes: ["Free Size (Up to 44\")", "M (Bust 38\")", "L (Bust 40\")", "XL (Bust 42\")", "XXL (Bust 44\")"],
    fabric: "100% Pure Premium Cotton",
    length: "Midi Maxi Length (52 inches)",
    sleeves: "Easy-Breeze Short Sleeves",
    neckline: "Notched V-Neckline",
    pockets: "Concealed Side Pocket",
    description: "Designed for the woman who values both understated poise and supreme comfort, our Indigo Royal Elephant Midi Maxi combines a deep midnight navy base with vivid mustard, ochre, and terracotta royal elephant motifs. An effortlessly chic silhouette that keeps you cool, graceful, and confident all day long.",
    features: [
      "Ultra-soft handloom-feel cotton fabric that keeps body temperatures cool",
      "Captivating repeat tiers of imperial elephants and artistic lotus border details",
      "Non-transparent, dense cotton weave suitable for indoor and outdoor wear",
      "Side seam pocket for practical convenience",
      "Designed for a forgiving drape that looks gorgeous across all body types"
    ],
    careInstructions: [
      "Machine wash cold separately on delicate cycle",
      "Use mild detergent; avoid harsh bleaching agents",
      "Line dry inside out under indirect sunlight",
      "Medium steam iron for a crisp finish"
    ],
    inStock: true,
    isFeatured: true,
    isSale: true,
    isNewArrival: true,
    shippingInfo: "Dispatches within 24 hours. Delivery in 3-5 business days."
  },
  {
    id: 3,
    name: "Peacock & Royal Palace Arch Heritage Navy Dress",
    slug: "peacock-royal-palace-arch-heritage-dress",
    tagline: "An enchanting canvas of dancing peacocks, grand arches, and regal elephants.",
    category: "Ethnic Maxi",
    categorySlug: "ethnic-maxi",
    price: 899,
    originalPrice: 1499,
    discountPercent: 40,
    currencySymbol: "₹",
    rating: 5.0,
    reviewsCount: 167,
    badge: "Most Loved",
    badgeColor: "bg-amber-600",
    image: "images/dress-heritage-peacock.jpg",
    secondaryImage: "images/dress-heritage-peacock.jpg",
    colors: [
      { name: "Midnight Navy & Crimson Gold", hex: "#0f172a", active: true }
    ],
    sizes: ["Free Size (Up to 44\")", "M (Bust 38\")", "L (Bust 40\")", "XL (Bust 42\")", "XXL (Bust 44\")"],
    fabric: "100% Super-Combed Cotton",
    length: "Full Maxi Length (54 inches)",
    sleeves: "Short Kimono-Cut Sleeves",
    neckline: "Elegant V-Neck with Contrast Binding",
    pockets: "Deep Side Pocket",
    description: "Step into an artful tale of palace courtyards with this heritage printed cotton dress. Feauturing an intricate tapestry of Rajasthani jharokha arches, imperial elephants, graceful peacocks, and palm foliage in vibrant crimson and mustard tones over a midnight navy backdrop. A quintessential masterpiece for connoisseurs of ethnic design.",
    features: [
      "Rich pictorial ethnic print featuring peacocks, temple jharokha arches, and elephants",
      "Luxuriously smooth super-combed cotton with a natural silky touch",
      "Flattering vertical pattern orientation for an elongated, slender silhouette",
      "Roomy fit with side slits for easy sitting, walking, and lounging",
      "Color-fast reactive printing keeps pigments vivid through countless washes"
    ],
    careInstructions: [
      "Hand wash or gentle cold machine wash with mild liquid soap",
      "Do not wring forcefully",
      "Hang dry immediately in the shade",
      "Iron on medium heat setting"
    ],
    inStock: true,
    isFeatured: true,
    isSale: true,
    isNewArrival: true,
    shippingInfo: "Dispatches within 24 hours. Delivery in 3-5 business days."
  },
  {
    id: 4,
    name: "Botanical Floral Breeze Twin Sleeveless Sundress",
    slug: "botanical-floral-breeze-sleeveless-sundress",
    tagline: "Airy sleeveless freedom in romantic coral rose & deep wine batik florals.",
    category: "Sundress & Lounge",
    categorySlug: "sundress-lounge",
    price: 699,
    originalPrice: 1099,
    discountPercent: 36,
    currencySymbol: "₹",
    rating: 4.8,
    reviewsCount: 114,
    badge: "Hot Deal",
    badgeColor: "bg-emerald-600",
    image: "images/dress-floral-combo.jpg",
    secondaryImage: "images/dress-floral-combo.jpg",
    colors: [
      { name: "Deep Plum Floral", hex: "#4a1525", active: true },
      { name: "Coral Rose Floral", hex: "#e05353", active: false }
    ],
    sizes: ["Free Size (Comfort Fit)", "S/M (36-38\")", "L/XL (40-42\")", "XXL (44\")"],
    fabric: "100% Lightweight Cambric Cotton",
    length: "Midi Length (48 inches)",
    sleeves: "Sleeveless with Adjustable Dainty Shoulder Ties",
    neckline: "Graceful Scoop Neck",
    pockets: "Side Seam Pocket",
    description: "Feel light as a summer breeze in our Botanical Floral Sleeveless Sundress. Adorned with delicate sketched tropical blossoms and winding botanical vines inspired by batik craftsmanship. Complete with adjustable shoulder string ties to customize your fit and a loose, floating silhouette that keeps you cool through hot days and balmy nights.",
    features: [
      "Featherlight, breathable cambric cotton keeps skin cool even in peak summer heat",
      "Customizable dainty shoulder ties for the perfect bust fit and shoulder placement",
      "Intricate floral stencil print with charming contrast line-work",
      "Versatile styling: wear it as a lounge nightdress, beach coverup, or garden dress",
      "Quick-drying fabric perfect for daily rotation and travel packing"
    ],
    careInstructions: [
      "Machine wash gentle with cold water",
      "Use delicate spin cycle",
      "Air dry flat or on a hanger in shade",
      "Light steam or warm iron"
    ],
    inStock: true,
    isFeatured: true,
    isSale: true,
    isNewArrival: false,
    shippingInfo: "Dispatches within 24 hours. Delivery in 3-5 business days."
  }
];

// Helper to find product by id
function getProductById(id) {
  return GLAMORA_PRODUCTS.find(p => p.id === parseInt(id, 10)) || GLAMORA_PRODUCTS[0];
}

// Helper to format currency
function formatCurrency(amount) {
  return "₹" + Number(amount).toLocaleString('en-IN');
}
