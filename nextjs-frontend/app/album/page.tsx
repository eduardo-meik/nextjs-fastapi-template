// app/albums/page.tsx

import { fetchAlbums, addAlbum } from "@/app/album/actions"; // Import fetch and create functions
import { ReadAlbumsResponse, AlbumCreate } from "@/app/openapi-client"; // Import types
import { redirect } from 'next/navigation';

export default async function AlbumsPage() {
    const albums: ReadAlbumsResponse | undefined = await fetchAlbums(); // Fetch albums using your function

    async function handleCreateAlbum(formData: FormData) {
        "use server"
        const newAlbum: AlbumCreate = {
            title: formData.get("title") as string,
            // artist: formData.get("artist") as string,
            // year: Number(formData.get("year")),
            // genre: formData.get("genre") as string,
            // label: formData.get("label") as string,
            description: formData.get("description") as string,
        };
        await addAlbum(newAlbum);
        redirect('/album');
    }

    return (
        <div className="container mx-auto p-8 space-y-12">
            <div className="flex flex-col lg:flex-row space-x-6">
                {/* Form to create albums */}
                <div className="bg-gradient-to-r from-blue-100 to-purple-100 shadow-lg rounded-xl p-8 flex-1 mb-8 lg:mb-0">
                    <h2 className="text-4xl font-bold mb-6 text-gray-800">Create a New Album</h2>
                    <form action={handleCreateAlbum} className="grid grid-cols-1 gap-5">
                        <input
                            type="text"
                            name="title"
                            placeholder="Title"
                            required
                            className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
                        />
                        {/*<input type="text" name="artist" placeholder="Artist" className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg" />*/}
                        {/*<input type="number" name="year" placeholder="Year" className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg" />*/}
                        {/*<input type="text" name="genre" placeholder="Genre" className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg" />*/}
                        {/*<input type="text" name="label" placeholder="Label" className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg" />*/}
                        <textarea
                            name="description"
                            placeholder="Description"
                            className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
                        ></textarea>
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 text-lg">
                            Add Album
                        </button>
                    </form>
                </div>

                {/* Display list of albums */}
                <div className="flex-1">
                    <h1 className="text-5xl font-extrabold mb-8 text-center text-gray-800">Albums List</h1>
                    {albums && albums.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {albums.map((album) => (
                                <div key={album.id} className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
                                    <h2 className="text-3xl font-semibold mb-3 text-gray-900">{album.title}</h2>
                                    {/*<p className="text-gray-700 mb-2"><strong>Artist:</strong> {album.artist || 'Unknown'}</p>*/}
                                    {/*<p className="text-gray-700 mb-2"><strong>Year:</strong> {album.year || 'N/A'}</p>*/}
                                    {/*<p className="text-gray-700 mb-2"><strong>Genre:</strong> {album.genre || 'N/A'}</p>*/}
                                    {/*<p className="text-gray-700 mb-2"><strong>Label:</strong> {album.label || 'N/A'}</p>*/}
                                    <p className="text-gray-700"><strong>Description:</strong> {album.description || 'No description available'}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500 italic">No albums found. Be the first to add one!</p>
                    )}
                </div>
            </div>
        </div>
    );
}
