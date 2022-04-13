import { lazy, Suspense, useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import NavBar from "./components/NavBar"
import Footer from "./components/Footer"

const App = () => {
  // Lazy loading
  const MergePage = lazy(() => import("./components/MergePage"))

  // DARK: setup
  const [darkMode, setDarkMode] = useState(true)

  const toggleDarkMode = () => {
    // addNotification(`🌓 Switched to ${darkMode ? "light" : "dark"} mode`)
    setDarkMode((prev) => !prev)
  }

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="bg-white text-black dark:bg-[#212121] dark:text-white md:mt-0 relative text-xl">
        <NavBar
          title="Rocket PDF"
          links={[
            {
              name: "Home",
              href: "/",
              icon: "ant-design:home-outlined",
            },
          ]}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />
        <div className="md:mt-20"></div>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <MergePage />
                </Suspense>
              }
            />
            <Route
              path="/merge"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <MergePage />
                </Suspense>
              }
            />
            <Route
              path="*"
              element={
                <main style={{ padding: "1rem", minHeight: "50vh" }}>
                  <p>There's nothing here!</p>
                </main>
              }
            />
          </Routes>
        </BrowserRouter>
        <Footer
          name="Rocket PDF"
          subtitle="A cliche PDF tool"
          links={[
            {
              name: "Home",
              href: "/",
            },
          ]}
        />
      </div>
    </div>
  )
}

export default App
