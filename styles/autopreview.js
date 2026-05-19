(function () {
  function wrapIframePreview(iframe) {
    if (!iframe || iframe.dataset.previewWrapped === "true") return;

    const src = iframe.getAttribute("src");
    if (!src) return;

    const title =
      iframe.getAttribute("title") || "Embedded website preview";

    // Outer wrapper
    const wrapper = document.createElement("div");
    wrapper.className = "iframe-preview-wrapper";

    // Header
    const header = document.createElement("div");
    header.className = "iframe-header";

    const label = document.createElement("span");
    label.textContent = "Website preview:";

    const link = document.createElement("a");
    link.href = src;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "View full website in new tab";

    header.append(label, link);

    // Insert wrapper before iframe, then move iframe inside
    const parent = iframe.parentNode;
    if (!parent) return;

    parent.insertBefore(wrapper, iframe);
    wrapper.appendChild(header);
    wrapper.appendChild(iframe);

    // Ensure iframe has styling class
    iframe.classList.add("iframe-preview");
    iframe.dataset.previewWrapped = "true";
  }

  function scanAllIframes(root) {
    const scope = root || document;
    scope.querySelectorAll("iframe.auto-preview").forEach(wrapIframePreview);
  }

  document.addEventListener("DOMContentLoaded", function () {
    // Wrap any existing iframes
    scanAllIframes(document);

    // Also handle iframes added later (e.g. by other scripts)
    const observer = new MutationObserver(function (mutations) {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach(function (node) {
          if (!(node instanceof HTMLElement)) return;

          if (node.matches && node.matches("iframe.auto-preview")) {
            wrapIframePreview(node);
          }

          if (node.querySelectorAll) {
            node
              .querySelectorAll("iframe.auto-preview")
              .forEach(wrapIframePreview);
          }
        });
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
})();