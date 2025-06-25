import axios from "axios";
import { API_BASE_URL, API_KEY } from "./config";

const api = axios.create({
    baseURL: API_BASE_URL,
});

export const nasaService = {
    getAstronomyPictureOfTheDay: async (date?: string) => {
        try {
            const response = await api.get("/planetary/apod", {
                params: {
                    api_key: API_KEY,
                    date: date,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar APOD:", error);
            throw error;
        }
    },

    getMarsRoverPhotos: async (sol = 1000, rover = "curiosity") => {
        try {
            const response = await api.get(
                `/mars-photos/api/v1/rovers/${rover}/photos`,
                {
                    params: {
                        api_key: API_KEY,
                        sol: sol,
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar fotos de Marte:", error);
            throw error;
        }
    },
};
