import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const PRODUCT = {
  id: 1,
  name: "Wireless Mouse",
  category: "Computer Accessories",
  brief: "Ergonomic wireless mouse",
  description:
    "A high-precision wireless mouse with adjustable DPI and long battery life.",
  image:
    "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=1200&q=85",
  productUrl: "https://example.com/mouse",
  buyUrl: "https://example.com/buy/mouse",
  startingPrice: 25,
  priceRange: "$25.00 - $40.00",
};

const PRODUCTS = [
  PRODUCT,
  {
    id: 2,
    name: "Studio Headphones",
    category: "Audio",
    brief: "Immersive over-ear sound",
    description: "Comfortable headphones designed for focused work and entertainment.",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=85",
    startingPrice: 59,
    priceRange: "$59.00 - $89.00",
  },
  {
    id: 3,
    name: "Mechanical Keyboard",
    category: "Computer Accessories",
    brief: "Tactile precision for every keystroke",
    description: "A compact mechanical keyboard with a premium typing feel.",
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=85",
    startingPrice: 79,
    priceRange: "$79.00 - $119.00",
  },
  {
    id: 4,
    name: "Smart Watch",
    category: "Wearables",
    brief: "Stay connected at a glance",
    description: "A clean everyday smartwatch concept with health and productivity features.",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=85",
    startingPrice: 99,
    priceRange: "$99.00 - $149.00",
  },
];

function Icon({ name, size = 20 }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  const paths = {
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>,
    user: <><circle cx="12" cy="8" r="3.5" /><path d="M5 20c.9-3.3 3.3-5 7-5s6.1 1.7 7 5" /></>,
    cart: <><path d="M3 4h2l2 11h10l3-8H6" /><circle cx="9" cy="19" r="1.2" /><circle cx="17" cy="19" r="1.2" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    x: <><path d="m6 6 12 12M18 6 6 18" /></>,
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    heart: <path d="M20.8 8.8c0 5.5-8.8 10-8.8 10S3.2 14.3 3.2 8.8A4.7 4.7 0 0 1 12 6.1a4.7 4.7 0 0 1 8.8 2.7Z" />,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    minus: <path d="M5 12h14" />,
    check: <path d="m5 12 4 4L19 6" />,
    moon: <path d="M20 15.5A8 8 0 0 1 8.5 4 8 8 0 1 0 20 15.5Z" />,
  };

  return <svg {...common}>{paths[name]}</svg>;
}

function App() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [cartOpen, setCartOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [cart, setCart] = useState([]);
  const [selected, setSelected] = useState(PRODUCT);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const categories = ["All", "Computer Accessories", "Audio", "Wearables"];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      const matchesCategory = category === "All" || p.category === category;
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.brief.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  const addToCart = (product) => {
    setCart((items) => {
      const found = items.find((item) => item.id === product.id);
      if (found) {
        return items.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...items, { ...product, qty: 1 }];
    });
    setCartOpen(true);
  };

  const updateQty = (id, delta) => {
    setCart((items) =>
      items
        .map((item) => (item.id === id ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.startingPrice * item.qty, 0);

  return (
    <div className={dark ? "app dark" : "app"}>
      <div className="announcement">
        <span>Free shipping on orders over $75</span>
        <span className="announcement-dot">•</span>
        <span>Secure front-end demo experience</span>
      </div>

      <header className="header">
        <div className="container nav">
          <button className="icon-button mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open menu">
            <Icon name="menu" />
          </button>

          <a className="brand" href="#home" onClick={() => setMenuOpen(false)}>
            <span className="brand-mark">N</span>
            <span>Nova<span>Mart</span></span>
          </a>

          <nav className={menuOpen ? "main-nav open" : "main-nav"}>
            <a href="#home">Home</a>
            <a href="#shop">Shop</a>
            <a href="#featured">Featured</a>
            <a href="#about">About</a>
          </nav>

          <div className="nav-actions">
            <label className="search-box">
              <Icon name="search" size={18} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
                aria-label="Search products"
              />
            </label>
            <button className="icon-button" onClick={() => setLoginOpen(true)} aria-label="Account">
              <Icon name="user" />
            </button>
            <button className="icon-button cart-button" onClick={() => setCartOpen(true)} aria-label="Shopping cart">
              <Icon name="cart" />
              {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
            </button>
            <button className="theme-button" onClick={() => setDark(!dark)} aria-label="Toggle theme">
              <Icon name="moon" size={18} />
            </button>
          </div>
        </div>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="hero-glow glow-one" />
          <div className="hero-glow glow-two" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="eyebrow"><span /> Curated technology essentials</div>
              <h1>Technology that fits <em>your world.</em></h1>
              <p>
                Discover carefully selected devices and accessories designed for
                modern work, creativity, and everyday life.
              </p>
              <div className="hero-actions">
                <a className="primary-btn" href="#shop">Explore collection <Icon name="arrow" size={18} /></a>
                <a className="text-link" href="#featured">View featured products</a>
              </div>
              <div className="hero-proof">
                <div className="avatars"><span>F</span><span>A</span><span>N</span><span>+</span></div>
                <div><strong>2,000+</strong><small>happy shoppers</small></div>
              </div>
            </div>

            <div className="hero-product">
              <div className="hero-card">
                <span className="floating-badge">Editor's pick</span>
                <img src={PRODUCT.image} alt={PRODUCT.name} />
                <div className="hero-product-info">
                  <div>
                    <small>Featured product</small>
                    <h3>{PRODUCT.name}</h3>
                  </div>
                  <strong>${PRODUCT.startingPrice.toFixed(2)}</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="trust-strip">
          <div className="container trust-grid">
            <div><strong>01</strong><span>Curated quality<br /><small>Products worth using</small></span></div>
            <div><strong>02</strong><span>Fast experience<br /><small>Built for every screen</small></span></div>
            <div><strong>03</strong><span>Simple shopping<br /><small>Less friction, more clarity</small></span></div>
            <div><strong>04</strong><span>Secure by design<br /><small>Demo-ready interface</small></span></div>
          </div>
        </section>

        <section id="shop" className="shop section">
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="section-kicker">THE COLLECTION</span>
                <h2>Shop essentials</h2>
              </div>
              <p>Explore a focused collection of products for your digital lifestyle.</p>
            </div>

            <div className="category-row">
              {categories.map((item) => (
                <button
                  key={item}
                  className={category === item ? "category active" : "category"}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="product-grid">
              {filtered.map((product) => (
                <article className="product-card" key={product.id}>
                  <div className="product-image-wrap">
                    <button className="heart-btn" aria-label={`Save ${product.name}`}><Icon name="heart" size={18} /></button>
                    <img src={product.image} alt={product.name} loading="lazy" />
                    <button
                      className="quick-add"
                      onClick={() => addToCart(product)}
                    >
                      Quick add <Icon name="plus" size={16} />
                    </button>
                  </div>
                  <div className="product-info">
                    <span className="product-category">{product.category}</span>
                    <h3>{product.name}</h3>
                    <p>{product.brief}</p>
                    <div className="product-bottom">
                      <div>
                        <small>Starting at</small>
                        <strong>${product.startingPrice.toFixed(2)}</strong>
                      </div>
                      <button
                        className="details-btn"
                        onClick={() => { setSelected(product); setDetailsOpen(true); }}
                      >
                        Details <Icon name="arrow" size={15} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="empty-state">
                <h3>No products found</h3>
                <p>Try another search term or category.</p>
              </div>
            )}
          </div>
        </section>

        <section id="featured" className="feature-section">
          <div className="container feature-card">
            <div className="feature-image">
              <img src={PRODUCT.image} alt={PRODUCT.name} loading="lazy" />
            </div>
            <div className="feature-copy">
              <span className="section-kicker">FEATURED / 01</span>
              <h2>Small details.<br /><em>Big difference.</em></h2>
              <p>{PRODUCT.description}</p>
              <div className="spec-list">
                <div><Icon name="check" size={17} /><span>Adjustable DPI</span></div>
                <div><Icon name="check" size={17} /><span>Ergonomic design</span></div>
                <div><Icon name="check" size={17} /><span>Long battery life</span></div>
              </div>
              <div className="feature-price">
                <div><small>Price range</small><strong>{PRODUCT.priceRange}</strong></div>
                <button className="primary-btn" onClick={() => addToCart(PRODUCT)}>Add to cart <Icon name="cart" size={17} /></button>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="about section">
          <div className="container about-grid">
            <div>
              <span className="section-kicker">THE NOVAMART STANDARD</span>
              <h2>Designed to feel effortless.</h2>
            </div>
            <p>
              NovaMart is a front-end ecommerce concept focused on clean hierarchy,
              purposeful motion, responsive layouts, and a premium product-first
              experience. It is intentionally separated from backend concerns.
            </p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-grid">
          <div><a className="brand" href="#home"><span className="brand-mark">N</span><span>Nova<span>Mart</span></span></a><p>Modern commerce interface concept.</p></div>
          <div><span className="footer-title">Explore</span><a href="#shop">Shop</a><a href="#featured">Featured</a><a href="#about">About</a></div>
          <div><span className="footer-title">Frontend only</span><p>No real authentication, payment, order processing, or database is connected.</p></div>
        </div>
        <div className="container footer-bottom"><span>© 2026 NovaMart</span><span>Built as a front-end project</span></div>
      </footer>

      {cartOpen && (
        <div className="overlay" onClick={() => setCartOpen(false)}>
          <aside className="drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-head"><div><span className="section-kicker">YOUR BAG</span><h2>Shopping cart</h2></div><button className="icon-button" onClick={() => setCartOpen(false)}><Icon name="x" /></button></div>
            <div className="cart-items">
              {cart.length === 0 ? (
                <div className="empty-cart"><Icon name="cart" size={34}/><h3>Your cart is empty</h3><p>Add a product to see it here.</p><button className="primary-btn" onClick={() => {setCartOpen(false); document.querySelector("#shop")?.scrollIntoView({behavior:"smooth"});}}>Start shopping</button></div>
              ) : cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <div className="cart-item-info"><h3>{item.name}</h3><span>${item.startingPrice.toFixed(2)}</span><div className="qty"><button onClick={() => updateQty(item.id, -1)}><Icon name="minus" size={14}/></button><b>{item.qty}</b><button onClick={() => updateQty(item.id, 1)}><Icon name="plus" size={14}/></button></div></div>
                </div>
              ))}
            </div>
            {cart.length > 0 && <div className="cart-summary"><div><span>Subtotal</span><strong>${subtotal.toFixed(2)}</strong></div><button className="primary-btn full" onClick={() => alert("Checkout is intentionally front-end only.")}>Continue to checkout <Icon name="arrow" size={17}/></button><small>Checkout is a UI demonstration. No payment is processed.</small></div>}
          </aside>
        </div>
      )}

      {detailsOpen && (
        <div className="modal-overlay" onClick={() => setDetailsOpen(false)}>
          <div className="product-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setDetailsOpen(false)}><Icon name="x" /></button>
            <div className="modal-image"><img src={selected.image} alt={selected.name} /></div>
            <div className="modal-content">
              <span className="product-category">{selected.category}</span>
              <h2>{selected.name}</h2>
              <p className="modal-brief">{selected.brief}</p>
              <p>{selected.description}</p>
              <div className="modal-price"><small>Starting at</small><strong>${selected.startingPrice.toFixed(2)}</strong></div>
              <button className="primary-btn full" onClick={() => { addToCart(selected); setDetailsOpen(false); }}>Add to cart <Icon name="cart" size={17}/></button>
            </div>
          </div>
        </div>
      )}

      {loginOpen && (
        <div className="modal-overlay" onClick={() => setLoginOpen(false)}>
          <div className="login-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setLoginOpen(false)}><Icon name="x" /></button>
            <span className="brand-mark large">N</span>
            <span className="section-kicker">WELCOME BACK</span>
            <h2>Sign in to NovaMart</h2>
            <p>This is a front-end authentication screen. No credentials are sent anywhere.</p>
            <form onSubmit={(e) => {e.preventDefault(); alert("Demo login only — no backend is connected.");}}>
              <label>Email or username<input placeholder="fikadu" /></label>
              <label>Password<input type="password" placeholder="••••••••" /></label>
              <button className="primary-btn full" type="submit">Sign in <Icon name="arrow" size={17}/></button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
