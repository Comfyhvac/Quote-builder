/* Homeowner presentation. Deliberately independent of quote state and pricing. */
(() => {
  'use strict';
  const sources = {
    tips: 'https://www.energystar.gov/saveathome/heating-cooling/10-tips-hiring',
    quality: 'https://www.energystar.gov/saveathome/heating-cooling/hvac-quality-installation',
    sizing: 'https://www.energystar.gov/products/air_source_heat_pumps',
    cslb: 'https://www.cslb.ca.gov/consumers/hire_a_contractor/finding_the_right_contractor.aspx',
    company: 'https://www.comfyhvac.com/about/'
  };
  const link = (key, label) => `<a href="${sources[key]}" target="_blank" rel="noopener noreferrer">${label} ↗</a>`;
  const pages = [
    {
      label: 'Our story', title: 'Your home. Our family’s reputation.',
      intro: 'Comfy Heating & Air Conditioning, Inc.',
      body: `<p class="cs-lead">Family owned. Independently operated.<br>Serving the East Bay and Tri-Valley since 2001.</p><p>Comfy began with one HVAC professional working from a storage shed, with a simple ambition: give local families a better experience.</p><p>That same responsibility guides the work we put our name on today.</p><div class="cs-emphasis">Time to get Comfy.</div>`,
      source: link('company', 'The Comfy story')
    },
    {
      label: 'Independent advice', title: 'What the experts tell homeowners',
      intro: 'A good decision starts with the right questions.',
      body: `<dl><div><dt>A home evaluation</dt><dd>ENERGY STAR recommends assessing the home, equipment sizing, ducts, and airflow.</dd></div><div><dt>Verified credentials</dt><dd>California’s contractor board recommends checking the license and verifying insurance.</dd></div><div><dt>A complete written proposal</dt><dd>Compare the scope, efficiency, warranties, and price together.</dd></div></dl><p class="cs-takeaway">The installer’s process deserves as much attention as the equipment.</p>`,
      source: `${link('tips', 'ENERGY STAR: hiring tips')} ${link('cslb', 'CSLB: choosing a contractor')}`
    },
    {
      label: 'Your protection', title: 'Confidence starts before installation',
      intro: 'The paperwork protects more than the project.',
      body: `<dl><div><dt>Current contractor license</dt><dd>Verify the business and appropriate classifications on CSLB. Comfy’s published license number is 894110.</dd></div><div><dt>Workers’ compensation</dt><dd>CSLB says active C-20 HVAC contractors must carry coverage or valid self-insurance, even without employees.</dd></div><div><dt>General liability coverage</dt><dd>Ask for an insurance certificate and verify coverage with the insurance agency.</dd></div></dl><p class="cs-takeaway">CSLB warns that missing workers’ compensation can expose a homeowner to financial liability if a worker is injured.</p>`,
      source: `${link('cslb', 'Read CSLB’s homeowner guidance')} <a href="https://www.cslb.ca.gov/OnlineServices/CheckLicenseII/CheckLicense.aspx" target="_blank" rel="noopener noreferrer">Check any contractor’s license ↗</a>`
    },
    {
      label: 'Comparing proposals', title: 'The price only tells part of the story',
      intro: 'A lower bid deserves a closer comparison.',
      body: `<p class="cs-lead">What work does each price actually include?</p><ul><li>A documented load calculation and equipment selection</li><li>Duct evaluation and any needed airflow corrections</li><li>Permit responsibilities and required testing</li><li>Startup measurements and written warranty coverage</li></ul><p>CSLB recommends comparing identical scopes and cautions that an unusually low bid may omit work or lead to a dispute.</p><p class="cs-takeaway">A missing step can become a later expense. Let’s make the differences visible.</p>`,
      source: `${link('cslb', 'CSLB: comparing bids')} ${link('quality', 'ENERGY STAR: quality installation')}`
    },
    {
      label: 'Installation quality', title: 'The Comfy installation standard',
      intro: 'Quality should be something you can verify.',
      body: `<div class="cs-steps"><div><span>01</span><h3>Design for your home</h3><p>Manual J load calculation, equipment selection, and duct evaluation.</p></div><div><span>02</span><h3>Protect your investment</h3><p>Manufacturer installation procedures, secure supports, and appropriate drain protection.</p></div><div><span>03</span><h3>Measure performance</h3><p>Airflow and refrigerant checks using the equipment manufacturer’s procedures.</p></div><div><span>04</span><h3>Complete the handoff</h3><p>Documented startup, thermostat instruction, and written warranty information.</p></div></div><p class="cs-takeaway">Your proposal defines the work. The completed checks demonstrate the result.</p>`,
      source: `${link('quality', 'ENERGY STAR: installation fundamentals')} ${link('sizing', 'ENERGY STAR: Manual J sizing')}`
    },
    {
      label: 'Your comfort plan', title: 'A system built around your priorities',
      intro: 'Our values guide the conversation.',
      body: `<dl><div><dt>Honesty</dt><dd>Clear recommendations and a written explanation of what your investment includes.</dd></div><div><dt>Craftsmanship</dt><dd>Attention to the installation details that affect everyday comfort.</dd></div><div><dt>Accountability</dt><dd>A local family business with a reputation attached to the work.</dd></div></dl><p class="cs-lead">Which matters most in your home?</p><p>More even temperatures? Quieter operation? Energy use? Monthly budget? Let’s build your options around what matters to you.</p>`,
      source: link('company', 'Meet Comfy')
    }
  ];
  const style = document.createElement('link');
  style.rel = 'stylesheet'; style.href = 'company-story.css'; document.head.append(style);
  const launch = document.createElement('button');
  launch.type = 'button'; launch.className = 'cs-launch'; launch.textContent = 'Why Comfy';
  launch.setAttribute('aria-haspopup', 'dialog');
  document.querySelector('.top').append(launch);
  const dialog = document.createElement('dialog');
  dialog.className = 'cs-dialog'; dialog.setAttribute('aria-labelledby', 'cs-title');
  dialog.innerHTML = `<div class="cs-shell"><header class="cs-header"><div class="cs-brand"></div><button type="button" class="cs-close">Return to estimate ×</button></header><nav class="cs-nav" aria-label="Presentation pages">${pages.map((p,i)=>`<button type="button" data-page="${i}" aria-label="Page ${i+1}: ${p.label}">${String(i+1).padStart(2,'0')} <span>${p.label}</span></button>`).join('')}</nav><main class="cs-content" tabindex="-1"></main><footer class="cs-footer"><button type="button" class="cs-back">Back</button><p class="cs-progress" aria-live="polite" aria-atomic="true"></p><button type="button" class="cs-next">Next</button></footer></div>`;
  document.body.append(dialog);
  const logo = document.querySelector('.logo-main').cloneNode(true);
  logo.removeAttribute('id'); dialog.querySelector('.cs-brand').append(logo);
  const content = dialog.querySelector('.cs-content');
  let page = 0;
  function render(focus = false) {
    const p = pages[page];
    content.innerHTML = `<p class="cs-label">${p.label}</p><h1 id="cs-title">${p.title}</h1><p class="cs-intro">${p.intro}</p><section class="cs-body">${p.body}</section><aside class="cs-sources" aria-label="Independent reading">${p.source}<small>Sources provide general guidance, not an endorsement of Comfy.</small></aside>`;
    dialog.querySelector('.cs-back').disabled = page === 0;
    dialog.querySelector('.cs-next').textContent = page === 5 ? 'Build your system' : 'Next';
    dialog.querySelector('.cs-progress').textContent = `${page+1} of ${pages.length}`;
    dialog.querySelectorAll('[data-page]').forEach((b,i)=>{
      if(i === page) b.setAttribute('aria-current','step'); else b.removeAttribute('aria-current');
    });
    content.scrollTop = 0;
    if(focus) content.focus();
  }
  function close(){dialog.close(); launch.focus();}
  launch.addEventListener('click',()=>{page=0;render();dialog.showModal();dialog.querySelector('.cs-close').focus();});
  dialog.querySelector('.cs-close').addEventListener('click',close);
  dialog.querySelector('.cs-back').addEventListener('click',()=>{if(page>0){page--;render(true);}});
  dialog.querySelector('.cs-next').addEventListener('click',()=>{if(page<5){page++;render(true);}else close();});
  dialog.querySelectorAll('[data-page]').forEach(b=>b.addEventListener('click',()=>{page=Number(b.dataset.page);render(true);}));
  dialog.addEventListener('cancel',e=>{e.preventDefault();close();});
  dialog.addEventListener('keydown',e=>{
    if(e.target.closest('a,button,input,select,textarea')) return;
    if(e.key==='ArrowRight' && page<5){e.preventDefault();page++;render(true);}
    if(e.key==='ArrowLeft' && page>0){e.preventDefault();page--;render(true);}
  });
})();
