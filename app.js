const C=window.NXT_CONFIG;
const sb=window.supabase?.createClient(C.SUPABASE_URL,C.SUPABASE_KEY);
const $=s=>document.querySelector(s);
function money(p){return "₹"+(Number(p||0)/100).toLocaleString("en-IN");}
async function user(){if(!sb)return null; const {data}=await sb.auth.getUser(); return data.user;}
function guard(){return user().then(u=>{if(!u)location.href="auth.html?next="+encodeURIComponent(location.pathname);return u;});}

function authNext(){
  const p=new URLSearchParams(location.search).get("next");
  if(p){try{sessionStorage.setItem("nxt_auth_next",p);}catch(e){}}
  try{return sessionStorage.getItem("nxt_auth_next")||"index.html";}catch(e){return "index.html";}
}
function finishAuthRedirect(){
  let next="index.html";
  try{next=sessionStorage.getItem("nxt_auth_next")||"index.html";sessionStorage.removeItem("nxt_auth_next");}catch(e){}
  if(!next.startsWith("/")) next="/"+next.replace(/^\.\//,"");
  const target=next.startsWith("http")?next:location.origin+next;
  if(location.href!==target) location.replace(target);
}

async function google(){
  if(!sb){alert("Add the Supabase publishable key in config.js first.");return;}
  const next=new URLSearchParams(location.search).get("next")||"/index.html";
  try{sessionStorage.setItem("nxt_auth_next",next);}catch(e){}
  const redirectTo=location.origin+location.pathname;
  const {error}=await sb.auth.signInWithOAuth({
    provider:"google",
    options:{redirectTo}
  });
  if(error){
    const el=$("#status");
    if(el)el.textContent="Google sign-in failed: "+error.message;
    else alert(error.message);
  }
}

async function handleAuthPage(){
  if(!sb||!$("#google"))return;
  authNext();
  const status=$("#status");
  const button=$("#google");
  button.disabled=true;
  if(status)status.textContent="Checking your sign-in…";

  // If Supabase returned an OAuth error, show it instead of the old generic message.
  const hash=new URLSearchParams(location.hash.replace(/^#/,""));
  const qs=new URLSearchParams(location.search);
  const authError=hash.get("error_description")||qs.get("error_description")||hash.get("error")||qs.get("error");
  if(authError){
    if(status)status.textContent="Google sign-in failed: "+decodeURIComponent(authError.replace(/\+/g," "));
    button.disabled=false;
    return;
  }

  // Supabase JS normally detects the OAuth callback automatically. For PKCE callbacks,
  // explicitly exchange the returned code when present.
  const code=qs.get("code");
  if(code){
    const {error}=await sb.auth.exchangeCodeForSession(code);
    if(error){
      if(status)status.textContent="Login could not be completed: "+error.message;
      button.disabled=false;
      return;
    }
  }

  const {data:{session}}=await sb.auth.getSession();
  if(session){
    if(status)status.textContent="Login successful. Opening NXT GEN ESPORTS…";
    finishAuthRedirect();
    return;
  }

  if(status)status.textContent="Continue with Google / Gmail to sign in.";
  button.disabled=false;

  sb.auth.onAuthStateChange((event,session)=>{
    if(session&&(event==="SIGNED_IN"||event==="INITIAL_SESSION")){
      if(status)status.textContent="Login successful. Opening NXT GEN ESPORTS…";
      finishAuthRedirect();
    }
  });
}

function drawer(){
 document.body.insertAdjacentHTML("beforeend",`<div class="shade" id="shade"></div><aside class="drawer"><button class="close">×</button><div class="drawer-brand"><b>NXT GEN</b><span>ESPORTS</span></div><a href="index.html">Home</a><a href="my-registrations.html">My Registrations</a><a href="wallet.html">Wallet</a><a href="point-table.html">Point Table</a><a href="auth.html">Account / Login</a><hr><a target="_blank" href="https://wa.me/919045524457">WhatsApp Channel</a><a href="contact.html">Contact Us</a><a href="refund.html">Refund Policy</a></aside>`);
 $("#shade").onclick=closeDrawer;$(".close").onclick=closeDrawer;
}
function closeDrawer(){$(".drawer")?.remove();$("#shade")?.remove();}
document.addEventListener("DOMContentLoaded",()=>{
 if($(".menu"))$(".menu").onclick=()=>{drawer();};
 handleAuthPage();
});
