export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonDetailType {
  abilities: any[];
  base_experience: number;
  cries: {
    latest?: string;
    legacy?: string;
  };
  forms: any[];
  game_indices: any[];
  height: number;
  held_items: any[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: any[];
  name: string;
  order: number;
  past_abilities: any[];
  past_types: any[];
  species: {
    name: string;
    url: string;
  };
  sprites: any;
  stats: any[];
  types: any[];
  weight: number;
}
