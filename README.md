# NXT GEN ESPORTS — Complete Frontend
This package contains the complete multi-page frontend flow for NXT GEN ESPORTS.
Before publishing, put the Supabase publishable key in `config.js`.
The Google button is wired to Supabase OAuth, but the Google provider must be enabled/configured in Supabase Auth.
The wallet uses the existing `request_wallet_topup(p_amount_paise)` RPC and registration uses `submit_registration_with_wallet`.
No UTR or payment screenshot is requested in the UI.
