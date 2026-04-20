/**
 * Color Picker Tool
 * JavaScript functionality for color selection and preview
 */

// DOM Elements
const colorPicker = document.getElementById('colorPicker');
const colorPreview = document.getElementById('colorPreview');
const hexValue = document.getElementById('hexValue');
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
