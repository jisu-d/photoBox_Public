<script lang="ts">
  type Resolution = {
      label: string;
      width: number;
      height: number;
  };

  import { adjustImageDataLUT } from './sibalimg';

  let gamma: number = 1.2;
  let brightness: number = 0.2;
  let contrast: number = 1.0;
  let saturation: number = 1;
  let hue: number = 0;
  let warmth: number = -0.04;
  let frameRate: number = 30;

  let videoStream: MediaStream | null = null;
  let videoRef: HTMLVideoElement | null = null;
  let selectedResolution: string = "1280x720";
  let canvasRef: HTMLCanvasElement | null = null;
  let context: CanvasRenderingContext2D | null = null;

  const hqResolutions: Resolution[] = [
      { label: "2028x1080 (50 FPS)", width: 2028, height: 1080 },
      { label: "2028x1520 (40 FPS)", width: 2028, height: 1520 },
      { label: "1332x990 (120 FPS)", width: 1332, height: 990 },
      { label: "1280x720", width: 1280, height: 720 },
  ];

  async function startWebcam(): Promise<void> {
      try {
          const [width, height] = selectedResolution.split("x").map(Number);

          videoStream = await navigator.mediaDevices.getUserMedia({
              video: { width, height, frameRate },
              audio: false,
          });

          if (videoRef) {
              videoRef.srcObject = videoStream;
          }

          if (canvasRef) {
              canvasRef.width = width;
              canvasRef.height = height;
          }

          if (canvasRef) {
              context = canvasRef.getContext("2d");
          }

          requestAnimationFrame(updateFrame);
      } catch (error) {
          console.error("웹캠을 시작할 수 없습니다:", error);
      }
  }

  function updateFrame(): void {
      if (videoRef && context && canvasRef) {
          context.drawImage(videoRef, 0, 0, canvasRef.width, canvasRef.height);

          const imageData = context.getImageData(0, 0, canvasRef.width, canvasRef.height);
          const adjustedImageData = adjustImageDataLUT(
              imageData,
              gamma,
              brightness,
              contrast,
              saturation,
              hue,
              warmth
          );
          context.putImageData(adjustedImageData, 0, 0);

          requestAnimationFrame(updateFrame);
      }
  }

  $: {
      if (videoStream) {
          const track = videoStream.getVideoTracks()[0];
          track.applyConstraints({ frameRate }).catch((err) => {
              console.error("프레임 속도 업데이트 실패:", err);
          });
      }
  }
</script>

<style>
  html, body {
      width: 100%;
      height: 100%;
  }

  video, canvas {
      max-width: 100%;
      border: 2px solid #ccc;
      border-radius: 8px;
      margin-bottom: 10px;
  }

  button, select, input[type="range"] {
      margin: 5px;
      padding: 10px 15px;
      border: none;
      border-radius: 5px;
      background: #007bff;
      color: white;
      cursor: pointer;
  }

  button:hover {
      background: #0056b3;
  }

  .container {
      width: 50%;
  }

  .controls {
      width: 50%;
      display: flex;
      flex-direction: column;
      gap: 10px;
  }

  .control {
      display: flex;
      justify-content: space-between;
      align-items: center;
  }

  label {
      flex: 1;
      margin-right: 10px;
  }

  input[type="range"] {
      flex: 2;
  }
</style>

<div>
  <div>
      <label for="resolution">해상도 선택:</label>
      <select id="resolution" bind:value={selectedResolution}>
          {#each hqResolutions as res}
              <option value={`${res.width}x${res.height}`}>{res.label}</option>
          {/each}
      </select>

      <div class="container">
          <video autoplay playsinline bind:this={videoRef}></video>
          <canvas bind:this={canvasRef}></canvas>
      </div>

      <div>
          <button on:click={startWebcam}>웹캠 시작</button>
      </div>
  </div>

  <div class="controls">
    <div class="control">
      <label for="frameRate">프레임 속도: {frameRate} FPS</label>
      <input type="range" id="frameRate" min="1" max="50" step="1" bind:value={frameRate} />
    </div>
      <div class="control">
          <label>gamma(감마): {gamma}</label>
          <input type="range" min="0" max="3" step="0.01" bind:value={gamma} />
      </div>
      <div class="control">
          <label>brightness(밝기): {brightness}</label>
          <input type="range" min="0" max="3" step="0.001" bind:value={brightness} />
      </div>
      <div class="control">
          <label>contrast(대비): {contrast}</label>
          <input type="range" min="0" max="3" step="0.01" bind:value={contrast} />
      </div>
      <div class="control">
          <label>Saturation(채도): {saturation}</label>
          <input type="range" min="0" max="3" step="0.01" bind:value={saturation} />
      </div>
      <div class="control">
          <label>hue(색조): {hue}</label>
          <input type="range" min="0" max="360" step="0.01" bind:value={hue} />
      </div>
      <div class="control">
          <label>warmth(따뜻함): {warmth}</label>
          <input type="range" min="-1" max="1" step="0.001" bind:value={warmth} />
      </div>
  </div>
</div>
