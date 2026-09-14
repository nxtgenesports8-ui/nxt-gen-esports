const SUPABASE_URL='https://vkakkqsqxlzzmkmjrbnb.supabase.co';
const SUPABASE_KEY='sb_publishable_d4fHdeTtEaIRqRjcC1gaBQ_EJkfKRhI';
const sb=supabase.createClient(SUPABASE_URL,SUPABASE_KEY);
const menuBtn=document.getElementById('menuBtn'),closeBtn=document.getElementById('closeBtn'),drawer=document.getElementById('drawer'),overlay=document.getElementById('overlay');
function openMenu(){drawer.classList.add('open');overlay.classList.add('show')} function closeMenu(){drawer.classList.remove('open');overlay.classList.remove('show')}
menuBtn.addEventListener('click',openMenu);closeBtn.addEventListener('click',closeMenu);overlay.addEventListener('click',closeMenu);
function openSignIn(){document.getElementById('signinModal').classList.add('show')} function closeSignIn(){document.getElementById('signinModal').classList.remove('show')}
const timingMap={'1–3 PM':1,'3–5 PM':2,'5–7 PM':3,'7–9 PM':4,'9–11 PM':5,'11 PM–1 AM':6};
const form=document.getElementById('registrationForm');
const status=document.createElement('p'); status.className='tiny'; form.appendChild(status);
async function loadAvailability(){
 const date=new Date().toISOString().slice(0,10);
 for(const [label,id] of Object.entries(timingMap)){
   const {data}=await sb.rpc('get_timing_capacity',{p_timing_id:id,p_scrim_date:date});
   const opt=[...document.querySelectorAll('#timing option')].find(o=>o.textContent===label);
   if(data?.[0]&&opt) opt.textContent=`${label} — ${data[0].remaining_teams} left`;
 }
}
form.addEventListener('submit',async e=>{
 e.preventDefault(); status.textContent='Checking availability…';
 const team=document.getElementById('teamName').value.trim(),phone=document.getElementById('contact').value.trim();
 const label=document.getElementById('timing').value, timing_id=timingMap[label];
 const slots=Number(document.getElementById('slots').value),price=document.getElementById('price').value;
 if(!timing_id){status.textContent='Please select a timing.';return}
 const scrim_date=new Date().toISOString().slice(0,10);
 const {data,error}=await sb.rpc('submit_registration',{p_team_name:team,p_contact_number:phone,p_timing_id:timing_id,p_scrim_date:scrim_date,p_number_of_slots:slots,p_price_category:price});
 if(error){status.textContent=error.message.replace('Error: ','');return}
 status.textContent=`Registration submitted successfully. ID: ${data}`;
 const message=`NXT GEN ESPORTS Registration\n\nRegistration ID: ${data}\nTeam Name: ${team}\nContact: ${phone}\nTiming: ${label}\nSlots Needed: ${slots}\nPrice Category: ${price}`;
 window.open(`https://wa.me/919045524457?text=${encodeURIComponent(message)}`,'_blank');
 form.reset();
});
loadAvailability();
