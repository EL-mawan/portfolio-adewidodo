'use client'

import { useState, useRef } from 'react'
import { Upload, X, Loader2, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { put } from '@vercel/blob'

interface MultipleImageUploadProps {
  images: string[]
  onImagesChange: (images: string[]) => void
  maxImages?: number
  label?: string
}

export function MultipleImageUpload({ 
  images, 
  onImagesChange, 
  maxImages = 10,
  label = "Images"
}: MultipleImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({})
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleTriggerUpload = () => {
    fileInputRef.current?.click()
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    // Check if adding these files exceeds max
    if (images.length + files.length > maxImages) {
      alert(`Maximum ${maxImages} images allowed`)
      return
    }

    setUploading(true)
    const newImages: string[] = []

    try {
      // Upload each file
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        
        // Update progress
        setUploadProgress(prev => ({ ...prev, [file.name]: 0 }))

        // Create form data
        const formData = new FormData()
        formData.append('file', file)

        // Upload to our API endpoint
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        if (!response.ok) {
          throw new Error(`Failed to upload ${file.name}`)
        }

        const data = await response.json()
        newImages.push(data.url)
        
        // Update progress to 100%
        setUploadProgress(prev => ({ ...prev, [file.name]: 100 }))
      }

      // Add new images to existing ones
      onImagesChange([...images, ...newImages])
      
      // Clear progress after a delay
      setTimeout(() => setUploadProgress({}), 1000)
    } catch (error) {
      console.error('Upload error:', error)
      alert('Failed to upload images. Please try again.')
    } finally {
      setUploading(false)
      if (e.target) {
        e.target.value = ''
      }
    }
  }

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    onImagesChange(newImages)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">
          {label} ({images.length}/{maxImages})
        </label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={uploading || images.length >= maxImages}
          onClick={handleTriggerUpload}
        >
          {uploading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4 mr-2" />
              Upload Images
            </>
          )}
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFileUpload}
          disabled={uploading || images.length >= maxImages}
        />
      </div>

      {/* Progress indicators */}
      {Object.keys(uploadProgress).length > 0 && (
        <div className="space-y-2">
          {Object.entries(uploadProgress).map(([filename, progress]) => (
            <div key={filename} className="text-xs text-muted-foreground">
              <div className="flex justify-between mb-1">
                <span>{filename}</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-1">
                <div 
                  className="bg-primary h-1 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Image grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((url, index) => (
            <div key={index} className="relative group aspect-square">
              <img
                src={url}
                alt={`Image ${index + 1}`}
                className="w-full h-full object-cover rounded-lg border-2 border-border"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 p-1.5 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/60 text-white text-xs rounded">
                {index + 1}
              </div>
            </div>
          ))}
          
          {/* Add More Button in Grid */}
          {images.length < maxImages && (
            <button
              type="button"
              onClick={handleTriggerUpload}
              disabled={uploading}
              className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg hover:border-primary/50 hover:bg-muted/50 transition-colors"
            >
              <Plus className="w-8 h-8 text-muted-foreground mb-2" />
              <span className="text-xs text-muted-foreground">Add More</span>
            </button>
          )}
        </div>
      )}

      {images.length === 0 && (
        <div 
          onClick={handleTriggerUpload}
          className="border-2 border-dashed border-border rounded-lg p-8 text-center text-muted-foreground cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-colors"
        >
          <Upload className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No images uploaded yet</p>
          <p className="text-xs mt-1">Click to upload up to {maxImages} images</p>
        </div>
      )}
    </div>
  )
}
