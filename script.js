});  // Closing for the 'productImage' click event

document.getElementById('fabergeImage').addEventListener('click', function() {
    // Change the Fabergé Egg image to the EarlyEggcessA GIF
    document.getElementById('fabergeImage').src = 'assets/EarlyEggcessA.gif';
});  // Closing for the 'fabergeImage' click event

document.getElementById('kringleImage').addEventListener('click', function() {
    // Change the Kringle Kronic image to the EarlyEggcessB GIF
    document.getElementById('kringleImage').src = 'assets/EarlyEggcessB.gif';
});  // Closing for the 'kringleImage' click event

document.getElementById('dpteImage').addEventListener('click', function() {
    // Change the DPtE image to the EarlyEggcessC GIF
    document.getElementById('dpteImage').src = 'assets/EarlyEggcessC.gif';
});  // Closing for the 'dpteImage' click event

document.getElementById('fabergeImage').addEventListener('click', function() {
    // Hide the product image and show the video player
    document.getElementById('fabergeImage').style.display = 'none';
    var video = document.getElementById('productVideo');
    video.style.display = 'block';
    video.play();

    // When the video ends, change the Fabergé Egg image to the EarlyEggcessA GIF
    video.addEventListener('ended', function() {
        document.getElementById('fabergeImage').src = 'assets/EarlyEggcessA.gif';
        document.getElementById('fabergeImage').style.display = 'block';
    });
});
