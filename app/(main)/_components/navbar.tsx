'use client'

import { useQuery } from 'convex/react'
import { useParams } from 'next/navigation'

import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { MenuIcon } from 'lucide-react'

interface NavbarProps {
  isCollapsed: boolean
  onResetWidth: () => void
}

export const Navbar = ({ onResetWidth, isCollapsed }: NavbarProps) => {
  const params = useParams()
  const docId = useQuery(api.documents.getById, {
    documentId: params.documentId as Id<'documents'>,
  })

  if (docId === undefined) return <p className="">Carregando...</p>

  if (docId === null) return null

  return (
    <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center gap-4">
      <MenuIcon
        role="button"
        onClick={onResetWidth}
        className="h-6 w-6 text-muted-foreground"
      />
      <div className="flex items-center justify-between w-full"></div>
    </nav>
  )
}
