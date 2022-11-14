function drawImage(team, quote_text, attribution_text, small_text) {
    // Get team data.
    const t = teamData(team);
    const canvas = document.getElementById('simple-team-quote-generator');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    // Background color.
    ctx.fillStyle = t.bg_color;
    ctx.fillRect(0, 0, 1200, 1200);

    // Add large quotes.
    ctx.fillStyle = t.header_color;
    ctx.font = 'bold 240px Gotham, Helvetica Neue, sans-serif';
    let textContainer = document.createElement('span');
    textContainer.innerHTML = '&ldquo;';
    let outputText = textContainer.textContent;
    ctx.fillText(outputText, 500, 350);

    ctx.fillStyle = t.text_color;
    ctx.font = 'bold 240px Gotham, Helvetica Neue, sans-serif';
    textContainer = document.createElement('span');
    textContainer.innerHTML = '&rdquo;';
    outputText = textContainer.textContent;
    ctx.fillText(outputText, 600, 400);

    // Add quote text.
    ctx.fillStyle = t.text_color;
    ctx.textAlign = 'center';
    ctx.font = 'normal 40px Gotham, Helvetica Neue, sans-serif';
    var quote = getLines(ctx, quote_text, 900);
    quote.forEach(function(line, i) {
        ctx.fillText(line, 600, 400+((i)*55),);
    });

    // Add attribution text.
    ctx.textAlign = 'center';
    ctx.fillStyle = t.header_color;
    ctx.font = 'bold 40px Gotham, Helvetica Neue, sans-serif';
    ctx.fillText(attribution_text.toUpperCase(), 600, 900);

    // Add small text.
    ctx.textAlign = 'center';
    ctx.fillStyle = t.text_color;
    ctx.font = 'normal 20px Gotham, Helvetica Neue, sans-serif';
    ctx.fillText(small_text.toUpperCase(), 600, 940);

    // Add bottom colored squares.
    ctx.fillStyle = t.header_color;
    ctx.fillRect(350, 1075, 100, 100);
    ctx.fillRect(750, 1075, 100, 100);

    ctx.fillStyle = t.text_color;
    ctx.fillRect(500, 1075, 70, 100);
    ctx.fillRect(625, 1075, 70, 100);
}

// Draw the initial quote with some defaults so it's not a blank page.
window.onload = function() {
    drawImage(
        'nfl', 
        'Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis lacus. In auctor lobortis lacus. Pellentesque dapibus hendrerit tortor. Nam eget dui. Praesent ac sem eget est egestas volutpat.', 
        'statement from the nfl commissioner',
        'on yet another debacle'
    );
}

function generate_simple_team_quote() {
    // Get the data from the form
    var formData = new FormData(document.querySelector('form#simple-team-quote-form'));
    var team = formData.get('team');
    var quote_text = formData.get('quote-text');
    var attribution_text = formData.get('attr-text');
    var small_text = formData.get('small-text');

    // Draw the image with the form data.
    drawImage(team, quote_text, attribution_text, small_text);

    // Build the download button.
    var imgName = attribution_text + '-team-quote.png';
    buildDownloadButton(imgName, 'simple-team-quote-generator');
}

