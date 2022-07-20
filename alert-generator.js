function drawImage(team, alert_text, header_text, bottom_text, player_img) {
    // Get team data.
    var t = teamData(team);
    const canvas = document.getElementById('alert-generator');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Add player image to left side.
    const img = new Image();
    img.addEventListener('load', function() {
        var ratio = canvas.height/img.naturalHeight;
        var w = img.naturalWidth * ratio;
        var shift = (665/2) - (w/2);
        ctx.drawImage(img, 
            shift, 0, // Starting point of cropped image on canvas
            w, 1200 // Scaled width/height image
            );

        // Draw right hand background.
        ctx.shadowColor='rgba(0,0,0,0)';
        ctx.fillStyle = t.bg_color;
        ctx.fillRect(665, 0, 535, 1200);
        
        // Draw alert box (white)
        ctx.shadowColor = 'rgb(0, 0, 0, .5)';
        ctx.shadowOffsetX = -25;
        ctx.shadowOffsetY = 25;
        ctx.shadowBlur = 10;
        ctx.fillStyle = 'rgb(255, 255, 255)';
        ctx.fillRect(634, 495, 566, 170);

        // Add alert text.
        ctx.shadowColor='rgba(0,0,0,0)';
        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.font = 'bold 100px Verdana';
        ctx.fillText(alert_text.toUpperCase(), 700, 615, 480);

        // Add header text.
        var header = getLines(ctx, header_text, 480);
        ctx.shadowColor='rgba(0,0,0,0)';
        ctx.fillStyle = t.header_color;
        ctx.font = '70px Verdana';
        header.forEach(function(line, i) {
            ctx.fillText(line.toUpperCase(), 700, 815+(i*80),);
        });
        

        // Add bottom text.
        var bottom = getLines(ctx, bottom_text, 480);
        ctx.shadowColor='rgba(0,0,0,0)';
        ctx.fillStyle = t.text_color;
        ctx.font = 'lighter 50px Verdana';
        bottom.forEach(function(line, i) {
            ctx.fillText(line.toUpperCase(), 700, 1015+(i*80),);
        });

        // Add team logo to the top right.
        const logo = new Image();
        logo.addEventListener('load', function() {
            ctx.shadowColor = 'rgb(0, 0, 0, .5)';
            ctx.shadowOffsetX = -25;
            ctx.shadowOffsetY = 25;
            ctx.shadowBlur = 10;
            if (team == 'nfl') {
                ctx.drawImage(logo, 600, -150, canvas.width/2.5, canvas.height/2);
            }
            else {
                ctx.drawImage(logo, 550, -100, canvas.width/2, canvas.height/2);
            }
        }, false);
        logo.crossOrigin = 'anonymous';
        logo.src = 'logos/' + team + '.webp?' + Math.random()*1000;
    }, false);
    img.crossOrigin = 'anonymous';
    if (typeof player_img === 'string') {
        img.src = player_img;
    }
    else if (player_img.size === 0) {
        img.src = 'football.webp';
    }
    else {
        img.src = URL.createObjectURL(player_img);
    }
}

// Draw the initial alert with some defaults so it's not a blank page.
window.onload = function() {
    var player_img = new Image();
    player_img.addEventListener('load', function() {}, false);
    player_img.src = 'baker.jpeg';
    drawImage('nfl','ALERT', 'header text', 'bottom text', 'baker.jpeg');
    
}

function generate_alert() {
    // Get data from the form
    var formData = new FormData(document.querySelector('form#alert-form'));
    var team = formData.get('team');
    var alert_text = formData.get('alert-text');
    var header_text = formData.get('header-text');
    var bottom_text = formData.get('bottom-text');
    var player_img = formData.get('player-image');

    // Draw the image with the form data.
    drawImage(team, alert_text, header_text, bottom_text, player_img);

    // Build the download button.
    var imgName = alert_text + '_' + header_text + '_' + bottom_text + '.png';
    buildDownloadButton(imgName, 'alert-generator');
}