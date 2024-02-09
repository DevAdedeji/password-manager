export const useEncryption = () => {

    const encryptMap: Map<string, string> = new Map([
        ['a', 'm'], ['b', 'n'], ['c', 'b'], ['d', 'v'], ['e', 'c'], ['f', 'x'], ['g', 'z'],
        ['h', 'a'], ['i', 's'], ['j', 'd'], ['k', 'f'], ['l', 'g'], ['m', 'h'], ['n', 'j'],
        ['o', 'k'], ['p', 'l'], ['q', 'p'], ['r', 'o'], ['s', 'i'], ['t', 'u'], ['u', 'y'],
        ['v', 't'], ['w', 'r'], ['x', 'e'], ['y', 'w'], ['z', 'q'], ['_', ']'], [']', '_'],
        ['9', '3'], ['3', '9']
        // Add more substitutions as needed, including uppercase letters, numbers, etc.
    ]);
    
    // Create a reverse map for decryption
    const decryptMap: Map<string, string> = new Map(Array.from(encryptMap.entries()).map(([key, value]) => [value, key]));
    
    function encrypt(input: string): string {
        return input.split('').map(char => encryptMap.get(char) || char).join('');
    }
    
    function decrypt(input: string): string {
        return input.split('').map(char => decryptMap.get(char) || char).join('');
    }

    return { encrypt, decrypt }
  
}
  


  

  
//   // Example usage
//   (async () => {
//     try {
//       const key = await generateKey();
//       const { encrypted, iv } = await encryptText("Hello, TypeScript World!", key);
//       const decryptedText = await decryptText(encrypted, iv, key);
  
//       console.log("Decrypted Text:", decryptedText);
//     } catch (error) {
//       console.error("Encryption/Decryption error:", error);
//     }
//   })();
  