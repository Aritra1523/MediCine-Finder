
import { useState, useEffect } from "react";
import { searchMedicines } from "../api";
import NavBar from "./UserNavbar";

export default function SearchMedicine() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadDefaultMedicines = async () => {
    setLoading(true);
    try {
      const res = await searchMedicines("");
      setResults(res.data);
    } catch (e) { setResults([]); }
    setLoading(false);
  };

  useEffect(() => { loadDefaultMedicines(); }, []);

  const search = async (value) => {
    setQuery(value);
    if (!value.trim()) { loadDefaultMedicines(); return; }
    setLoading(true);
    try {
      const res = await searchMedicines(value);
      setResults(res.data);
    } catch (e) { setResults([]); }
    setLoading(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:wght@600&display=swap');

        .search-root {
          min-height: 100vh;
          background: #f7f8fc;
          font-family: 'DM Sans', sans-serif;
          padding-top: 70px;
        }

        .search-hero {
          background: linear-gradient(135deg, #0a2342 0%, #1a4a7a 100%);
          padding: 48px 24px 80px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .search-hero::before {
          content: '';
          position: absolute; top: -60px; right: -60px;
          width: 280px; height: 280px;
          border-radius: 50%; background: rgba(255,255,255,0.04);
        }
        .search-hero::after {
          content: '';
          position: absolute; bottom: -80px; left: -40px;
          width: 220px; height: 220px;
          border-radius: 50%; background: rgba(255,255,255,0.03);
        }

        .hero-tag {
          display: inline-block;
          background: rgba(125,211,252,0.15);
          color: #7dd3fc; border-radius: 20px;
          padding: 5px 14px; font-size: 12px; font-weight: 500;
          letter-spacing: 0.5px; margin-bottom: 16px;
        }
        .hero-title {
          font-family: 'Playfair Display', serif;
          color: #fff; font-size: 32px; margin-bottom: 10px; line-height: 1.2;
        }
        @media(min-width:600px){ .hero-title { font-size: 40px; } }
        .hero-title span { color: #7dd3fc; }
        .hero-sub { color: rgba(255,255,255,0.6); font-size: 15px; margin-bottom: 32px; }

        .search-bar-wrap {
          max-width: 580px; margin: 0 auto;
          position: relative; z-index: 2;
        }
        .search-icon-abs {
          position: absolute; left: 18px; top: 50%;
          transform: translateY(-50%); font-size: 18px; pointer-events: none;
        }
        .search-input {
          width: 100%; padding: 16px 20px 16px 52px;
          border-radius: 14px; border: none;
          font-size: 15px; font-family: 'DM Sans', sans-serif;
          color: #0f172a; background: #fff;
          box-shadow: 0 8px 32px rgba(0,0,0,0.18);
          outline: none; box-sizing: border-box;
          transition: box-shadow 0.2s;
        }
        .search-input:focus { box-shadow: 0 8px 40px rgba(0,0,0,0.22); }
        .search-input::placeholder { color: #94a3b8; }

        /* RESULTS */
        .results-wrap {
          max-width: 720px; margin: -24px auto 0;
          padding: 0 16px 60px; position: relative; z-index: 3;
        }

        .results-meta {
          font-size: 15px; color: #475569;
          margin-bottom: 20px; font-weight: 500;
          padding: 14px 18px;
          background: #fff;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          display: flex; align-items: center; gap: 8px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.04);
        }
        .results-meta span { color: #1a4a7a; font-weight: 700; font-size: 16px; }
        .results-meta-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #16a34a; display: inline-block; flex-shrink: 0;
        }

        .shop-card {
          background: #fff; border-radius: 18px;
          box-shadow: 0 2px 16px rgba(0,0,0,0.06);
          border: 1px solid #f1f5f9;
          margin-bottom: 20px;
          overflow: hidden;
          transition: box-shadow 0.2s, transform 0.2s;
        }
        .shop-card:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.1); transform: translateY(-2px); }

        .shop-header {
          padding: 20px 22px 16px;
          border-bottom: 1px solid #f1f5f9;
          display: flex; align-items: center; justify-content: space-between;
        }
        .shop-name-wrap { display: flex; align-items: center; gap: 12px; }
        .shop-avatar {
          width: 42px; height: 42px;
          background: linear-gradient(135deg, #0a2342, #1a4a7a);
          border-radius: 11px;
          display: flex; align-items: center; justify-content: center;
          font-size: 20px; flex-shrink: 0;
        }
        .shop-name { font-size: 16px; font-weight: 600; color: #0f172a; }
        .shop-badge {
          font-size: 11px; font-weight: 500;
          background: #f0f9ff; color: #0369a1;
          padding: 3px 10px; border-radius: 20px;
          border: 1px solid #bae6fd;
        }

        .med-list { padding: 14px 22px; display: flex; flex-direction: column; gap: 10px; }

        .med-item {
          display: flex; align-items: center; justify-content: space-between;
          padding: 12px 14px; border-radius: 11px;
          background: #f8fafc;
          border: 1px solid #f1f5f9;
          transition: background 0.15s;
        }
        .med-item:hover { background: #f0f6ff; }

        .med-name { font-size: 14px; font-weight: 600; color: #1e293b; margin-bottom: 3px; }
        .med-meta { font-size: 12px; color: #64748b; }
        .med-meta strong { color: #0f172a; }

        .stock-badge {
          font-size: 11px; font-weight: 600;
          padding: 4px 10px; border-radius: 20px; white-space: nowrap; flex-shrink: 0;
        }
        .stock-in { background: #dcfce7; color: #16a34a; }
        .stock-low { background: #fee2e2; color: #dc2626; }

        .shop-actions {
          padding: 14px 22px 18px;
          display: grid; grid-template-columns: 1fr 1fr; gap: 10px;
        }
        .action-btn {
          display: flex; align-items: center; justify-content: center; gap: 7px;
          padding: 11px; border-radius: 11px;
          font-size: 13px; font-weight: 600;
          text-decoration: none; transition: opacity 0.2s, transform 0.15s;
          font-family: 'DM Sans', sans-serif;
        }
        .action-btn:hover { opacity: 0.88; transform: translateY(-1px); }
        .btn-call { background: #0a2342; color: #fff; }
        .btn-wa { background: #16a34a; color: #fff; }

        /* States */
        .loading-wrap { text-align: center; padding: 80px 20px; }
        .loading-spinner {
          width: 36px; height: 36px;
          border: 3px solid #e2e8f0; border-top-color: #1a4a7a;
          border-radius: 50%; animation: spin 0.8s linear infinite;
          margin: 0 auto 14px;
        }
        .loading-text { color: #94a3b8; font-size: 14px; }

        .empty-wrap { text-align: center; padding: 80px 20px; }
        .empty-icon { font-size: 48px; margin-bottom: 14px; }
        .empty-title { font-size: 18px; font-weight: 600; color: #374151; margin-bottom: 6px; }
        .empty-sub { color: #94a3b8; font-size: 14px; }

        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <NavBar />
      <div className="search-root">
        {/* Hero */}
        <div className="search-hero">
          <div className="hero-tag">🔍 Medicine Search</div>
          <h1 className="hero-title">Find medicines <span>near you</span></h1>
          <p className="hero-sub">Search across all nearby pharmacies in real-time</p>
          <div className="search-bar-wrap">
            <span className="search-icon-abs">🔍</span>
            <input
              className="search-input"
              placeholder="Search by medicine name (e.g. Dolo, Paracetamol)..."
              value={query}
              onChange={(e) => search(e.target.value)}
            />
          </div>
        </div>

        {/* Results */}
        <div className="results-wrap">
          {loading ? (
            <div className="loading-wrap">
              <div className="loading-spinner" />
              <p className="loading-text">Searching pharmacies...</p>
            </div>
          ) : results.length === 0 ? (
            <div className="empty-wrap">
              <div className="empty-icon">💊</div>
              <p className="empty-title">No medicines found</p>
              <p className="empty-sub">Try a different search term</p>
            </div>
          ) : (
            <>
              <div className="results-meta">
                <span className="results-meta-dot" />
                Found <span>&nbsp;{results.length}&nbsp;</span>
                {results.length === 1 ? "pharmacy" : "pharmacies"}
                {query ? <> matching &nbsp;<span>"{query}"</span></> : <> in your area</>}
              </div>
              {results.map((shop) => (
                <div key={shop.shopId} className="shop-card">
                  <div className="shop-header">
                    <div className="shop-name-wrap">
                      <div className="shop-avatar">🏪</div>
                      <div>
                        <div className="shop-name">{shop.shopName}</div>
                      </div>
                    </div>
                    <span className="shop-badge">{shop.medicines?.length} medicines</span>
                  </div>

                  <div className="med-list">
                    {shop.medicines.map((item) => (
                      <div key={item._id} className="med-item">
                        <div>
                          <div className="med-name">{item.name}</div>
                          <div className="med-meta">
                            <strong>₹{item.price}</strong>
                            {" "}
                            {(item.unit ?? "tablet") === "tablet" && "per tablet"}
                            {(item.unit ?? "tablet") === "strip" && `per strip (${item.unitQty ?? 1} tablets)`}
                            {(item.unit ?? "tablet") === "syrup" && `per bottle (${item.unitQty ?? 1} ml)`}
                            {(item.unit ?? "tablet") === "bottle" && "per bottle"}
                            {" · "}Stock: {item.stock}
                          </div>
                        </div>
                        <span className={`stock-badge ${item.stock > 10 ? "stock-in" : "stock-low"}`}>
                          {item.stock > 10 ? "In Stock" : "Low Stock"}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="shop-actions">
                    <a href={`tel:${shop.phone}`} className="action-btn btn-call">📞 Call Pharmacy</a>
                    <a href={`https://wa.me/91${shop.phone}`} className="action-btn btn-wa">💬 WhatsApp</a>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}
