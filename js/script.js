/**
 * Color Picker Tool
 * JavaScript functionality for color selection and preview
 */

// DOM Elements
const colorPicker = document.getElementById('colorPicker');
const colorPreview = document.getElementById('colorPreview');
const hexValue = document.getElementById('hexValue');

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

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Color Picker Tool initialized');
    
    // Set initial color
    const initialColor = colorPicker.value;
    updateColor(initialColor);
    
    // Add event listener for color changes
    colorPicker.addEventListener('input', handleColorChange);
});
