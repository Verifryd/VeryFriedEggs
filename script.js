document.getElementById('productImage').addEventListener('click', function() {
    // Hide the product image and show the video player
    document.getElementById('productImage').style.display = 'none';
    var video = document.getElementById('productVideo');
    video.style.display = 'block';
    video.play();
});

document.getElementById('fabergeImage').addEventListener('click', function() {
    // Change the Fabergé Egg image to the EarlyEggcessA GIF
    document.getElementById('fabergeImage').src = 'assets/EarlyEggcessA.gif';
});

document.getElementById('kringleImage').addEventListener('click', function() {
    // Change the Kringle Kronic image to the EarlyEggcessB GIF
    document.getElementById('kringleImage').src = 'assets/EarlyEggcessB.gif';
});

document.getElementById('dpteImage').addEventListener('click', function() {
    // Change the DPtE image to the EarlyEggcessC GIF
    document.getElementById('dpteImage').src = 'assets/EarlyEggcessC.gif';
});