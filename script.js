var fabergeButton = document.getElementById('fabergeButton');
if (fabergeButton) {
    fabergeButton.addEventListener('click', function() {
        document.getElementById('fabergeImage').style.display = 'none';
        var video = document.getElementById('productVideo');
        video.style.display = 'block';
        video.play();

        video.addEventListener('ended', function() {
            document.getElementById('fabergeImage').src = 'assets/EarlyEggcessA.gif';
            document.getElementById('fabergeImage').style.display = 'block';
            document.getElementById('nextButton').disabled = false;
        });
    });
}

var kringleButton = document.getElementById('kringleButton');
if (kringleButton) {
    kringleButton.addEventListener('click', function() {
        document.getElementById('kringleImage').style.display = 'none';
        var video = document.getElementById('productVideo');
        video.style.display = 'block';
        video.play();

        video.addEventListener('ended', function() {
            document.getElementById('kringleImage').src = 'assets/EarlyEggcessB.gif';
            document.getElementById('kringleImage').style.display = 'block';
            document.getElementById('nextButton').disabled = false;
        });
    });
}

var dpteButton = document.getElementById('dpteButton');
if (dpteButton) {
    dpteButton.addEventListener('click', function() {
        document.getElementById('DPtEImage').style.display = 'none';
        var video = document.getElementById('productVideo');
        video.style.display = 'block';
        video.play();

        video.addEventListener('ended', function() {
            document.getElementById('DPtEImage').src = 'assets/EarlyEggcessC.gif';
            document.getElementById('DPtEImage').style.display = 'block';
            document.getElementById('nextButton').disabled = false;
        });
    });
}

document.getElementById('productVideo').addEventListener('ended', function() {
    // Enable the "Next Egg" button when the video has ended
    document.getElementById('nextButton').disabled = false;
});



