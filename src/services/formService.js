import { hasSubmittedLeadThisVisit, markLeadSubmittedThisVisit } from '../utils/leadVisit.js';

let submissionInProgress = false;
let submissionCompleted = false;
const delivered = new Map();

export const submitFormData = async (data) => {
  // Acquire before any await: all forms share this synchronous guard.
  if (submissionInProgress || submissionCompleted || hasSubmittedLeadThisVisit()) return false;
  submissionInProgress = true;
  try {
    await deliverFormData(data);
    submissionCompleted = true;
    markLeadSubmittedThisVisit();
    return true;
  } finally {
    submissionInProgress = false;
  }
};

const deliverFormData = async (data) => {
  const SUPABASE_URL = "https://xgkkooklaijfxercjjvy.supabase.co";
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhna2tvb2tsYWlqZnhlcmNqanZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEwNzAwODUsImV4cCI6MjA5NjY0NjA4NX0.HHpuifBbBDXxMRa6GN0lYIpqpcLLdmSi2sRjRJ9NyGg";
  const PABBLY_WEBHOOK_URL = "https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjcwNTZlMDYzZjA0MzI1MjZiNTUzMTUxMzUi_pc";

  const payload = {
    name: data.name || "",
    phone: data.phone || "",
    email: data.email || null,
    requirement: data.requirement || null,
    location: data.location || null,
    utm_source: data.utm_source || null,
    utm_medium: data.utm_medium || null,
    utm_campaign: data.utm_campaign || null,
    utm_term: data.utm_term || null,
    utm_content: data.utm_content || null
  };

  const body = JSON.stringify(payload);
  const accepted = delivered.get(body) || new Set();
  delivered.set(body, accepted);
  const errors = [];

  try {
    if (!accepted.has('supabase')) {
    // 1. Submit to Supabase
    const response = await fetch(`${SUPABASE_URL}/rest/v1/subhamgroup_Ashray`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
        "Prefer": "return=minimal"
      },
      body
    });
    if (!response.ok) throw new Error('Lead storage rejected the submission');
    accepted.add('supabase');
    }
  } catch (error) {
    errors.push(error);
  }

  try {
    if (!accepted.has('pabbly')) {
    // 2. Submit to Pabbly
    // Note: If Pabbly requires FormData instead of JSON, we can switch to FormData,
    // but usually they accept application/json just fine.
    const response = await fetch(PABBLY_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body
    });
    if (!response.ok) throw new Error('Lead webhook rejected the submission');
    accepted.add('pabbly');
    }
  } catch (error) {
    errors.push(error);
  }
  if (errors.length) throw new Error('We could not complete your enquiry. Please try again.');
};
