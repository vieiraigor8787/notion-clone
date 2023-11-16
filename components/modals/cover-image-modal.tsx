'use client'

import { useCoverImage } from '@/hooks/use-cover-image'

import { Dialog, DialogHeader, DialogContent } from '../ui/dialog'

export const CoverImageModal = () => {
  const coverImage = useCoverImage()
  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-center text-lg font-semibold">Imagem cover</h2>
        </DialogHeader>
        <div className=""></div>
      </DialogContent>
    </Dialog>
  )
}
