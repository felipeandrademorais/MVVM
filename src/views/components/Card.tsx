import type { ReactNode } from "react";

interface CardProps {
    children?: ReactNode;
    className?: string;
    hover?: boolean;
    gradient?: boolean;
    imageSrc?: string;
    title?: string;
    description?: string;
    tags?: string[];
    onImageClick?: () => void;
}

export const Card = ({
    children,
    className = "",
    hover = false,
    gradient = false,
    imageSrc,
    title,
    description,
    tags,
    onImageClick,
}: CardProps) => {
    const baseClasses =
        "backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl overflow-hidden transition-all duration-500";
    const hoverClasses = hover
        ? "hover:shadow-2xl hover:bg-white/20 hover:border-white/30 hover:scale-105 cursor-pointer hover:-translate-y-2"
        : "";
    const gradientClasses = gradient
        ? "bg-gradient-to-br from-white/20 via-white/10 to-white/5"
        : "";

    return (
        <div
            className={`group ${baseClasses} ${hoverClasses} ${gradientClasses} ${className}`}
        >
            {imageSrc && (
                <div className="relative overflow-hidden rounded-t-3xl">
                    <img
                        src={imageSrc}
                        alt={title || "Card image"}
                        className="w-full h-64 object-cover transition-all duration-700 group-hover:scale-110"
                        onClick={onImageClick}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-2 group-hover:translate-x-0">
                        <svg
                            className="w-5 h-5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                </div>
            )}
            <div className="p-6">
                {title && (
                    <h3 className="font-bold text-xl mb-3 text-white leading-tight">
                        {title}
                    </h3>
                )}
                {description && (
                    <p className="text-gray-300 text-base mb-4 leading-relaxed">
                        {description}
                    </p>
                )}
                {children}
                {tags && tags.length > 0 && (
                    <div className="pt-4 pb-2 flex flex-wrap gap-2">
                        {tags.map((tag, index) => (
                            <span
                                key={index}
                                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-200 border border-blue-500/30 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-gradient-to-r hover:from-blue-500/30 hover:to-purple-500/30"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

interface CardHeaderProps {
    children: ReactNode;
    className?: string;
}

export const CardHeader = ({ children, className = "" }: CardHeaderProps) => {
    return (
        <div
            className={`p-6 border-b border-white/10 bg-gradient-to-r from-white/5 to-transparent ${className}`}
        >
            {children}
        </div>
    );
};

interface CardContentProps {
    children: ReactNode;
    className?: string;
}

export const CardContent = ({ children, className = "" }: CardContentProps) => {
    return <div className={`p-6 ${className}`}>{children}</div>;
};

interface CardFooterProps {
    children: ReactNode;
    className?: string;
}

export const CardFooter = ({ children, className = "" }: CardFooterProps) => {
    return (
        <div
            className={`p-6 border-t border-white/10 bg-gradient-to-r from-white/5 to-transparent ${className}`}
        >
            {children}
        </div>
    );
};
