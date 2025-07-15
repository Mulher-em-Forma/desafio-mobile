export type Question = {
  id: string;
  text: string;
  multiple: boolean;
  answers: { text: string; next: string }[];
};
