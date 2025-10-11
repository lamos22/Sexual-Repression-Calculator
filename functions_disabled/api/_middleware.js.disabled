export async function onRequest(context) {
  console.log("API middleware executed for URL:", context.request.url);
  
  // 从环境变量读取是否开启跳转功能
  const isRedirect = context.env.ABUSE_REDIRECT_ENABLED === "true";
  console.log("ABUSE_REDIRECT_ENABLED environment variable:", context.env.ABUSE_REDIRECT_ENABLED);
  console.log("isRedirect value:", isRedirect);

  // 如果开启了跳转功能，则对所有API请求也跳转
  if (isRedirect) {
    console.log("Redirect enabled for API requests, serving redirect.html");
    // 返回 redirect.html
    return context.env.ASSETS.fetch(new URL("/redirect.html", context.request.url));
  }

  console.log("No redirect, continuing with normal request processing");
  // 否则放行
  return context.next();
}