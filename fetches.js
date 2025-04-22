const apiUrl = process.env.EXPO_PUBLIC_API_URL
const apiKey = process.env.EXPO_PUBLIC_API_KEY;


export function getAllGames(page) {
    return fetch(`https://rawg.io/api/games?key=${apiKey}&page=${page}`)
        .then(response => {
            if (!response.ok)
                throw new Error("Error in fetching all games: " + response.status.toString());

            return response.json();
        })
}

export function getGamesByText(text) {
    return fetch(`https://rawg.io/api/games?search=${text}?&key=${apiKey}`)
        .then(response => {
            if (!response.ok)
                throw new Error("Error in fetching games by text: " + response.status.toString());

            return response.json();
        })
}