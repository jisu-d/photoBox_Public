export function adjustImageData(
    imageData: ImageData,
    exposure: number = 0.9, // 노출
    brightness: number = 1.2, // 밝기
    contrast: number = 1.1, // 대비
    saturation: number = 0.7, // 채도
    hue: number = 0, // 색조
    warmth: number = -0.9, // 따듯함
    gamma: number = 0.7, // 감마
): ImageData {
    const { data, width, height } = imageData;

    // Convert hue from degrees to radians
    const hueRad = hue * Math.PI / 180;

    function clamp(value: number, min: number, max: number): number {
        return Math.max(min, Math.min(value, max));
    }

    function applyAdjustments(r: number, g: number, b: number): [number, number, number] {
        // Apply brightness and exposure
        r = r * brightness * exposure;
        g = g * brightness * exposure;
        b = b * brightness * exposure;

        // Apply contrast
        r = ((r - 128) * contrast + 128);
        g = ((g - 128) * contrast + 128);
        b = ((b - 128) * contrast + 128);

        // Apply saturation
        const avg = (r + g + b) / 3;
        r = avg + (r - avg) * saturation;
        g = avg + (g - avg) * saturation;
        b = avg + (b - avg) * saturation;

        // Apply hue
        const cosHue = Math.cos(hueRad);
        const sinHue = Math.sin(hueRad);
        const rr = 0.299 + 0.701 * cosHue + 0.168 * sinHue;
        const rg = 0.587 - 0.587 * cosHue + 0.330 * sinHue;
        const rb = 0.114 - 0.114 * cosHue - 0.497 * sinHue;
        const gr = 0.299 - 0.299 * cosHue - 0.328 * sinHue;
        const gg = 0.587 + 0.413 * cosHue + 0.035 * sinHue;
        const gb = 0.114 - 0.114 * cosHue + 0.292 * sinHue;
        const br = 0.299 - 0.3 * cosHue + 1.25 * sinHue;
        const bg = 0.587 - 0.588 * cosHue - 1.05 * sinHue;
        const bb = 0.114 + 0.886 * cosHue - 0.203 * sinHue;
        [r, g, b] = [
            clamp(r * rr + g * rg + b * rb, 0, 255),
            clamp(r * gr + g * gg + b * gb, 0, 255),
            clamp(r * br + g * bg + b * bb, 0, 255)
        ];

        // Apply warmth
        r = clamp(r + warmth * 20, 0, 255);

        // Apply gamma correction
        function gammaCorrection(value: number, gamma: number): number {
            return 255 * Math.pow(value / 255, gamma);
        }
        r = gammaCorrection(r, gamma);
        g = gammaCorrection(g, gamma);
        b = gammaCorrection(b, gamma);

        return [r, g, b];
    }

    function isYellow(r: number, g: number, b: number): boolean {
        // Define thresholds for yellow color (high R, high G, low B)
        return (r > 200 && g > 180 && b < 100);
    }

    function isBrown(r: number, g: number, b: number): boolean {
        // Define thresholds for brown color (medium R, medium G, low B)
        return (r > 100 && g > 50 && b < 50 && r < 200 && g < 150);
    }

    // Process the entire image pixel by pixel
    for (let i = 0; i < data.length; i += 4) {
        const [r, g, b] = applyAdjustments(data[i], data[i + 1], data[i + 2]);
        data[i] = r;
        data[i + 1] = g;
        data[i + 2] = b;
    }

    return imageData;
}
