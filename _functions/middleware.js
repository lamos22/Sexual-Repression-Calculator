// export async function onRequest(context) {
//   // 获取环境变量
//   const isRedirect = context.env.ABUSE_REDIRECT_ENABLED === "true";

//   // 如果开启了跳转开关 && 访问的是首页
//   if (isRedirect && context.request.url.endsWith("/")) {
//     // 返回 redirect.html
//     return context.env.ASSETS.fetch(new URL("/redirect.html", context.request.url));
//   }

//   // 否则正常继续
//   return context.next();
// }

export async function onRequest(context) {
  // 从环境变量读取是否开启跳转功能
  const isRedirect = context.env.ABUSE_REDIRECT_ENABLED === "true";

  if (isRedirect) {
    // 如果开关开启，则所有请求都返回 redirect.html
    return context.env.ASSETS.fetch(new URL("/redirect.html", context.request.url));
  }

  // 否则放行
  return context.next();
}
