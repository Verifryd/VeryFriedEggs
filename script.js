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

var purchaseButton = document.getElementById('purchaseButton');
if (purchaseButton) {
    purchaseButton.addEventListener('click', function() {
        // Hide the product image and show the video player
        document.getElementById('kringleImage').style.display = 'none';
        var video = document.getElementById('productVideo');
        video.style.display = 'block';
        video.play();

        // When the video ends, change the Fabergé Egg image to the EarlyEggcessA GIF
        video.addEventListener('ended', function() {
            document.getElementById('fabergeImage').src = 'assets/EarlyEggcessB.gif';
            document.getElementById('fabergeImage').style.display = 'block';
        });
    });
}

var purchaseButton = document.getElementById('purchaseButton');
if (purchaseButton) {
    purchaseButton.addEventListener('click', function() {
        // Hide the product image and show the video player
        document.getElementById('DPtEImage').style.display = 'none';
        var video = document.getElementById('productVideo');
        video.style.display = 'block';
        video.play();

        // When the video ends, change the Fabergé Egg image to the EarlyEggcessA GIF
        video.addEventListener('ended', function() {
            document.getElementById('fabergeImage').src = 'assets/EarlyEggcessC.gif';
            document.getElementById('fabergeImage').style.display = 'block';
        });
    });
}

document.getElementById('productVideo').addEventListener('ended', function() {
    // Enable the "Next Egg" button when the video has ended
    document.getElementById('nextButton').disabled = false;
});



