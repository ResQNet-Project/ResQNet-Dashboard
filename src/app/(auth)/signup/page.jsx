"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
    const router = useRouter();
    const supabase = createClient();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    async function handleSignup(e) {
        e.preventDefault();

        setLoading(true);
        setError("");
        setSuccess("");

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    name,
                },
            },
        });

        if (error) {
            setError(error.message);
            setLoading(false);
            return;
        }

        setSuccess(
            "Account created successfully. Redirecting to login..."
        );

        setLoading(false);

        setTimeout(() => {
            router.push("/login");
        }, 1500);
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

                        <h1>Create account</h1>

                        <p>
                            Set up an account to access the ResQNet dashboard.
                        </p>
                    </div>

                    <form onSubmit={handleSignup} className="auth-form">
                        <div className="form-group">
                            <label htmlFor="name">Full name</label>

                            <input
                                id="name"
                                type="text"
                                placeholder="Your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                autoComplete="name"
                                required
                            />
                        </div>

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
                            <label htmlFor="password">Password</label>

                            <input
                                id="password"
                                type="password"
                                placeholder="Minimum 6 characters"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="new-password"
                                minLength={6}
                                required
                            />
                        </div>

                        {error && (
                            <div className="auth-error">
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="auth-success">
                                {success}
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
                                    Creating account...
                                </>
                            ) : (
                                "Create account"
                            )}
                        </button>
                    </form>

                    <div className="auth-footer">
                        <span>Already have an account?</span>

                        <Link href="/login">
                            Sign in
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