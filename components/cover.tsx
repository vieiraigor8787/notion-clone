'use client'

import Image from 'next/image'
import { useParams } from 'next/navigation'
import { ImageIcon } from 'lucide-react'
import { useMutation } from 'convex/react'

import { cn } from '@/lib/utils'
import { useCoverImage } from '@/hooks/use-cover-image'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'

import { Button } from './ui/button'

interface CoverProps {
  url?: string
  preview?: boolean
}

export const Cover = ({ url, preview }: CoverProps) => {
  const params = useParams()
  const coverImage = useCoverImage()
  const removeImageCover = useMutation(api.documents.removeCoverImage)

  const onRemove = () => {
    removeImageCover({
      id: params.documentId as Id<'documents'>,
    })
  }

  return (
    <div
      className={cn(
        'relative w-full h-[35vh] group',
        !url && 'h-[12vh]',
        url && 'bg-muted'
      )}
    >
      {!!url && <Image src={url} fill alt="Imagem" className="object-cover" />}
      {url && !preview && (
        <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-2">
          <Button
            onClick={coverImage.onOpen}
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Trocar imagem
          </Button>
          <Button
            onClick={onRemove}
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Remover imagem
          </Button>
        </div>
      )}
    </div>
  )
}
