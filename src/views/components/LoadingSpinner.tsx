interface LoadingSpinnerProps {
    size?: "sm" | "md" | "lg";
    message?: string;
}

export const LoadingSpinner = ({
    size = "md",
    message,
}: LoadingSpinnerProps) => {
    const sizeClasses = {
        sm: "h-12 w-12",
        md: "h-20 w-20",
        lg: "h-28 w-28",
    };

    const orbitSizes = {
        sm: "h-8 w-8",
        md: "h-12 w-12",
        lg: "h-16 w-16",
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-[500px] space-y-6">
            {/* Main Loading Animation */}
            <div className="relative">
                {/* Central Star */}
                <div className={`${sizeClasses[size]} relative`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-full animate-pulse shadow-2xl"></div>
                    <div className="absolute inset-1 bg-gradient-to-br from-blue-300 via-purple-400 to-pink-400 rounded-full animate-spin shadow-xl"></div>
                    <div className="absolute inset-2 bg-gradient-to-br from-white via-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                        <svg
                            className="w-6 h-6 text-purple-600 animate-pulse"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                            />
                        </svg>
                    </div>
                </div>

                {/* Orbiting Planets */}
                <div
                    className="absolute inset-0 animate-spin"
                    style={{ animationDuration: "8s" }}
                >
                    <div
                        className={`${orbitSizes[size]} absolute -top-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full shadow-lg`}
                    ></div>
                </div>

                <div
                    className="absolute inset-0 animate-spin"
                    style={{
                        animationDuration: "12s",
                        animationDirection: "reverse",
                    }}
                >
                    <div
                        className={`${orbitSizes[size]} absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full shadow-lg`}
                    ></div>
                </div>

                <div
                    className="absolute inset-0 animate-spin"
                    style={{ animationDuration: "6s" }}
                >
                    <div
                        className={`${orbitSizes[size]} absolute top-1/2 -left-2 transform -translate-y-1/2 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full shadow-lg`}
                    ></div>
                </div>

                <div
                    className="absolute inset-0 animate-spin"
                    style={{
                        animationDuration: "10s",
                        animationDirection: "reverse",
                    }}
                >
                    <div
                        className={`${orbitSizes[size]} absolute top-1/2 -right-2 transform -translate-y-1/2 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-full shadow-lg`}
                    ></div>
                </div>

                {/* Outer Ring */}
                <div
                    className="absolute inset-0 border-2 border-dashed border-white/30 rounded-full animate-spin"
                    style={{
                        animationDuration: "20s",
                        transform: "scale(1.8)",
                    }}
                ></div>
            </div>

            {/* Loading Text */}
            {message && (
                <div className="text-center space-y-2">
                    <p className="text-white text-xl font-semibold animate-pulse">
                        {message}
                    </p>
                    <div className="flex space-x-1 justify-center">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                        <div
                            className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                            className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                        ></div>
                    </div>
                </div>
            )}

            {/* Floating Stars */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                        style={{
                            left: `${20 + Math.random() * 60}%`,
                            top: `${20 + Math.random() * 60}%`,
                            animationDelay: `${Math.random() * 2}s`,
                            animationDuration: `${1 + Math.random() * 2}s`,
                        }}
                    />
                ))}
            </div>
        </div>
    );
};
