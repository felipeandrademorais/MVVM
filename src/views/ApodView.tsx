import React from "react";
import { useApodViewModel } from "../viewModels/useApodViewModel";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { ErrorMessage } from "./components/ErrorMessage";
import { Card, CardHeader, CardContent } from "./components/Card";
import { Input } from "./components/Input";

export const ApodView = () => {
    const {
        apod,
        isLoading,
        isError,
        refetch,
        selectedDate,
        handleDateChange,
        clearDate,
        formatDateForDisplay,
        isDateValid,
    } = useApodViewModel();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleDateChange(e.target.value);
    };

    if (isLoading) {
        return <LoadingSpinner message="Carregando imagem..." />;
    }

    if (isError) {
        return (
            <ErrorMessage
                message="Não foi possível carregar a imagem astronômica do dia."
                onRetry={() => refetch()}
            />
        );
    }

    return (
        <div className="min-h-screen p-4 sm:p-6 lg:p-8">
            <div className="mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6 leading-tight">
                        Imagem Astronômica do Dia
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                        Descubra as maravilhas do universo através das imagens
                        selecionadas pela NASA
                    </p>
                </div>

                <Card className="mb-10 w-full lg:w-3/4 xl:w-2/3 mx-auto">
                    <CardContent>
                        <Input
                            type="date"
                            value={selectedDate}
                            onChange={handleInputChange}
                            label="Selecione uma data específica"
                            icon={
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
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                            }
                        />
                        <div className="flex justify-between items-center mt-4">
                            <p className="text-sm text-blue-300 font-medium">
                                Exibindo: {formatDateForDisplay(selectedDate)}
                            </p>
                            <button
                                onClick={clearDate}
                                className="text-sm text-gray-400 hover:text-white underline transition-colors duration-300"
                            >
                                Hoje
                            </button>
                        </div>
                        {!isDateValid && selectedDate && (
                            <p className="text-sm text-red-400 mt-2 font-medium">
                                Data inválida. Selecione uma data entre
                                16/06/1995 e hoje.
                            </p>
                        )}
                    </CardContent>
                </Card>

                {apod && (
                    <Card gradient className="overflow-hidden mb-10 shadow-2xl">
                        <CardHeader className="text-center p-6 md:p-8">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                                {apod.title}
                            </h2>
                            <div className="flex flex-wrap justify-center items-center gap-3 md:gap-6 text-gray-300 text-sm md:text-base">
                                <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                                    <svg
                                        className="w-5 h-5 mr-2 text-blue-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                    <span className="font-medium">
                                        {apod.date}
                                    </span>
                                </div>
                                {apod.copyright && (
                                    <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                                        <svg
                                            className="w-5 h-5 mr-2 text-purple-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        <span>© {apod.copyright}</span>
                                    </div>
                                )}
                            </div>
                        </CardHeader>

                        <div className="relative">
                            {apod.media_type === "image" ? (
                                <div className="group relative overflow-hidden">
                                    <img
                                        src={apod.hdurl || apod.url}
                                        alt={apod.title}
                                        className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>
                            ) : (
                                <div
                                    className="relative rounded-2xl overflow-hidden"
                                    style={{ paddingBottom: "56.25%" }}
                                >
                                    <iframe
                                        src={apod.url}
                                        title={apod.title}
                                        className="absolute inset-0 w-full h-full"
                                        allowFullScreen
                                    />
                                </div>
                            )}
                        </div>

                        <CardContent className="prose prose-lg max-w-none p-6 md:p-8">
                            <p className="text-gray-300 leading-relaxed text-justify text-lg">
                                {apod.explanation}
                            </p>
                        </CardContent>
                    </Card>
                )}

                {!apod && !isLoading && !isError && (
                    <Card className="text-center py-20">
                        <CardContent>
                            <div className="mx-auto w-32 h-32 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mb-8 backdrop-blur-sm border border-white/20">
                                <svg
                                    className="w-16 h-16 text-blue-400"
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
                            <h3 className="text-3xl font-bold text-white mb-4">
                                Bem-vindo ao APOD
                            </h3>
                            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                                Selecione uma data acima para ver a imagem
                                astronômica correspondente. Por padrão, a data
                                atual está selecionada.
                            </p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
};
