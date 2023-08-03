var kringleImage = document.getElementById('kringleImage');
if (kringleImage) {
    kringleImage.addEventListener('click', function() {
        // Change the Kringle Kronic image to the EarlyEggcessB GIF
        kringleImage.src = 'assets/EarlyEggcessB.gif';
    });  // Closing for the 'kringleImage' click event
}

var dpteImage = document.getElementById('dpteImage');
if (dpteImage) {
    dpteImage.addEventListener('click', function() {
        // Change the DPtE image to the EarlyEggcessC GIF
        dpteImage.src = 'assets/EarlyEggcessC.gif';
    });  // Closing for the 'dpteImage' click event
}

var purchaseButton = document.getElementById('purchaseButton');
if (purchaseButton) {
    purchaseButton.addEventListener('click', function() {
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
}

document.getElementById('purchaseButton').addEventListener('click', function() {
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

document.getElementById('purchaseButton').addEventListener('click', function() {
    // Hide the product image and show the video player
    document.getElementById('fabergeImage').style.display = 'none';
    var video = document.getElementById('productVideo');
    video.style.display = 'block';
    video.play();

    // When the video ends, change the Fabergé Egg image to the EarlyEggcessA GIF
    // and hide the video
    video.addEventListener('ended', function() {
        document.getElementById('fabergeImage').src = 'assets/EarlyEggcessA.gif';
        document.getElementById('fabergeImage').style.display = 'block';
        video.style.display = 'none';
    });
});

