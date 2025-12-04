'use client'

import { createContext, useContext, useEffect, useState } from 'react'

interface RealtimeContextType {
  lastUpdate: number
  triggerUpdate: () => void
}

const RealtimeContext = createContext<RealtimeContextType>({
  lastUpdate: 0,
  triggerUpdate: () => {}
})

export function RealtimeProvider({ children }: { children: React.ReactNode }) {
  const [lastUpdate, setLastUpdate] = useState(0)

  const triggerUpdate = () => {
    setLastUpdate(Date.now())
  }

  // Broadcast updates to other tabs/windows
  useEffect(() => {
    const channel = new BroadcastChannel('portfolio-updates')
    
    channel.onmessage = (event) => {
      if (event.data.type === 'UPDATE') {
        setLastUpdate(Date.now())
      }
    }

    return () => {
      channel.close()
    }
  }, [])

  return (
    <RealtimeContext.Provider value={{ lastUpdate, triggerUpdate }}>
      {children}
    </RealtimeContext.Provider>
  )
}

export function useRealtime() {
  return useContext(RealtimeContext)
}

// Hook untuk trigger update dari admin panel
export function useTriggerUpdate() {
  const triggerUpdate = () => {
    // Update local state
    const event = new CustomEvent('portfolio-update')
    window.dispatchEvent(event)
    
    // Broadcast to other tabs
    const channel = new BroadcastChannel('portfolio-updates')
    channel.postMessage({ type: 'UPDATE', timestamp: Date.now() })
    channel.close()
  }

  return triggerUpdate
}

// Hook untuk listen updates di frontend
export function useAutoRefresh(fetchData: () => void, dependencies: any[] = []) {
  const { lastUpdate } = useRealtime()

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastUpdate])

  useEffect(() => {
    const handleUpdate = () => {
      fetchData()
    }

    window.addEventListener('portfolio-update', handleUpdate)
    return () => {
      window.removeEventListener('portfolio-update', handleUpdate)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
