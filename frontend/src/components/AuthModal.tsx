import { useState } from "react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (password: string) => void;
  isAuthenticating: boolean;
}

export default function AuthModal({
  isOpen,
  onClose,
  onSubmit,
  isAuthenticating,
}: AuthModalProps) {
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    onSubmit(password);
    setPassword("");
  };

  if (!isOpen) return null;

  return (
    <div className="bg-opacity-60 fixed inset-0 z-50 flex items-center justify-center bg-black p-4 backdrop-blur-sm">
      <div className="w-full max-w-md transform rounded-2xl bg-white p-8 shadow-2xl transition-all">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white">
            <svg
              className="h-8 w-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">Admin Access</h3>
          <p className="mt-2 text-gray-600">
            Enter your credentials to continue
          </p>
        </div>

        <div className="space-y-6">
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) =>
              e.key === "Enter" && !isAuthenticating && handleSubmit()
            }
            className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-lg focus:border-green-500 focus:ring-4 focus:ring-green-200 focus:outline-none"
            autoFocus
            disabled={isAuthenticating}
          />

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 rounded-xl bg-gray-100 px-4 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-200"
              disabled={isAuthenticating}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isAuthenticating}
              className="flex-1 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-3 font-medium text-white transition-all hover:from-green-600 hover:to-emerald-700 disabled:opacity-50"
            >
              {isAuthenticating ? "Authenticating..." : "Access Dashboard"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
