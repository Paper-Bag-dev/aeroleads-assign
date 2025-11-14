import axios from "axios";
import { useEffect, useRef, useState } from "react";

const AutoDialer = () => {
  const [prompt, setPrompt] = useState("");
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const intervalRef = useRef<number | null>(null);

  const fetchLogs = async () => {
    try {
      const res = await axios.get("http://localhost:3000/calls");
      if (res.data) {
        setLogs(res.data.call_log || []);
      }
    } catch (err) {
      console.error("Failed to fetch logs:", err);
    }
  };

  const startFetchingLogs = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(fetchLogs, 5000);
    fetchLogs();
  };

  const stopFetchingLogs = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const onSubmit = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/calls", {
        phone_numbers: prompt.split(",").map((num) => num.trim()),
      });

      if (response?.data?.log) {
        setLogs((prev) => [...prev, ...response.data.log]);
      }

      startFetchingLogs();
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => stopFetchingLogs();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen gap-12 p-12 bg-black text-white">
      <div className="text-4xl">Aeroleads Caller</div>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="w-108 py-3 text-white border-2 border-white/50 rounded-2xl px-4 bg-transparent"
        placeholder="Enter comma-separated numbers"
      />

      <button
        onClick={onSubmit}
        disabled={loading}
        className={`w-32 h-12 px-4 py-3 text-black rounded-2xl transition ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-white hover:cursor-pointer"
        }`}
      >
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
            <span>Calling</span>
          </div>
        ) : (
          "Submit"
        )}
      </button>

      <div className="w-full max-w-xl mt-8">
        <div className="mb-3 text-xl font-semibold">Call Logs:</div>

        {logs.length === 0 ? (
          <div className="text-white/70">No calls yet.</div>
        ) : (
          <div className="flex flex-col gap-3">
            {logs.map((log, idx) => (
              <div
                key={idx}
                className="p-4 border border-white/30 rounded-xl bg-white/5"
              >
                <div className="font-medium text-white">
                  Phn: {log.phone_number}
                </div>
                <div className="text-sm text-white/70">
                  Status:{" "}
                  <span
                    className={
                      log.status === "completed"
                        ? "text-green-400"
                        : log.status === "in-progress"
                        ? "text-yellow-400"
                        : "text-red-400"
                    }
                  >
                    {log.status || log.error || "pending"}
                  </span>
                </div>
                {log.duration && (
                  <div className="text-sm text-white/60">
                    Duration: {log.duration}s
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AutoDialer;
