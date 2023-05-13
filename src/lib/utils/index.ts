import { redirect } from '@sveltejs/kit'
import type { AuthUser, Rating } from '@prisma/client'
export * from './types'

export const doRedirect = (url: URL, hasSession: boolean) => {
  const redirectTo = url.searchParams.get('redirectTo')
  if (hasSession) {
    if (redirectTo?.length) {
      throw redirect(302, `/${redirectTo.slice(1)}`)
    } else {
      throw redirect(302, '/')
    }
  }
}

export const useAuthorName = (author: AuthUser) => {
  return author.displayName || author.username
}

export const truncate = (str: string, len: number) => {
  if (str.length <= len) {
    return str
  }
  return `${str.slice(0, len)}...`
}

export const useRating = (rating: Rating | string) => {
  switch (rating) {
    case 's':
      return 'Safe for All Ages'
    case 't':
      return 'Teen'
    case 'm':
      return 'Mature'
    case 'e':
      return 'Explicit (18+)'
    default:
      return 'Unknown'
  }
}

export const useRatingIcon = (rating: Rating | string) => {
  switch (rating) {
    case 's':
      return 'fluent:people-24-filled'
    case 't':
      return 'material-symbols:generating-tokens-rounded'
    case 'm':
      return 'fluent:rating-mature-24-filled'
    case 'e':
      return 'material-symbols:explicit-rounded'
  }
}

export const clickOutside = (node: Element) => {

  const handleClick = (event: MouseEvent) => {
    if (node && !node.contains(event.target as Node) && !event.defaultPrevented) {
      node.dispatchEvent(
        new CustomEvent('clickOutside', {
          detail: { source: node }
        })
      )
    }
  }

  document.addEventListener('click', handleClick, true);

  return {
    destroy() {
      document.removeEventListener('click', handleClick, true);
    }
  }
}
