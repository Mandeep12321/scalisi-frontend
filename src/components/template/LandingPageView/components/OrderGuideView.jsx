"use client";

export default function OrderGuideView() {
  return (
    <div>
      {/* 🔥 Fancy Header Section */}
      <div
        style={{
          marginBottom: "25px",
          padding: "20px",
          borderRadius: "12px",
          background: "linear-gradient(135deg, #f5f7fa, #eef1f5)",
          border: "1px solid #e5e7eb",
        }}
      >
        <h3
          className="fw-700"
          style={{ fontSize: "24px", marginBottom: "8px" }}
        >
          🛒 Your Order Guide
        </h3>

        <p
          className="text-muted"
          style={{ marginBottom: "12px", fontSize: "15px" }}
        >
          Quickly reorder your frequently purchased items and save time.
        </p>

        <p
          style={{
            fontSize: "14px",
            color: "#555",
            lineHeight: "1.6",
            marginBottom: "10px",
          }}
        >
          The Order Guide is designed to streamline your purchasing workflow by
          showing your most relevant and frequently ordered products in one place.
          Easily review items, manage quantities, and place orders faster without
          browsing the entire catalog.
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginTop: "10px",
          }}
        >
          <span className="badge bg-light text-dark">⚡ Fast Ordering</span>
          <span className="badge bg-light text-dark">📦 Bulk Add</span>
          <span className="badge bg-light text-dark">🔁 Reorder Easily</span>
        </div>
      </div>

      {/* ✅ Step-by-Step Guide */}
      <div
        style={{
          padding: "20px",
          borderRadius: "12px",
          border: "1px solid #e5e7eb",
          background: "#fff",
        }}
      >
        <h5 style={{ marginBottom: "15px" }}>📋 How to Use Order Guide</h5>

        <ol style={{ paddingLeft: "18px", marginBottom: 0 }}>
          <li style={{ marginBottom: "10px" }}>
            <strong>Browse Your Items:</strong> View your frequently ordered or
            recommended products in one place.
          </li>

          <li style={{ marginBottom: "10px" }}>
            <strong>Search or Filter:</strong> Quickly find products using search
            or category filters.
          </li>

          <li style={{ marginBottom: "10px" }}>
            <strong>Update Quantities:</strong> Adjust the quantity of each item
            before adding to cart.
          </li>

          <li style={{ marginBottom: "10px" }}>
            <strong>Add to Cart:</strong> Select individual items or use bulk add
            to add multiple products at once.
          </li>

          <li style={{ marginBottom: "10px" }}>
            <strong>Review Your Cart:</strong> Double-check items, quantities,
            and pricing.
          </li>

          <li style={{ marginBottom: "10px" }}>
            <strong>Place Order:</strong> Proceed to checkout and confirm your
            order.
          </li>

          <li style={{ marginBottom: "0px" }}>
            <strong>Reorder Anytime:</strong> Come back to Order Guide for faster
            repeat purchases.
          </li>
        </ol>
      </div>
    </div>
  );
}