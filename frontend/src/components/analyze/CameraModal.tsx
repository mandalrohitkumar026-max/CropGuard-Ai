import React, { useRef, useState, useEffect } from 'react';
import { Camera, X, RefreshCw, CheckCircle2 } from 'lucide-react';

interface CameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (file: File) => void;
}

export const CameraModal: React.FC<CameraModalProps> = ({ isOpen, onClose, onCapture }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      stopCamera();
      return;
    }
    startCamera();

    return () => {
      stopCamera();
    };
  }, [isOpen, facingMode]);

  const startCamera = async () => {
    try {
      setError(null);
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: facingMode },
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      });

      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err: any) {
      console.error('Camera access error:', err);
      setError('Could not access device camera. Please check camera permissions or upload an image file instead.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
      setStream(null);
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], `crop-leaf-capture-${Date.now()}.jpg`, {
          type: 'image/jpeg'
        });
        stopCamera();
        onCapture(file);
      }
    }, 'image/jpeg', 0.95);
  };

  const toggleFacing = () => {
    setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 text-white">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-forest-400" />
            <h3 className="font-semibold text-sm">Capture Crop Leaf Photo</h3>
          </div>
          <button
            onClick={() => {
              stopCamera();
              onClose();
            }}
            className="text-slate-400 hover:text-white p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Viewport */}
        <div className="relative aspect-square sm:aspect-video bg-black flex items-center justify-center overflow-hidden">
          {error ? (
            <div className="p-6 text-center text-rose-400 text-sm">{error}</div>
          ) : (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />

              {/* Target Aiming Reticle */}
              <div className="absolute inset-8 border-2 border-forest-400/70 rounded-2xl pointer-events-none flex items-center justify-center">
                <div className="text-center bg-black/40 px-3 py-1 rounded-full text-white/90 text-xs font-medium backdrop-blur-sm">
                  Align crop leaf inside frame
                </div>
              </div>
            </>
          )}
        </div>

        {/* Controls */}
        <div className="p-4 bg-slate-950 flex items-center justify-around border-t border-slate-800">
          <button
            onClick={toggleFacing}
            type="button"
            className="p-3 rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
            title="Switch Camera"
          >
            <RefreshCw className="w-5 h-5" />
          </button>

          <button
            onClick={capturePhoto}
            type="button"
            disabled={!!error}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-forest-600 hover:bg-forest-500 text-white font-bold shadow-lg shadow-forest-900/40 active:scale-95 transition-all disabled:opacity-50"
          >
            <Camera className="w-5 h-5" />
            <span>Snap Photo</span>
          </button>

          <div className="w-11" /> {/* Spacer */}
        </div>
      </div>
    </div>
  );
};
