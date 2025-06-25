import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";

// Importando os componentes
import { Navbar } from "./views/Navbar";
import { ApodView } from "./views/ApodView";
import { MarsRoverView } from "./views/MarsRoverView";

// Criando uma instância do QueryClient
const queryClient = new QueryClient();

function App() {
    const [activeView, setActiveView] = useState("mars");

    const navItems = [
        {
            id: "apod",
            label: "Imagem do Dia",
            icon: (
                <svg
                    className="w-4 h-4"
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
            ),
        },
        {
            id: "mars",
            label: "Fotos de Marte",
            icon: (
                <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            ),
        },
    ];

    return (
        <QueryClientProvider client={queryClient}>
            <div className="min-h-screen relative overflow-hidden">
                {/* Animated Background */}
                <div className="fixed inset-0 -z-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>
                    <div className="absolute inset-0 bg-gradient-to-tl from-blue-900/20 via-transparent to-purple-900/20"></div>

                    {/* Animated stars */}
                    <div className="absolute inset-0">
                        {[...Array(50)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    animationDelay: `${Math.random() * 3}s`,
                                    animationDuration: `${
                                        2 + Math.random() * 2
                                    }s`,
                                }}
                            />
                        ))}
                    </div>

                    {/* Floating orbs */}
                    <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                    <div
                        className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
                        style={{ animationDelay: "1s" }}
                    ></div>
                    <div
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"
                        style={{ animationDelay: "2s" }}
                    ></div>
                </div>

                <Navbar
                    navItems={navItems}
                    activeItem={activeView}
                    onItemClick={setActiveView}
                />

                <main className="relative z-10 transition-all duration-500">
                    <div className="min-h-screen backdrop-blur-sm bg-black/10">
                        {activeView === "apod" && <ApodView />}
                        {activeView === "mars" && <MarsRoverView />}
                    </div>
                </main>

                <footer className="relative z-10 mt-16">
                    <div className="bg-gradient-to-r from-slate-900/95 via-purple-900/95 to-slate-900/95 backdrop-blur-md border-t border-white/10">
                        <div className="mx-auto px-6 py-12">
                            <div className="text-center">
                                <div className="flex items-center justify-center mb-6">
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
                                        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                            NASA Explorer
                                        </h3>
                                        <p className="text-sm text-gray-400">
                                            Explorando o Cosmos
                                        </p>
                                    </div>
                                </div>

                                <p className="text-gray-300 mb-8 max-w-3xl mx-auto text-lg leading-relaxed">
                                    Explore as maravilhas do universo através
                                    das imagens da NASA. Descubra a beleza do
                                    cosmos e acompanhe as descobertas em Marte.
                                </p>

                                <div className="flex justify-center space-x-6 mb-8">
                                    <div className="flex items-center text-gray-400">
                                        <svg
                                            className="w-5 h-5 mr-2"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13 10V3L4 14h7v7l9-11h-7z"
                                            />
                                        </svg>
                                        <span>Powered by NASA API</span>
                                    </div>
                                    <div className="flex items-center text-gray-400">
                                        <svg
                                            className="w-5 h-5 mr-2"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                            />
                                        </svg>
                                        <span>Made with React & Tailwind</span>
                                    </div>
                                </div>

                                <div className="border-t border-white/10 pt-6">
                                    <p className="text-gray-500 text-sm">
                                        © 2024 NASA Explorer. Dados fornecidos
                                        pela NASA API
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </QueryClientProvider>
    );
}

export default App;
