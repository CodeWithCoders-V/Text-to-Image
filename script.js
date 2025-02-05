const API_TOKEN = "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"; // Replace with your actual Hugging Face token
const clientUrl = "https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image"; // Model URL

const inputTxt = document.getElementById("input");
const image = document.getElementById("image");
const button = document.getElementById("btn");
const loadingText = document.getElementById("loading");

// Function to handle image generation
async function generateImage() {
    const prompt = inputTxt.value.trim();  // Get input text from user

    // If prompt is empty, show an alert and stop further execution
    if (!prompt) {
        alert("Please enter a text prompt!");
        return;
    }

    // Show loading text and hide image while generating the new image
    image.style.display = "none";
    loadingText.style.display = "block";
    button.innerText = "Generating...";
    button.disabled = true;

    try {
        // Sending request to Hugging Face API with the user prompt
        const response = await fetch(clientUrl, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_TOKEN}`,  // Authorization header with API token
                "Content-Type": "application/json"  // Define content type as JSON
            },
            body: JSON.stringify({ inputs: prompt })  // Sending the prompt as the request body
        });

        // Log the full response to check for issues
        const data = await response.json();
        console.log(data);  // Inspect the response from the API

        if (!response.ok) {
            throw new Error("Error generating image");
        }

        // Convert the response to a Blob (image data)
        const imageBlob = await response.blob();

        // Create an object URL for the Blob (image)
        const objectURL = URL.createObjectURL(imageBlob);
        image.src = objectURL;  // Set the image source to the generated image URL

        // Display the generated image and hide loading text
        document.querySelector('.image-container').style.display = 'block'; // Show the image container
        image.style.display = "block"; // Show the image itself
        loadingText.style.display = "none"; // Hide loading text
    } catch (error) {
        // Handle errors during the image generation process
        console.error("Error:", error);
        alert("Failed to generate image. Please try again later.");
    }

    // Reset button state after the process is done
    button.innerText = "Generate";
    button.disabled = false;
}

// Add event listener for the Generate button to trigger the image generation
button.addEventListener("click", generateImage);
