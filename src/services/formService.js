export const submitFormData = async (data) => {
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

  try {
    // 1. Submit to Supabase
    await fetch(`${SUPABASE_URL}/rest/v1/subhamgroup_Ashray`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
        "Prefer": "return=minimal"
      },
      body: JSON.stringify(payload)
    });
  } catch (error) {
    console.error("Supabase Error:", error);
  }

  try {
    // 2. Submit to Pabbly
    // Note: If Pabbly requires FormData instead of JSON, we can switch to FormData,
    // but usually they accept application/json just fine.
    await fetch(PABBLY_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload)
    });
  } catch (error) {
    console.error("Pabbly Error:", error);
  }
};
