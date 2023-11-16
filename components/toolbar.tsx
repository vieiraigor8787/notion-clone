'use client'

import { ElementRef, useRef, useState } from 'react'
import { ImageIcon, Smile, X } from 'lucide-react'
import { useMutation } from 'convex/react'
import TextAreaAutoSize from 'react-textarea-autosize'

import { Doc } from '@/convex/_generated/dataModel'
import { api } from '@/convex/_generated/api'

import { IconPicker } from './icon-picker'
import { Button } from './ui/button'

interface ToolbarProps {
  initialData: Doc<'documents'>
  preview?: boolean
}

export const Toolbar = ({ initialData, preview }: ToolbarProps) => {
  const inputRef = useRef<ElementRef<'textarea'>>(null)
  const [isEditting, setIsEditting] = useState(false)
  const [value, setValue] = useState(initialData.title)

  const update = useMutation(api.documents.update)

  const enableInput = () => {
    if (preview) return

    setIsEditting(true)
    setTimeout(() => {
      setValue(initialData.title)
      inputRef.current?.focus()
    }, 0)
  }

  const disableInput = () => {
    setIsEditting(false)
  }

  const onInput = (value: string) => {
    setValue(value)
    update({
      id: initialData._id,
      title: value || 'Sem título',
    })
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      disableInput()
    }
  }

  return (
    <div className="pl-[54px] group relative">
      {!!initialData.icon && !preview && (
        <div className="flex items-center gap-2 group/icon pt-6">
          <IconPicker onChange={() => {}}>
            <p className="text-6xl hover:opacity-75 transition">
              {initialData.icon}
            </p>
          </IconPicker>
          <Button
            onClick={() => {}}
            className="rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground"
            size="icon"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      {!!initialData.icon && preview && (
        <p className="text-6xl pt-6">{initialData.icon}</p>
      )}

      <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 py-4">
        {!initialData.icon && !preview && (
          <IconPicker onChange={() => {}} asChild>
            <Button
              variant="outline"
              size="sm"
              className="text-muted-foreground text-xs"
            >
              <Smile className="h-4 w-4 mr-2" />
              Adicionar ícone
            </Button>
          </IconPicker>
        )}
        {!initialData.coverImage && !preview && (
          <Button
            className="text-muted-foreground text-sm"
            variant="outline"
            size="sm"
          >
            <ImageIcon className="w-4 h-4 mr-2" />
            Adicionar imagem
          </Button>
        )}
      </div>
      {isEditting && !preview ? (
        <TextAreaAutoSize
          ref={inputRef}
          onBlur={disableInput}
          onKeyDown={onKeyDown}
          value={value}
          onChange={(e) => onInput(e.target.value)}
          className="text-5xl bg-transparent font-bold break-words outline-none text-[#3f3f3f] dark:text-[#cfcfcf] resize-none"
        />
      ) : (
        <div
          onClick={enableInput}
          className="pb-[11.5px] text-5xl font-bold break-words text-[#3f3f3f] dark:text-[#cfcfcf] outline-none"
        >
          {initialData.title}
        </div>
      )}
    </div>
  )
}
