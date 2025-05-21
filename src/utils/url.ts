export function getBaseUrl() {
  const enviroment = process.env.NODE_ENV;
  const baseUrl =
    enviroment === "development"
      ? "http://localhost:3000"
      : `http://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  return baseUrl;
}
