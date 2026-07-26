/**
 * Sanjana Krishnan — Author Website
 * Vanilla JS: navigation, scroll effects, reveal animations,
 * animated counters/bars, gallery lightbox, contact form.
 */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.addEventListener("DOMContentLoaded", function () {
    setYear();
    setActiveNavLink();
    initNavToggle();
    initHeaderScroll();
    initRevealAnimations();
    initCounters();
    initBars();
    initGalleryLightbox();
    initContactForm();
  });

  function setYear() {
    var el = document.getElementById("year");
    if (el) el.textContent = new Date().getFullYear();
  }

  function setActiveNavLink() {
    var path = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".main-nav a").forEach(function (link) {
      var href = link.getAttribute("href");
      if (href === path) {
        link.setAttribute("aria-current", "page");
      }
    });
  }

  function initNavToggle() {
    var toggle = document.getElementById("nav-toggle");
    var nav = document.getElementById("main-nav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
        toggle.focus();
      }
    });
  }

  function initHeaderScroll() {
    var header = document.getElementById("site-header");
    if (!header) return;
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function initRevealAnimations() {
    var targets = document.querySelectorAll(".reveal");
    if (!targets.length) return;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      targets.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    targets.forEach(function (el) { observer.observe(el); });
  }

  function initCounters() {
    var counters = document.querySelectorAll("[data-counter]");
    if (!counters.length) return;

    var animate = function (el) {
      var target = parseFloat(el.getAttribute("data-counter"));
      if (reduceMotion) {
        el.textContent = target;
        return;
      }
      var duration = 1400;
      var start = null;

      var step = function (timestamp) {
        if (start === null) start = timestamp;
        var progress = Math.min((timestamp - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        var value = Math.floor(eased * target);
        el.textContent = value.toLocaleString();
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          el.textContent = target.toLocaleString();
        }
      };
      window.requestAnimationFrame(step);
    };

    if (!("IntersectionObserver" in window)) {
      counters.forEach(animate);
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animate(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach(function (el) { observer.observe(el); });
  }

  function initBars() {
    var bars = document.querySelectorAll("[data-bar-fill]");
    if (!bars.length) return;

    var fill = function (el) {
      el.style.width = el.getAttribute("data-bar-fill") + "%";
    };

    if (reduceMotion || !("IntersectionObserver" in window)) {
      bars.forEach(fill);
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            fill(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    bars.forEach(function (el) { observer.observe(el); });
  }

  function initGalleryLightbox() {
    var items = document.querySelectorAll("[data-lightbox-trigger]");
    var lightbox = document.getElementById("lightbox");
    if (!items.length || !lightbox) return;

    var visual = lightbox.querySelector(".lightbox-visual");
    var title = lightbox.querySelector(".lightbox-title");
    var desc = lightbox.querySelector(".lightbox-desc");
    var closeBtn = lightbox.querySelector(".lightbox-close");
    var lastFocused = null;

    var open = function (item) {
      lastFocused = document.activeElement;
      var src = item.getAttribute("data-src");
      var video = item.getAttribute("data-video");
      visual.innerHTML = "";
      visual.classList.remove("lightbox-visual-media");
      if (src) {
        var img = document.createElement("img");
        img.src = src;
        img.alt = item.getAttribute("data-title") || "";
        var rotate = item.getAttribute("data-rotate");
        if (rotate) img.style.transform = "rotate(" + rotate + ")";
        visual.appendChild(img);
        visual.classList.add("lightbox-visual-media");
      } else if (video) {
        var vid = document.createElement("video");
        vid.src = video;
        vid.controls = true;
        vid.setAttribute("playsinline", "");
        visual.appendChild(vid);
        visual.classList.add("lightbox-visual-media");
      } else {
        visual.textContent = item.getAttribute("data-icon") || "🖼️";
      }
      title.textContent = item.getAttribute("data-title") || "";
      desc.textContent = item.getAttribute("data-desc") || "";
      lightbox.classList.add("is-open");
      closeBtn.focus();
      document.body.style.overflow = "hidden";
    };

    var close = function () {
      lightbox.classList.remove("is-open");
      document.body.style.overflow = "";
      var playing = visual.querySelector("video");
      if (playing) playing.pause();
      if (lastFocused) lastFocused.focus();
    };

    items.forEach(function (item) {
      item.addEventListener("click", function () { open(item); });
    });

    closeBtn.addEventListener("click", close);
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) close();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && lightbox.classList.contains("is-open")) close();
    });
  }

  function initContactForm() {
    var form = document.getElementById("contact-form");
    if (!form) return;
    var status = document.getElementById("form-status");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.querySelector("#name");
      var email = form.querySelector("#email");
      var message = form.querySelector("#message");
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      var isValid =
        name.value.trim().length > 1 &&
        emailPattern.test(email.value.trim()) &&
        message.value.trim().length > 5;

      status.classList.remove("is-success", "is-error");

      if (!isValid) {
        status.textContent =
          "Please fill in your name, a valid email address, and a short message before sending.";
        status.classList.add("is-error");
        status.focus();
        return;
      }

      var data = new FormData(form);
      var submitBtn = form.querySelector("button[type='submit']");
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";

      fetch(form.action, {
        method: "POST",
        body: data,
        headers: { "Accept": "application/json" }
      }).then(function (response) {
        if (response.ok) {
          status.textContent = "Thank you, " + name.value.trim().split(" ")[0] + "! Your message has been sent.";
          status.classList.add("is-success");
          form.reset();
        } else {
          return response.json().then(function (json) {
            var errors = json.errors ? json.errors.map(function (err) { return err.message; }).join(", ") : "Something went wrong.";
            status.textContent = errors;
            status.classList.add("is-error");
          });
        }
      }).catch(function () {
        status.textContent = "Network error — please try again.";
        status.classList.add("is-error");
      }).finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = "Send Message";
        status.setAttribute("tabindex", "-1");
        status.focus();
      });
    });
  }
})();
