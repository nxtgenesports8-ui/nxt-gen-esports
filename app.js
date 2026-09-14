const C=window.NXT_CONFIG;
const sb=window.supabase?.createClient(C.SUPABASE_URL,C.SUPABASE_KEY);
const $=s=>document.querySelector(s);
function money(p){return "₹"+(Number(p||0)/100).toLocaleString("en-IN");}
async function user(){if(!sb)return null; const {data}=await sb.auth.getUser(); return data.user;}
function guard(){return user().then(u=>{if(!u)location.href="auth.html?next="+encodeURIComponent(location.pathname);return u;});}
async function google(){if(!sb)return alert("Add the Supabase publishable key in config.js first.");const {error}=await sb.auth.signInWithOAuth({provider:"google",options:{redirectTo:location.origin+location.pathname}});if(error)alert(error.message);}
function drawer(){
 document.body.insertAdjacentHTML("beforeend",`<div class="shade" id="shade"></div><aside class="drawer"><button class="close">×</button><div class="drawer-brand"><b>NXT GEN</b><span>ESPORTS</span></div><a href="index.html">Home</a><a href="scrims.html">Explore Scrims</a><a href="my-registrations.html">My Registrations</a><a href="wallet.html">Wallet</a><a href="point-table.html">Point Table</a><a href="auth.html">Account / Login</a><hr><a target="_blank" href="https://wa.me/919045524457">WhatsApp Channel</a><a href="contact.html">Contact Us</a><a href="refund.html">Refund Policy</a></aside>`);
 $("#shade").onclick=closeDrawer;$(".close").onclick=closeDrawer;
}
function closeDrawer(){$(".drawer")?.remove();$("#shade")?.remove();}
document.addEventListener("DOMContentLoaded",()=>{if($(".menu"))$(".menu").onclick=()=>{drawer();};});
