let mode='login'; const form=document.querySelector('#authForm');
document.querySelector('#loginTab').onclick=()=>{mode='login';document.querySelector('#loginTab').classList.add('active');document.querySelector('#signupTab').classList.remove('active');document.querySelector('#authBtn').textContent='Sign in';};
document.querySelector('#signupTab').onclick=()=>{mode='signup';document.querySelector('#signupTab').classList.add('active');document.querySelector('#loginTab').classList.remove('active');document.querySelector('#authBtn').textContent='Create account';};
form.addEventListener('submit',e=>{e.preventDefault();document.querySelector('#authMessage').textContent='Connect the Supabase browser client in this project, then enable email sign-ups in Supabase Auth.';});
