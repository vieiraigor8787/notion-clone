'use client'

import { useParams } from 'next/navigation'
import { useState } from 'react'
import { useMutation } from 'convex/react'

import { useCoverImage } from '@/hooks/use-cover-image'
import { useEdgeStore } from '@/lib/edgestore'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'

import { Dialog, DialogHeader, DialogContent } from '../ui/dialog'
import { SingleImageDropzone } from '../single-image-dropzone'

export const CoverImageModal = () => {
  const params = useParams()
  const coverImage = useCoverImage()
  const { edgestore } = useEdgeStore()
  const update = useMutation(api.documents.update)

  const [file, setFile] = useState<File>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onClose = () => {
    setFile(undefined)
    setIsSubmitting(false)
    coverImage.onClose()
  }

  const onChange = async (file?: File) => {
    if (file) {
      setIsSubmitting(true)
      setFile(file)

      let res

      if (coverImage.url) {
        res = await edgestore.publicFiles.upload({
          file,
          options: {
            replaceTargetUrl: coverImage.url,
          },
        })
      } else {
        res = await edgestore.publicFiles.upload({
          file,
          options: {
            replaceTargetUrl: coverImage.url,
          },
        })
      }

      await update({
        id: params.documentId as Id<'documents'>,
        coverImage: res.url,
      })
    }

    onClose()
  }

  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-center text-lg font-semibold">Imagem cover</h2>
        </DialogHeader>
        <SingleImageDropzone
          className="w-full outline-none"
          disabled={isSubmitting}
          value={file}
          onChange={onChange}
        />
      </DialogContent>
    </Dialog>
  )
}
