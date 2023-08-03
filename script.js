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

var purchaseButton = document.getElementById('purchaseButton');
var kringlePurchaseButton = document.getElementById('kringlePurchaseButton');
var dptePurchaseButton = document.getElementById('dptePurchaseButton');

if (purchaseButton) {
    purchaseButton.addEventListener('click', function() {
        // Fabergé Egg functionality
    });
}

if (kringlePurchaseButton) {
    kringlePurchaseButton.addEventListener('click', function() {
        // Kringle Kronic functionality
    });
}

if (dptePurchaseButton) {
    dptePurchaseButton.addEventListener('click', function() {
        // Don't Press the Egg functionality
    });
}


window.onload = function() {
    // your code here
};



