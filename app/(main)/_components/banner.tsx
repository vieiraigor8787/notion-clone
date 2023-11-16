'use client'

import { useRouter } from 'next/navigation'
import { useMutation } from 'convex/react'

import { Id } from '@/convex/_generated/dataModel'
import { api } from '@/convex/_generated/api'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { ConfirmModal } from '@/components/modals/confirm-modal'

interface BannerProps {
  documentId: Id<'documents'>
}

const Banner = ({ documentId }: BannerProps) => {
  const router = useRouter()

  const remove = useMutation(api.documents.remove)
  const restore = useMutation(api.documents.restore)

  const onRemove = () => {
    const promise = remove({ id: documentId })

    toast.promise(promise, {
      loading: 'Excluindo documento...',
      success: 'Documento excluído com sucesso',
      error: 'Falha ao excluir documento',
    })

    router.push('/documents')
  }

  const onRestore = () => {
    const promise = restore({ id: documentId })

    toast.promise(promise, {
      loading: 'Restaurando documento...',
      success: 'Documento restaurado com sucesso',
      error: 'Falha ao restaurar documento',
    })
  }

  return (
    <div className="w-full bg-rose-500 text-center text-sm p-2 text-white flex items-center gap-2 justify-center">
      <p>Documento arquivado na lixeira</p>
      <Button
        size="sm"
        onClick={onRestore}
        variant="outline"
        className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto"
      >
        Restaurar documento
      </Button>
      <ConfirmModal onConfirm={onRemove}>
        <Button
          size="sm"
          className="border-white bg-white hover:bg-slate-200 text-rose-500 p-1 px-2 h-auto"
        >
          Excluir documento permanentemente
        </Button>
      </ConfirmModal>
    </div>
  )
}

export default Banner
