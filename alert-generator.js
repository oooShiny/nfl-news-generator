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
        var h = canvas.height;
        var w = img.naturalWidth * ratio;
        var shift = (665/2) - (w/2);
        ctx.drawImage(img, 
            shift, 0, // Starting point of cropped image on canvas
            w, 1200 // Scaled width/height image
            );

        // Draw right hand background.
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
        ctx.fillStyle = t.header_color;
        ctx.font = '70px Verdana';
        header.forEach(function(line, i) {
            ctx.fillText(line.toUpperCase(), 700, 815+(i*80),);
        });
        

        // Add bottom text.
        var bottom = getLines(ctx, bottom_text, 480);
        ctx.fillStyle = t.text_color;
        ctx.font = 'lighter 50px Verdana';
        bottom.forEach(function(line, i) {
            ctx.fillText(line.toUpperCase(), 700, 1015+(i*80),);
        });

        // Add team logo to the top right.
        ctx.shadowColor = 'rgb(0, 0, 0, .5)';
        ctx.shadowOffsetX = -25;
        ctx.shadowOffsetY = 25;
        ctx.shadowBlur = 10;
        const logo = new Image();   // Create new img element
        logo.addEventListener('load', function() {
            if (team == 'nfl') {
                ctx.drawImage(logo, 600, -150, canvas.width/2.5, canvas.height/2);
            }
            else {
                ctx.drawImage(logo, 550, -100, canvas.width/2, canvas.height/2);
            }
        }, false);
        logo.src = 'logos/' + team + '.webp';
    }, false);
    if (typeof player_img === 'object') {
        img.src = URL.createObjectURL(player_img);
    }
    else {
        img.src = player_img;
    }
    

    


    // const url = document.getElementById('img-url');
    // url.innerText = canvas.toDataURL();

}

window.onload = function() {
    var player_img = new Image();
    player_img.addEventListener('load', function() {}, false);
    player_img.src = 'baker.jpeg';
    drawImage('nfl','ALERT', 'header text', 'bottom text', 'baker.jpeg');
    
}

function generate_alert() {
    var formData = new FormData(document.querySelector('form#alert-form'));
    
    var team = formData.get('team');
    var alert_text = formData.get('alert-text');
    var header_text = formData.get('header-text');
    var bottom_text = formData.get('bottom-text');
    var player_img = formData.get('player-image');

    drawImage(team, alert_text, header_text, bottom_text, player_img);
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