
import React from 'react';
import BookingSummary from '../components/booking/BookingSummary';
import BookingHistory from '../components/booking/BookingHistory';
import PaymentForm from '../components/payment/PaymentForm';
import ReviewList from '../components/station/ReviewList';
import HostDashboard from '../components/host/HostDashboard';

export default function Dashboard() {
  return (
    <div className="container my-4">
      <h2 className="mb-4">User Dashboard</h2>
      <div className="row g-3">
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
          <ReviewList />
        </div>
        <div className="col-12">
          <HostDashboard />
        </div>
      </div>
    </div>
  );
}
