import html2canvas from "html2canvas";
import GIF from "gif.js.optimized";

// ✅ Export as GIF
export async function exportAsGif(elementId) {
  const element = document.getElementById(elementId);
  if (!element) return alert("Element not found");

  const duration = 2000;
  const frameRate = 10;
  const totalFrames = (duration / 1000) * frameRate;
  const frames = [];

  for (let i = 0; i < totalFrames; i++) {
    const canvas = await html2canvas(element, { backgroundColor: null });
    frames.push(canvas);
    await new Promise((res) => setTimeout(res, 1000 / frameRate));
  }

  const gif = new GIF({
    workers: 2,
    quality: 10,
    workerScript: "https://cdnjs.cloudflare.com/ajax/libs/gif.js/0.2.0/gif.worker.js"
  });

  frames.forEach((canvas) => {
    gif.addFrame(canvas, { delay: 100 });
  });

  gif.on("finished", (blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "glitch-text.gif";
    a.click();
  });

  gif.render();
}

// ✅ Export as MP4/WebM using MediaRecorder
export async function exportAsMp4(elementId) {
  const element = document.getElementById(elementId);
  if (!element) return alert("Element not found");

  const canvas = await html2canvas(element);
  const stream = canvas.captureStream(30); // 30 fps
  const recorder = new MediaRecorder(stream, { mimeType: "video/webm" });

  const chunks = [];
  recorder.ondataavailable = (e) => {
    if (e.data.size > 0) chunks.push(e.data);
  };

  recorder.onstop = () => {
    const blob = new Blob(chunks, { type: "video/webm" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "glitch-text.mp4";
    a.click();
  };

  recorder.start();

  // Stop recording after 3 seconds
  setTimeout(() => {
    recorder.stop();
  }, 3000);
}
