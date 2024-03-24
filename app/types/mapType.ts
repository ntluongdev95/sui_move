
export interface IMarker {
	address: any;
	latitude: number;
	longitude: number;
}

export type GoogleLatLng = google.maps.LatLng;
export type GoogleMap = google.maps.Map;
export type GoogleMarker = google.maps.Marker;
export type GooglePolyline = google.maps.Polyline;

export type Location = {
	lat: number;
	lng: number;
};