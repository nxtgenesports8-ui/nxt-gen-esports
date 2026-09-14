const timings=['1-3 PM','3-5 PM','5-7 PM','7-9 PM','9-11 PM','11 PM-1 AM'];
const el=document.querySelector('#scrims');
el.innerHTML=timings.map(t=>`<div class="card"><b>${t}</b><span>Up to 18 teams</span><a class="btn small" href="register.html">Register</a></div>`).join('');
