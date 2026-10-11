const $ = (s, root=document) => root.querySelector(s);
const money = n => Number(n) > 0 ? "₹" + Number(n).toLocaleString("en-IN") : "Ask for price";
const safe = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const localKey = "mobimania_local_products_v1";
let localProducts = [];
try { localProducts = JSON.parse(localStorage.getItem(localKey) || "[]"); } catch(e) { localProducts = []; }
const allProducts = () => [...localProducts, ...(Array.isArray(PRODUCTS) ? PRODUCTS : [])];
const brands = ["Apple","Samsung","Vivo","Oppo","OnePlus","Nothing","Motorola","Realme","Redmi","iQOO","Google","Other"];
const brandGlyph = b => ({Apple:"●",Samsung:"S",Vivo:"v",Oppo:"O",OnePlus:"1+",Nothing:"N",Motorola:"M",Realme:"R",Redmi:"R",iQOO:"iQ",Google:"G",Other:"+"}[b] || b.slice(0,1));
function productCard(p) {
  const image = p.image || "images/phone-placeholder.svg";
  return `<article class="product-card"><a class="product-image" href="phone.html?id=${encodeURIComponent(p.id)}"><img src="${safe(image)}" alt="${safe(p.brand+" "+p.model)}" loading="lazy" onerror="this.onerror=null;this.src='images/phone-placeholder.svg'"><span class="condition-badge">${safe(p.condition || "Available")}</span></a><div class="product-info"><span class="product-brand">${safe(p.brand)}</span><h3><a href="phone.html?id=${encodeURIComponent(p.id)}">${safe(p.model)}</a></h3><p class="storage">${safe(p.storage || "Storage details on enquiry")}</p><div class="price-row"><strong>${money(p.price)}</strong><a class="arrow-link" href="phone.html?id=${encodeURIComponent(p.id)}" aria-label="View ${safe(p.model)} details">↗</a></div><a class="details-link" href="phone.html?id=${encodeURIComponent(p.id)}">View details →</a></div></article>`;
}
function initHome() {
  if (!$("#productGrid")) return;
  const brandGrid = $("#brandGrid");
  const usedBrands = [...new Set([...brands, ...allProducts().map(p=>p.brand)])];
  brandGrid.innerHTML = usedBrands.map(b=>`<button class="brand-tile" data-brand="${safe(b)}"><span class="brand-glyph">${safe(brandGlyph(b))}</span><b>${safe(b)}</b><span class="brand-tile-arrow">↗</span></button>`).join("");
  $("#brandFilter").innerHTML = '<option value="">All brands</option>' + usedBrands.map(b=>`<option>${safe(b)}</option>`).join("");
  brandGrid.addEventListener("click", e => { const tile=e.target.closest("[data-brand]"); if(tile){$("#brandFilter").value=tile.dataset.brand; renderProducts(); $("#phones").scrollIntoView({behavior:"smooth"});}});
  ["searchInput","brandFilter","conditionFilter","sortFilter"].forEach(id=>$("#"+id).addEventListener(id==="searchInput"?"input":"change",renderProducts));
  $("#clearFilters").addEventListener("click",()=>{$("#searchInput").value="";$("#brandFilter").value="";$("#conditionFilter").value="";$("#sortFilter").value="latest";renderProducts();});
  $("#menuToggle")?.addEventListener("click",()=>$("#mainNav").classList.toggle("open"));
  $("#year").textContent = new Date().getFullYear();
  renderProducts();
  $("#addPhoneForm").addEventListener("submit", addLocalPhone);
  $("#resetLocal").addEventListener("click",()=>{if(confirm("Remove all phones added in this browser?")){localProducts=[];localStorage.removeItem(localKey);renderProducts();$("#formMessage").textContent="Browser-added phones removed."; }});
}
function renderProducts() {
  const grid=$("#productGrid"); if(!grid)return;
  let items=allProducts();
  const q=$("#searchInput").value.trim().toLowerCase(), brand=$("#brandFilter").value, condition=$("#conditionFilter").value, sort=$("#sortFilter").value;
  items=items.filter(p=>(!q||`${p.brand} ${p.model} ${p.storage} ${p.specs}`.toLowerCase().includes(q))&&(!brand||p.brand===brand)&&(!condition||p.condition===condition));
  if(sort==="low")items.sort((a,b)=>(Number(a.price)||Infinity)-(Number(b.price)||Infinity));
  if(sort==="high")items.sort((a,b)=>(Number(b.price)||0)-(Number(a.price)||0));
  $("#resultCount").textContent=`${items.length} phone${items.length===1?"":"s"}`;
  grid.innerHTML=items.map(productCard).join("");
  $("#emptyState").hidden=items.length!==0;
}
function addLocalPhone(e) {
  e.preventDefault(); const form=e.currentTarget, data=new FormData(form);
  const make = image => {
    const p={id:"local-"+Date.now(),brand:data.get("brand").trim(),model:data.get("model").trim(),storage:data.get("storage").trim(),price:Number(data.get("price")),condition:data.get("condition"),age:data.get("age").trim(),specs:data.get("specs").trim()||"Contact the shop for details.",image:image||"images/phone-placeholder.svg"};
    localProducts.unshift(p);
    try { localStorage.setItem(localKey,JSON.stringify(localProducts)); $("#formMessage").textContent="Phone added to this browser. It is not yet published for other visitors."; renderProducts(); form.reset(); }
    catch(err) { localProducts.shift(); $("#formMessage").textContent="Could not save. The photo may be too large; try a smaller image."; }
  };
  const file=data.get("photo");
  if(file && file.size) {
    if(file.size>1500000){$("#formMessage").textContent="Please choose a photo under 1.5 MB.";return;}
    const reader=new FileReader(); reader.onload=()=>make(reader.result); reader.onerror=()=>{$("#formMessage").textContent="Could not read this photo.";}; reader.readAsDataURL(file);
  } else make("");
}
function initDetails() {
  const root=$("#phoneDetails"); if(!root)return;
  $("#year").textContent = new Date().getFullYear();
  const id=new URLSearchParams(location.search).get("id");
  const p=allProducts().find(x=>x.id===id);
  if(!p){root.innerHTML='<div class="not-found"><h2>Phone not found</h2><p>This phone may have been removed or this link is incorrect.</p><a class="btn btn-primary" href="index.html#phones">Browse phones</a></div>';return;}
  const message=encodeURIComponent(`Hello MOBI MANIA, I want to enquire about ${p.brand} ${p.model} (${p.storage||"storage not listed"}), listed at ${money(p.price)}.`);
  root.innerHTML=`<div class="details-photo"><img src="${safe(p.image||"images/phone-placeholder.svg")}" alt="${safe(p.model)}" onerror="this.onerror=null;this.src='images/phone-placeholder.svg'"><span class="condition-badge">${safe(p.condition||"Available")}</span></div><div class="details-content"><span class="eyebrow">${safe(p.brand)} SMARTPHONE</span><h1>${safe(p.model)}</h1><p class="details-storage">${safe(p.storage||"Storage details on enquiry")}</p><div class="details-price">${money(p.price)}</div><div class="detail-facts"><div><small>Brand</small><b>${safe(p.brand)}</b></div><div><small>Condition</small><b>${safe(p.condition||"Ask in shop")}</b></div><div><small>Age / note</small><b>${safe(p.age||"Ask in shop")}</b></div><div><small>Storage</small><b>${safe(p.storage||"Ask in shop")}</b></div></div><h3>Phone details</h3><p class="spec-copy">${safe(p.specs||"Please contact our shop for specifications.")}</p><a class="btn btn-primary full-btn" href="https://wa.me/916290520530?text=${message}" target="_blank" rel="noopener">Enquire on WhatsApp ↗</a><p class="small-note">Availability and final price should be confirmed directly with MOBI MANIA.</p></div>`;
}
initHome(); initDetails();