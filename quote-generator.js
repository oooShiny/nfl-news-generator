function drawImage(team, quote_text, attribution_text, player_img) {
    // Get team data.
    var t = teamData(team);
    const canvas = document.getElementById('quote-generator');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Add player image to left side.
    const img = new Image();
    img.addEventListener('load', function() {
        ctx.drawImage(img, 
            0, 0, // Starting point of cropped image on canvas
            1200, 1200 // Scaled width/height image
            );
        
        // Overlay gradient.
        var gradient = ctx.createLinearGradient(0, 0, 0, 1200);
        gradient.addColorStop(0.25, 'rgb(255, 255, 255, 0)');
        gradient.addColorStop(.75, t.bg_color);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 1200, 1200);
        
        // Draw quote box (white)
        ctx.fillStyle = 'rgb(220, 220, 220)';
        ctx.fillRect(50, 791, 1100, 355);

        // Add quote text.
        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.textAlign = 'center';
        quote_text = '"' + quote_text + '"';
        ctx.font = '40px Verdana';
        var quote = getLines(ctx, quote_text, 800);
        
        quote.forEach(function(line, i) {
            ctx.fillText(line.toUpperCase(), 600, 875+(i*40),);
        });
        
        // Add attribution text.
        ctx.textAlign = 'right';
        ctx.font = '25px Verdana';
        ctx.fillText(attribution_text.toUpperCase(), 1100, 1125);

    }, false);
    if (typeof player_img === 'object') {
        img.src = URL.createObjectURL(player_img);
    }
    else {
        img.src = player_img;
    }
}

window.onload = function() {
    drawImage(
        'nfl', 
        'Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis lacus. In auctor lobortis lacus. Pellentesque dapibus hendrerit tortor. Nam eget dui. Praesent ac sem eget est egestas volutpat.', 
        'attribution text', 
        'test-quote.jpeg'
    );
}

function generate_quote() {
    var formData = new FormData(document.querySelector('form#quote-form'));
    
    var team = formData.get('team');
    var quote_text = formData.get('quote-text');
    var attribution_text = formData.get('attr-text');
    var player_img = formData.get('player-image');

    drawImage(team, quote_text, attribution_text, player_img);
}

function getLines(ctx, text, maxWidth) {
    var words = text.split(" ");
    var lines = [];
    var currentLine = words[0];

    for (var i = 1; i < words.length; i++) {
        var word = words[i];
        var width = ctx.measureText(currentLine + " " + word).width;
        if (width < maxWidth) {
            currentLine += " " + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    lines.push(currentLine);
    return lines;
}

function teamData(team){
    var teams = {
        'nfl': {
            'bg_color': 'rgb(0, 51, 104)',
            'header_color': 'rgb(213, 10, 11)',
            'text_color': 'rgb(255, 255, 255)'
        },
        'arizona-cardinals': {
            'bg_color': 'rgb(151, 35, 63)',
            'header_color': 'rgb(255,182,18)',
            'text_color': 'rgb(255, 255, 255)'
        },
        'atlanta-falcons': {
            'bg_color': 'rgb(0, 0, 0)',
            'header_color': 'rgb(167, 25, 48)',
            'text_color': 'rgb(167, 25, 48)'
        },
        'baltimore-ravens': {
            'bg_color': 'rgb(26, 25, 95)',
            'header_color': 'rgb(158, 124, 12)',
            'text_color': 'rgb(255, 255, 255)'
        },
        'buffalo-bills': {
            'bg_color': 'rgb(0, 51, 141)',
            'header_color': 'rgb(198, 12, 48)',
            'text_color': 'rgb(255, 255, 255)'
        },
        'carolina-panthers': {
            'bg_color': 'rgb(0, 133, 202)',
            'header_color': 'rgb(16, 24, 32)',
            'text_color': 'rgb(191, 192, 191)'
        },
        'chicago-bears': {
            'bg_color': 'rgb(11, 22, 42)',
            'header_color': 'rgb(200, 56, 3)',
            'text_color': 'rgb(255, 255, 255)'
        },
        'cincinnati-bengals': {
            'bg_color': 'rgb(251, 79, 20)',
            'header_color': 'rgb(0, 0, 0)',
            'text_color': 'rgb(255, 255, 255)'
        },
        'cleveland-browns': {
            'bg_color': 'rgb(49, 29, 0)',
            'header_color': 'rgb(255, 60, 0)',
            'text_color': 'rgb(255, 255, 255)'
        },
        'dallas-cowboys': {
            'bg_color': 'rgb(0, 34, 68)',
            'header_color': 'rgb(134, 147, 151)',
            'text_color': 'rgb(255, 255, 255)'
        },
        'denver-broncos': {
            'bg_color': 'rgb(0, 34, 68)',
            'header_color': 'rgb(251, 79, 20)',
            'text_color': 'rgb(255, 255, 255)'
        },
        'detroit-lions': {
            'bg_color': 'rgb(0, 118, 182)',
            'header_color': 'rgb(0, 0, 0)',
            'text_color': 'rgb(176, 183, 188)'
        },
        'green-bay-packers': {
            'bg_color': 'rgb(24, 48, 40)',
            'header_color': 'rgb(255, 184, 28)',
            'text_color': 'rgb(255, 255, 255)'
        },
        'houston-texans': {
            'bg_color': 'rgb(3, 32, 47)',
            'header_color': 'rgb(167, 25, 48)',
            'text_color': 'rgb(255, 255, 255)'
        },
        'indianapolis-colts': {
            'bg_color': 'rgb(0, 44, 95)',
            'header_color': 'rgb(162, 170, 173)',
            'text_color': 'rgb(255, 255, 255)'
        },
        'jacksonville-jaguars': {
            'bg_color': 'rgb(0, 103, 120)',
            'header_color': 'rgb(215, 162, 42)',
            'text_color': 'rgb(255, 255, 255)'
        },
        'kansas-city-chiefs': {
            'bg_color': 'rgb(227, 24, 55)',
            'header_color': 'rgb(255, 184, 28)',
            'text_color': 'rgb(255, 255, 255)'
        },
        'las-vegas-raiders': {
            'bg_color': 'rgb(0, 0, 0)',
            'header_color': 'rgb(165, 172, 175)',
            'text_color': 'rgb(255, 255, 255)'
        },
        'los-angeles-chargers': {
            'bg_color': 'rgb(0, 128, 198)',
            'header_color': 'rgb(255, 194, 14)',
            'text_color': 'rgb(255, 255, 255)'
        },
        'los-angeles-rams': {
            'bg_color': 'rgb(0, 53, 148)',
            'header_color': 'rgb(255, 209, 0)',
            'text_color': 'rgb(255, 255, 255)'
        },
        'miami-dolphins': {
            'bg_color': 'rgb(0, 142, 151)',
            'header_color': 'rgb(252, 76, 2)',
            'text_color': 'rgb(255, 255, 255)'
        },
        'minnesota-vikings': {
            'bg_color': 'rgb(79, 38, 131)',
            'header_color': 'rgb(255, 198, 47)',
            'text_color': 'rgb(255, 255, 255)'
        },
        'new-england-patriots': {
            'bg_color': 'rgb(0, 34, 68)',
            'header_color': 'rgb(198, 12, 48)',
            'text_color': 'rgb(255, 255, 255)'
        },
        'new-orleans-saints': {
            'bg_color': 'rgb(211, 188, 141)',
            'header_color': 'rgb(0, 0, 0)',
            'text_color': 'rgb(0, 0, 0)'
        },
        'new-york-giants': {
            'bg_color': 'rgb(1, 35, 82)',
            'header_color': 'rgb(163, 13, 45)',
            'text_color': 'rgb(255, 255, 255)'
        },
        'new-york-jets': {
            'bg_color': 'rgb(18, 87, 64)',
            'header_color': 'rgb(255, 255, 255)',
            'text_color': 'rgb(255, 255, 255)'
        },
        'philadelphia-eagles': {
            'bg_color': 'rgb(0, 76, 84)',
            'header_color': 'rgb(165, 172, 175)',
            'text_color': 'rgb(255, 255, 255)'
        },
        'pittsburgh-steelers': {
            'bg_color': 'rgb(0, 0, 0)',
            'header_color': 'rgb(255, 182, 18)',
            'text_color': 'rgb(255, 255, 255)'
        },
        'san-francisco-49ers': {
            'bg_color': 'rgb(170, 0, 0)',
            'header_color': 'rgb(173, 153, 93)',
            'text_color': 'rgb(255, 255, 255)'
        },
        'seattle-seahawks': {
            'bg_color': 'rgb(0, 34, 68)',
            'header_color': 'rgb(105, 190, 40)',
            'text_color': 'rgb(255, 255, 255)'
        },
        'tampa-bay-buccaneers': {
            'bg_color': 'rgb(213, 10, 10)',
            'header_color': 'rgb(0, 0, 0)',
            'text_color': 'rgb(255, 255, 255)'
        },
        'tennessee-titans': {
            'bg_color': 'rgb(12, 35, 64)',
            'header_color': 'rgb(75, 146, 219)',
            'text_color': 'rgb(255, 255, 255)'
        },
        'washington-commanders': {
            'bg_color': 'rgb(90, 20, 20)',
            'header_color': 'rgb(255, 182, 18)',
            'text_color': 'rgb(255, 255, 255)'
        }
    }
    return teams[team];
}