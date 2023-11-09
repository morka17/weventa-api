import {WordTokenizer, Stemmer} from "natural"



export function extractKeywords(text: string){
    const tokenizer = new WordTokenizer()
    const tokens = tokenizer.tokenize(text)

    // Remove stop words 
    const stopWords = new Set(["a", "an", "the", "is", "in", "of", "to", "and", "for", "that", "this", "it", "he", "she", "they"]);
    const filteredTokens = tokens?.filter(token => !stopWords.has(token))

    // Stem the words to their root forms 
   
    return filteredTokens
}