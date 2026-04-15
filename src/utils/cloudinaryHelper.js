/**
 * cloudinaryHelper.js
 * Utility to optimize Cloudinary URLs by injecting quality and format auto-parameters.
 */

export const optimizeCloudinaryUrl = (url) => {
  if (!url || typeof url !== 'string') return url;
  
  // Only process Cloudinary URLs
  if (!url.includes('res.cloudinary.com')) return url;

  // Insert q_auto,f_auto after /upload/
  // Format: https://res.cloudinary.com/[cloud]/image/upload/v12345/abc.jpg
  // Target: https://res.cloudinary.com/[cloud]/image/upload/q_auto,f_auto/v12345/abc.jpg
  
  const uploadToken = '/upload/';
  if (url.includes(uploadToken)) {
    const parts = url.split(uploadToken);
    // Avoid double injection
    if (!parts[1].startsWith('q_auto,f_auto/')) {
      return `${parts[0]}${uploadToken}q_auto,f_auto/${parts[1]}`;
    }
  }

  return url;
};
