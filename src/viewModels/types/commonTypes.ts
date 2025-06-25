/**
 * Shared types for ViewModels
 * Centralizes common type definitions to improve type safety and consistency
 */

// Mars Rover related types
export type RoverName = 'curiosity' | 'opportunity' | 'spirit';

export interface RoverInfo {
    id: RoverName;
    name: string;
    status: string;
    description?: string;
}

export interface RoverMissionInfo {
    landingDate: string;
    launchDate: string;
    missionDuration: string;
    status: 'active' | 'completed' | 'lost';
}

// Common UI state types
export interface LoadingState {
    isLoading: boolean;
    isError: boolean;
    error: Error | null;
}

export interface PaginationState {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
}

// Validation result types
export interface ValidationResult {
    isValid: boolean;
    errorMessage?: string;
}

// Date range types
export interface DateRange {
    min: string;
    max: string;
}

// Search/Filter types
export interface SearchFilters {
    dateRange?: DateRange;
    rover?: RoverName;
    sol?: number;
    camera?: string;
}

// ViewModel base interface
export interface BaseViewModel extends LoadingState {
    refetch: () => void;
}

// Enhanced error types
export interface ViewModelError extends Error {
    code?: string;
    context?: Record<string, any>;
    retryable?: boolean;
}