export async function onRequest(context) {
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