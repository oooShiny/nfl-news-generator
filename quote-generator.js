function drawImage(team, quote_text, attribution_text, player_img) {
    // Get team data.
    var t = teamData(team);
    const canvas = document.getElementById('quote-generator');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var myFont = new FontFace('My Font', 'url(fonts/SF-Movie-Poster-Bold.ttf.woff)');

    myFont.load().then(function(font){

        // with canvas, if this is ommited won't work
        document.fonts.add(font);
        // Add player image to left side.
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.addEventListener('load', function() {
            var ratio = canvas.height/img.naturalHeight;
            var h = canvas.height;
            var w = img.naturalWidth * ratio;
            var shift = 600 - (w/2);

            ctx.drawImage(img, 
                shift, 0, // Starting point of cropped image on canvas
                w, 1200 // Scaled width/height image
                );
            
            // Overlay gradient.
            var dark_gradient = ctx.createLinearGradient(0, 0, 0, 1200);
            dark_gradient.addColorStop(0.25, 'rgb(255, 255, 255, 0)');
            dark_gradient.addColorStop(.75, t.bg_color);
            ctx.fillStyle = dark_gradient;
            ctx.fillRect(0, 0, 1200, 1200);
            
            
            // Draw quote box (team color).
            ctx.fillStyle = t.text_color;
            ctx.fillRect(50, 791, 1100, 355);

            // Add quote text.
            ctx.fillStyle = 'rgb(0, 0, 0)';
            ctx.textAlign = 'center';
            quote_text = '"' + quote_text + '"';
            ctx.font = '60px SF-Movie-Poster-Bold';
            var quote = getLines(ctx, quote_text, 1000);
            
            quote.forEach(function(line, i) {
                ctx.fillText(line.toUpperCase(), 600, 875+(i*55),);
            });
            
            // Add attribution text.
            ctx.textAlign = 'right';
            ctx.font = '25px SF-Movie-Poster-Bold';
            ctx.fillText(attribution_text.toUpperCase(), 1100, 1125);

            // Add team logo to the top right.
            const logo = new Image();
            logo.addEventListener('load', function() {
            if (team == 'nfl') {
                ctx.drawImage(logo, 1130, 10, 55, 70);
            }
            else {
                ctx.drawImage(logo, 1120, 10, 70, 70);
            }
            }, false);
            logo.crossOrigin = "Anonymous";
            logo.src = 'logos/' + team + '.webp';

        }, false);
        if (typeof player_img === 'object') {
            img.src = URL.createObjectURL(player_img);
        }
        else {
            img.src = player_img;
        }
        const url = document.getElementById('img-url');
        url.href = canvas.toDataURL();
        url.setAttribute('download', attribution_text + '_' + quote_text);
    });
    
}

// Draw the initial quote with some defaults so it's not a blank page.
window.onload = function() {
    drawImage(
        'nfl', 
        'Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis lacus. In auctor lobortis lacus. Pellentesque dapibus hendrerit tortor. Nam eget dui. Praesent ac sem eget est egestas volutpat.', 
        'attribution text', 
        'test-quote.jpeg'
    );
}

function generate_quote() {
    // Get the data from the form
    var formData = new FormData(document.querySelector('form#quote-form'));
    var team = formData.get('team');
    var quote_text = formData.get('quote-text');
    var attribution_text = formData.get('attr-text');
    var player_img = formData.get('player-image');

    // Draw the image with the form data.
    drawImage(team, quote_text, attribution_text, player_img);

    // Build the download button.
    var imgName = attribution_text + '-quote.png';
    buildDownloadButton(imgName, 'quote-generator');
}

