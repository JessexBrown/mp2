export type PokeListItem = { name: string; url: string };

export type Pokemon = {
id: number;
name: string;
height: number;
weight: number;
sprites: {
    other?: {
        ["official-artwork"]?: { front_default?: string | null };
    };
    front_default?: string | null;
};
types: { slot: number; type: { name: string } }[];
stats: { base_stat: number; stat: { name: string } }[];
};
