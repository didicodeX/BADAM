import { useEffect, useState } from "react";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { getMe } from "@/features/auth/api/auth.api";

export default function AuthDebug() {
  const { user } = useAuthStore();
  const [apiUser, setApiUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function checkApi() {
      try {
        const res = await getMe();
        setApiUser(res.data.user);
      } catch (err) {
        setApiUser(null);
        setError(err.response?.data?.message || "Erreur API");
      }
    }
    checkApi();
  }, []);

  return (
    <div className="p-6 text-sm bg-white rounded border border-gray-200 mt-6 max-w-xl mx-auto">
      <h2 className="text-lg font-semibold mb-4">🛠️ Auth Debug Panel</h2>

      <div className="mb-4">
        <strong>🧠 Store user:</strong>
        <pre className="bg-gray-100 p-2 rounded overflow-auto">
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>

      <div className="mb-4">
        <strong>📡 API /me:</strong>
        <pre className="bg-gray-100 p-2 rounded overflow-auto">
          {apiUser
            ? JSON.stringify(apiUser, null, 2)
            : error
            ? `❌ ${error}`
            : "Chargement..."}
        </pre>
      </div>

      <div>
        <strong>📍 Info navigateur :</strong>
        <ul className="list-disc list-inside">
          <li>Page: {window.location.href}</li>
          <li>
            Cookies visibles (document.cookie):{" "}
            {document.cookie || "[HttpOnly] - non visible"}
          </li>
        </ul>
      </div>
    </div>
  );
}
