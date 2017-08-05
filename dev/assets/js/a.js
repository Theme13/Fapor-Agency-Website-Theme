// init Isotope
var $grid = $('.isotope-grid').isotope({
	itemSelector: '.isotope-grid__item',
	layoutMode: 'fitRows',
	cellsByRow: {
	    columnWidth: 200,
	    rowHeight: 150
	},
});


// bind filter button click
$('#filters').on( 'click', 'li', function() {
	var filterValue = $( this ).attr('data-filter');
	$grid.isotope({ filter: filterValue });
});

// change is-checked class on buttons
$('.isotope-filter').each( function( i, filter ) {
	var $filter = $( filter );
	$filter.on( 'click', 'li', function() {
		$filter.find('.is-checked').removeClass('is-checked');
		$( this ).addClass('is-checked');
	});
});

$('.js-slider-hero').owlCarousel ({
    loop:true,
    margin:10,
    nav:true,
    items:1
});