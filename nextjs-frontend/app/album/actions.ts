"use server";

import { createAlbum, readAlbums } from "@/app/clientService"; // Import the services
import {
    AlbumCreate,
    CreateAlbumResponse,
    ReadAlbumsResponse,
} from "@/app/openapi-client"; // Import the relevant types

// Action to fetch albums
export async function fetchAlbums(): Promise<ReadAlbumsResponse | undefined> {
    try {
        const response = await readAlbums({ cache: 'no-store' });
        return response.data; // Return the array of albums
    } catch (error) {
        console.error("Failed to fetch albums:", error);
        throw new Error("Failed to fetch albums");
    }
}

export async function addAlbum(data: AlbumCreate): Promise<CreateAlbumResponse> {
    try {
        const response = await createAlbum({
            body: data,
        });

        if (!response.data) {
            throw new Error("No data returned from the server");
        }

        return response.data; // Ensure `response.data` is not `undefined`
    } catch (error) {
        console.error("Failed to create album:", error);
        throw new Error("Failed to create album");
    }
}
