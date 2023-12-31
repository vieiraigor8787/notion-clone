'use client'

import Image from 'next/image'
import { useParams } from 'next/navigation'
import { ImageIcon } from 'lucide-react'
import { useMutation } from 'convex/react'

import { cn } from '@/lib/utils'
import { useEdgeStore } from '@/lib/edgestore'
import { useCoverImage } from '@/hooks/use-cover-image'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'

import { Button } from './ui/button'
import { Skeleton } from './ui/skeleton'

interface CoverProps {
  url?: string
  preview?: boolean
}

export const Cover = ({ url, preview }: CoverProps) => {
  const params = useParams()
  const coverImage = useCoverImage()
  const removeImageCover = useMutation(api.documents.removeCoverImage)
  const { edgestore } = useEdgeStore()

  const onRemove = async () => {
    if (url) {
      await edgestore.publicFiles.delete({
        url: url,
      })
    }
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
            onClick={() => coverImage.onReplace(url)}
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

Cover.Skeleton = function CoverSkeleton() {
  return <Skeleton className="h-5 w-10" />
}
