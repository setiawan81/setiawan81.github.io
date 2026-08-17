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

/* === Search & Filter Articles === */
const searchInput = document.getElementById('search-input');
const filterBtns = document.querySelectorAll('.filter-btn');
const postsContainer = document.querySelector('.posts');
const postArticles = document.querySelectorAll('.posts article');

if (searchInput && postsContainer && postArticles.length > 0) {
  function filterPosts() {
    const query = searchInput.value.toLowerCase().trim();
    const activeBtn = document.querySelector('.filter-btn.active');
    const selectedCategory = activeBtn ? activeBtn.getAttribute('data-category').toLowerCase() : 'all';

    postArticles.forEach(article => {
      const categoryEl = article.querySelector('small');
      const titleEl = article.querySelector('h3');
      const descEl = article.querySelector('p');

      const categoryText = categoryEl ? categoryEl.textContent.toLowerCase().split('·')[0].trim() : '';
      const titleText = titleEl ? titleEl.textContent.toLowerCase() : '';
      const descText = descEl ? descEl.textContent.toLowerCase() : '';

      const matchesQuery = titleText.includes(query) || descText.includes(query);
      const matchesCategory = selectedCategory === 'all' || categoryText === selectedCategory;

      if (matchesQuery && matchesCategory) {
        article.style.display = '';
      } else {
        article.style.display = 'none';
      }
    });

    let visibleCount = 0;
    postArticles.forEach(a => { if (a.style.display !== 'none') visibleCount++; });

    let noResultMsg = document.getElementById('no-posts-found');
    if (visibleCount === 0) {
      if (!noResultMsg) {
        noResultMsg = document.createElement('div');
        noResultMsg.id = 'no-posts-found';
        noResultMsg.style.cssText = 'grid-column: 1 / -1; text-align: center; padding: 45px 20px; color: var(--muted); font-size: 15px; font-weight: 600;';
        noResultMsg.innerHTML = '🔍 Tidak ada artikel yang cocok dengan pencarian Anda.';
        postsContainer.appendChild(noResultMsg);
      }
    } else if (noResultMsg) {
      noResultMsg.remove();
    }
  }

  searchInput.addEventListener('input', filterPosts);

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterPosts();
    });
  });
}

/* === Code Blocks & Copy Code Button === */
const preBlocks = document.querySelectorAll('pre');
if (preBlocks.length > 0) {
  // Wrap Quill-specific <pre class="ql-syntax"> into <pre><code> for Prism compatibility
  preBlocks.forEach(pre => {
    if (!pre.querySelector('code')) {
      const code = document.createElement('code');
      code.className = 'language-javascript';
      code.innerHTML = pre.innerHTML;
      pre.innerHTML = '';
      pre.appendChild(code);
    }
  });

  // Load Prism JS and Tomorrow Night CSS dynamically
  const prismCss = document.createElement('link');
  prismCss.rel = 'stylesheet';
  prismCss.href = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css';
  document.head.appendChild(prismCss);

  const prismJs = document.createElement('script');
  prismJs.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js';
  prismJs.onload = () => {
    if (typeof Prism !== 'undefined') {
      Prism.highlightAll();
    }
  };
  document.head.appendChild(prismJs);

  // Add Copy Button to all pre elements
  preBlocks.forEach(pre => {
    pre.style.position = 'relative';
    
    const copyBtn = document.createElement('button');
    copyBtn.className = 'copy-code-btn';
    copyBtn.innerHTML = `
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
      </svg> Copy
    `;

    copyBtn.addEventListener('click', () => {
      const codeText = pre.querySelector('code') ? pre.querySelector('code').textContent : pre.textContent;
      navigator.clipboard.writeText(codeText).then(() => {
        copyBtn.innerHTML = '✓ Copied!';
        copyBtn.classList.add('copied');
        setTimeout(() => {
          copyBtn.innerHTML = `
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg> Copy
          `;
          copyBtn.classList.remove('copied');
        }, 2000);
      });
    });

    pre.appendChild(copyBtn);
  });
}