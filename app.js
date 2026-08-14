async function load(){
 const data=await fetch('data/catalog.json').then(r=>r.json());
 const releases=[];
 data.artists.forEach(a=>a.releases.forEach(r=>releases.push({...r,artist:a.name,artistId:a.id})));
 const grid=document.getElementById('releaseGrid');
 grid.innerHTML=releases.map(r=>`<article class="card">
   <div class="cover" ${r.cover?`style="background-image:url('${r.cover}');background-size:cover;background-position:center"`:''}><span class="status">${r.status}</span></div>
   <h3>${r.title}</h3><p>${r.artist} · ${r.year}</p>
 </article>`).join('');
 document.getElementById('artistList').innerHTML=data.artists.map(a=>`<article class="artist-row"><h3>${a.name}</h3><p>${a.description}<br>${a.releases.length} release${a.releases.length===1?'':'s'} in catalog</p></article>`).join('');
}
load();