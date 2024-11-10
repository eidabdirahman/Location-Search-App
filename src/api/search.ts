import type { Place } from "./Place"
interface searchResponse {
    features: {
        geometry: {
        coordinates : number[],
    }
    properties : {
        place_id: number,
        display_name : string
    }
 }[]

    }


export const search = async (term: string) => {
    const response = await fetch(`http://nominatim.openstreetmap.org/search?q=${term}&format=geojson&addressdetails=1&layer=address&limit=5`);
    

    const data: searchResponse = await response.json();
    
    const places: Place[] = data.features.map((feature) => {
        return {
            id: feature.properties.place_id,
            name: feature.properties.display_name,
            longitude: feature.geometry.coordinates[0],
            latitude: feature.geometry.coordinates[1]
        };
    });
    return places
};
