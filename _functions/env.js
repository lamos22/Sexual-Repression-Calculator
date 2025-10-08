export async function onRequest(context) {
  return new Response(
    JSON.stringify({
      showAbusePopup: context.env.SHOW_ABUSE_POPUP || "false"
    }),
    {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store"
      }
    }
  );
}
