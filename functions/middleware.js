export async function onRequest(context) {
  console.log("Middleware executed for URL:", context.request.url);
  
  // 从环境变量读取是否开启跳转功能
  const isRedirect = context.env.ABUSE_REDIRECT_ENABLED === "true";
  console.log("ABUSE_REDIRECT_ENABLED environment variable:", context.env.ABUSE_REDIRECT_ENABLED);
  console.log("isRedirect value:", isRedirect);

  // 只有在开启跳转功能且访问的是首页时才跳转
  const isHomePage = context.request.url.endsWith("/") || context.request.url.includes("/index.html");
  console.log("Is home page request:", isHomePage);
  
  if (isRedirect && isHomePage) {
    console.log("Redirect condition met, redirecting to /redirect.html");
    // 返回 redirect.html
    return context.env.ASSETS.fetch(new URL("/redirect.html", context.request.url));
  }

  console.log("No redirect, continuing with normal request processing");
  // 否则放行
  return context.next();
}