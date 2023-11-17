'use client'

import { BlockNoteEditor, PartialBlock } from '@blocknote/core'
import { BlockNoteView, useBlockNote } from '@blocknote/react'
import '@blocknote/core/style.css'

import { useTheme } from 'next-themes'

interface EditorProps {
  onChange: (value: string) => void
  initialContent?: string
  editable?: boolean
}

export const Editor = ({ initialContent, editable, onChange }: EditorProps) => {
  const { resolvedTheme } = useTheme()

  const editorNote: BlockNoteEditor = useBlockNote({
    editable,
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    onEditorContentChange: (editor) => {
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2))
    },
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
