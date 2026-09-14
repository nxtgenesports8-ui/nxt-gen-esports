const WHATSAPP="919045524457";
const MAX_TEAMS=18;
const TIMES=["1–3 PM","3–5 PM","5–7 PM","7–9 PM","9–11 PM","11 PM–1 AM"];
const STORAGE_KEY="nxtgen_slot_counts_v2";
const PAUSE_KEY="nxtgen_pause_v2";
const OWNER_PIN="2580"; // Change this before using the local control screen.

function initialState(){
  return Object.fromEntries(TIMES.map(t=>[t,0]));
}
function loadCounts(){
  try{
    const saved=JSON.parse(localStorage.getItem(STORAGE_KEY)||"null");
    if(!saved) return initialState();
    return Object.fromEntries(TIMES.map(t=>[t,Math.max(0,Math.min(MAX_TEAMS,Number(saved[t])||0))]));
  }catch{return initialState();}
}
function saveCounts(s){localStorage.setItem(STORAGE_KEY,JSON.stringify(s));}
function paused(){return localStorage.getItem(PAUSE_KEY)==="1";}

function fillTimingSelect(){
  document.querySelector('select[name="timing"]').innerHTML =
    '<option value="">Select timing</option>' +
    TIMES.map(t=>`<option>${t}</option>`).join("");
}
function renderAvailability(){
  const counts=loadCounts();
  document.getElementById("availability").innerHTML=TIMES.map(t=>{
    const n=counts[t];
    let text="AVAILABLE", cls="";
    if(paused()){text="PAUSED";cls="paused";}
    else if(n>=MAX_TEAMS){text="SOLD OUT";cls="sold";}
    return `<div class="slot-row"><div><strong>${t}</strong><small>${n}/${MAX_TEAMS} teams filled</small></div><span class="badge ${cls}">${text}</span></div>`;
  }).join("");
}
function renderOwner(){
  const counts=loadCounts();
  document.getElementById("ownerRows").innerHTML=TIMES.map(t=>{
    const n=counts[t], sold=n>=MAX_TEAMS;
    return `<div class="owner-row"><strong>${t}</strong> — ${n}/${MAX_TEAMS} teams
      <div class="owner-actions">
        <button onclick="changeCount('${t}',-1)">− 1</button>
        <button onclick="changeCount('${t}',1)">+ 1</button>
        <button class="${sold?'open':'sold'}" onclick="setCount('${t}',${sold?0:MAX_TEAMS})">${sold?'REOPEN':'MARK SOLD OUT'}</button>
      </div>
    </div>`;
  }).join("");
}
function unlockOwner(){
  const pin=document.getElementById("ownerPin").value;
  if(pin===OWNER_PIN){
    document.getElementById("ownerPanel").hidden=false;
    renderOwner();
  }else alert("Incorrect PIN.");
}
function changeCount(time,delta){
  const s=loadCounts();
  s[time]=Math.max(0,Math.min(MAX_TEAMS,s[time]+delta));
  saveCounts(s);renderAvailability();renderOwner();
}
function setCount(time,value){
  const s=loadCounts();s[time]=value;saveCounts(s);renderAvailability();renderOwner();
}
function pauseRegistrations(){localStorage.setItem(PAUSE_KEY,"1");renderAvailability();}
function resumeRegistrations(){localStorage.removeItem(PAUSE_KEY);renderAvailability();}

document.getElementById("registrationForm").addEventListener("submit",function(e){
  e.preventDefault();
  if(paused()){alert("Registrations are currently paused.");return;}
  const f=new FormData(e.target);
  const team=String(f.get("teamName")).trim();
  const contact=String(f.get("contact")).trim();
  const timing=String(f.get("timing"));
  const slots=Math.max(1,Math.min(18,Number(f.get("slots"))||1));
  const price=Number(f.get("price"))||0;
  const counts=loadCounts();

  if(!timing || !team || !contact || !price)return;
  if(counts[timing]+slots>MAX_TEAMS){
    alert(`Only ${MAX_TEAMS-counts[timing]} team slot(s) remain for ${timing}.`);
    return;
  }

  const total=price*slots;
  const message =
`NXT GEN ESPORTS SCRIM REGISTRATION

Team Name: ${team}
Contact: ${contact}
Slot Timing: ${timing}
Number of Slots: ${slots}
Price Category: ₹${price} / slot
Total: ₹${total}`;

  // WhatsApp receives the registration details directly.
  const url=`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
  window.open(url,"_blank","noopener");

  // This local prototype does not auto-confirm payment.
  // Owner can manually increase the confirmed team count from the control screen.
  document.getElementById("formMessage").textContent="WhatsApp opened with your registration details.";
  e.target.reset();
  fillTimingSelect();
});

fillTimingSelect();
renderAvailability();
