import { getIpfsURL } from "./ipfs";

export const slice = (input: string | undefined): string => {
    if (input === undefined) {
        return '';
    }
    
    if (input.length <= 5) {
        return input;
    }

    return `${input.slice(0, 5)}...${input.slice(input.length-5)}`;
}

export function getDescriptionAndUrl(inputText: string): { description: string; imageUrl: string } {
    // Find the last occurrence of '+'
    const lastPlusIndex = inputText.lastIndexOf('+');
  
    if (lastPlusIndex === -1) {
      // '+' not found, return the original text
      return { description: inputText, imageUrl: '' };
    }
  
    // Extract text after the last '+'
    let imageUrl = inputText.substring(lastPlusIndex + 1);
  
    // Extract original text without the last part
    const description = inputText.substring(0, lastPlusIndex);
  
    imageUrl = imageUrl ? getIpfsURL(imageUrl) : imageUrl
    
    return { description, imageUrl };
  }