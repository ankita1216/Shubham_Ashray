const LEAD_SUBMITTED_COOKIE = "subham_ashray_lead_submitted";

export const hasSubmittedLeadThisVisit = () =>
  document.cookie
    .split(";")
    .map((cookie) => cookie.trim())
    .some((cookie) => cookie === `${LEAD_SUBMITTED_COOKIE}=true`);

export const markLeadSubmittedThisVisit = () => {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";

  // No Max-Age or Expires makes this a session cookie (cleared when the
  // browser session ends).
  document.cookie = `${LEAD_SUBMITTED_COOKIE}=true; Path=/; SameSite=Lax${secure}`;
};

export const goToThankYouPage = () => {
  window.location.assign(`${import.meta.env.BASE_URL}thank-you`);
};
