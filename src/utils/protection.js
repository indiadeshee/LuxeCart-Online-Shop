/**
 * LuxeCart Premium E-commerce Dashboard
 * Copyright (c) 2025 desheekart
 * Developer: Raviranjan Kumar
 * License: Single Use License - CodeCanyon
 */

// Obfuscated protection key
const _k = btoa('desheekart_RaviranjanKumar_2025');

// Protection utilities
export const protection = {
  // Verify product integrity
  verify: () => {
    try {
      const sign = localStorage.getItem('_dsk_sign');
      if (!sign || sign !== _k) {
        console.warn('Product integrity check failed');
        return false;
      }
      return true;
    } catch {
      return false;
    }
  },

  // Initialize protection
  init: () => {
    try {
      localStorage.setItem('_dsk_sign', _k);
      Object.defineProperty(window, '_dsk_protected', {
        value: true,
        writable: false,
        configurable: false
      });
    } catch {
      console.warn('Failed to initialize protection');
    }
  },

  // Add watermark to images
  addImageWatermark: (ctx, text) => {
    ctx.save();
    ctx.globalAlpha = 0.1;
    ctx.font = '14px Arial';
    ctx.fillStyle = '#000';
    ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
    ctx.rotate(-45 * Math.PI / 180);
    ctx.fillText(text, -50, 0);
    ctx.restore();
  },

  // Protect against dev tools
  preventDevTools: () => {
    setInterval(() => {
      const devtools = /./;
      devtools.toString = function() {
        protection.verify();
      }
      console.log('%c', devtools);
    }, 1000);
  },

  // Add text watermark to exported data
  addExportWatermark: (data) => {
    const watermark = `\n\nGenerated by LuxeCart Premium\ndesheekart © ${new Date().getFullYear()}\nDeveloped by Raviranjan Kumar`;
    if (typeof data === 'string') {
      return data + watermark;
    }
    return data;
  }
};

// Initialize protection on load
if (typeof window !== 'undefined') {
  protection.init();
  protection.preventDevTools();
}
