'use client'

import { useTheme } from 'next-themes'

import { BlockNoteEditor, PartialBlock } from '@blocknote/core'
import { BlockNoteView, useBlockNote } from '@blocknote/react'
import '@blocknote/core/style.css'
import { useEdgeStore } from '@/lib/edgestore'

interface EditorProps {
  onChange: (value: string) => void
  initialContent?: string
  editable?: boolean
}

export const Editor = ({ initialContent, editable, onChange }: EditorProps) => {
  const { resolvedTheme } = useTheme()
  const { edgestore } = useEdgeStore()

  const handleUpload = async (file: File) => {
    const res = await edgestore.publicFiles.upload({
      file,
    })

    return res.url
  }

  const editorNote: BlockNoteEditor = useBlockNote({
    editable,
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    onEditorContentChange: (editor) => {
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2))
    },
    uploadFile: handleUpload,
  })

  return (
    <div className="">
      <BlockNoteView
        editor={editorNote}
        theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
      />
    </div>
  )
}
