export type countSyllables = (word: string) => number;

export function countSyllablesEN(word: string){
    word = word.toLowerCase().replace(/[^a-z]/g,'');
    if (!word) return 0;

    // match one or more consecutive vowels
    let vowels = word.match(/[aeiouy]+/g);
    let silentE = word.match(/[aeiouy]e$/);
    let count = (vowels?.length ?? 0) - (silentE?.length ?? 0);
    return Math.max(count,1); // at least one syllable
}

export function countSyllablesPL(word: string): number {
  // keep only letters (Polish diacritics are preserved)
  word = word.toLowerCase().replace(/[^a-ząćęłńóśźż]/g, ''); // adjust as needed

  if (!word) return 0;

  const vowels = word.match(/[aeiouyąęó]/g);
  const softI = word.match(/i(?=[aeiouyęóą])/g);
  let count = (vowels?.length ?? 0) - (softI?.length ?? 0);

  return Math.max(count, 1); // at least one syllable
}

//export type languageKey = "EN" | "PL";

const languages: Record<string, (word: string) => number> = {
    "EN": countSyllablesEN,
    "PL": countSyllablesPL
};

export const languageKeys = Object.keys(languages);

export default languages;