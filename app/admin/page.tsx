"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, CheckCircle2, XCircle, Mail, Clock, UserPlus, Key, LogOut } from "lucide-react";

interface WaitlistEntry {
  email: string;
  role: string;
  createdAt: string;
  grantedAccess: boolean;
  grantedAt?: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [granting, setGranting] = useState<string | null>(null);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/check");
      if (!response.ok) {
        router.push("/login?redirect=/admin");
        return;
      }
      setCheckingAuth(false);
      fetchWaitlist();
    } catch (error) {
      router.push("/login?redirect=/admin");
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const fetchWaitlist = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/waitlist");
      if (!response.ok) throw new Error("Failed to fetch waitlist");
      const data = await response.json();
      setWaitlist(data.waitlist);
    } catch (error) {
      setMessage({ type: "error", text: "Failed to load waitlist" });
    } finally {
      setLoading(false);
    }
  };

  const handleGrantAccess = async (email: string, role: string) => {
    setSelectedEmail(email);
    setRole(role);
    setShowPasswordForm(true);
    setPassword("");
  };

  const handleSubmitAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password || password.length < 8) {
      setMessage({ type: "error", text: "Password must be at least 8 characters" });
      return;
    }

    try {
      setGranting(selectedEmail);
      setMessage(null);

      const response = await fetch("/api/admin/grant-access", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: selectedEmail,
          password: password,
          role: role
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to grant access");
      }

      setMessage({ type: "success", text: `Access granted to ${selectedEmail}. They will receive an email with their credentials.` });
      setShowPasswordForm(false);
      setSelectedEmail("");
      setPassword("");
      fetchWaitlist(); // Refresh the list
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Failed to grant access",
      });
    } finally {
      setGranting(null);
    }
  };

  const pendingEntries = waitlist.filter((entry) => !entry.grantedAccess);
  const grantedEntries = waitlist.filter((entry) => entry.grantedAccess);

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-warm-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-eyrie-blue mx-auto mb-4" />
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-heading font-bold text-deep-navy mb-2">
              EyrieCare Admin Panel
            </h1>
            <p className="text-gray-600">Manage waitlist and grant early access</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>

        {message && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message.type === "success"
                ? "bg-success-mint/20 text-green-800 border border-success-mint/50"
                : "bg-error-red/20 text-red-800 border border-error-red/50"
            }`}
          >
            {message.text}
          </div>
        )}

        {showPasswordForm && (
          <Card className="mb-8 border-eyrie-blue">
            <CardHeader>
              <CardTitle>Grant Access to {selectedEmail}</CardTitle>
              <CardDescription>Set a password for this user. They will receive an email with their credentials.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitAccess} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password (min 8 characters)
                  </label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    required
                    minLength={8}
                    className="w-full"
                  />
                </div>
                <div className="flex gap-3">
                  <Button
                    type="submit"
                    disabled={granting === selectedEmail}
                    className="bg-eyrie-blue hover:bg-eyrie-blue/90"
                  >
                    {granting === selectedEmail ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Granting...
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4 mr-2" />
                        Grant Access
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowPasswordForm(false);
                      setSelectedEmail("");
                      setPassword("");
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Pending Waitlist */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-diagnostic-amber" />
                Pending Requests ({pendingEntries.length})
              </CardTitle>
              <CardDescription>
                Users waiting for access
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-eyrie-blue" />
                </div>
              ) : pendingEntries.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No pending requests</p>
              ) : (
                <div className="space-y-3">
                  {pendingEntries.map((entry) => (
                    <div
                      key={entry.email}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <p className="font-medium text-deep-navy">{entry.email}</p>
                        </div>
                        <p className="text-sm text-gray-500">
                          Joined: {new Date(entry.createdAt).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-500">
                          Role: {entry.role}
                        </p>
                      </div>
                      <Button
                        onClick={() => handleGrantAccess(entry.email, entry.role)}
                        size="sm"
                        className="bg-eyrie-blue hover:bg-eyrie-blue/90"
                        disabled={granting === entry.email}
                      >
                        {granting === entry.email ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <>
                            <Key className="w-4 h-4 mr-1" />
                            Grant Access
                          </>
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Granted Access */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-success-mint" />
                Granted Access ({grantedEntries.length})
              </CardTitle>
              <CardDescription>
                Users with active access
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-eyrie-blue" />
                </div>
              ) : grantedEntries.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No users granted yet</p>
              ) : (
                <div className="space-y-3">
                  {grantedEntries.map((entry) => (
                    <div
                      key={entry.email}
                      className="flex items-center justify-between p-4 border rounded-lg bg-success-mint/5 border-success-mint/20"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <CheckCircle2 className="w-4 h-4 text-success-mint" />
                          <p className="font-medium text-deep-navy">{entry.email}</p>
                        </div>
                        <p className="text-sm text-gray-500">
                          Granted: {entry.grantedAt ? new Date(entry.grantedAt).toLocaleDateString() : "N/A"}
                        </p>
                      </div>
                      <span className="text-xs bg-success-mint/20 text-success-mint px-2 py-1 rounded-full">
                        Active
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Button
            onClick={fetchWaitlist}
            variant="outline"
            disabled={loading}
            className="w-full sm:w-auto"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Refreshing...
              </>
            ) : (
              "Refresh List"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

