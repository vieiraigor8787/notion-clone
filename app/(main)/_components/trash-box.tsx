'use client'

import { useMutation, useQuery } from 'convex/react'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { Search, Trash, Undo } from 'lucide-react'
import { toast } from 'sonner'

import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'

import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/spinner'
import { ConfirmModal } from '@/components/modals/confirm-modal'

export const TrashBox = () => {
  const router = useRouter()
  const params = useParams()
  const docs = useQuery(api.documents.getTrash)
  const restore = useMutation(api.documents.restore)
  const remove = useMutation(api.documents.remove)

  const [search, setSearch] = useState('')

  const filteredDocs = docs?.filter((doc) => {
    return doc.title.toLowerCase().includes(search.toLowerCase())
  })

  const onClick = (documentId: string) => {
    router.push(`/documents/${documentId}`)
  }

  const onRestore = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    documentId: Id<'documents'>
  ) => {
    event.stopPropagation()

    const promise = restore({ id: documentId })

    toast.promise(promise, {
      loading: 'Restaurando documento...',
      success: 'Documento restaurado com sucesso',
      error: 'Falha na restauração do documento',
    })
  }

  const onRemove = (documentId: Id<'documents'>) => {
    const promise = remove({ id: documentId })

    toast.promise(promise, {
      loading: 'Removendo documento...',
      success: 'Documento removido com sucesso',
      error: 'Falha na remoção do documento',
    })

    if (params.documentId === documentId) {
      router.push('/documents')
    }

    if (docs === undefined) {
      return (
        <div className="h-full flex items-center justify-center p-4">
          <Spinner size="lg" />
        </div>
      )
    }
  }

  return (
    <div className="text-sm">
      <div className="flex items-center gap-1 p-2">
        <Search className="h-4 w-4" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
          placeholder="Filtrar por título da página"
        />
      </div>
      <div className="mt-2 px-1 pb-1">
        <p className="hidden last:block text-xs text-center text-muted-foreground pb-2">
          Nenhum documento encontrado.
        </p>
        {filteredDocs?.map((filteredDoc) => (
          <div
            key={filteredDoc._id}
            role="button"
            onClick={() => onClick(filteredDoc._id)}
            className="text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between"
          >
            <span className="truncate pl-2">{filteredDoc.title}</span>
            <div className="flex items-center">
              <div
                onClick={(e) => onRestore(e, filteredDoc._id)}
                role="button"
                className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
              >
                <Undo className="h-4 w-4 text-muted-foreground" />
              </div>
              <ConfirmModal onConfirm={() => onRemove(filteredDoc._id)}>
                <div
                  role="button"
                  className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                >
                  <Trash className="h-4 w-4 text-muted-foreground" />
                </div>
              </ConfirmModal>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
