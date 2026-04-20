/**
 * Color Picker Tool
 * JavaScript functionality for color selection and preview
 */

// DOM Elements
const colorPicker = document.getElementById('colorPicker');
const colorPreview = document.getElementById('colorPreview');
const hexValue = document.getElementById('hexValue');
const rgbValue = document.getElementById('rgbValue');
const hslValue = document.getElementById('hslValue');
const copyBtn = document.getElementById('copyBtn');

/**
 * Update the color preview and HEX display
 * @param {string} color - The selected color in HEX format
 */
function updateColor(color) {
    // Update preview box background
    colorPreview.style.backgroundColor = color;
    
    // Update HEX value display
    hexValue.value = color.toUpperCase();
    
    // Convert and display RGB
    const rgb = hexToRgb(color);
    rgbValue.value = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    
    // Convert and display HSL
    const hsl = hexToHsl(color);
    hslValue.value = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
}

/**
 * Convert HEX color to RGB
 * @param {string} hex - HEX color code
 * @returns {Object} RGB values {r, g, b}
 */
function hexToRgb(hex) {
    // Remove # if present
    hex = hex.replace('#', '');
    
    // Parse hex values
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    return { r, g, b };
}

/**
 * Convert HEX color to HSL
 * @param {string} hex - HEX color code
 * @returns {Object} HSL values {h, s, l}
 */
function hexToHsl(hex) {
    // First convert to RGB
    const rgb = hexToRgb(hex);
    
    // Convert RGB to 0-1 range
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;
    
    // Find min and max values
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;
    
    let h = 0;
    let s = 0;
    let l = (max + min) / 2;
    
    // Calculate hue
    if (delta !== 0) {
        if (max === r) {
            h = ((g - b) / delta + (g < b ? 6 : 0)) / 6;
        } else if (max === g) {
            h = ((b - r) / delta + 2) / 6;
        } else {
            h = ((r - g) / delta + 4) / 6;
        }
    }
    
    // Calculate saturation
    if (delta !== 0) {
        s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);
    }
    
    // Convert to degrees and percentages
    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);
    
    return { h, s, l };
}

/**
 * Handle color picker input changes
 */
function handleColorChange(event) {
    const selectedColor = event.target.value;
    updateColor(selectedColor);
}

/**
 * Copy HEX color value to clipboard
 */
async function copyToClipboard() {
    const colorValue = hexValue.value;
    
    try {
        // Use Clipboard API to copy text
        await navigator.clipboard.writeText(colorValue);
        
        // Show success feedback
        showCopyFeedback(true);
    } catch (error) {
        console.error('Failed to copy color:', error);
        
        // Fallback: try using older method
        fallbackCopyToClipboard(colorValue);
    }
}

/**
 * Fallback copy method for older browsers
 * @param {string} text - Text to copy
 */
function fallbackCopyToClipboard(text) {
    try {
        hexValue.select();
        document.execCommand('copy');
        showCopyFeedback(true);
    } catch (error) {
        console.error('Fallback copy failed:', error);
        showCopyFeedback(false);
    }
}

/**
 * Show visual feedback after copy attempt
 * @param {boolean} success - Whether copy was successful
 */
function showCopyFeedback(success) {
    const originalText = copyBtn.innerHTML;
    
    if (success) {
        copyBtn.innerHTML = '<span class="btn-icon">✓</span> Copied!';
        copyBtn.style.background = 'linear-gradient(135deg, #51cf66 0%, #37b24d 100%)';
    } else {
        copyBtn.innerHTML = '<span class="btn-icon">✗</span> Failed';
        copyBtn.style.background = 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)';
    }
    
    // Reset button after 2 seconds
    setTimeout(() => {
        copyBtn.innerHTML = originalText;
        copyBtn.style.background = '';
    }, 2000);
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Color Picker Tool initialized');
    
    // Set initial color
    const initialColor = colorPicker.value;
    updateColor(initialColor);
    
    // Add event listener for color changes
    colorPicker.addEventListener('input', handleColorChange);
    
    // Add event listener for copy button
    copyBtn.addEventListener('click', copyToClipboard);
});
