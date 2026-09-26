/**
 * SOS Helper - emails SOS alerts with GPS location to emergency contacts
 * via Resend.
 *
 * SOSsend(fallbackNumbers, onStatusUpdate) keeps its original signature so
 * SOSButton needs no changes. IMPORTANT: onStatusUpdate is a COMPLETION
 * callback - SOSButton resolves its recording-lock promise on the first call,
 * so it must only fire once every email has been attempted. Intermediate
 * progress goes to the console instead.
 */

import { sendAlertEmail } from '../functions/sendAlert';

export function SOSsend(fallbackNumbers, onStatusUpdate) {
  // Contacts come only from localStorage (read inside sendAlertEmail) -
  // fallbackNumbers is accepted for signature compatibility but ignored.

  if (!navigator.geolocation) {
    console.warn("Geolocation unavailable - sending without location");
    sendSOSAlert(null, onStatusUpdate);
    return;
  }

  console.log("Acquiring location...");

  navigator.geolocation.getCurrentPosition(
    (position) => {
      sendSOSAlert(
        { lat: position.coords.latitude, lon: position.coords.longitude },
        onStatusUpdate
      );
    },
    (err) => {
      console.warn("Geolocation error:", err.message);
      sendSOSAlert(null, onStatusUpdate);
    },
    { enableHighAccuracy: true, timeout: 10000 }
  );
}

async function sendSOSAlert(coords, onStatusUpdate) {
  // Get user profile
  const userProfile = JSON.parse(localStorage.getItem("user_profile") || "{}");
  const userName = `${userProfile.firstName || ""} ${userProfile.surname || ""}`.trim();
  const customMessage = userProfile.customMessage || "I need help.";

  const mapsLink = coords
    ? `https://maps.google.com/?q=${coords.lat},${coords.lon}`
    : "Location unavailable";

  console.log("Sending alerts...");

  let ok = false;
  try {
    ok = await sendAlertEmail(
      `EMERGENCY SOS from ${userName}`,
      `EMERGENCY SOS from ${userName}\n\n${customMessage}\n\nLocation: ${mapsLink}`
    );
  } catch (error) {
    console.error("Error dispatching SOS alert:", error);
  }

  // Completion signal - this releases SOSButton's recording lock
  onStatusUpdate(ok ? "SOS sent" : "SOS could not be sent");
}
