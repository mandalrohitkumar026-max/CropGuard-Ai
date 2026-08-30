import React, { useState, useRef } from 'react';
import { UploadCloud, Camera, Image as ImageIcon, X, AlertCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface UploadBoxProps {
  selectedFile: File | null;
  previewUrl: string | null;
  onFileSelect: (file: File | null) => void;
  onOpenCamera: () => void;
}

export const UploadBox: React.FC<UploadBoxProps> = ({
  selectedFile,
  previewUrl,
  onFileSelect,
  onOpenCamera
}) => {
  const { t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);

  const validateAndSet = (file: File) => {
    setFileError(null);
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setFileError('Please upload a valid image file (JPG, PNG, or WebP).');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setFileError('Image file is too large (maximum size is 10MB).');
      return;
    }
    onFileSelect(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSet(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSet(e.target.files[0]);
    }
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleInputChange}
        className="hidden"
      />

      {fileError && (
        <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{fileError}</span>
        </div>
      )}

      {!previewUrl ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`relative cursor-pointer border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center transition-all duration-200 group ${
            isDragOver
              ? 'border-forest-500 bg-forest-50/70 scale-[1.01]'
              : 'border-slate-300 bg-white hover:border-forest-400 hover:bg-forest-50/30'
          }`}
        >
          <div className="max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-forest-100/80 text-forest-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-sm border border-forest-200/60">
              <UploadCloud className="w-8 h-8" />
            </div>

            <div>
              <h3 className="font-bold text-slate-800 text-base sm:text-lg">
                {t.analyze.dropzoneTitle}
              </h3>
              <p className="text-xs text-slate-500 mt-1">{t.analyze.dropzoneSubtitle}</p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-forest-600 hover:bg-forest-700 text-white shadow-sm transition-all flex items-center gap-1.5"
              >
                <ImageIcon className="w-4 h-4" />
                <span>{t.analyze.browseButton}</span>
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenCamera();
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all flex items-center gap-1.5"
              >
                <Camera className="w-4 h-4 text-slate-600" />
                <span>{t.analyze.cameraButton}</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative rounded-3xl overflow-hidden border border-slate-200 bg-slate-950 shadow-md group aspect-video sm:aspect-[16/9] flex items-center justify-center">
          <img
            src={previewUrl}
            alt="Leaf Preview"
            className="w-full h-full object-contain"
          />

          {/* Action overlay */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={() => onFileSelect(null)}
              className="p-2 rounded-full bg-slate-900/80 hover:bg-rose-600 text-white backdrop-blur-md transition-colors"
              title="Remove image"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-slate-900/80 backdrop-blur-md text-white flex items-center justify-between text-xs">
            <div className="truncate pr-3">
              <span className="font-medium">{selectedFile?.name || 'Selected Leaf Image'}</span>
              {selectedFile && (
                <span className="text-slate-400 ml-2">({(selectedFile.size / 1024).toFixed(0)} KB)</span>
              )}
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-forest-400 hover:text-forest-300 font-semibold underline shrink-0"
            >
              Change Photo
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
