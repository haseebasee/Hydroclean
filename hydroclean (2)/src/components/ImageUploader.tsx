import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Camera, X, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface ImageUploaderProps {
  onImageSelected: (base64: string) => void;
  isAnalyzing: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected, isAnalyzing }) => {
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setPreview(base64);
        onImageSelected(base64);
      };
      reader.readAsDataURL(file);
    }
  }, [onImageSelected]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false,
    disabled: isAnalyzing
  } as any);

  const clearImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        {...getRootProps()}
        className={cn(
          "relative group cursor-pointer transition-all duration-300",
          "border-2 border-dashed rounded-3xl p-12 flex flex-col items-center justify-center gap-4",
          isDragActive ? "border-brand-cyan bg-brand-cyan/5" : "border-white/10 hover:border-white/20 bg-white/5",
          preview ? "p-4" : "min-h-[300px]",
          isAnalyzing && "opacity-50 cursor-not-allowed"
        )}
      >
        <input {...getInputProps()} />
        
        {preview ? (
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden">
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            {!isAnalyzing && (
              <button
                onClick={clearImage}
                className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
              >
                <X size={20} />
              </button>
            )}
            {isAnalyzing && (
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-3">
                <Loader2 className="animate-spin text-brand-cyan" size={40} />
                <p className="text-brand-cyan font-medium">Analyzing Evidence...</p>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="p-6 rounded-full bg-brand-blue/10 text-brand-blue group-hover:scale-110 transition-transform duration-300">
              <Upload size={48} />
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold tracking-tight uppercase mb-2">Drop Evidence Here</h3>
              <p className="text-white/50">Select JPG, PNG or Capture</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
