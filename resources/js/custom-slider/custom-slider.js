function collision($div1, $div2) {
    var x1 = $div1.offset().left;
    var w1 = 40;
    var r1 = x1 + w1;
    var x2 = $div2.offset().left;
    var w2 = 40;
    var r2 = x2 + w2;

    if (r1 < x2 || x1 > r2) return false;
    return true;

}

/* RATING SLIDER */

$('#rating-slider').slider({
    range: true,
    min: 0,
    max: 5,
    values: [0, 2],
    slide: function (event, ui) {

        $('.ui-slider-handle:eq(0) .rating-range-min').html(ui.values[0]);
        $('.ui-slider-handle:eq(1) .rating-range-max').html(ui.values[1]);
        $('.rating-range-both').html('<i>' + ui.values[0] + ' - </i>' + ui.values[1]);

        if (ui.values[0] == ui.values[1]) {
            $('.rating-range-both i').css('display', 'none');
        } else {
            $('.rating-range-both i').css('display', 'inline');
        }

        if (collision($('.rating-range-min'), $('.rating-range-max')) == true) {
            $('.rating-range-min, .rating-range-max').css('opacity', '0');
            $('.rating-range-both').css('display', 'block');
        } else {
            $('.rating-range-min, .rating-range-max').css('opacity', '1');
            $('.rating-range-both').css('display', 'none');
        }

    }
});

$('.ui-slider-handle:eq(0)').append('<span class="rating-range-min thumb">' + $('#rating-slider').slider('values', 0) + '</span>');
$('.ui-slider-handle:eq(1)').append('<span class="rating-range-max thumb">' + $('#rating-slider').slider('values', 1) + '</span>');


/* PRICE SLIDER */

$('#price-slider').slider({
    range: true,
    min: 0,
    max: 1000,
    values: [87, 822],
    slide: function (event, ui) {

        $('.ui-slider-handle:eq(2) .price-range-min').html(ui.values[0]);
        $('.ui-slider-handle:eq(3) .price-range-max').html(ui.values[1]);
        $('.price-range-both').html('<i>' + ui.values[0] + ' - </i>' + ui.values[1]);

        //

        if (ui.values[0] == ui.values[1]) {
            $('.price-range-both i').css('display', 'none');
        } else {
            $('.price-range-both i').css('display', 'inline');
        }

        //

        if (collision($('.price-range-min'), $('.price-range-max')) == true) {
            $('.price-range-min, .price-range-max').css('opacity', '0');
            $('.price-range-both').css('display', 'block');
        } else {
            $('.price-range-min, .price-range-max').css('opacity', '1');
            $('.price-range-both').css('display', 'none');
        }

    }
});

$('.ui-slider-handle:eq(2)').append('<span class="price-range-min thumb">' + $('#price-slider').slider('values', 0) + '</span>');
$('.ui-slider-handle:eq(3)').append('<span class="price-range-max thumb">' + $('#price-slider').slider('values', 1) + '</span>');

