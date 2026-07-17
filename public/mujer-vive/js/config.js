// ============================================================
// MUJER VIVE — CONFIGURATION (Netlify-only version)
// ============================================================

const MV_CONFIG = {
  // --- Pricing ---
  LAUNCH_ACTIVE: true,      // true = launch offer showing. When the offer ends,
                            // change to false, re-zip, and drag onto Netlify again.
  LAUNCH_PRICE: 20,
  REGULAR_PRICE: 25,

  // --- Zelle ---
  ZELLE_NAME: "Mujer Vive",
  ZELLE_NUMBER: "(386) 216-5619",
  ZELLE_QR_IMAGE: "images/qr-zelle.png",
  // Universal Zelle payment link (decoded from Irene's QR) — opens the buyer's
  // own banking app with Irene pre-filled as the recipient.
  ZELLE_PAY_URL: "https://enroll.zellepay.com/qr-codes?data=eyJuYW1lIjoiSVJFTkUiLCJhY3Rpb24iOiJwYXltZW50IiwidG9rZW4iOiIzODYyMTY1NjE5In0=",

  // --- Cash App ---
  CASHAPP_TAG: "$IreneFamilia",
  // Cash App QR and payment link are generated automatically, amount pre-filled.

  // --- Payment timer guardrail ---
  MIN_PAY_SECONDS: 78,   // 1.3 minutes must pass after launching Zelle/Cash App
                         // before "I sent my payment" can be confirmed.

  // --- Shipping ---
  SHIPPING_INCLUDED: true,
  SHIPPING_FLAT: 0
};
