import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Navbar from './component/navbar.jsx'
import Footer from './component/Footer.jsx'
import FeaturedCards from './component/FeatureedCard.jsx'
import CategorySection from './component/CategorySection.jsx'
import PaymentAndSponsors from './component/PaymentAndSponsor.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar/>
    <FeaturedCards/>
    <App />
    <CategorySection/>
    <PaymentAndSponsors/>
    <Footer/>
    
    
  </StrictMode>,
)
