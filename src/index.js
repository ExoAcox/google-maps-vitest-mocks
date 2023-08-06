import { vi } from "vitest";

const event = {
    latLng: {
        lat: () => 3.0,
        lng: () => 3.0,
    },
    getMarkers: () => [],
    getCenter: () => vi.fn(),
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
                    setPosition: vi.fn(),
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
            this.setOpacity = vi.fn();
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
            this.setPaths = vi.fn();
        }
    },

    Polygon: class Polygon extends MVCClass {
        constructor() {
            super();
            this.setPath = vi.fn();
            this.setPaths = vi.fn();
        }
    },

    InfoWindow: class InfoWindow extends MVCClass {
        constructor() {
            super();
            this.setContent = vi.fn();
            this.open = vi.fn();
            this.close = vi.fn();
            this.setPosition = vi.fn();
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

    LatLngBounds: class LatLngBounds {
        constructor() {
            this.extend = vi.fn();
            this.getCenter = vi.fn();
        }
    },

    Geocoder: class Geocoder {
        constructor() {
            this.geocode = vi.fn((_, callback) => {
                callback([
                    {
                        address_components: [
                            {
                                types: ["route"],
                                short_name: "street name",
                            },
                            {
                                types: ["postal_code"],
                                long_name: "street name",
                            },
                        ],
                        formatted_address: "jl. ahmad siddiq",
                    },
                ]);
            });
        }
    },

    drawing: {
        DrawingManager: class DrawingManager extends MVCClass {
            constructor() {
                super();
                this.polygonOptions = {
                    editable: true,
                    draggable: true,
                    strokeWeight: 5,
                    fillOpacity: 0.5,
                    fillColor: "red",
                    strokeColor: "red",
                    clickable: true,
                };
                this.setDrawingMode = vi.fn();
                this.addListener = vi.fn((_, calback) =>
                    calback({
                        overlay: {
                            getPath: vi.fn(() => {
                                return {
                                    getArray: vi.fn(() => [event.latLng]),
                                };
                            }),
                            ...MVCObject,
                        },
                    })
                );
            }
        },
        OverlayType: "POLYGON",
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
        addDomListener: vi.fn((_, __, callback) => callback(event)),
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
                setPosition: vi.fn(),
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
        setMapTypeId: vi.fn(),
        setCenter: vi.fn(),
        fitBounds: vi.fn(),
        getBounds: vi.fn(() => {
            return {
                getNorthEast: vi.fn(() => {
                    return {
                        lat: vi.fn(() => 3),
                        lng: vi.fn(() => 3),
                    };
                }),
                getSouthWest: vi.fn(() => {
                    return {
                        lat: vi.fn(() => 3),
                        lng: vi.fn(() => 3),
                    };
                }),
            };
        }),
    },
    Marker: {
        ...MVCObject,
        getPosition: vi.fn(() => event.latLng),
        setPosition: vi.fn(),
        setOpacity: vi.fn(),
    },
    Circle: {
        ...MVCObject,
        setCenter: vi.fn(),
        setRadius: vi.fn(),
    },
    Polyline: {
        ...MVCObject,
        setPath: vi.fn(),
        setPaths: vi.fn(),
    },
    Polygon: {
        ...MVCObject,
        setPath: vi.fn(),
        setPaths: vi.fn(),
    },
    InfoWindow: {
        ...MVCObject,
        setContent: vi.fn(),
        open: vi.fn(),
        close: vi.fn(),
        setPosition: vi.fn(),
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
