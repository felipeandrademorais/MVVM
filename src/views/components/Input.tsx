import type { ReactNode } from "react";

interface InputProps {
    type?: "text" | "date" | "range" | "number";
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    placeholder?: string;
    min?: string | number;
    max?: string | number;
    className?: string;
    icon?: ReactNode;
}

export const Input = ({
    type = "text",
    value,
    onChange,
    label,
    placeholder,
    min,
    max,
    className = "",
    icon,
}: InputProps) => {
    const baseInputClasses =
        "w-full px-4 py-4 border border-white/20 rounded-2xl shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400/50 bg-white/10 backdrop-blur-md text-white placeholder-gray-300 hover:bg-white/15 hover:border-white/30";
    const rangeClasses =
        "w-full h-3 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-lg appearance-none cursor-pointer slider backdrop-blur-md border border-white/20";

    return (
        <div className={`space-y-3 ${className}`}>
            {label && (
                <label className="block text-sm font-semibold text-white mb-2 flex items-center space-x-2">
                    {icon && <span className="text-purple-400">{icon}</span>}
                    <span>{label}</span>
                </label>
            )}

            <div className="relative group">
                {icon && type !== "range" && (
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-purple-400 transition-colors duration-300">
                        {icon}
                    </div>
                )}

                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    min={min}
                    max={max}
                    className={
                        type === "range"
                            ? rangeClasses
                            : `${baseInputClasses} ${icon ? "pl-12" : ""}`
                    }
                />

                {type !== "range" && (
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                )}
            </div>

            <style>{`
                .slider::-webkit-slider-thumb {
                    appearance: none;
                    height: 24px;
                    width: 24px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #8b5cf6, #3b82f6, #ec4899);
                    cursor: pointer;
                    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.4);
                    border: 2px solid rgba(255, 255, 255, 0.3);
                    transition: all 0.3s ease;
                }

                .slider::-webkit-slider-thumb:hover {
                    transform: scale(1.1);
                    box-shadow: 0 6px 16px rgba(139, 92, 246, 0.6);
                }

                .slider::-moz-range-thumb {
                    height: 24px;
                    width: 24px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #8b5cf6, #3b82f6, #ec4899);
                    cursor: pointer;
                    border: 2px solid rgba(255, 255, 255, 0.3);
                    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.4);
                    transition: all 0.3s ease;
                }

                .slider::-moz-range-thumb:hover {
                    transform: scale(1.1);
                    box-shadow: 0 6px 16px rgba(139, 92, 246, 0.6);
                }

                .slider::-webkit-slider-track {
                    background: linear-gradient(90deg, rgba(59, 130, 246, 0.3), rgba(139, 92, 246, 0.3), rgba(236, 72, 153, 0.3));
                    border-radius: 6px;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                }

                .slider::-moz-range-track {
                    background: linear-gradient(90deg, rgba(59, 130, 246, 0.3), rgba(139, 92, 246, 0.3), rgba(236, 72, 153, 0.3));
                    border-radius: 6px;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                }
            `}</style>
        </div>
    );
};
