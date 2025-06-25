import { useMarsRoverViewModel } from "../viewModels/useMarsRoverViewModel";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { ErrorMessage } from "./components/ErrorMessage";
import { PhotoGallery } from "./components/PhotoGallery";
import { Card, CardContent } from "./components/Card";
import { Input } from "./components/Input";

export const MarsRoverView = () => {
    const {
        photos,
        isLoading,
        isError,
        refetch,
        sol,
        rover,
        maxPhotos,
        handleSolChange,
        handleRoverChange,
        handleMaxPhotosChange,
        handleSearch,
        formatSolInfo,

        getAvailableRovers,
        isSolValid,
        totalPhotosCount,
    } = useMarsRoverViewModel();

    if (isLoading) {
        return <LoadingSpinner message="Carregando fotos de Marte..." />;
    }

    if (isError) {
        return (
            <ErrorMessage
                message="Não foi possível carregar as fotos do rover em Marte."
                onRetry={() => refetch()}
            />
        );
    }

    return (
        <div className="min-h-screen p-4 sm:p-6 lg:p-8">
            <div className="mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent mb-6 leading-tight">
                        Exploração de Marte
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                        Explore as fascinantes imagens capturadas pelos rovers
                        da NASA na superfície marciana
                    </p>
                </div>

                <Card className="mb-10 w-full lg:w-4/5 xl:w-3/4 mx-auto">
                    <CardContent className="p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-bold text-white flex items-center">
                                <svg
                                    className="w-8 h-8 mr-3 text-orange-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
                                    />
                                </svg>
                                Configurações de Busca
                            </h3>
                            <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-sm rounded-full px-4 py-2 border border-red-500/30">
                                <span className="text-red-300 text-sm font-medium">
                                    {totalPhotosCount} fotos encontradas
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="text-sm font-semibold text-white mb-3 flex items-center space-x-2">
                                    <svg
                                        className="w-5 h-5 text-orange-400"
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
                                    <span>Rover</span>
                                </label>
                                <select
                                    value={rover}
                                    onChange={(e) =>
                                        handleRoverChange(
                                            e.target.value as
                                                | "curiosity"
                                                | "opportunity"
                                                | "spirit"
                                        )
                                    }
                                    className="w-full px-4 py-4 border border-white/20 rounded-2xl shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-400/50 bg-white/10 backdrop-blur-md text-white hover:bg-white/15 hover:border-white/30"
                                >
                                    {getAvailableRovers().map((r) => (
                                        <option
                                            key={r.id}
                                            value={r.id}
                                            className="bg-slate-800 text-white"
                                        >
                                            {r.name} ({r.status})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <Input
                                    type="number"
                                    value={sol.toString()}
                                    onChange={(e) =>
                                        handleSolChange(
                                            parseInt(e.target.value) || 0
                                        )
                                    }
                                    label="Sol (Dia Marciano)"
                                    min="1"
                                    max="4000"
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
                                                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                                            />
                                        </svg>
                                    }
                                />
                                {!isSolValid && (
                                    <p className="text-sm text-red-400 mt-2 font-medium">
                                        Sol deve estar entre 1 e 4000
                                    </p>
                                )}
                            </div>

                            <div>
                                <Input
                                    type="number"
                                    value={maxPhotos.toString()}
                                    onChange={(e) =>
                                        handleMaxPhotosChange(
                                            parseInt(e.target.value) || 10
                                        )
                                    }
                                    label="Máximo de Fotos"
                                    min="1"
                                    max="50"
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
                                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            />
                                        </svg>
                                    }
                                />
                            </div>
                        </div>

                        <div className="mt-8 flex flex-wrap gap-4 justify-center items-center">
                            <button
                                onClick={handleSearch}
                                disabled={!isSolValid || isLoading}
                                className="flex items-center bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
                            >
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
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                                {isLoading ? "Buscando..." : "Buscar Fotos"}
                            </button>

                            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
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
                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <span className="text-gray-300 font-medium">
                                    {formatSolInfo(sol)}
                                </span>
                            </div>
                            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
                                <svg
                                    className="w-5 h-5 mr-2 text-green-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    />
                                </svg>
                                <span className="text-gray-300 font-medium">
                                    Exibindo {photos.length} de {maxPhotos}
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <PhotoGallery photos={photos} maxPhotos={maxPhotos} />
            </div>
        </div>
    );
};
