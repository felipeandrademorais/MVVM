/**
 * Enhanced error handling utilities for ViewModels
 * Provides consistent error management and user-friendly error messages
 */

import type { ViewModelError } from '../types/commonTypes';

export class NasaApiError extends Error implements ViewModelError {
    code?: string;
    context?: Record<string, any>;
    retryable: boolean;

    constructor(
        message: string, 
        code?: string, 
        context?: Record<string, any>, 
        retryable: boolean = true
    ) {
        super(message);
        this.name = 'NasaApiError';
        this.code = code;
        this.context = context;
        this.retryable = retryable;
    }
}

export const errorMessages = {
    network: {
        offline: 'Você está offline. Verifique sua conexão com a internet.',
        timeout: 'A requisição demorou muito para responder. Tente novamente.',
        serverError: 'Erro no servidor da NASA. Tente novamente em alguns minutos.'
    },
    validation: {
        invalidDate: 'Data inválida. Selecione uma data entre 16/06/1995 e hoje.',
        invalidSol: 'Sol inválido. Digite um valor entre 1 e 4000.',
        invalidPhotoCount: 'Número de fotos inválido. Digite um valor entre 1 e 50.'
    },
    api: {
        noData: 'Nenhum dado encontrado para os parâmetros selecionados.',
        rateLimit: 'Muitas requisições. Aguarde alguns segundos antes de tentar novamente.',
        apiKeyInvalid: 'Chave da API inválida. Verifique a configuração.'
    }
};

export const errorHandler = {
    /**
     * Handles API errors and returns user-friendly messages
     */
    handleApiError: (error: any): NasaApiError => {
        // Network errors
        if (!navigator.onLine) {
            return new NasaApiError(errorMessages.network.offline, 'NETWORK_OFFLINE', {}, false);
        }

        // HTTP status codes
        if (error.response) {
            const status = error.response.status;
            const context = { status, url: error.config?.url };

            switch (status) {
                case 400:
                    return new NasaApiError(
                        'Parâmetros inválidos na requisição.',
                        'BAD_REQUEST',
                        context,
                        false
                    );
                case 403:
                    return new NasaApiError(
                        errorMessages.api.apiKeyInvalid,
                        'API_KEY_INVALID',
                        context,
                        false
                    );
                case 429:
                    return new NasaApiError(
                        errorMessages.api.rateLimit,
                        'RATE_LIMIT',
                        context,
                        true
                    );
                case 500:
                case 502:
                case 503:
                    return new NasaApiError(
                        errorMessages.network.serverError,
                        'SERVER_ERROR',
                        context,
                        true
                    );
                default:
                    return new NasaApiError(
                        `Erro HTTP ${status}: ${error.response.statusText}`,
                        'HTTP_ERROR',
                        context,
                        true
                    );
            }
        }

        // Request timeout
        if (error.code === 'ECONNABORTED') {
            return new NasaApiError(
                errorMessages.network.timeout,
                'TIMEOUT',
                { timeout: error.config?.timeout },
                true
            );
        }

        // Generic network error
        return new NasaApiError(
            'Erro de conexão. Verifique sua internet e tente novamente.',
            'NETWORK_ERROR',
            { originalError: error.message },
            true
        );
    },

    /**
     * Handles validation errors
     */
    handleValidationError: (field: string, value: any): NasaApiError => {
        switch (field) {
            case 'date':
                return new NasaApiError(
                    errorMessages.validation.invalidDate,
                    'VALIDATION_DATE',
                    { value },
                    false
                );
            case 'sol':
                return new NasaApiError(
                    errorMessages.validation.invalidSol,
                    'VALIDATION_SOL',
                    { value },
                    false
                );
            case 'photoCount':
                return new NasaApiError(
                    errorMessages.validation.invalidPhotoCount,
                    'VALIDATION_PHOTO_COUNT',
                    { value },
                    false
                );
            default:
                return new NasaApiError(
                    `Valor inválido para ${field}: ${value}`,
                    'VALIDATION_GENERIC',
                    { field, value },
                    false
                );
        }
    },

    /**
     * Logs errors for debugging (in development)
     */
    logError: (error: ViewModelError, context?: Record<string, any>) => {
        if (import.meta.env.DEV) {
            console.group('🚨 ViewModel Error');
            console.error('Message:', error.message);
            console.error('Code:', error.code);
            console.error('Context:', { ...error.context, ...context });
            console.error('Stack:', error.stack);
            console.error('Retryable:', error.retryable);
            console.groupEnd();
        }
    }
};

/**
 * Retry utility for failed operations
 */
export const retryUtils = {
    /**
     * Creates a retry function with exponential backoff
     */
    createRetryFunction: <T>(
        operation: () => Promise<T>,
        maxRetries: number = 3,
        baseDelay: number = 1000
    ) => {
        return async (): Promise<T> => {
            let lastError: any;
            
            for (let attempt = 0; attempt <= maxRetries; attempt++) {
                try {
                    return await operation();
                } catch (error) {
                    lastError = error;
                    
                    if (attempt === maxRetries) {
                        throw errorHandler.handleApiError(error);
                    }
                    
                    // Exponential backoff
                    const delay = baseDelay * Math.pow(2, attempt);
                    await new Promise(resolve => setTimeout(resolve, delay));
                }
            }
            
            throw lastError;
        };
    }
};