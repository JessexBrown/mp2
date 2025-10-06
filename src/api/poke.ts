import { axiosClient } from "./axiosClient";
import { PokeListItem, Pokemon } from "../types/pokemon";

/** First generation IDs (always available) */
export const FIRST_GEN_IDS: number[] = Array.from({ length: 151 }, (_, i) => i + 1);

/** Fetch basic list (names) for the first 151 Pokémon */
export async function fetchFirstGenBasics(): Promise<PokeListItem[]> {
  const { data } = await axiosClient.get<{ results: PokeListItem[] }>(
    `/pokemon?limit=151&offset=0`
  );
  return data.results;
}

/** Fetch one Pokémon by id or name */
export async function fetchPokemon(idOrName: string | number) {
  const { data } = await axiosClient.get<Pokemon>(`/pokemon/${idOrName}`);
  return data;
}

/** Fetch details for many Pokémon by id or name */
export async function fetchManyPokemon(idsOrNames: (string | number)[]) {
  return Promise.all(idsOrNames.map((x) => fetchPokemon(x)));
}

/** Convenience: full details for the first 151 (names -> details) */
export async function fetchFirstGenDetails(): Promise<Pokemon[]> {
  const basics = await fetchFirstGenBasics();          // names
  const details = await Promise.all(basics.map((b) => fetchPokemon(b.name)));
  return details;
}
