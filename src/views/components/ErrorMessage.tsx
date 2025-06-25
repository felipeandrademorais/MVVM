interface ErrorMessageProps {
    title?: string;
    message: string;
    onRetry?: () => void;
}

export const ErrorMessage = ({
    title = "Ops! Algo deu errado",
    message,
    onRetry,
}: ErrorMessageProps) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[500px] p-8">
            <div className="backdrop-blur-xl bg-red-500/10 border border-red-500/30 rounded-3xl p-10 w-full max-w-md text-center shadow-2xl">
                <div className="mb-6">
                    <div className="mx-auto w-20 h-20 bg-gradient-to-br from-red-400/20 to-red-600/20 rounded-full flex items-center justify-center mb-6 backdrop-blur-sm border border-red-500/30">
                        <svg
                            className="w-10 h-10 text-red-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                            />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                        {title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">{message}</p>
                </div>

                {onRetry && (
                    <button
                        onClick={onRetry}
                        className="group relative px-8 py-3 rounded-2xl font-semibold text-white transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-red-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <span className="relative flex items-center justify-center space-x-2">
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                />
                            </svg>
                            <span>Tentar Novamente</span>
                        </span>
                    </button>
                )}
            </div>
        </div>
    );
};
