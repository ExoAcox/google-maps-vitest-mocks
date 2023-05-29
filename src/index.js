import { vi } from "vitest";

const event = {
    latLng: {
        lat: () => 3.0,
        lng: () => 3.0,
    },
};

class MVCClass {
    constructor() {
        this.addListener = vi.fn((_, callback) => callback(event));
        this.setOptions = vi.fn();
        this.setVisible = vi.fn();
        this.getVisible = vi.fn(() => true);
        this.setMap = vi.fn();
        this.getMap = vi.fn(() => ({}));
        this.set = vi.fn();
        this.get = vi.fn((key) => {
            if (key === "infoWindow") {
                return {
                    open: vi.fn(),
                    close: vi.fn(),
                    setContent: vi.fn(),
                };
            } else {
                return "string";
            }
        });
    }
}

const googleMapsClass = {
    Map: class Map extends MVCClass {
        constructor() {
            super();
            this.getZoom = vi.fn(() => 1);
            this.setZoom = vi.fn();
            this.panTo = vi.fn();
            this.setMapTypeId = vi.fn();
            this.setCenter = vi.fn();
            this.fitBounds = vi.fn();
            this.getBounds = vi.fn(() => {
                return {
                    getNorthEast: vi.fn(() => event.latLng),
                    getSouthWest: vi.fn(() => event.latLng),
                };
            });
        }
    },

    Marker: class Marker extends MVCClass {
        constructor() {
            super();
            this.getPosition = vi.fn(() => event.latLng);
            this.setPosition = vi.fn();
        }
    },

    Circle: class Circle extends MVCClass {
        constructor() {
            super();
            this.setCenter = vi.fn();
            this.setRadius = vi.fn();
        }
    },

    Polyline: class Polyline extends MVCClass {
        constructor() {
            super();
            this.setPath = vi.fn();
        }
    },

    Polygon: class Polygon extends MVCClass {
        constructor() {
            super();
            this.setPath = vi.fn();
        }
    },

    InfoWindow: class InfoWindow extends MVCClass {
        constructor() {
            super();
            this.setContent = vi.fn();
            this.open = vi.fn();
            this.close = vi.fn();
        }
    },

    LatLng: class LatLng {
        constructor() {}
    },

    Point: class Point {
        constructor() {}
    },

    Size: class Size {
        constructor() {}
    },

    LatLngBounds: class LatLngBounds {
        constructor() {
            this.extend = vi.fn();
        }
    },

    Geocoder: class Geocoder {
        constructor() {
            this.geocode = vi.fn((_, calback) => {
                calback([
                    {
                        address_components: [
                            {
                                types: ["route"],
                                short_name: "street name",
                            },
                        ],
                    },
                ]);
            });
        }
    },

    DirectionsService: class DirectionsService {
        constructor() {
            this.route = (_, callback) => {
                return callback({ routes: [{ legs: [{ distance: { value: 100 } }] }] }, "OK");
            };
        }
    },

    DirectionsRenderer: class DirectionsRenderer {
        constructor() {
            this.setMap = vi.fn();
            this.getMap = vi.fn(() => {});
            this.setDirections = vi.fn();
        }
    },

    places: {
        AutocompleteService: class AutocompleteService {
            constructor() {
                this.getPlacePredictions = vi.fn((_, callback) => callback([], "ok"));
            }
        },
        PlacesService: class AutocompleteService {
            constructor() {
                this.getDetails = vi.fn((_, callback) =>
                    callback(
                        {
                            geometry: {
                                location: {
                                    lat: () => 3.0,
                                    lng: () => 3.0,
                                },
                            },
                        },
                        "ok"
                    )
                );
            }
        },
        PlacesServiceStatus: { OK: "ok" },
    },

    event: {
        addListener: vi.fn((_, __, callback) => callback(event)),
        removeListener: vi.fn(),
    },
};

export const googleMaps = () => {
    global.google = {
        maps: googleMapsClass,
    };
};

const MVCObject = {
    addListener: vi.fn((_, callback) => callback(event)),
    setOptions: vi.fn(),
    setVisible: vi.fn(),
    getVisible: vi.fn(() => true),
    setMap: vi.fn(),
    getMap: vi.fn(() => ({})),
    set: vi.fn(),
    get: vi.fn((key) => {
        if (key === "infoWindow") {
            return {
                open: vi.fn(),
                close: vi.fn(),
                setContent: vi.fn(),
            };
        } else {
            return "string";
        }
    }),
};

const googleMapsObject = {
    Map: {
        ...MVCObject,
        getZoom: vi.fn(() => 1),
        setZoom: vi.fn(),
        panTo: vi.fn(),
        setCenter: vi.fn(),
        setMapTypeId: vi.fn(),
        fitBounds: vi.fn(),
        getBounds: vi.fn(() => {
            return {
                getNorthEast: vi.fn(() => event.latLng),
                getSouthWest: vi.fn(() => event.latLng),
            };
        }),
    },
    Marker: {
        ...MVCObject,
        getPosition: vi.fn(() => event.latLng),
        setPosition: vi.fn(),
    },
    Circle: {
        ...MVCObject,
        setCenter: vi.fn(),
        setRadius: vi.fn(),
    },
    Polyline: {
        ...MVCObject,
        setPath: vi.fn(),
    },
    Polygon: {
        ...MVCObject,
        setPath: vi.fn(),
    },
    InfoWindow: {
        ...MVCObject,
        setContent: vi.fn(),
        open: vi.fn(),
        close: vi.fn(),
    },
};

const mock = (key, args) => {
    vi.spyOn(google.maps, key).mockImplementation(() => ({
        ...googleMapsObject[key],
        ...args,
    }));
};

export const Map = (args) => mock("Map", args);
export const Marker = (args) => mock("Marker", args);
export const Circle = (args) => mock("Circle", args);
export const Polyline = (args) => mock("Polyline", args);
export const Polygon = (args) => mock("Polygon", args);
export const InfoWindow = (args) => mock("InfoWindow", args);