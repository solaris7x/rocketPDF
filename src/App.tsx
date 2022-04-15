import { lazy, Suspense, useEffect, useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import NavBar from "./components/NavBar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import LoadingPage from "./utils/LoadingPage"
import Page404 from "./utils/Page404"

const App = () => {
  // Lazy loading
  const MergePage = lazy(() => import("./pages/MergePage"))

  useEffect(() => {
    // Google analytics 4 tracking
    import("./functions/gAnalytics")
      .then(({ default: gAnalytics }) => {
        gAnalytics()
      })
      .catch((_) => {
        console.error("Couldn't load G-Analytics")
      })
    // End of GA4
  }, [])

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
            {
              name: "Features",
              href: "/#features",
              icon: "bi:gear-fill",
            },
            {
              name: "Tools",
              href: "/#tools",
              icon: "carbon:tools",
            },
          ]}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />
        <div className="md:mt-20"></div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/merge"
              element={
                <Suspense fallback={<LoadingPage />}>
                  <MergePage />
                </Suspense>
              }
            />
            <Route path="*" element={<Page404 />} />
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
            {
              name: "Features",
              href: "/#features",
            },
            {
              name: "Tools",
              href: "/#tools",
            },
          ]}
        />
      </div>
    </div>
  )
}

export default App
