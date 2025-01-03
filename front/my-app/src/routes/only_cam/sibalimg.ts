function createGammaLUT(gamma: number): Uint8Array {
  const lut = new Uint8Array(256);
  // 감마 값이 너무 극단적이지 않도록 제한 (보통 0.1 ~ 5.0 사이)
  gamma = Math.min(Math.max(gamma, 0.1), 5.0);
  
  for (let i = 0; i < 256; i++) {
    lut[i] = Math.min(255, Math.max(0, Math.pow(i / 255, gamma) * 255));
  }
  return lut;
}

function createBrightnessContrastLUT(brightness: number, contrast: number): Uint8Array {
  const lut = new Uint8Array(256);
  // 대비 값이 너무 극단적이지 않도록 제한 (보통 0.5 ~ 2.0 사이)
  contrast = Math.min(Math.max(contrast, 0.5), 2.0);
  // 밝기 값도 적절히 제한 (-1 ~ 1 범위)
  brightness = Math.min(Math.max(brightness, -1), 1);

  const factor = contrast;
  for (let i = 0; i < 256; i++) {
    const adjusted = (i - 128) * factor + 128 + brightness * 255;
    lut[i] = Math.min(255, Math.max(0, adjusted));
  }
  return lut;
}
  function applyHue(r: number, g: number, b: number, angle: number): [number, number, number] {
    const rad = angle * (Math.PI / 180);
    const cosA = Math.cos(rad);
    const sinA = Math.sin(rad);
  
    const newR = cosA * r + sinA * g;
    const newG = -sinA * r + cosA * g;
    const newB = b;
  
    return [newR, newG, newB];
  }
  
  export function adjustImageDataLUT(
    imageData: ImageData,
    gamma: number = 1.2,
    brightness: number = 0.2, // 0은 원본 밝기
    contrast: number = 1.0,  // 1은 원본 대비
    saturation: number = 1, // 채도 1보다 크면 채도 강화
    hue: number = 0,         // 색조
    warmth: number = -0.04       // 따뜻함 (R 증가, B 감소)
  ): ImageData {
    const data = imageData.data;
    const gammaLUT = createGammaLUT(gamma);
    const bcLUT = createBrightnessContrastLUT(brightness, contrast);
  
    for (let i = 0; i < data.length; i += 4) {
      let r = data[i]
      let g = data[i + 1]
      let b = data[i + 2]
  
      // 감마 보정 및 밝기/대비 적용
      // r = gammaLUT[Math.min(255, Math.max(0, r))];
      // g = gammaLUT[Math.min(255, Math.max(0, g))];
      // b = gammaLUT[Math.min(255, Math.max(0, b))];
  
      r = bcLUT[Math.min(255, Math.max(0, r))];
      g = bcLUT[Math.min(255, Math.max(0, g))];
      b = bcLUT[Math.min(255, Math.max(0, b))];
  
      // 채도 적용 (회색 톤을 기준으로)
      const gray = 0.3 * r + 0.59 * g + 0.11 * b;
      r = gray + (r - gray) * saturation;
      g = gray + (g - gray) * saturation;
      b = gray + (b - gray) * saturation;
  
      // 색조 조정 (Hue 변환)
      // [r, g, b] = applyHue(r, g, b, hue);
  
      // 따뜻함 적용
      r += warmth * 255;
      b -= warmth * 255;
  
      // 최종 값 저장 (0~255 사이로 제한)
      // data[i] = Math.min(255, Math.max(0, r));
      // data[i + 1] = Math.min(255, Math.max(0, g));
      // data[i + 2] = Math.min(255, Math.max(0, b));
    }
  
    return imageData;
  }
  
  