import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import { ThemeProvider } from "./context/theme-provider"
import DashBoard from "./pages/weather-dashboard"
import CityPage from "./pages/city-page"



function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark">
        <Layout>
          <Routes>
            <Route path="/" element={<DashBoard/>} />
            <Route path="/city/:cityName" element={<CityPage/>} />
          </Routes>
      </Layout>
      </ThemeProvider>
    </BrowserRouter>

  )
}

export default App
