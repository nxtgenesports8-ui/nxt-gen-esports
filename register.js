document.querySelector('#scrimDate').value=new Date().toISOString().slice(0,10);
document.querySelector('#registerForm').addEventListener('submit',e=>{e.preventDefault();document.querySelector('#message').textContent='Please sign in and ensure your wallet has sufficient balance before submitting a wallet registration.';});
