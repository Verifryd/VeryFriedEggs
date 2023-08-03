var fabergeButton = document.getElementById('purchaseButton');
var fabergeVideo = document.getElementById('productVideo');
var kringleButton = document.getElementById('kringleproductButton');
var kringleVideo = document.getElementById('kringleproductVideo');
var dpteButton = document.getElementById('dptepurchaseButton');
var dpteVideo = document.getElementById('dpteproductVideo');

if (fabergeButton && fabergeVideo) {
    fabergeButton.addEventListener('click', function() {
        // Hide the product image and show the video player
        document.getElementById('fabergeImage').style.display = 'none';
        fabergeVideo.style.display = 'block';
        fabergeVideo.play();

        this.style.display = 'none';

        // When the video ends, change the Fabergé Egg image to the EarlyEggcessA GIF
        // and hide the video
        fabergeVideo.addEventListener('ended', function() {
            document.getElementById('fabergeImage').src = 'assets/EarlyEggcessA.gif';
            document.getElementById('fabergeImage').style.display = 'block';
            fabergeVideo.style.display = 'none';
        });
    });

    fabergeVideo.addEventListener('ended', function() {
        // Enable the "Next Egg" button when the video has ended
        document.getElementById('nextButton').disabled = false;

        document.getElementById('nextButton').style.display = 'block';
    });
}

if (kringleButton && kringleVideo) {
    kringleButton.addEventListener('click', function() {
        // Hide the product image and show the video player
        document.getElementById('kringleImage').style.display = 'none';
        kringleVideo.style.display = 'block';
        kringleVideo.play();

        this.style.display = 'none';

        // When the video ends, change the Fabergé Egg image to the EarlyEggcessA GIF
        // and hide the video
        kringleVideo.addEventListener('ended', function() {
            document.getElementById('kringleImage').src = 'assets/EarlyEggcessB.gif';
            document.getElementById('kringleImage').style.display = 'block';
            kringleVideo.style.display = 'none';

            document.getElementById('nextButton').style.display = 'block';
        });
    });

    kringleVideo.addEventListener('ended', function() {
        // Enable the "Next Egg" button when the video has ended
        document.getElementById('nextButton').disabled = false;
    });
}

if (dpteButton && dpteVideo) {
    dpteButton.addEventListener('click', function() {
        // Hide the product image and show the video player
        document.getElementById('DPtEImage').style.display = 'none';
        dpteVideo.style.display = 'block';
        dpteVideo.play();

        this.style.display = 'none';

        // When the video ends, change the Fabergé Egg image to the EarlyEggcessA GIF
        // and hide the video
        dpteVideo.addEventListener('ended', function() {
            document.getElementById('DPtEImage').src = 'assets/EarlyEggcessC.gif';
            document.getElementById('DPtEImage').style.display = 'block';
            dpteVideo.style.display = 'none';

            document.getElementById('nextButton').style.display = 'block';
        });
    });

    dpteVideo.addEventListener('ended', function() {
        // Enable the "Next Egg" button when the video has ended
        document.getElementById('nextButton').disabled = false;
    });
}

window.onload = function() {
    // your code here
};



