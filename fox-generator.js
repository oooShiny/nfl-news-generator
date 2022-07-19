function drawImage(chevron_text, box_text, box_img) {
    const canvas = document.getElementById('fox-generator');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Add player image to left side.
    const img = new Image();
    img.addEventListener('load', function() {
        // Draw the background image.
        ctx.drawImage(img, 0, 0, 1280, 720);
        
        // Draw top right box (white)
        ctx.fillStyle = 'rgb(255, 255, 255)';
        ctx.fillRect(695, 77, 533, 303);



        // Add box image
        const box_image = new Image();
        box_image.addEventListener('load', function() {
            ctx.drawImage(box_image, 695, 77, 533, 303);

            // Add box text.
            ctx.font = '70px Verdana';
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 8;
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            const box_lines = getLines(ctx, box_text, 500);
            box_lines.forEach(function(line, i) {
                ctx.strokeText(line.toUpperCase(), 950, 200+(i*80));
                ctx.fillText(line.toUpperCase(), 950, 200+(i*80),);
            });
        }, false);
        box_image.crossOrigin = "Anonymous";
        box_image.src = URL.createObjectURL(box_img);

        // Add chevron text.
        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.font = '45px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(chevron_text.toUpperCase(), 205, 645, 1000);


        
    }, false);
        img.crossOrigin = 'anonymous';
        img.src = 'template/foxnews.jpeg';
}

// Draw the initial fox with some defaults so it's not a blank page.
window.onload = function() {
    drawImage('this was orchastrated to intimidate americans','demo box text', 'template/foxnews.jpeg');
    
}

function generate_foxnews() {
    // Get data from the form
    const formData = new FormData(document.querySelector('form#fox-form'));
    const chevron_text = formData.get('chevron-text');
    const box_text = formData.get('box-text');
    const box_img = formData.get('box-image');

    // Draw the image with the form data.
    drawImage(chevron_text, box_text, box_img);

    // Build the download button.
    const imgName = chevron_text + '.png';
    buildDownloadButton(imgName, 'fox-generator');
}