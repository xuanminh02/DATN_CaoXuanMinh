import { useRef } from "react"
import { createContext } from "react"
import { useEffect } from "react"
import { io } from "socket.io-client"
import { SERVER_URL } from "../config/config"

export const SocketContext= createContext()
const ContainerSocket = ({children}) => { 
  const socketRef= useRef(null)
  useEffect(()=> {
    socketRef.current= io(`${SERVER_URL}/client`, { transports: ["websocket"] })
  }, [])
  const ping= ()=> {
    socketRef.current.emit("hello", {data: "giang"})
    socketRef.current.on("server", (data)=> {
        console.log(1111) 
    })
  }
  return (
    <SocketContext.Provider value={{socketRef}}>
        {children}
    </SocketContext.Provider>
  )
}

export default ContainerSocket
