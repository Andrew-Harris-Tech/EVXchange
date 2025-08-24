// ...App entry point...
import React from 'react';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import BookingForm from './components/booking/BookingForm';
import BookingSummary from './components/booking/BookingSummary';
import BookingHistory from './components/booking/BookingHistory';
import PaymentForm from './components/payment/PaymentForm';
import StationCard from './components/station/StationCard';
import ReviewList from './components/station/ReviewList';
import HostDashboard from './components/host/HostDashboard';
import Footer from './components/layout/Footer';


function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="container-fluid flex-grow-1 my-4">
        <div className="row">
          <div className="col-md-2 mb-3">
            <Sidebar />
          </div>
          <div className="col-md-8 mb-3">
            <div className="row g-3">
              <div className="col-12">
                <BookingForm />
              </div>
              <div className="col-md-6">
                <BookingSummary />
              </div>
              <div className="col-md-6">
                <BookingHistory />
              </div>
              <div className="col-md-6">
                <PaymentForm />
              </div>
              <div className="col-md-6">
                <StationCard />
              </div>
              <div className="col-12">
                <ReviewList />
              </div>
              <div className="col-12">
                <HostDashboard />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
