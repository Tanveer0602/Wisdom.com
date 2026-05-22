const quotes = [
  { author: "Prophet Muhammad ﷺ", tag: "Compassion", text: "The merciful are shown mercy by the Most Merciful." },
  { author: "Prophet Muhammad ﷺ", tag: "Character", text: "The best among you are those who have the best manners and character." },
  { author: "Prophet Muhammad ﷺ", tag: "Faith", text: "None of you truly believes until he loves for his brother what he loves for himself." },
  { author: "Prophet Muhammad ﷺ", tag: "Purpose", text: "Actions are judged by intentions." },
  { author: "Abu Bakr (RA)", tag: "Truth", text: "Truthfulness is trust, and lying is treachery." },
  { author: "Abu Bakr (RA)", tag: "Humility", text: "Without knowledge, action is useless; and knowledge without action is futile." },
  { author: "Umar ibn al-Khattab (RA)", tag: "Justice", text: "The best way to defeat someone is to beat him at politeness." },
  { author: "Umar ibn al-Khattab (RA)", tag: "Accountability", text: "Take account of yourselves before you are taken to account." },
  { author: "Uthman ibn Affan (RA)", tag: "Inner Peace", text: "If our hearts were pure, we would never tire of the words of Allah." },
  { author: "Uthman ibn Affan (RA)", tag: "Speech", text: "A believer's tongue is behind his heart." },
  { author: "Ali ibn Abi Talib (RA)", tag: "Wisdom", text: "The tongue is like a lion; if you let it loose, it will wound someone." },
  { author: "Ali ibn Abi Talib (RA)", tag: "Patience", text: "Patience is of two kinds: patience over what pains you, and patience against what you covet." }
];

const quoteGrid = document.getElementById("quoteGrid");
const search = document.getElementById("search");
const filters = document.getElementById("filters");
const template = document.getElementById("quoteCardTemplate");

let activeAuthor = "All";

const authors = ["All", ...new Set(quotes.map((q) => q.author))];

function renderFilters() {
  filters.innerHTML = "";
  authors.forEach((author) => {
    const btn = document.createElement("button");
    btn.className = `filter-btn ${activeAuthor === author ? "active" : ""}`;
    btn.textContent = author;
    btn.addEventListener("click", () => {
      activeAuthor = author;
      renderFilters();
      renderQuotes();
    });
    filters.appendChild(btn);
  });
}

function renderQuotes() {
  const term = search.value.toLowerCase().trim();
  quoteGrid.innerHTML = "";

  const visible = quotes.filter((q) => {
    const byAuthor = activeAuthor === "All" || q.author === activeAuthor;
    const matchesTerm = [q.author, q.tag, q.text].join(" ").toLowerCase().includes(term);
    return byAuthor && matchesTerm;
  });

  if (!visible.length) {
    quoteGrid.innerHTML = `<p class="glass" style="padding: 1rem; border-radius: 14px;">No quotes matched your search.</p>`;
    return;
  }

  visible.forEach((quote, index) => {
    const fragment = template.content.cloneNode(true);
    fragment.querySelector(".quote-card__author").textContent = quote.author;
    fragment.querySelector(".quote-card__tag").textContent = quote.tag;
    fragment.querySelector(".quote-card__text").textContent = `“${quote.text}”`;
    const card = fragment.querySelector(".quote-card");
    card.style.animationDelay = `${index * 45}ms`;
    quoteGrid.appendChild(fragment);
  });
}

search.addEventListener("input", renderQuotes);

renderFilters();
renderQuotes();
