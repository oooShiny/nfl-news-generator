function drawImage(team, quote_text, attribution_text) {
    // Get team data.
    const t = teamData(team);
    const canvas = document.getElementById('team-quote-generator');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    // Overlay gradient.
    ctx.fillStyle = t.bg_color;
    ctx.fillRect(0, 0, 1200, 1200);



    // Add quote text.
    ctx.fillStyle = t.text_color;

    ctx.textAlign = 'center';
    quote_text = '"' + quote_text + '"';
    ctx.font = 'lighter 40px Gotham, Helvetica Neue, sans-serif';
    var quote = getLines(ctx, quote_text, 800);
    quote.forEach(function(line, i) {
        ctx.fillText(line.toUpperCase(), 600, 500+((i)*55),);
    });

    // Add attribution text.
    ctx.textAlign = 'center';
    ctx.font = 'normal 40px Gotham, Helvetica Neue, sans-serif';
    ctx.fillText(attribution_text.toUpperCase(), 600, 420);

    // Add separator line between attribution and text.
    ctx.lineWidth = 2;
    ctx.strokeStyle = t.text_color;
    ctx.beginPath();
    ctx.moveTo(150, 440);
    ctx.lineTo(1050, 440);
    ctx.stroke();

    // Add team logo to the top.
    const logo = new Image();
    logo.addEventListener('load', function() {
    if (team == 'nfl') {
        ctx.drawImage(logo, 515, 125, 170, 200);
    }
    else {
        ctx.drawImage(logo, 500, 125, 200, 200);
    }
    }, false);
    logo.crossOrigin = "Anonymous";
    logo.src = 'logos/' + team + '.webp';
}

// Draw the initial quote with some defaults so it's not a blank page.
window.onload = function() {
    drawImage(
        'nfl', 
        'Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis lacus. In auctor lobortis lacus. Pellentesque dapibus hendrerit tortor. Nam eget dui. Praesent ac sem eget est egestas volutpat.', 
        'statement from the nfl commissioner',
    );
}

function generate_team_quote() {
    // Get the data from the form
    var formData = new FormData(document.querySelector('form#team-quote-form'));
    var team = formData.get('team');
    var quote_text = formData.get('quote-text');
    var attribution_text = formData.get('attr-text');

    // Draw the image with the form data.
    drawImage(team, quote_text, attribution_text);

    // Build the download button.
    var imgName = attribution_text + '-team-quote.png';
    buildDownloadButton(imgName, 'team-quote-generator');
}

