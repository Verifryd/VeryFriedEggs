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

document.getElementById('kringleButton').addEventListener('click', function() {
    // Hide the product image and show the video player
    document.getElementById('kringleImage').style.display = 'none';
    var video = document.getElementById('kringleVideo');
    video.style.display = 'block';
    video.play();

    // When the video ends, change the kringle Egg image to the EarlyEggcessB GIF
    // and hide the video
    video.addEventListener('ended', function() {
        document.getElementById('kringleImage').src = 'assets/EarlyEggcessB.gif';
        document.getElementById('kringleImage').style.display = 'block';
        video.style.display = 'none';
    });
});

document.getElementById('dpteButton').addEventListener('click', function() {
    document.getElementById('DPtEImage').style.display = 'none';
    var video = document.getElementById('dpteVideo');
    video.style.display = 'block';
    video.play();

    video.addEventListener('ended', function() {
        document.getElementById('DPtEImage').src = 'assets/EarlyEggcessB.gif';
        document.getElementById('DPtEImage').style.display = 'block';
        video.style.display = 'none';
        document.getElementById('nextButton').disabled = false;
    });
});


document.getElementById('productVideo').addEventListener('ended', function() {
    // Enable the "Next Egg" button when the video has ended
    document.getElementById('nextButton').disabled = false;
});

document.getElementById('dpteVideo').addEventListener('ended', function() {
    // Enable the "Next Egg" button when the video has ended
    document.getElementById('nextButton').disabled = false;
});

document.getElementById('kringleVideo').addEventListener('ended', function() {
    // Enable the "Next Egg" button when the video has ended
    document.getElementById('nextButton').disabled = false;
});

window.onload = function() {
    // your code here
};

var fabergePurchase = document.getElementById('fabergePurchase');
var kringlePurchase = document.getElementById('kringlePurchase');
var dptePurchase = document.getElementById('dptePurchase');
var productVideo = document.getElementById('productVideo');

if (fabergePurchase && productVideo) {
    fabergePurchase.addEventListener('click', function() {
        document.getElementById('fabergeImage').style.display = 'none';
        productVideo.style.display = 'block';
        productVideo.play();

        productVideo.addEventListener('ended', function() {
            document.getElementById('fabergeImage').src = 'assets/EarlyEggcessA.gif';
            document.getElementById('fabergeImage').style.display = 'block';
            document.getElementById('nextButton').disabled = false;
        });
    });
}

if (kringlePurchase && productVideo) {
    kringlePurchase.addEventListener('click', function() {
        document.getElementById('kringleImage').style.display = 'none';
        productVideo.style.display = 'block';
        productVideo.play();

        productVideo.addEventListener('ended', function() {
            document.getElementById('kringleImage').src = 'assets/EarlyEggcessB.gif';
            document.getElementById('kringleImage').style.display = 'block';
            document.getElementById('nextButton').disabled = false;
        });
    });
}

if (dptePurchase && productVideo) {
    dptePurchase.addEventListener('click', function() {
        document.getElementById('DPtEImage').style.display = 'none';
        productVideo.style.display = 'block';
        productVideo.play();

        productVideo.addEventListener('ended', function() {
            document.getElementById('DPtEImage').src = 'assets/EarlyEggcessC.gif';
            document.getElementById('DPtEImage').style.display = 'block';
            document.getElementById('nextButton').disabled = false;
        });
    });
}



