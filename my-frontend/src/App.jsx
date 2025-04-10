import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './componentSection/navbar.jsx';
import Footer from './componentSection/Footer.jsx';
import FeatureedCard from './componentSection/FeatureedCard.jsx';
import CategorySection from './componentSection/CategorySection.jsx';
import PaymentAndSponsors from './componentSection/PaymentAndSponsor.jsx';
import MarketingSlider from './componentSection/MarketingSlider.jsx';
//import Home from './pages/Home.jsx';
import CreateBook from './pages/CreateBooks';
import ShowBook from './pages/ShowBooks';
import EditBook from './pages/EditBooks';
import DeleteBook from './pages/DeleteBook';
import ProductsUp from './pages/ProductsUp.jsx';
import Seller from './pages/Seller.jsx';
import Cart from './componentSection/Cart.jsx'


const App = () => {
  return (
    <>
      <Navbar />
      
      <Routes>
        {/* Home Page (Displays All Sections Except Books) */}
        <Route
          path="/"
          element={
            <>
              
              <FeatureedCard />
              <MarketingSlider />
              <CategorySection />
              
              <PaymentAndSponsors />
            </>
          }
        />

        {/* ProductsUp Page (Only Displays Books-Related Components) */}
        <Route
          path="/ProductsUp"
          element={
            <>
              <ProductsUp />
              
            </>
          }
        />
        <Route path="/books/create" element={<CreateBook />} />
        <Route path="/books/details/:id" element={<ShowBook />} />
        <Route path="/books/edit/:id" element={<EditBook />} />
        <Route path="/books/delete/:id" element={<DeleteBook />} />
        <Route path="/seller" element={
          <>
          <Seller/>
          </>
          } 
          />
           <Route path="/cart" element={
          <>
          <Cart/>
          </>
          } 
          />
          
      </Routes>
      <Footer />
    </>
  );
};

export default App;
