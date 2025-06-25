import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { nasaService } from "../services/nasaService";
import type { ApodModel } from "../models/ApodModel";
import { dateValidation, formatUtils } from "./utils/validationUtils";

export const useApodViewModel = () => {
    const [selectedDate, setSelectedDate] = useState<string>(
        new Date().toISOString().split("T")[0]
    );

    const {
        data: apod,
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery<ApodModel, Error>({
        queryKey: ["apod", selectedDate],
        queryFn: () =>
            nasaService.getAstronomyPictureOfTheDay(selectedDate || undefined),
    });

    const validateDate = dateValidation.isValidApodDate;
    const formatDateForDisplay = formatUtils.formatDatePtBR;

    const handleDateChange = (date: string) => {
        if (validateDate(date)) {
            setSelectedDate(date);
        }
    };

    const clearDate = () => {
        setSelectedDate(new Date().toISOString().split("T")[0]);
    };

    return {
        apod,
        isLoading,
        isError,
        error,
        refetch,
        selectedDate,
        handleDateChange,
        clearDate,
        validateDate,
        formatDateForDisplay,
        isDateValid: validateDate(selectedDate),
    };
};
