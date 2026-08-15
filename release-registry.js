(()=>{
  function addNavLinks(){
    const links=[
      ['Programs','programs.html'],
      ['Country rooms','countries.html'],
      ['Methods','methods.html']
    ];
    document.querySelectorAll('.home-nav nav,.footer-nav').forEach(nav=>{
      links.forEach(([label,href])=>{
        if(![...nav.querySelectorAll('a')].some(a=>a.getAttribute('href')===href)){
          const a=document.createElement('a');a.href=href;a.textContent=label;nav.insertBefore(a,nav.firstChild);
        }
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

  function humanDate(value){
    if(!value)return '';
    const d=new Date(`${value}T00:00:00Z`);
    if(Number.isNaN(d.getTime()))return value;
    return new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'}).format(d);
  }

  function releaseField(rec,field){
    const fields={
      'row-value':()=>rec.row_metric?.value,
      'row-label':()=>rec.row_metric?.label,
      'version':()=>rec.version,
      'status':()=>rec.status,
      'numeric-observations':()=>rec.numeric_observations,
      'source-links':()=>rec.official_release_links,
      'source-hash-linked':()=>rec.source_hash_linked,
      'target-firm-years':()=>rec.target_firm_years,
      'release-date':()=>humanDate(rec.release_date),
      'coverage-note':()=>rec.coverage_note,
      'reviewers':()=>rec.reviewers,
      'validation-level':()=>Array.isArray(rec.validation_level)?rec.validation_level.join(' · '):''
    };
    return fields[field]?.();
  }

  function setReleaseElements(byId){
    document.querySelectorAll('[data-release-id]').forEach(el=>{
      const rec=byId.get(el.dataset.releaseId);
      if(!rec)return;
      const field=el.dataset.releaseField||'row-value';
      const value=releaseField(rec,field);
      if(value!==undefined&&value!==null&&value!==''){
        el.textContent=typeof value==='number'?value.toLocaleString():value;
      }
    });

    document.querySelectorAll('[data-release-status-class]').forEach(el=>{
      const rec=byId.get(el.dataset.releaseStatusClass);
      if(!rec)return;
      const pending=['release-candidate','collection-in-progress','scheduled'].includes(rec.status);
      el.classList.toggle('open',pending);
    });
  }

  async function loadReleases(){
    try{
      const r=await fetch('/data/releases.json',{cache:'no-store'});
      if(!r.ok)throw new Error(`HTTP ${r.status}`);
      const j=await r.json();
      const byId=new Map(j.records.map(x=>[x.id,x]));
      setReleaseElements(byId);
      document.documentElement.dataset.releaseRegistry='loaded';
    }catch(e){
      console.warn('Release registry unavailable',e);
      document.documentElement.dataset.releaseRegistry='unavailable';
      document.querySelectorAll('[data-release-id]').forEach(el=>{
        if(el.textContent.trim()==='…')el.textContent='registry unavailable';
      });
    }
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
