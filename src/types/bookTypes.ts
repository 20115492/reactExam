export type BookSummary = {
  key: string; // resource key like "/works/OL12345W"
  title: string;
  author_name?: string[];
  cover_i?: number;
  first_publish_year?: number;
  edition_key?: string[];
};

export type SearchResult = {
  numFound: number;
  start: number;
  docs: BookSummary[];
};

export type BookDetails = {
  key: string;
  title: string;
  description?: string | { value: string };
  covers?: number[];
  subjects?: string[];
};
