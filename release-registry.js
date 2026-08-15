(()=>{
  function enhanceHomepage(){
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

    const band=document.querySelector('.status-band');
    const grid=band?.querySelector('.status-grid');
    if(grid&&!grid.querySelector('[data-engagement-status]')){
      const card=document.createElement('div');
      card.className='status-cell';
      card.dataset.engagementStatus='001';
      card.innerHTML='<span><i class="dot live"></i>Commissioned work / active</span><strong>Founding institutional engagement</strong><small>Regional evidence and decision-support assignment · confidential client · 2026<br><a href="engagements/001/" style="display:inline-block;margin-top:8px;font:600 9px IBM Plex Mono,monospace;text-transform:uppercase">View engagement record →</a></small>';
      grid.appendChild(card);
      grid.style.gridTemplateColumns='1.2fr repeat(5,1fr)';
    }

    const media=window.matchMedia('(max-width:1000px)');
    function responsive(){
      if(!grid)return;
      if(window.matchMedia('(max-width:680px)').matches)grid.style.gridTemplateColumns='1fr';
      else if(media.matches)grid.style.gridTemplateColumns='repeat(2,1fr)';
      else grid.style.gridTemplateColumns='1.2fr repeat(5,1fr)';
    }
    responsive();
    window.addEventListener('resize',responsive,{passive:true});
  }

  enhanceHomepage();

  (async()=>{try{const r=await fetch('/data/releases.json',{cache:'no-store'});if(!r.ok)return;const j=await r.json();const byId=new Map(j.records.map(x=>[x.id,x]));document.querySelectorAll('[data-release-id]').forEach(el=>{const rec=byId.get(el.dataset.releaseId);if(!rec)return;const field=el.dataset.releaseField||'row-value';let value='';if(field==='row-value')value=rec.row_metric?.value;if(field==='version')value=rec.version;if(field==='status')value=rec.status;if(field==='numeric-observations')value=rec.numeric_observations;if(field==='source-links')value=rec.official_release_links;if(field==='source-hash-linked')value=rec.source_hash_linked;if(value!==undefined&&value!==null)el.textContent=typeof value==='number'?value.toLocaleString():value;});}catch(e){console.warn('Release registry unavailable',e)}})();
})();
