export async function GET() {
  const memoryUsage = process.memoryUsage();
  const payload = {
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime_sec: Math.floor(process.uptime()),
    memory: {
      rss_mb: (memoryUsage.rss / (1024 * 1024)).toFixed(2),
      heapTotal_mb: (memoryUsage.heapTotal / (1024 * 1024)).toFixed(2),
      heapUsed_mb: (memoryUsage.heapUsed / (1024 * 1024)).toFixed(2)
    }
  };

  return {
    status: 200,
    json: async () => payload
  };
}
