'use client'

import { useQuery } from 'convex/react'
import { useParams } from 'next/navigation'
import { MenuIcon } from 'lucide-react'

import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'

import { Title } from './title'
import { Banner } from './banner'
import { Menu } from './menu'

interface NavbarProps {
  isCollapsed: boolean
  onResetWidth: () => void
}

export const Navbar = ({ onResetWidth, isCollapsed }: NavbarProps) => {
  const params = useParams()
  const docId = useQuery(api.documents.getById, {
    documentId: params.documentId as Id<'documents'>,
  })

  if (docId === undefined) {
    return (
      <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center justify-between">
        <Title.Skeleton />
        <div className="flex items-center gap-2">
          <Menu.Skeleton />
        </div>
      </nav>
    )
  }

  if (docId === null) return null

  return (
    <>
      <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center gap-4">
        {isCollapsed && (
          <MenuIcon
            role="button"
            onClick={onResetWidth}
            className="h-6 w-6 text-muted-foreground"
          />
        )}
        <div className="flex items-center justify-between w-full">
          <Title initialData={docId} />
          <div className="flex items-center gap-2">
            <Menu documentId={docId._id} />
          </div>
        </div>
      </nav>
      {docId.isArchived && <Banner documentId={docId._id} />}
    </>
  )
}
