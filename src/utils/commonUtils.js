import { doGet } from "./webUtils"

export const getLocationDetails = async (lat, long) => {
    try {
        let response = await doGet(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyC1uSsoLzuzbZE0rVeSOVse3khdxk8XKR4&result_type=country`)
        console.log(`Country - ${response.data.results[0].formatted_address.toLowerCase()}`);
        return response.data.results[0].formatted_address.toLowerCase()
    } catch (e) {
        console.error(e)
    }
}