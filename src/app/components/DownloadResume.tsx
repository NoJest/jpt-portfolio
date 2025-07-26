'use client';
import { useState } from 'react';
import { DownloadIcon } from '@radix-ui/react-icons';

export default function DownloadResume() {
  const [isDownloading, setIsDownloading] = useState(false);

  const trackDownload = async () => {
    setIsDownloading(true);
    
    try {
      // Get client info
      const response = await fetch('https://api.ipify.org?format=json');
      const { ip } = await response.json();
      const userAgent = navigator.userAgent;

      // Track download
      await fetch('/api/track-download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ip, userAgent }),
      });

      // Trigger actual download
      const link = document.createElement('a');
      link.href = '/data/Resume.pdf';
      link.download = 'Justin_Thomasson_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Tracking failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <button
      onClick={trackDownload}
      disabled={isDownloading}
      className="retro-btn flex items-center gap-2"
    >
      {isDownloading ? (
        'Preparing...'
      ) : (
        <>
          <DownloadIcon className="h-5 w-5" />
          Download Resume (PDF)
        </>
      )}
    </button>
  );
}