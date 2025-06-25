import { useState } from "react";
import type { MarsPhoto } from "../../models/MarsRoverModel";
import { Card } from "./Card";

interface PhotoGalleryProps {
    photos: MarsPhoto[];
    maxPhotos?: number;
}

export const PhotoGallery = ({ photos, maxPhotos = 10 }: PhotoGalleryProps) => {
    const [selectedPhoto, setSelectedPhoto] = useState<MarsPhoto | null>(null);
    const displayPhotos = photos.slice(0, maxPhotos);

    const openModal = (photo: MarsPhoto) => {
        setSelectedPhoto(photo);
    };

    const closeModal = () => {
        setSelectedPhoto(null);
    };

    if (photos.length === 0) {
        return (
            <div className="text-center py-20">
                <div className="mx-auto w-32 h-32 bg-gradient-to-br from-orange-500/20 via-red-500/20 to-yellow-500/20 rounded-full flex items-center justify-center mb-8 backdrop-blur-sm border border-orange-500/30">
                    <svg
                        className="w-16 h-16 text-orange-400"
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
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">
                    Nenhuma foto encontrada
                </h3>
                <p className="text-gray-300 text-lg max-w-md mx-auto">
                    Tente ajustar os filtros de busca para encontrar imagens dos
                    rovers marcianos.
                </p>
            </div>
        );
    }

    return (
        <>
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                {displayPhotos.map((photo, index) => (
                    <div
                        key={photo.id}
                        className="break-inside-avoid mb-6 animate-fadeIn"
                        style={{
                            animationDelay: `${index * 0.1}s`,
                            animationFillMode: "both",
                        }}
                    >
                        <Card
                            className="group cursor-pointer transform transition-all duration-500 hover:scale-105 hover:-translate-y-2"
                            imageSrc={photo.img_src}
                            title={photo.camera.full_name}
                            description={`${photo.earth_date} • Sol ${photo.sol}`}
                            tags={[
                                photo.rover.name.toLowerCase(),
                                photo.camera.name.toLowerCase(),
                            ]}
                            onImageClick={() => openModal(photo)}
                            hover={true}
                        />
                    </div>
                ))}
            </div>

            {photos.length > maxPhotos && (
                <div className="mt-12 text-center">
                    <div className="backdrop-blur-xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-blue-500/30 rounded-2xl p-6 inline-block">
                        <div className="flex items-center justify-center space-x-3">
                            <svg
                                className="w-6 h-6 text-blue-400"
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
                            <p className="text-blue-300 font-semibold text-lg">
                                Mostrando {maxPhotos} de {photos.length} fotos
                                disponíveis
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {selectedPhoto && (
                <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn"
                    onClick={closeModal}
                >
                    <div
                        className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl max-w-6xl max-h-[95vh] overflow-auto shadow-2xl transform transition-all duration-500 animate-modalIn"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative">
                            <button
                                onClick={closeModal}
                                className="absolute top-6 right-6 z-10 w-12 h-12 bg-black/50 backdrop-blur-md text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-all duration-300 hover:scale-110"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                            <div className="rounded-t-3xl overflow-hidden">
                                <img
                                    src={selectedPhoto.img_src}
                                    alt={`Mars Rover ${selectedPhoto.rover.name} - ${selectedPhoto.camera.full_name}`}
                                    className="w-full h-auto max-h-[60vh] object-cover"
                                />
                            </div>
                            <div className="p-8">
                                <h3 className="text-3xl font-bold text-white mb-4">
                                    {selectedPhoto.camera.full_name}
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-300">
                                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                                        <p className="font-semibold text-blue-400 mb-1">
                                            Data na Terra:
                                        </p>
                                        <p className="text-lg">
                                            {selectedPhoto.earth_date}
                                        </p>
                                    </div>
                                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                                        <p className="font-semibold text-purple-400 mb-1">
                                            Sol Marciano:
                                        </p>
                                        <p className="text-lg">
                                            {selectedPhoto.sol}
                                        </p>
                                    </div>
                                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                                        <p className="font-semibold text-green-400 mb-1">
                                            Rover:
                                        </p>
                                        <p className="text-lg">
                                            {selectedPhoto.rover.name}
                                        </p>
                                    </div>
                                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                                        <p className="font-semibold text-orange-400 mb-1">
                                            Câmera:
                                        </p>
                                        <p className="text-lg">
                                            {selectedPhoto.camera.name}
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-6 bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                                    <p className="font-semibold text-pink-400 mb-1">
                                        ID da Foto:
                                    </p>
                                    <p className="text-lg font-mono">
                                        {selectedPhoto.id}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes modalIn {
                    from {
                        opacity: 0;
                        transform: scale(0.9) translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1) translateY(0);
                    }
                }
                
                .animate-fadeIn {
                    animation: fadeIn 0.6s ease-out;
                }
                
                .animate-modalIn {
                    animation: modalIn 0.4s ease-out;
                }
            `}</style>
        </>
    );
};
