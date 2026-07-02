export type ServiceCategory =
  | "Wardrobe Makeover"
  | "Personal Shopping"
  | "Event Styling"
  | "Closet Edit"
  | "Virtual Consult"
  | "Color Analysis";

export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  duration: string;
  price: number;
  description: string;
  mode: "In person" | "Virtual" | "In person or virtual";
}

export interface Look {
  id: string;
  title: string;
  vibe: string;
  tags: string[];
  palette: string[];
  emoji: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  service: string;
  text: string;
}

export interface Stylist {
  id: string;
  name: string;
  handle: string;
  tagline: string;
  city: string;
  neighborhood: string;
  rating: number;
  reviewCount: number;
  bookings: number;
  responseTime: string;
  yearsExperience: number;
  startingPrice: number;
  topRated: boolean;
  risingStar: boolean;
  instantBook: boolean;
  virtual: boolean;
  specialties: string[];
  languages: string[];
  bio: string;
  approach: string;
  brands: string[];
  gradient: [string, string];
  accent: string;
  services: Service[];
  looks: Look[];
  reviews: Review[];
  nextAvailable: string;
}

export interface Booking {
  id: string;
  stylistId: string;
  stylistName: string;
  serviceId: string;
  serviceName: string;
  servicePrice: number;
  bookingFee: number;
  total: number;
  date: string;
  time: string;
  mode: string;
  notes: string;
  status: "confirmed" | "completed" | "cancelled";
  createdAt: string;
}
