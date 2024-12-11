/**
 * Shoot Sort Algorithm
 * Sorts an array of numbers using a divide-and-merge approach with a unique rule 
 * to handle odd-numbered groups during the merge process.
 * @param arr - The unsorted array of numbers
 * @returns A sorted array in ascending order
 */
function shootSort(arr: number[]): number[] {
    if (arr.length <= 1) return arr; // Base case: arrays with 1 or fewer elements are already sorted.

    // Step 1: Convert each element into an individual sub-array
    let arrays = arr.map((value) => [value]);

    // Step 2: Iteratively merge pairs of sub-arrays until only one sorted array remains
    while (arrays.length > 1) {
        const mergedArrays: number[][] = [];
        
        for (let i = 0; i < arrays.length; i += 2) {
            if (i + 1 < arrays.length) {
                // Merge two consecutive sub-arrays
                mergedArrays.push(mergeSortedArrays(arrays[i], arrays[i + 1]));
            } else {
                // Rule: Retain the last unmatched array as is
                mergedArrays.push(arrays[i]);
            }
        }

        arrays = mergedArrays; // Update arrays for the next iteration
    }

    return arrays[0]; // Return the final sorted array
}

/**
 * Merges two sorted arrays into one sorted array.
 * @param left - The first sorted array
 * @param right - The second sorted array
 * @returns A single sorted array containing all elements from both input arrays
 */
function mergeSortedArrays(left: number[], right: number[]): number[] {
    const merged: number[] = [];
    let i = 0, j = 0;

    // Merge elements from both arrays in ascending order
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            merged.push(left[i]);
            i++;
        } else {
            merged.push(right[j]);
            j++;
        }
    }

    // Append any remaining elements from the left and right arrays
    return merged.concat(left.slice(i), right.slice(j));
}

// Example usage
const unsortedArray = [5, 43, 87, 66, 90, 13, 59, 74, 17];
const sortedArray = shootSort(unsortedArray);

console.log("Original Array:", unsortedArray);
console.log("Sorted Array:", sortedArray);