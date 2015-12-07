(function($) {

    // jQuery plugin definition
    $.fn.simpleSlide = function( options) {

        // This is the easiest way to have default options.
        var settings = $.extend({
            // These are the defaults.
            prevContent: '',
            nextContent: '',
            prevNext: false,
            thumbnails: false
        }, options );
 
        var windowWidth = $(this).outerWidth()
        var items = $(this).children().not('ul')
        var itemCount = $(items).length
        var frameWidth = windowWidth * itemCount
        var itemWidth = frameWidth / itemCount
        var navItem = $(this).find('ul li')
        var navItemCount = $(navItem).length

        // Window
        this.each(function() {
            $(items, this).wrapAll('<div class="simpleWindow" style="position:relative; width: 100%; overflow: hidden"><div class="windowFrame">','</div></div>');
            $(items, this).css({
                'width' : itemWidth,
                'position' : 'relative',
                'float' : 'left'
            });
            $('.windowFrame').css('width', frameWidth);
            $(items).first().addClass('active');
        });
        //Move the Frame when class changes.
        $(items).on('newActive', function() {
            var activeItem = $('.active');
            var activeItemIndex = $(activeItem).index()
            var winPosition = itemWidth * activeItemIndex
            $('.windowFrame').css({
                'transform' : 'translate3d(-' + winPosition + 'px' + ',0px, 0px)',
                'transition' : '0.25s'
            })
        });

        if (settings.prevContent){
            var previous = prevContent
        }
        else {
            var previous = '<div class="prev"><span>Prev</span></div>'
        }
        if (settings.nextContent){
            var next = nextContent
        }
        else {
            var next = '<div class="next"><span>Next</span></div>'
        }
        if (!settings.prevNext == false){
            // PRev/Next Nav
            this.each(function() {
                $('<div id="sliderNav">'+previous+next+'</div>').appendTo( '.simpleWindow', this );
                var prevBtn = $('.prev', this)
                var nextBtn = $('.next', this)
                $(prevBtn).click(function () {
                    var activeItem = $('.active');
                    var activeItemIndex = $(activeItem).index()
                    if ( $(items).index(activeItem) !=0 )  {
                        $(activeItem).prev().addClass('active').siblings().removeClass('active').trigger('newActive');
                    }
                });
                $(nextBtn).click(function () {
                    var activeItem = $('.active');
                    var activeItemIndex = $(activeItem).index()
                    if ( $(items).index(activeItem) != ($(items).length - 1) ) {
                        $(activeItem).next().addClass('active').siblings().removeClass('active').trigger('newActive');
                    }
                });
            });
        }

        if (!settings.thumbnails == false){
            // Thumnail Nav
            this.each(function() {
                $(navItem).click(function () {
                    // Add Active class to thumbnail and slide.
                    $(navItem).removeClass("active");
                    $(this).addClass("active"); 
                    // Make it slide
                    var activeFrame = $(items).eq($(this).index())
                    $(activeFrame).addClass('active').siblings().removeClass('active').trigger('newActive');
                });
            });
        }
        
        // allow jQuery chaining
        return this;
    };

})(jQuery);
// USE LIKE THIS
//$("#test-slider").simpleSlide({
//    thumbnails : true,
//    prevNext : true,
//});