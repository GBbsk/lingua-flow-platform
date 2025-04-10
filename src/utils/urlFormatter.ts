/**
 * Formats various media URLs to their embed/preview versions
 * Supports YouTube, Google Drive, and Dropbox links
 */
export const formatMediaUrl = (url: string): string => {
  if (!url) return '';
  
  // YouTube URL formatting
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    // Extract video ID
    let videoId = '';
    
    if (url.includes('youtu.be')) {
      // Format: https://youtu.be/VIDEO_ID
      const urlParts = url.split('/');
      videoId = urlParts[urlParts.length - 1].split('?')[0];
    } else if (url.includes('watch?v=')) {
      // Format: https://www.youtube.com/watch?v=VIDEO_ID
      const urlParams = new URLSearchParams(url.split('?')[1]);
      videoId = urlParams.get('v') || '';
    } else if (url.includes('embed/')) {
      // Already in embed format
      return url;
    }
    
    // Get any additional parameters
    const queryParams = url.includes('?') ? url.split('?')[1] : '';
    const additionalParams = queryParams ? 
      queryParams.replace(/^v=[\w-]+&?|^[\w-]+&?/, '') : '';
    
    // Construct embed URL
    return `https://www.youtube.com/embed/${videoId}${additionalParams ? '?' + additionalParams : ''}`;
  }
  
  // Google Drive URL formatting
  if (url.includes('drive.google.com/file')) {
    // Already in preview format
    if (url.includes('/preview')) {
      return url;
    }
    
    // Extract file ID
    const fileIdMatch = url.match(/\/d\/([^\/]+)/);
    if (fileIdMatch && fileIdMatch[1]) {
      return `https://drive.google.com/file/d/${fileIdMatch[1]}/preview`;
    }
  }
  
  // Dropbox URL formatting
  if (url.includes('dropbox.com')) {
    // Already in direct download format
    if (url.includes('?dl=1')) {
      return url;
    }
    
    // Remove any existing query parameters and add dl=1
    const baseUrl = url.split('?')[0];
    return `${baseUrl}?dl=1`;
  }
  
  // Return original URL if no formatting rules match
  return url;
};