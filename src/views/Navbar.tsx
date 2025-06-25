import { useState } from "react";

interface NavbarProps {
    navItems: { id: string; label: string; icon?: React.ReactNode }[];
    activeItem: string;
    onItemClick: (id: string) => void;
}

export const Navbar = ({ navItems, activeItem, onItemClick }: NavbarProps) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="relative z-50">
            <div className="bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-2xl">
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 flex items-center">
                                <div className="relative">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                                        <svg
                                            className="w-7 h-7 text-white"
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
                                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-xl blur opacity-30 animate-pulse"></div>
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                        NASA Explorer
                                    </h1>
                                    <p className="text-sm text-gray-300">
                                        Explorando o Cosmos
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-6">
                                {navItems.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => onItemClick(item.id)}
                                        className={`group relative px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 flex items-center space-x-2 ${
                                            activeItem === item.id
                                                ? "text-white shadow-2xl transform scale-105"
                                                : "text-gray-300 hover:text-white hover:scale-105"
                                        }`}
                                    >
                                        {activeItem === item.id && (
                                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-2xl"></div>
                                        )}
                                        <div
                                            className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                                                activeItem !== item.id
                                                    ? "bg-white/5 backdrop-blur-sm group-hover:bg-white/10 border border-white/10 group-hover:border-white/20"
                                                    : ""
                                            }`}
                                        ></div>
                                        <div className="relative flex items-center space-x-2">
                                            {item.icon && (
                                                <span className="transition-transform duration-300 group-hover:scale-110">
                                                    {item.icon}
                                                </span>
                                            )}
                                            <span>{item.label}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="md:hidden">
                            <button
                                onClick={toggleMobileMenu}
                                className="bg-white/10 backdrop-blur-sm inline-flex items-center justify-center p-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 transition-all duration-300 border border-white/20"
                            >
                                <span className="sr-only">
                                    Abrir menu principal
                                </span>
                                {!isMobileMenuOpen ? (
                                    <svg
                                        className="block h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        className="block h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {isMobileMenuOpen && (
                    <div className="md:hidden animate-fadeIn">
                        <div className="px-2 pt-2 pb-3 space-y-2 sm:px-3 bg-white/5 backdrop-blur-xl border-t border-white/10">
                            {navItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        onItemClick(item.id);
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className={`group w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 flex items-center space-x-3 ${
                                        activeItem === item.id
                                            ? "bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white shadow-lg"
                                            : "text-gray-300 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/20"
                                    }`}
                                >
                                    {item.icon && (
                                        <span className="transition-transform duration-300 group-hover:scale-110">
                                            {item.icon}
                                        </span>
                                    )}
                                    <span>{item.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};
