const menuBtn=document.getElementById("menuBtn"),closeBtn=document.getElementById("closeBtn"),drawer=document.getElementById("drawer"),overlay=document.getElementById("overlay");
function openMenu(){drawer.classList.add("open");overlay.classList.add("show")}
function closeMenu(){drawer.classList.remove("open");overlay.classList.remove("show")}
menuBtn.addEventListener("click",openMenu);closeBtn.addEventListener("click",closeMenu);overlay.addEventListener("click",closeMenu);

function openSignIn(){document.getElementById("signinModal").classList.add("show")}
function closeSignIn(){document.getElementById("signinModal").classList.remove("show")}

document.getElementById("registrationForm").addEventListener("submit",function(e){
  e.preventDefault();
  const team=document.getElementById("teamName").value.trim();
  const phone=document.getElementById("contact").value.trim();
  const timing=document.getElementById("timing").value;
  const slots=document.getElementById("slots").value;
  const price=document.getElementById("price").value;
  const message=`NXT GEN ESPORTS Registration%0A%0ATeam Name: ${encodeURIComponent(team)}%0AContact: ${encodeURIComponent(phone)}%0ATiming: ${encodeURIComponent(timing)}%0ASlots Needed: ${encodeURIComponent(slots)}%0APrice Category: ${encodeURIComponent(price)}`;
  window.open(`https://wa.me/919045524457?text=${message}`,"_blank");
});
