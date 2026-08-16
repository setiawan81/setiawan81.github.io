/* === Menu Toggle === */
const menu=document.querySelector('.menu'),links=document.querySelector('.links'),theme=document.querySelector('.theme');
if(menu)menu.addEventListener('click',()=>links.classList.toggle('open'));
if(links)document.querySelectorAll('.links a').forEach(a=>a.addEventListener('click',()=>links.classList.remove('open')));

/* === Theme === */
const saved=localStorage.getItem('theme');
if(saved==='dark')document.body.classList.add('dark');
if(theme)theme.addEventListener('click',()=>{document.body.classList.toggle('dark');localStorage.setItem('theme',document.body.classList.contains('dark')?'dark':'light')});

/* === Year === */
const yearEl=document.getElementById('year');
if(yearEl)yearEl.textContent=new Date().getFullYear();

/* === Scroll Reveal === */
const reveals=document.querySelectorAll('.reveal');
if(reveals.length){const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target)}})},{threshold:0.08,rootMargin:'0px 0px -40px 0px'});reveals.forEach(el=>obs.observe(el))}

/* === Back to Top === */
const backTop=document.querySelector('.back-top');
if(backTop){window.addEventListener('scroll',()=>backTop.classList.toggle('show',window.scrollY>500));backTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}))}

/* === Typing Animation === */
const typingEl=document.querySelector('.typing-text');
if(typingEl){
  const words=['Mahasiswa Informatika','Web Developer','Tech Enthusiast','Problem Solver'];
  let wi=0,ci=0,del=false;
  function typ(){
    const w=words[wi];
    if(del){typingEl.textContent=w.substring(0,--ci)}
    else{typingEl.textContent=w.substring(0,++ci)}
    let sp=del?40:100;
    if(!del&&ci===w.length){sp=2000;del=true}
    else if(del&&ci===0){del=false;wi=(wi+1)%words.length;sp=400}
    setTimeout(typ,sp)
  }
  typ()
}

/* === Reading Progress Bar === */
const progressBar=document.querySelector('.progress-bar');
if(progressBar){window.addEventListener('scroll',()=>{const s=document.documentElement.scrollTop,h=document.documentElement.scrollHeight-document.documentElement.clientHeight;if(h>0)progressBar.style.width=(s/h)*100+'%'})}

/* === Share Buttons === */
const shareWA=document.querySelector('.share-btn.whatsapp');
const shareTW=document.querySelector('.share-btn.twitter');
const shareLI=document.querySelector('.share-btn.linkedin');
if(shareWA)shareWA.href='https://wa.me/?text='+encodeURIComponent(document.title+' '+location.href);
if(shareTW)shareTW.href='https://twitter.com/intent/tweet?text='+encodeURIComponent(document.title)+'&url='+encodeURIComponent(location.href);
if(shareLI)shareLI.href='https://www.linkedin.com/sharing/share-offsite/?url='+encodeURIComponent(location.href);
document.querySelectorAll('.share-btn.copy').forEach(btn=>{
  btn.addEventListener('click',e=>{
    e.preventDefault();
    navigator.clipboard.writeText(location.href).then(()=>{
      const o=btn.innerHTML;
      btn.textContent='\u2713 Tersalin!';
      setTimeout(()=>btn.innerHTML=o,2000)
    })
  })
});