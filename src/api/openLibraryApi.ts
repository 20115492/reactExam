import { SearchResult } from '../types/bookTypes';

const BASE = 'https://openlibrary.org';
const COVERS = 'https://covers.openlibrary.org';

export const searchBooks = (query: string, page = 1, limit = 20) => {
  const url = `${BASE}/search.json?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`;
  return fetch(url).then((res) => res.json() );
};

export const coverUrl = (coverId: number | undefined, size: 'S' | 'M' | 'L' = 'M') => {
  if (!coverId) return undefined;
  return `${COVERS}/b/id/${coverId}-${size}.jpg`;
};

export const getWorkDetails = (workKey: string) => {
  // workKey expected like "/works/OL12345W" or "OL12345W"
  const normalized = workKey.startsWith('/') ? workKey : `/works/${workKey}`;
  const url = `${BASE}${normalized}.json`;
  return fetch(url).then((res) => res.json());
};
