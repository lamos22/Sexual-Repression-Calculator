export async function onRequest(context) {
  console.log("API /api/env called");
  console.log("Environment variables:", {
    SHOW_ABUSE_POPUP: context.env.SHOW_ABUSE_POPUP,
    ABUSE_REDIRECT_ENABLED: context.env.ABUSE_REDIRECT_ENABLED
  });
  
  return new Response(
    JSON.stringify({
      showAbusePopup: context.env.SHOW_ABUSE_POPUP || "false",
      abuseRedirectEnabled: context.env.ABUSE_REDIRECT_ENABLED || "false"
    }),
    {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store"
      }
    }
  );
}