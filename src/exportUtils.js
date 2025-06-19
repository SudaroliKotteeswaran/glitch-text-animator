import html2canvas from "html2canvas";

export async function exportAnimation(elementId, format = "gif", duration = 3) {
  const element = document.getElementById(elementId);
  if (!element) {
    alert("Element not found!");
    return;
  }

  // Load CCapture from CDN if not already available
  if (typeof window.CCapture === "undefined") {
    await new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/ccapture.js@1.1.0/build/CCapture.all.min.js";
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  }

  const canvas = await html2canvas(element, {
    backgroundColor: null,
    scale: 2,
  });

  const capturer = new window.CCapture({
    format: format === "gif" ? "gif" : "webm",
    framerate: 30,
    verbose: true,
  });

  const offscreenCanvas = document.createElement("canvas");
  offscreenCanvas.width = canvas.width;
  offscreenCanvas.height = canvas.height;
  const ctx = offscreenCanvas.getContext("2d");

  let frameCount = 0;
  const totalFrames = 30 * duration;

  capturer.start();

  function capture() {
    ctx.clearRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);
    ctx.drawImage(canvas, 0, 0);
    capturer.capture(offscreenCanvas);
    frameCount++;
    if (frameCount < totalFrames) {
      requestAnimationFrame(capture);
    } else {
      capturer.stop();
      capturer.save();
    }
  }

  capture();
}
