/* Talk and Do Steel — interaction layer
   Kept deliberately small: mobile nav, scroll-spy, reveal-on-scroll,
   and turning the quote form into a pre-filled WhatsApp message. */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Mobile navigation ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("primary-nav");

  if (toggle && nav) {
    var setNav = function (open) {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    };

    toggle.addEventListener("click", function () {
      setNav(toggle.getAttribute("aria-expanded") !== "true");
    });

    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setNav(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setNav(false);
    });

    window.matchMedia("(min-width: 901px)").addEventListener("change", function (e) {
      if (e.matches) setNav(false);
    });
  }

  /* ---------- Scroll-spy for the primary nav ---------- */
  var links = Array.prototype.slice.call(document.querySelectorAll(".nav__link"));
  var sections = links
    .map(function (link) {
      var id = link.getAttribute("href");
      return id && id.length > 1 ? document.querySelector(id) : null;
    })
    .filter(Boolean);

  if (sections.length && "IntersectionObserver" in window) {
    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          links.forEach(function (link) {
            link.classList.toggle(
              "is-current",
              link.getAttribute("href") === "#" + entry.target.id
            );
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach(function (section) {
      spy.observe(section);
    });
  }

  /* ---------- Reveal on scroll ---------- */
  if (!reduceMotion && "IntersectionObserver" in window) {
    document.documentElement.classList.add("reveal-ready");
    var revealTargets = document.querySelectorAll(
      ".section__head, .promise__card, .product, .step, .qa, .why, .feed__item, .feed__cta"
    );
    var revealer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
    revealTargets.forEach(function (el) {
      revealer.observe(el);
    });
  }

  /* ---------- Quote form -> WhatsApp ---------- */
  var form = document.querySelector(".qform");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var data = new FormData(form);
      var name = (data.get("name") || "").toString().trim();
      var phone = (data.get("phone") || "").toString().trim();
      var town = (data.get("town") || "").toString().trim();
      var material = (data.get("material") || "").toString().trim();
      var details = (data.get("details") || "").toString().trim();

      var invalid = form.querySelector(":invalid");
      if (invalid) {
        invalid.focus();
        if (typeof form.reportValidity === "function") form.reportValidity();
        return;
      }

      var lines = ["Material list for Talk and Do Steel", ""];
      if (name) lines.push("Name: " + name);
      if (phone) lines.push("Phone: " + phone);
      if (town) lines.push("Delivery town: " + town);
      if (material) lines.push("Material: " + material);
      if (details) lines.push("", "Sizes and quantities:", details);

      var url =
        "https://wa.me/2348030000000?text=" + encodeURIComponent(lines.join("\n"));
      window.open(url, "_blank", "noopener");

      var btn = form.querySelector('button[type="submit"]');
      if (btn) {
        var original = btn.textContent;
        btn.textContent = "Opening WhatsApp…";
        btn.disabled = true;
        window.setTimeout(function () {
          btn.textContent = original;
          btn.disabled = false;
          form.reset();
        }, 2500);
      }
    });
  }

  /* ---------- Footer year ---------- */
  var yearHost = document.querySelector("[data-year]");
  if (yearHost) yearHost.textContent = String(new Date().getFullYear());
})();
