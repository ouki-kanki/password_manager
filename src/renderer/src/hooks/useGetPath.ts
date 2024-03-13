import { useEffect } from "react"
import { useLocation, Location } from "react-router-dom"

export const useGetPath = (callback: (location: Location) => void): void => {
  const location = useLocation()

  useEffect(() => {
    callback(location)
  }, [location, callback])
} 