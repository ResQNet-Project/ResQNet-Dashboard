"use client";

import { useEffect, useRef } from "react";

export default function MeshBackground() {
    const backgroundRef = useRef(null);
    const nodesRef = useRef([]);

    useEffect(() => {
        const background = backgroundRef.current;

        if (!background) return;

        let pulseTimer;
        let pulseTimeout;
        let mouseFrame;

        const handleMouseMove = (event) => {
            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                return;
            }

            const x = event.clientX / window.innerWidth;
            const y = event.clientY / window.innerHeight;

            const moveX = (x - 0.5) * 30;
            const moveY = (y - 0.5) * 30;

            cancelAnimationFrame(mouseFrame);

            mouseFrame = requestAnimationFrame(() => {
                background.style.setProperty("--mouse-x", `${moveX}px`);
                background.style.setProperty("--mouse-y", `${moveY}px`);
                background.style.setProperty(
                    "--cursor-x",
                    `${event.clientX}px`
                );
                background.style.setProperty(
                    "--cursor-y",
                    `${event.clientY}px`
                );
            });
        };

        window.addEventListener("mousemove", handleMouseMove);

        const pulseRandomNode = () => {
            const nodes = nodesRef.current.filter(Boolean);

            if (!nodes.length) return;

            const randomIndex = Math.floor(
                Math.random() * nodes.length
            );

            const node = nodes[randomIndex];

            node.classList.remove("emergency-node");

            // Force animation restart
            void node.offsetWidth;

            node.classList.add("emergency-node");

            pulseTimeout = setTimeout(() => {
                node.classList.remove("emergency-node");
            }, 3000);
        };

        const schedulePulse = () => {
            const delay = 2200 + Math.random() * 2800;

            pulseTimer = setTimeout(() => {
                pulseRandomNode();
                schedulePulse();
            }, delay);
        };

        schedulePulse();

        return () => {
            window.removeEventListener(
                "mousemove",
                handleMouseMove
            );

            cancelAnimationFrame(mouseFrame);

            clearTimeout(pulseTimer);
            clearTimeout(pulseTimeout);
        };
    }, []);

    return (
        <div
            ref={backgroundRef}
            className="mesh-background"
            aria-hidden="true"
        >
            <div className="cursor-field" />

            <svg
                className="mesh-svg"
                viewBox="0 0 1440 900"
                preserveAspectRatio="none"
            >
                {/* LEFT NETWORK */}

                <line x1="40" y1="150" x2="250" y2="300" />
                <line x1="250" y1="300" x2="390" y2="180" />
                <line x1="250" y1="300" x2="430" y2="470" />
                <line x1="390" y1="180" x2="520" y2="80" />
                <line x1="430" y1="470" x2="530" y2="590" />

                <line
                    x1="40"
                    y1="150"
                    x2="120"
                    y2="430"
                    className="faint"
                />

                {/* RIGHT NETWORK */}

                <line x1="1400" y1="120" x2="1190" y2="250" />
                <line x1="1190" y1="250" x2="1080" y2="120" />
                <line x1="1190" y1="250" x2="1020" y2="430" />
                <line x1="1080" y1="120" x2="930" y2="70" />
                <line x1="1020" y1="430" x2="910" y2="560" />

                <line
                    x1="1400"
                    y1="120"
                    x2="1340"
                    y2="410"
                    className="faint"
                />

                {/* LOWER NETWORK */}

                <line
                    x1="120"
                    y1="700"
                    x2="330"
                    y2="610"
                    className="faint"
                />

                <line
                    x1="330"
                    y1="610"
                    x2="470"
                    y2="760"
                    className="faint"
                />

                <line
                    x1="1320"
                    y1="700"
                    x2="1110"
                    y2="610"
                    className="faint"
                />

                <line
                    x1="1110"
                    y1="610"
                    x2="970"
                    y2="760"
                    className="faint"
                />
            </svg>

            {/* LEFT */}

            <span
                ref={(el) => (nodesRef.current[0] = el)}
                className="mesh-node node-left-1"
            />

            <span
                ref={(el) => (nodesRef.current[1] = el)}
                className="mesh-node node-left-2 active"
            />

            <span
                ref={(el) => (nodesRef.current[2] = el)}
                className="mesh-node node-left-3"
            />

            <span
                ref={(el) => (nodesRef.current[3] = el)}
                className="mesh-node node-left-4 active"
            />

            <span
                ref={(el) => (nodesRef.current[4] = el)}
                className="mesh-node node-left-5"
            />

            <span
                ref={(el) => (nodesRef.current[5] = el)}
                className="mesh-node node-left-6"
            />

            {/* RIGHT */}

            <span
                ref={(el) => (nodesRef.current[6] = el)}
                className="mesh-node node-right-1"
            />

            <span
                ref={(el) => (nodesRef.current[7] = el)}
                className="mesh-node node-right-2 active"
            />

            <span
                ref={(el) => (nodesRef.current[8] = el)}
                className="mesh-node node-right-3"
            />

            <span
                ref={(el) => (nodesRef.current[9] = el)}
                className="mesh-node node-right-4 active"
            />

            <span
                ref={(el) => (nodesRef.current[10] = el)}
                className="mesh-node node-right-5"
            />

            <span
                ref={(el) => (nodesRef.current[11] = el)}
                className="mesh-node node-right-6"
            />

            {/* BOTTOM */}

            <span
                ref={(el) => (nodesRef.current[12] = el)}
                className="mesh-node node-bottom-1"
            />

            <span
                ref={(el) => (nodesRef.current[13] = el)}
                className="mesh-node node-bottom-2"
            />

            <span
                ref={(el) => (nodesRef.current[14] = el)}
                className="mesh-node node-bottom-3"
            />

            <span
                ref={(el) => (nodesRef.current[15] = el)}
                className="mesh-node node-bottom-4"
            />

            {/* Data packets */}

            <span className="signal signal-left" />
            <span className="signal signal-right" />
        </div>
    );
}