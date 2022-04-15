import ReactGA from "react-ga4"

const gAnalytics = () => {
  //Initialize Google Analytics
  ReactGA.initialize(`${import.meta.env.VITE_GANALYTICS_ID}`)

  //Track Page View
  ReactGA.send({
    hitType: "pageview",
    page: window.location.pathname + window.location.search,
  })
}

export default gAnalytics
