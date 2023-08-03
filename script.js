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

document.getElementById('purchaseButton').addEventListener('click', function() {
    // Hide the product image and show the video player
    document.getElementById('kringleImage').style.display = 'none';
    var video = document.getElementById('productVideo');
    video.style.display = 'block';
    video.play();

    // When the video ends, change the Fabergé Egg image to the EarlyEggcessA GIF
    // and hide the video
    video.addEventListener('ended', function() {
        document.getElementById('kringleImage').src = 'assets/EarlyEggcessB.gif';
        document.getElementById('kringleImage').style.display = 'block';
        video.style.display = 'none';
    });
});

document.getElementById('productVideo').addEventListener('ended', function() {
    // Enable the "Next Egg" button when the video has ended
    document.getElementById('nextButton').disabled = false;
});

window.onload = function() {
    // your code here
};

window.onload = function() {
    var purchaseButton = document.getElementById('purchaseButton');
    var productVideo = document.getElementById('productVideo');
    var fabergeImage = document.getElementById('fabergeImage');
    var kringleImage = document.getElementById('kringleImage');
    var DPtEImage = document.getElementById('DPtEImage');
    
    if (purchaseButton && productVideo) {
        purchaseButton.addEventListener('click', function() {
            if (fabergeImage) {
                // Hide the product image and show the video player
                fabergeImage.style.display = 'none';
                productVideo.style.display = 'block';
                productVideo.play();

                // When the video ends, change the Fabergé Egg image to the EarlyEggcessA GIF
                // and hide the video
                productVideo.addEventListener('ended', function() {
                    fabergeImage.src = 'assets/EarlyEggcessA.gif';
                    fabergeImage.style.display = 'block';
                    productVideo.style.display = 'none';
                });
            } else if (kringleImage) {
                // Hide the product image and show the video player
                kringleImage.style.display = 'none';
                productVideo.style.display = 'block';
                productVideo.play();

                // When the video ends, change the Kringle Egg image to the EarlyEggcessB GIF
                // and hide the video
                productVideo.addEventListener('ended', function() {
                    kringleImage.src = 'assets/EarlyEggcessB.gif';
                    kringleImage.style.display = 'block';
                    productVideo.style.display = 'none';
                });
            } else if (DPtEImage) {
                // Hide the product image and show the video player
                DPtEImage.style.display = 'none';
                productVideo.style.display = 'block';
                productVideo.play();

                // When the video ends, change the DPtE Egg image to the EarlyEggcessC GIF
                // and hide the video
                productVideo.addEventListener('ended', function() {
                    DPtEImage.src = 'assets/EarlyEggcessC.gif';
                    DPtEImage.style.display = 'block';
                    productVideo.style.display = 'none';
                });
            }
        });
    }

    if (productVideo) {
        productVideo.addEventListener('ended', function() {
            // Enable the "Next Egg" button when the video has ended
            document.getElementById('nextButton').disabled = false;
       


