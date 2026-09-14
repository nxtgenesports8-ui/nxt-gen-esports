document.querySelector('#balance').textContent='₹0.00';
document.querySelector('#topupForm').addEventListener('submit',e=>{e.preventDefault();document.querySelector('#topupMessage').textContent='Top-up request UI ready. Connect the Supabase RPC request_wallet_topup(amount, UTR) to submit it.';});
document.querySelector('#transactions').innerHTML='<div class="muted">Sign in to view your wallet transactions.</div>';
