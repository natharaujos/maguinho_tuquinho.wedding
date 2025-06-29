import { Route, Routes, BrowserRouter } from 'react-router-dom'
import GiftList from './components/GiftList/GiftList'
import Home from './components/Home/Home'
import Navbar from './components/Navbar/Navbar'
import OurHistory from './components/OurHistory/OurHistory'
import GiftCheckout from './pages/GiftCheckout'
import PaymentSuccess from './components/PaymentSuccess/PaymentSuccess'
import ProtectedRoute from './components/Auth/ProtectedRoute'
import GoogleLogin from './components/Auth/GoogleLogin'
import PaymentOptions from './pages/PaymentOptions'
import CreditCardForm from './pages/CreditCardForm'
import PixCheckout from './pages/PixCheckout'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="pt-20">
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Home />
                  <OurHistory />
                  <GiftList />
                </>
              }
            />
            <Route
              path="/gift/:id"
              element={
                <ProtectedRoute>
                  <GiftCheckout />
                </ProtectedRoute>
              }
            />
            <Route
              path="/gift/:id/options"
              element={
                <ProtectedRoute>
                  <PaymentOptions />
                </ProtectedRoute>
              }
            />
            <Route
              path="/gift/:id/card"
              element={
                <ProtectedRoute>
                  <CreditCardForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/gift/pix-checkout"
              element={
                <ProtectedRoute>
                  <PixCheckout />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payment/:payment_id"
              element={
                <ProtectedRoute>
                  <PaymentSuccess />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<GoogleLogin onLogin={(user) => console.log(user)} />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
