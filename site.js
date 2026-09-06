(function () {
  var frame = document.getElementById("feedwalls-widget");
  if (!frame) return;

  window.addEventListener("message", function (event) {
    if (event.source !== frame.contentWindow) return;
    if (event.origin !== "https://feedwalls.online") return;
    if (!event.data || event.data.type !== "feedwalls:height") return;
    var height = Number(event.data.h);
    if (!isFinite(height)) return;
    frame.style.height = Math.max(360, Math.min(height, 5000)) + "px";
  });
})();
