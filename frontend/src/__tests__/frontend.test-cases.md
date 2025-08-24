# Frontend Test Cases (Plain English)

## Authentication
- Verify that the login page loads correctly.
- Ensure users can log in with email + password.
- Verify LinkedIn, Google, and Facebook login buttons redirect correctly.
- Ensure an error message appears for incorrect credentials.
- Confirm logged-in users are redirected to the home page.
- Ensure the logout button clears user session and returns to login screen.

## Navigation & Layout
- Verify that the navbar links navigate to the correct pages.
- Ensure the footer is visible on all pages.
- Confirm protected routes redirect to login if the user is not authenticated.

## Search & Discovery
- Ensure the search bar accepts input and triggers a location search.
- Verify Google Maps loads with markers for nearby charging stations.
- Confirm clicking a station marker opens the station detail view.
- Ensure stations also appear in a list view below the map.

## Station Details
- Verify station detail page displays host name, price, availability, and reviews.
- Ensure the “Book Now” button is visible and clickable.
- Confirm the reviews list loads correctly.
- Ensure submitting a review updates the list immediately.

## Booking Flow
- Ensure users can select a date and time range on the booking form.
- Confirm booking summary displays correct station, time, and price.
- Ensure a booking is not allowed without required fields.
- Verify booking history shows past and upcoming reservations.

## Payments
- Ensure the payment form loads with the correct booking details.
- Confirm Stripe checkout page is opened when paying.
- Verify successful payments redirect to the success page.
- Ensure failed payments redirect to the failure page.

## Host Features
- Verify hosts can open their dashboard and see their listed stations.
- Ensure “Add Station” form allows uploading details and location.
- Confirm editing a station updates the station info.
- Verify host earnings are calculated and displayed correctly.

## UI & Shared Components
- Ensure the Loader appears during API requests.
- Confirm the Modal opens and closes correctly.
- Verify alerts show up for errors and confirmations.
- Ensure RatingStars displays the correct number of stars.
