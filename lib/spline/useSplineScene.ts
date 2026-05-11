import { useState, useCallback } from 'react'

export type SplineSceneState = 'idle' | 'ready' | 'error'

export interface UseSplineSceneReturn {
  state: SplineSceneState
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onLoad: (app: any) => void
  onError: () => void
}

export function useSplineScene(): UseSplineSceneReturn {
  const [state, setState] = useState<SplineSceneState>('idle')

  const onLoad  = useCallback(() => setState('ready'), [])
  const onError = useCallback(() => setState('error'), [])

  return { state, onLoad, onError }
}
