$(document).ready(function() {
    var background = chrome.extension.getBackgroundPage();

    background.transfer;

    // This is an array of total hits
    var totalHits = background.categoryHits;
    var total = 0;
    for (var i in totalHits) {
        total += totalHits[i];
    }

    var entertainPercent = 100* (totalHits[0] / total);
    var educationPercent = 100* (totalHits[1] / total);
    var socialPercent = 100* (totalHits[2] / total);
    
    
    removeViewClasses('#entertainment');
    removeViewClasses('#education');
    removeViewClasses('#social');

    computeFrequency(entertainPercent, educationPercent, socialPercent);



    $('.interactive-slide span').hover(function() {
        var isHigh = $(this).hasClass('high');
        var isMedium = $(this).hasClass('medium');
        
        var totalPercent = Math.floor($(this).data("percent"));

        // If the skill is high, then turn the background to green and put the width to 100%
        if (isHigh) {
            $(this).css('background-color','#00C957').animate({
                width: totalPercent+'%'
            }, 'slow').html(totalPercent+'%')
        } else if (isMedium) {
            $(this).css('background-color','#FFA500').animate({
                width: totalPercent+'%'
            }, "slow").html(totalPercent+'%');
        } else {
            $(this).css('background-color','#1E90FF').animate({
                width: totalPercent+'%'
            }, "slow").html(totalPercent+'%');
        }
    });

});

function removeViewClasses(id) {
    $(id).removeClass('high low medium');
}

function computeFrequency(ent, edu, soc) {
    addFrequency(ent, "#entertainment");
    addFrequency(edu, "#education");
    addFrequency(soc, "#social");
}

function addFrequency(percent, id) {
    if (percent > 80) {
        $(id).addClass('high').data("percent", percent);
    }
    else if (percent > 50) {
        $(id).addClass('medium').data("percent", percent);
    }
    else {
        $(id).addClass('low').data("percent", percent);
    }
}