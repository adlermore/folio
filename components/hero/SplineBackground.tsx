'use client'

import { motion } from 'framer-motion'
import Spline from '@splinetool/react-spline'
import type { UseSplineSceneReturn } from '@/lib/spline/useSplineScene'
const SCENE_URL = 'https://prod.spline.design/a7C41BZoLY6mpV2T/scene.splinecode'



interface SplineBackgroundProps {
  spline: UseSplineSceneReturn
}

export function SplineBackground({ spline }: SplineBackgroundProps) {
  const { state, onLoad } = spline

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {state !== 'error' && (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: state === 'ready' ? 1 : 0 }}
          transition={{ duration: 1.6, ease: 'easeOut' }}
        >
          <Spline
            scene={SCENE_URL}
            onLoad={onLoad}
            onSplineMouseDown={undefined}
            style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
          />
        </motion.div>
      )}

      {state === 'idle' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 rounded-full border border-gold/10 animate-pulse" />
          <div className="absolute w-20 h-20 rounded-full border border-gold/20 animate-pulse" style={{ animationDelay: '0.3s' }} />
          <div className="absolute w-8 h-8 rounded-full bg-gold/5 animate-pulse" style={{ animationDelay: '0.6s' }} />
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/70 to-bg/20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-bg/60 via-transparent to-bg/20 pointer-events-none" />
    </div>
  )
}
