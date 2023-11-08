'use client'

import Image from 'next/image'
import { useUser } from '@clerk/clerk-react'
import { PlusCircleIcon } from 'lucide-react'
import { toast } from 'sonner'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'

import { Button } from '@/components/ui/button'

const DocumentsPage = () => {
  const { user } = useUser()
  const create = useMutation(api.documents.create)

  const onCreate = () => {
    const promise = create({ title: 'Vazio' })

    toast.promise(promise, {
      loading: 'Criando novo documento...',
      success: 'Documento criado com sucesso',
      error: 'Falha na criação do documento',
    })
  }

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image
        src="/empty.png"
        height="300"
        width="300"
        alt="Vazio"
        className="dark:hidden"
      />
      <Image
        src="/empty-dark.png"
        height="300"
        width="300"
        alt="Vazio"
        className="hidden dark:block"
      />
      <h2>Bem vindo ao Jotion do {user?.firstName} </h2>
      <Button onClick={onCreate}>
        <PlusCircleIcon className="h-4 w-4 mr-2" /> Criar um documento
      </Button>
    </div>
  )
}

export default DocumentsPage
