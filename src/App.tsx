import { useState } from "react"
import Footer from "./components/Footer"
import MergePage from "./components/MergePage"
import NavBar from "./components/NavBar"

const App = () => {
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
          title="RocketPDF"
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
        <MergePage />
        <Footer
          name="RocketPDF"
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
