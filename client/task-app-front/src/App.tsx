import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { PublicRoutes } from "./routes/PublicRoutes"
import { PrivateRoutes } from "./routes/PrivateRoutes"
import { ConfigProvider, theme } from "antd"
import AuthContext from "./context/AuthContext"
import { useState } from "react"

function App() {
  const [token, setToken] = useState<string | undefined>(window.localStorage.getItem('token') || undefined);

  return (
    <ConfigProvider
      theme={{
        algorithm : theme.darkAlgorithm
      }}
    >
      <AuthContext.Provider value={{
        token,
        setToken
      }}>
        <Router>
          <Routes>
            <Route path="/*" element={<PublicRoutes />} />
            <Route path="/app/*" element={<PrivateRoutes />}/>
          </Routes>
        </Router>
      </AuthContext.Provider>
    </ConfigProvider>
  )
}

export default App
