interface CardProps { }

interface ButtonProps { }

export interface ReviewProps {
  name: string;
  avatar: string;
  rating: number;
  comment: string;
}

export interface PropertyProps {
  name: string;
  address: {
    state: string;
    city: string;
    country: string;
  };
  rating: number;
  category: string[];
  price: number;
  offers: {
    bed: string;
    shower: string;
    occupants: string;
  };
  image: string;
  discount: string;
  description?: string;
  reviews?: ReviewProps[];
  images?: string[];
  host?: {
    name: string;
    avatar: string;
    about: string;
  };
}