const services = [
  {id:1,title:"Calculus concepts, made clearer",category:"Tutoring",type:"Peer tutoring",description:"One-to-one help with calculus fundamentals, worked examples, and exam preparation.",name:"Aarav Sharma",initials:"AS",rating:4.9,reviews:28,price:199,unit:"session",distance:"0.8 km away",className:"tutoring",avatar:"",label:"POPULAR",symbol:"∫",sample:"Sample lesson"},
  {id:2,title:"Proofreading & writing feedback",category:"Proofreading",type:"Proofreading",description:"Get helpful feedback on clarity, grammar, structure, and citations for your own writing.",name:"Riya Kapoor",initials:"RK",rating:4.8,reviews:19,price:35,unit:"page",distance:"1.2 km away",className:"proofreading",avatar:"pink",label:"QUICK TURNAROUND",symbol:"Aa",sample:"Feedback sample"},
  {id:3,title:"Clean document formatting",category:"Formatting",type:"Formatting",description:"Consistent headings, page layout, tables, references, and polished document presentation.",name:"Mehul Patel",initials:"MP",rating:4.9,reviews:16,price:25,unit:"page",distance:"1.5 km away",className:"formatting",avatar:"purple",label:"NEAT & TIDY",symbol:"▤",sample:"Layout preview"},
  {id:4,title:"Handwritten revision notes",category:"Handwritten notes",type:"Handwritten notes",description:"Readable, organised revision notes from approved study topics, with sample pages to review.",name:"Sana Khan",initials:"SK",rating:5.0,reviews:34,price:18,unit:"page",distance:"0.6 km away",className:"notes",avatar:"yellow",label:"HANDWRITTEN",symbol:"✎",sample:"Handwriting sample"},
  {id:5,title:"Programming study buddy",category:"Tutoring",type:"Peer tutoring",description:"Walk through programming concepts, debug your own code, and practise problem-solving.",name:"Dev Malhotra",initials:"DM",rating:4.7,reviews:12,price:249,unit:"session",distance:"2.1 km away",className:"guidance",avatar:"blue",label:"PROJECT SUPPORT",symbol:"{ }",sample:"Code sample"},
  {id:6,title:"Study notes transcription",category:"Handwritten notes",type:"Handwritten notes",description:"Turn your own rough study notes into a clearer, well-organised handwritten set.",name:"Ishita Rao",initials:"IR",rating:4.8,reviews:21,price:20,unit:"page",distance:"1.0 km away",className:"writing",avatar:"green",label:"STUDENT FAVOURITE",symbol:"✧",sample:"Page preview"}
];

const grid = document.getElementById("serviceGrid");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const resultsCount = document.getElementById("resultsCount");
const emptyState = document.getElementById("emptyState");
const categoryCards = [...document.querySelectorAll(".category-card")];
let activeCategory = "All services";
let activeModalMode = "request";
let toastTimer;

function renderServices() {
  const query = searchInput.value.trim().toLowerCase();
  let filtered = services.filter(service => {
    const categoryMatches = activeCategory === "All services" || service.category === activeCategory;
    const text = `${service.title} ${service.description} ${service.name} ${service.category} ${service.type}`.toLowerCase();
    return categoryMatches && text.includes(query);
  });
  if (sortSelect.value === "price-low") filtered.sort((a,b) => a.price-b.price);
  if (sortSelect.value === "rating") filtered.sort((a,b) => b.rating-a.rating);
  resultsCount.textContent = `${filtered.length} ${filtered.length === 1 ? "service" : "services"}`;
  emptyState.classList.toggle("hidden", filtered.length > 0);
  grid.classList.toggle("hidden", filtered.length === 0);
  grid.innerHTML = filtered.map(service => `
    <article class="service-card">
      <div class="service-cover cover-${service.className}">
        <div class="cover-decoration"></div>
        <span class="cover-label">${service.label}</span>
        <span class="cover-symbol">${service.symbol}</span>
        <span class="sample-chip">▧ ${service.sample}</span>
      </div>
      <div class="service-body">
        <div class="service-meta"><span class="service-category">${service.type}</span><span class="rating">★ ${service.rating.toFixed(1)} <span style="color:#9aabab;font-weight:500">(${service.reviews})</span></span></div>
        <h3>${escapeHtml(service.title)}</h3>
        <p class="service-description">${escapeHtml(service.description)}</p>
        <div class="provider-row">
          <span class="provider-avatar ${service.avatar}">${service.initials}</span>
          <span class="provider-info"><b>${escapeHtml(service.name)}</b><small>Student provider · Sample profile</small></span>
          <span class="distance">⌖ ${service.distance}</span>
        </div>
        <div class="service-bottom">
          <span class="price"><span class="price-label">Starting at</span><strong>₹${service.price}<small> / ${service.unit}</small></strong></span>
          <button class="view-btn" data-service-id="${service.id}">View details ↗</button>
        </div>
      </div>
    </article>`).join("");
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[char]));
}

categoryCards.forEach(card => card.addEventListener("click", () => {
  activeCategory = card.dataset.category;
  categoryCards.forEach(item => item.classList.toggle("selected", item === card));
  renderServices();
  document.getElementById("services").scrollIntoView({behavior:"smooth",block:"start"});
}));
searchInput.addEventListener("input", renderServices);
sortSelect.addEventListener("change", renderServices);
document.getElementById("resetFiltersBtn").addEventListener("click", () => {
  activeCategory = "All services";
  searchInput.value = "";
  sortSelect.value = "recommended";
  categoryCards.forEach(item => item.classList.toggle("selected", item.dataset.category === activeCategory));
  renderServices();
});

const backdrop = document.getElementById("modalBackdrop");
const modalTitle = document.getElementById("modalTitle");
const modalIntro = document.getElementById("modalIntro");
const modalKicker = document.getElementById("modalKicker");
const requestForm = document.getElementById("requestForm");
const successPanel = document.getElementById("successPanel");
const formSubmitBtn = document.getElementById("formSubmitBtn");

function openModal(mode="request", service=null) {
  activeModalMode = mode;
  requestForm.reset();
  requestForm.classList.remove("hidden");
  successPanel.classList.add("hidden");
  if (mode === "provider") {
    modalKicker.textContent = "SHARE YOUR SKILLS";
    modalTitle.textContent = "Become a PageMate provider";
    modalIntro.textContent = "Tell us about the service you can offer. This is a local prototype form.";
    requestForm.querySelector('[name="service"]').innerHTML = '<option value="">Choose a service</option><option>Peer tutoring</option><option>Proofreading</option><option>Formatting</option><option>Handwritten study notes</option><option>Other learning support</option>';
    formSubmitBtn.textContent = "Create demo profile →";
  } else if (mode === "login") {
    modalKicker.textContent = "WELCOME BACK";
    modalTitle.textContent = "Log in to PageMate";
    modalIntro.textContent = "Login is a preview only; accounts are not connected yet.";
    requestForm.querySelector('[name="service"]').innerHTML = '<option value="Login preview">Login preview</option>';
    requestForm.querySelector('[name="details"]').placeholder = "For this demo, enter any short message.";
    formSubmitBtn.textContent = "Continue in demo →";
  } else if (mode === "service" && service) {
    modalKicker.textContent = "SERVICE DETAILS";
    modalTitle.textContent = service.title;
    modalIntro.textContent = `${service.name} · ★ ${service.rating} · ${service.distance}. Starting at ₹${service.price} per ${service.unit}.`;
    requestForm.querySelector('[name="service"]').innerHTML = `<option selected>${escapeHtml(service.type)}</option><option>Peer tutoring</option><option>Proofreading</option><option>Formatting</option><option>Handwritten study notes</option>`;
    requestForm.querySelector('[name="details"]').placeholder = `Ask ${service.name} about availability, sample work, or the service scope.`;
    formSubmitBtn.textContent = "Send demo enquiry →";
  } else {
    modalKicker.textContent = "LET'S GET STARTED";
    modalTitle.textContent = "Post a support request";
    modalIntro.textContent = "Tell the PageMate community what kind of support you need.";
    requestForm.querySelector('[name="service"]').innerHTML = '<option value="">Choose a service</option><option>Peer tutoring</option><option>Proofreading</option><option>Formatting</option><option>Handwritten study notes</option><option>Other learning support</option>';
    requestForm.querySelector('[name="details"]').placeholder = "Describe the topic, timeline, and type of support you need.";
    formSubmitBtn.textContent = "Create demo request →";
  }
  backdrop.classList.remove("hidden");
  document.body.style.overflow = "hidden";
  setTimeout(() => requestForm.querySelector('[name="name"]').focus(), 50);
}
function closeModal() {
  backdrop.classList.add("hidden");
  document.body.style.overflow = "";
}
document.getElementById("heroRequestBtn").addEventListener("click", () => openModal("request"));
document.getElementById("headerRequestBtn").addEventListener("click", () => openModal("request"));
document.getElementById("providerBtn").addEventListener("click", () => openModal("provider"));
document.getElementById("loginBtn").addEventListener("click", () => openModal("login"));
document.getElementById("modalClose").addEventListener("click", closeModal);
document.getElementById("successCloseBtn").addEventListener("click", closeModal);
backdrop.addEventListener("click", event => { if (event.target === backdrop) closeModal(); });
document.addEventListener("keydown", event => { if (event.key === "Escape" && !backdrop.classList.contains("hidden")) closeModal(); });
grid.addEventListener("click", event => {
  const button = event.target.closest("[data-service-id]");
  if (!button) return;
  const service = services.find(item => item.id === Number(button.dataset.serviceId));
  if (service) openModal("service", service);
});
requestForm.addEventListener("submit", event => {
  event.preventDefault();
  if (!requestForm.reportValidity()) return;
  const data = Object.fromEntries(new FormData(requestForm).entries());
  // Demo-only: no data is sent to a server or shared with other users.
  try {
    const saved = JSON.parse(sessionStorage.getItem("pagemateDemoEntries") || "[]");
    saved.push({mode:activeModalMode, ...data, createdAt:new Date().toISOString()});
    sessionStorage.setItem("pagemateDemoEntries", JSON.stringify(saved));
  } catch (error) {
    // The demo still confirms locally if browser storage is unavailable.
  }
  requestForm.classList.add("hidden");
  successPanel.classList.remove("hidden");
  successPanel.querySelector("h3").textContent = activeModalMode === "provider" ? "Demo profile created" : activeModalMode === "login" ? "Preview login complete" : "Request saved in this demo";
  successPanel.querySelector("p").textContent = "This is a front-end prototype. The entry is stored only in this browser session when storage is available. Add a backend and authentication before using it with real users.";
});
document.getElementById("menuToggle").addEventListener("click", () => {
  const nav = document.querySelector(".desktop-nav");
  const open = nav.classList.toggle("mobile-open");
  document.getElementById("menuToggle").setAttribute("aria-expanded", String(open));
});
document.querySelectorAll(".desktop-nav a").forEach(link => link.addEventListener("click", () => {
  document.querySelector(".desktop-nav").classList.remove("mobile-open");
  document.getElementById("menuToggle").setAttribute("aria-expanded", "false");
}));
document.getElementById("year").textContent = new Date().getFullYear();
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
}
renderServices();
