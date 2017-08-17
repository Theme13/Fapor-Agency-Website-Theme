$('.counters').each(function () {
    $(this).prop('Counter',0).animate({
        Counter: $(this).text()
    }, {
        duration: 4000,
        easing: 'swing',
        step: function (now) {
            $(this).text(Math.ceil(now));
        }
    });
});

$(".js-open-menu").click(function() {
    $(this).toggleClass('open');
    $('.mobile-nav').toggleClass('open');
    $('body').toggleClass('no-scroll');
});