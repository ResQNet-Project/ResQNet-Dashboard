"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
    const router = useRouter();
    const supabase = createClient();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleLogin(e) {
        e.preventDefault();

        setLoading(true);
        setError("");

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
            return;
        }

        router.push("/dashboard");
        router.refresh();
    }

    return (
        <main className="auth-page">
            <div className="network-bg">
                <span className="network-node node-1" />
                <span className="network-node node-2" />
                <span className="network-node node-3" />
                <span className="network-node node-4" />
                <span className="network-node node-5" />
                <span className="network-line line-1" />
                <span className="network-line line-2" />
                <span className="network-line line-3" />
            </div>

            <section className="auth-wrapper">

                <div className="auth-card">
                    <div className="auth-header">
                        <span className="auth-label">ADMIN PORTAL</span>

                        <h1>Welcome back</h1>

                        <p>
                            Sign in to access the ResQNet dashboard.
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="auth-form">
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>

                            <input
                                id="email"
                                type="email"
                                placeholder="admin@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="email"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <div className="label-row">
                                <label htmlFor="password">Password</label>
                            </div>

                            <input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                                required
                            />
                        </div>

                        {error && (
                            <div className="auth-error">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="auth-button"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="button-spinner" />
                                    Signing in...
                                </>
                            ) : (
                                "Sign in"
                            )}
                        </button>
                    </form>

                    <div className="auth-footer">
                        <span>Need an account?</span>

                        <Link href="/signup">
                            Create account
                        </Link>
                    </div>
                </div>

                <div className="system-status">
                    <span className="status-dot" />
                    <span>ResQNet system operational</span>
                </div>

                <p className="auth-copyright">
                    Low-bandwidth disaster response platform
                </p>
            </section>
        </main>
    );
}