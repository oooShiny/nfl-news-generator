function drawImage(banner_text) {
    const canvas = document.getElementById('colts-banner-generator');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Add background image.
    const img = new Image();
    img.addEventListener('load', function() {
        // Draw the background image.
        ctx.drawImage(img, 0, 0, 1280, 720);

        // Add banner text.
        let bottom = getLines(ctx, banner_text, 250);
        ctx.fillStyle = 'rgb(255, 255, 255)';
        ctx.font = '105px Arial';
        ctx.textAlign = 'left';
        ctx.setTransform (1, 0.2, 0, 1, 0, 0);
        bottom.forEach(function(line, i) {
            ctx.fillText(line.toUpperCase(), 500, 65+(i*60),);
        });
        ctx.setTransform (1, 0, 0, 1, 0, 0);


    }, false);
        img.crossOrigin = 'anonymous';
        img.src = 'template/colts_banner.jpeg';
}

// Draw the initial image with some defaults so it's not a blank page.
window.onload = function() {
    drawImage('2014 AFC Finalist', 'template/colts_banner.jpeg');
    
}

function generate_colts_banner() {
    // Get data from the form
    const formData = new FormData(document.querySelector('form#colts-banner-form'));
    const banner_text = formData.get('banner-text');

    // Draw the image with the form data.
    drawImage(banner_text);

    // Build the download button.
    const imgName = 'colts_banner_' + banner_text + '.png';
    buildDownloadButton(imgName, 'colts-banner-generator');
}