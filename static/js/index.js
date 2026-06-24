function setActiveTab(button) {
  const targetId = button.dataset.tab;
  const tabGroup = button.closest(".method-layout");

  tabGroup.querySelectorAll(".tab").forEach((tab) => {
    const isActive = tab === button;
    tab.classList.toggle("active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  tabGroup.querySelectorAll(".tab-panel").forEach((panel) => {
    panel.classList.toggle("active", panel.id === targetId);
  });
}

function filterGallery(button) {
  const filter = button.dataset.filter;

  document.querySelectorAll(".gallery-filter").forEach((filterButton) => {
    filterButton.classList.toggle("active", filterButton === button);
  });

  document.querySelectorAll(".gallery-item").forEach((item) => {
    const visible = filter === "all" || item.dataset.category === filter;
    item.hidden = !visible;
  });
}

function copyBibTeX() {
  const bibtex = document.getElementById("bibtex-code");
  const button = document.querySelector(".copy-bibtex-btn");
  const label = button.querySelector("span");
  const text = bibtex ? bibtex.textContent.trim() : "";

  const markCopied = () => {
    button.classList.add("copied");
    label.textContent = "Copied";
    window.setTimeout(() => {
      button.classList.remove("copied");
      label.textContent = "Copy";
    }, 1800);
  };

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(markCopied).catch(() => fallbackCopy(text, markCopied));
  } else {
    fallbackCopy(text, markCopied);
  }
}

function fallbackCopy(text, callback) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
  callback();
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openFigureModal(src, caption, alt) {
  const overlay = document.getElementById("figureModal");
  const image = document.getElementById("figureModalImage");
  const captionEl = document.getElementById("figureModalCaption");

  if (!overlay || !image || !captionEl) return;

  image.src = src;
  image.alt = alt || "";
  captionEl.innerHTML = caption || "";
  overlay.classList.add("is-open");
  overlay.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeFigureModal() {
  const overlay = document.getElementById("figureModal");
  const image = document.getElementById("figureModalImage");
  if (!overlay || !image) return;

  overlay.classList.remove("is-open");
  overlay.setAttribute("aria-hidden", "true");
  image.removeAttribute("src");
  image.alt = "";
  document.body.style.overflow = "";
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => setActiveTab(tab));
  });

  document.querySelectorAll(".gallery-filter").forEach((button) => {
    button.addEventListener("click", () => filterGallery(button));
  });

  const copyButton = document.querySelector(".copy-bibtex-btn");
  if (copyButton) {
    copyButton.addEventListener("click", copyBibTeX);
  }

  const scrollButton = document.querySelector(".scroll-to-top");
  if (scrollButton) {
    scrollButton.addEventListener("click", scrollToTop);
    window.addEventListener("scroll", () => {
      scrollButton.classList.toggle("visible", window.scrollY > 500);
    });
  }

  document.querySelectorAll(".force-card").forEach((card) => {
    card.addEventListener("click", () => {
      const img = card.querySelector("img");
      const figcaption = card.querySelector("figcaption");
      const fullSrc = card.dataset.full || (img ? img.src : "");
      const caption = figcaption ? figcaption.innerHTML : "";
      const alt = img ? img.alt : "";
      openFigureModal(fullSrc, caption, alt);
    });
  });

  const modal = document.getElementById("figureModal");
  const closeButton = document.querySelector(".modal-close");
  if (closeButton) closeButton.addEventListener("click", closeFigureModal);
  if (modal) {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) closeFigureModal();
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeFigureModal();
  });
});
