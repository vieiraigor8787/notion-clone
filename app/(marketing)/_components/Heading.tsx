'use client'

import { ArrowRight } from 'lucide-react'
import { useConvexAuth } from 'convex/react'

import { Spinner } from '@/components/spinner'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { SignInButton } from '@clerk/clerk-react'

export const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth()

  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl">
        Suas ideias, documentos e planilhas. Unificados. Bem vindos ao{' '}
        <span className="underline">Jotion</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Jotion é uma área de trabalho onde tudo está conectado
      </h3>
      {isLoading && (
        <div className="w-full flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <Button asChild>
          <Link href="/documents">
            Entrar no Jotion
            <ArrowRight />
          </Link>
        </Button>
      )}
      {!isAuthenticated && !isLoading && (
        <SignInButton>
          <Button>
            Registrar-se gratuitamente
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </SignInButton>
      )}
    </div>
  )
}
