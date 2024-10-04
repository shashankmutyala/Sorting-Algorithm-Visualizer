let defaultArray = [50, 30, 70, 20, 90, 10, 40, 60, 80]; // Default array to reset to
let array = [...defaultArray]; // Initialize with the default array
const arrayContainer = document.getElementById("arrayContainer");

function createBars() {
    arrayContainer.innerHTML = '';  // Clear previous bars
    array.forEach((value) => {
        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${value * 2}px`;
        bar.style.width = '30px';

        const barValue = document.createElement("span");
        barValue.innerText = value; // Display value above the bar
        bar.appendChild(barValue);

        arrayContainer.appendChild(bar);
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Bubble Sort
async function bubbleSort() {
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]]; // Swap
                createBars();
                await sleep(300); // Delay to visualize the sorting step
            }
        }
    }
}

// Selection Sort
async function selectionSort() {
    for (let i = 0; i < array.length; i++) {
        let minIndex = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        [array[i], array[minIndex]] = [array[minIndex], array[i]]; // Swap
        createBars();
        await sleep(300); // Delay to visualize the sorting step
    }
}

// Insertion Sort
async function insertionSort() {
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            j--;
            createBars();
            await sleep(300); // Delay to visualize the sorting step
        }
        array[j + 1] = key;
        createBars();
        await sleep(300);
    }
}

// Merge Sort
async function mergeSort(low = 0, high = array.length - 1) {
    if (low < high) {
        let mid = Math.floor((low + high) / 2);
        await mergeSort(low, mid);
        await mergeSort(mid + 1, high);
        await merge(low, mid, high);
    }
}

async function merge(low, mid, high) {
    let left = array.slice(low, mid + 1);
    let right = array.slice(mid + 1, high + 1);
    let i = 0, j = 0, k = low;

    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            array[k++] = left[i++];
        } else {
            array[k++] = right[j++];
        }
        createBars();
        await sleep(300);
    }

    while (i < left.length) {
        array[k++] = left[i++];
        createBars();
        await sleep(300);
    }

    while (j < right.length) {
        array[k++] = right[j++];
        createBars();
        await sleep(300);
    }
}

// Quick Sort
async function quickSort(low = 0, high = array.length - 1) {
    if (low < high) {
        let pi = await partition(low, high);
        await quickSort(low, pi - 1);
        await quickSort(pi + 1, high);
    }
}

async function partition(low, high) {
    let pivot = array[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (array[j] < pivot) {
            i++;
            [array[i], array[j]] = [array[j], array[i]];
            createBars();
            await sleep(300);
        }
    }
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    createBars();
    await sleep(300);
    return i + 1;
}

// Start the visualization with the selected algorithm
function startVisualization() {
    const algorithm = document.getElementById("algorithm").value;

    if (algorithm === "bubble") {
        bubbleSort();
    } else if (algorithm === "selection") {
        selectionSort();
    } else if (algorithm === "insertion") {
        insertionSort();
    } else if (algorithm === "merge") {
        mergeSort();
    } else if (algorithm === "quick") {
        quickSort();
    }
}

// Set the array based on user input
function setUserArray() {
    const userInput = document.getElementById("userInput").value;
    array = userInput.split(',').map(num => parseInt(num.trim())); // Parse and convert input to array of numbers
    createBars();  // Create bars for the user input
}

// Reset the array to the default values
function resetArray() {
    array = [...defaultArray]; // Reset array to default values
    createBars();  // Recreate the bars with the reset array
}

// Create initial bars (for the default array)
createBars();
