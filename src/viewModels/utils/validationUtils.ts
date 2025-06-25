/**
 * Shared validation utilities for ViewModels
 * Centralizes common validation logic to promote reusability
 */

export const dateValidation = {
    /**
     * Validates if a date is within the APOD service range
     */
    isValidApodDate: (date: string): boolean => {
        if (!date) return true; // Empty date is valid (uses today)
        const inputDate = new Date(date);
        const today = new Date();
        const minDate = new Date('1995-06-16'); // APOD service start date
        
        return inputDate >= minDate && inputDate <= today && !isNaN(inputDate.getTime());
    },

    /**
     * Gets the valid date range for APOD
     */
    getApodDateRange: () => ({
        min: '1995-06-16',
        max: new Date().toISOString().split('T')[0]
    })
};

export const marsValidation = {
    /**
     * Validates Mars sol (day) values
     */
    isValidSol: (sol: number): boolean => {
        return Number.isInteger(sol) && sol > 0 && sol <= 4000;
    },

    /**
     * Validates photo count limits
     */
    isValidPhotoCount: (count: number): boolean => {
        return Number.isInteger(count) && count > 0 && count <= 50;
    }
};

export const formatUtils = {
    /**
     * Formats date for display in Portuguese
     */
    formatDatePtBR: (date: string): string => {
        if (!date) return "Hoje";
        return new Date(date).toLocaleDateString('pt-BR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },

    /**
     * Formats sol information
     */
    formatSolInfo: (sol: number): string => {
        return `Sol ${sol} (Dia marciano ${sol})`;
    },

    /**
     * Formats photo count information
     */
    formatPhotoCount: (displayed: number, total: number, max: number): string => {
        return `Exibindo ${displayed} de ${Math.min(total, max)} fotos`;
    }
};