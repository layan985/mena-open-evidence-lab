(()=>{
  function addNavLinks(){
    const links=[
      ['Research','research.html'],
      ['Data','data.html'],
      ['Intelligence','intelligence.html'],
      ['Publications','publications.html'],
      ['Client Work','client-work.html'],
      ['Methods','methods.html'],
      ['Validation','validation.html'],
      ['People','people.html'],
      ['Governance','governance.html'],
      ['Funding','funding.html'],
      ['Work With Us','work-with-us.html'],
      ['Contribute','contribute.html']
    ];
    document.querySelectorAll('.home-nav nav,.footer-nav').forEach(nav=>{
      nav.innerHTML='';
      links.forEach(([label,href])=>{
        const a=document.createElement('a');a.href=href;a.textContent=label;nav.appendChild(a);
      });
    });
  }

  function enhanceHomepage(){
    addNavLinks();
    const heroActions=document.querySelector('.hero-cta');
    if(heroActions&&!heroActions.querySelector('[data-commission-engagement]')){
      const a=document.createElement('a');
      a.href='work-with-us.html';
      a.dataset.commissionEngagement='true';
      a.textContent='Commission an evidence engagement';
      heroActions.appendChild(a);
    }

    const heroNote=document.querySelector('.hero-side-note');
    if(heroNote&&heroNote.closest('.hero-main')){
      heroNote.textContent='Public infrastructure · commissioned evidence · reproducibility · external review';
    }
  }

  function setGridColumns(grid){
    if(!grid)return;
    if(window.matchMedia('(max-width:680px)').matches)grid.style.gridTemplateColumns='1fr';
    else if(window.matchMedia('(max-width:1000px)').matches)grid.style.gridTemplateColumns='repeat(2,1fr)';
    else grid.style.gridTemplateColumns=grid.querySelector('[data-engagement-status]')?'1.2fr repeat(5,1fr)':'1.2fr repeat(4,1fr)';
  }

  async function loadReleases(){
    try{
      const r=await fetch('/data/releases.json',{cache:'no-store'});
      if(!r.ok)return;
      const j=await r.json();
      const byId=new Map(j.records.map(x=>[x.id,x]));
      document.querySelectorAll('[data-release-id]').forEach(el=>{
        const rec=byId.get(el.dataset.releaseId);
        if(!rec)return;
        const field=el.dataset.releaseField||'row-value';
        let value='';
        if(field==='row-value')value=rec.row_metric?.value;
        if(field==='version')value=rec.version;
        if(field==='status')value=rec.status;
        if(field==='numeric-observations')value=rec.numeric_observations;
        if(field==='source-links')value=rec.official_release_links;
        if(field==='source-hash-linked')value=rec.source_hash_linked;
        if(value!==undefined&&value!==null)el.textContent=typeof value==='number'?value.toLocaleString():value;
      });
    }catch(e){console.warn('Release registry unavailable',e)}
  }

  async function loadEngagements(){
    const grid=document.querySelector('.status-band .status-grid');
    if(!grid)return;
    try{
      const r=await fetch('/data/engagements.json',{cache:'no-store'});
      if(!r.ok)return;
      const j=await r.json();
      const active=j.records.find(x=>x.status==='active'&&x.public_record);
      if(!active)return;
      let card=grid.querySelector('[data-engagement-status]');
      if(!card){
        card=document.createElement('div');
        card.className='status-cell';
        card.dataset.engagementStatus=active.id;
        grid.appendChild(card);
      }
      card.innerHTML=`<span><i class="dot live"></i>Commissioned work / ${active.status}</span><strong>${active.serial}</strong><small>${active.public_title} · ${active.client_disclosure} client · ${active.year}<br><a href="${active.public_record}" style="display:inline-block;margin-top:8px;font:600 9px IBM Plex Mono,monospace;text-transform:uppercase">View engagement record →</a></small>`;
      setGridColumns(grid);
    }catch(e){console.warn('Engagement registry unavailable',e)}
  }

  enhanceHomepage();
  loadReleases();
  loadEngagements();
  const grid=document.querySelector('.status-band .status-grid');
  setGridColumns(grid);
  window.addEventListener('resize',()=>setGridColumns(grid),{passive:true});
})();