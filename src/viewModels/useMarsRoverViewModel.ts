import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { nasaService } from "../services/nasaService";
import type { MarsRoverPhotosResponse } from "../models/MarsRoverModel";
import { marsValidation, formatUtils } from "./utils/validationUtils";
import type { RoverName, RoverInfo } from "./types/commonTypes";

export const useMarsRoverViewModel = () => {
    const [sol, setSol] = useState<number>(1000);
    const [rover, setRover] = useState<RoverName>("curiosity");
    const [maxPhotos, setMaxPhotos] = useState<number>(10);
    const [searchParams, setSearchParams] = useState<{
        sol: number;
        rover: RoverName;
    }>({
        sol: 1000,
        rover: "curiosity",
    });

    const { data, isLoading, isError, error, refetch } = useQuery<
        MarsRoverPhotosResponse,
        Error
    >({
        queryKey: ["marsRoverPhotos", searchParams.rover, searchParams.sol],
        queryFn: () =>
            nasaService.getMarsRoverPhotos(
                searchParams.sol,
                searchParams.rover
            ),
        enabled: searchParams.sol > 0,
    });

    const photos = data?.photos || [];
    const displayedPhotos = photos.slice(0, maxPhotos);

    const validateSol = marsValidation.isValidSol;
    const validatePhotoCount = marsValidation.isValidPhotoCount;

    const handleSolChange = (newSol: number) => {
        setSol(newSol);
    };

    const handleRoverChange = (newRover: RoverName) => {
        setRover(newRover);
        setSol(1000);
    };

    const handleMaxPhotosChange = (newMax: number) => {
        if (validatePhotoCount(newMax)) {
            setMaxPhotos(newMax);
        }
    };

    const handleSearch = () => {
        if (validateSol(sol)) {
            setSearchParams({
                sol,
                rover,
            });
        }
    };

    const formatSolInfo = formatUtils.formatSolInfo;

    const getRoverDisplayName = (roverName: RoverName): string => {
        const names = {
            curiosity: "Curiosity",
            opportunity: "Opportunity",
            spirit: "Spirit",
        };
        return names[roverName];
    };

    const getAvailableRovers = (): RoverInfo[] => {
        return [
            {
                id: "curiosity",
                name: "Curiosity",
                status: "Ativo",
                description: "Rover ativo explorando Marte desde 2012",
            },
            {
                id: "opportunity",
                name: "Opportunity",
                status: "Missão Concluída",
                description: "Missão concluída em 2018 após 15 anos",
            },
            {
                id: "spirit",
                name: "Spirit",
                status: "Missão Concluída",
                description: "Missão concluída em 2010 após 6 anos",
            },
        ];
    };

    return {
        photos: displayedPhotos,
        allPhotos: photos,
        isLoading,
        isError,
        error,
        refetch,
        sol,
        rover,
        maxPhotos,
        handleSolChange,
        handleRoverChange,
        handleMaxPhotosChange,
        handleSearch,
        validateSol,
        formatSolInfo,
        getRoverDisplayName,
        getAvailableRovers,
        isSolValid: validateSol(sol),
        totalPhotosCount: photos.length,
    };
};
