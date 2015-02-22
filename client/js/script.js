if (Meteor.isClient) {
    Meteor.startup(function() {
        var touchSupport = false;
        var eventClick = 'click';
        var eventHover = 'mouseover mouseout';

        (function() {
            if ('ontouchstart' in document.documentElement) {
                $('html').addClass('touch');
                touchSupport = true;
                eventClick = 'touchon touchend';
                eventHover = 'touchstart touchend';
            } else {
                $('html').addClass('no-touch');
            }
        })();

        window.addEventListener('load', function() {
            if (!window.pageYOffset) {
                hideAddressBar();
            }
        });
    });

    Template.layout.events({
        'click #menutrigger': function(event) {
            $('#content-container').toggleClass('active');
            $('#sidemenu').toggleClass('active');
            setTimeout(function() {
                $('#sidemenu-container').toggleClass('active');
            }, 500);
        }
    });

    Template.body.events({
        'swiperight': function(event) {
            $('#content-container').addClass('active');
            $('#sidemenu').addClass('active');
            setTimeout(function() {
                $('#sidemenu-container').addClass('active');
            }, 500);
        },
        'swipeleft': function(event) {
            $('#content-container').removeClass('active');
            $('#sidemenu').removeClass('active');
            setTimeout(function() {
                $('#sidemenu-container').removeClass('active');
            }, 500);
        },
        'click .alert-box, click .close': function(event) {
            event.preventDefault();
            var $this = $(event.target);
            var $parent = $this.parent('.alert-box');
            $parent.fadeOut(500);
            setTimeout(function() {
                $parent.hide(0);
            }, 500);
        },
        'click #ps-custom-back': function(event) {
            var $this = $(event.target);
            console.log($this);

            if ($('html').hasClass('no-csstransforms')) {
                $this.hide();
            } else {
                $('.ps-caption').removeClass('active');
                $('.ps-toolbar').removeClass('active');
                setTimeout(function() {
                    $('.ps-document-overlay').removeClass('active');
                    $('.ps-document-overlay').addClass('unload');
                    $('.ps-carousel').removeClass('active');
                    setTimeout(function() {
                        $this.hide();
                    }, 400);
                }, 400);
            }
        }
    });

    Template.navbar.events({
        'click .nav-child-container': function(event) {
            event.preventDefault();
            var $this = $(event.target);
            var ul = $this.next('ul');
            var ulChildrenHeight = ul.children().length *  46;

            if (!$this.hasClass('active')) {
                $this.toggleClass('active');
                ul.toggleClass('active');
                ul.height(ulChildrenHeight + 'px');
            } else {
                $this.toggleClass('active');
                ul.toggleClass('active');
                ul.height(0);
            }
        }
    });

    Template.gallery.rendered = function() {
        initPhotoswipe();
    };
    Template.gallery3.rendered = function() {
        initPhotoswipe();
    };
    Template.gallery4.rendered = function() {
        initPhotoswipe();
    };

    Template.body.rendered = function() {
        $('body').hammer({
            drag_min_distance: 1,
            swipe_velocity: 0.1
        });

        var $navItems = $('.nav ul li a');

        $navItems.each(function(index) {
            if ($(this).hasClass('current')) {
                $parentUl = $(this).parent().parent();
                $parentUl.height($parentUl.children('li').length * 46 + "px");
                $parentUl.prev().addClass('active');
                $parentUl.addClass('active');
                $anchor = $parentUl.prev();
                $anchor.children('.nav-child-container').addClass('active');
            }
        });

        var $flexsliderContainer = $('.flexslider');

        if ($flexsliderContainer.length > 0) {
            $flexsliderContainer.flexslider({
                controlsContainer: ".flexslider-controls",
                prevText: '<span class="icon-left-open-big"></span>',
                nextText: '<span class="icon-right-open-big"></span>',
                slideshowSpeed: 5000,
                animationSpeed: 600,
                slideshow: true,
                smoothHeight: false,
                animationLoop: true,
            });
        }
        $('form').h5Validate();
    }

    function initPhotoswipe() {
        var photoswipeContainer = '.photoswipe a';

        if ($(photoswipeContainer).length > 0) {
            (function(window, $, PhotoSwipe) {

                $(document).ready(function() {

                    var options = {

                        /* Customizing toolbar */

                        getToolbar: function() {
                            return '<div class="ps-toolbar-previous icon-left-open"></div>' + '<div class="ps-toolbar-play icon-play"></div>' + '<div class="ps-toolbar-next icon-right-open"></div>';
                        },

                        getImageCaption: function(el) {
                            var captionText, captionEl, captionBack;

                            /* Get the caption from the alt tag */

                            if (el.nodeName === "IMG") {
                                captionText = el.getAttribute('alt');
                            }

                            var i, j, childEl;
                            for (i = 0, j = el.childNodes.length; i < j; i++) {
                                childEl = el.childNodes[i];
                                if (el.childNodes[i].nodeName === 'IMG') {
                                    captionText = childEl.getAttribute('alt');
                                }
                            }

                            /* Return a DOM element with custom styling */

                            captionBack = document.createElement('a');
                            captionBack.setAttribute('id', 'ps-custom-back');
                            captionBack.setAttribute('class', 'icon-cancel-1');

                            captionEl = document.createElement('div');
                            captionEl.appendChild(captionBack);

                            captionBack = document.createElement('span');
                            captionBack.innerHTML = captionText;
                            captionEl.appendChild(captionBack);
                            return captionEl;
                        },

                        enableMouseWheel: false,
                        captionAndToolbarOpacity: 1,
                    }

                    /* Creating Photoswipe instance */

                    var instance = PhotoSwipe.attach(window.document.querySelectorAll(photoswipeContainer), options);

                    /* Adding listener to custom back button */

                    instance.addEventHandler(PhotoSwipe.EventTypes.onShow, function(e) {
                        $('.ps-caption').addClass('active');
                        $('.ps-toolbar').addClass('active');
                        $('.ps-document-overlay').addClass('active');
                        $('.ps-carousel').addClass('active');
                    });

                    instance.addEventHandler(PhotoSwipe.EventTypes.onSlideshowStart, function(e) {
                        $('.ps-toolbar-play').removeClass('icon-play');
                        $('.ps-toolbar-play').addClass('icon-pause');
                        $('.ps-toolbar-play').addClass('hover');
                    });

                    instance.addEventHandler(PhotoSwipe.EventTypes.onSlideshowStop, function(e) {
                        $('.ps-toolbar-play').removeClass('icon-pause');
                        $('.ps-toolbar-play').addClass('icon-play');
                        $('.ps-toolbar-play').removeClass('hover');
                    });

                }, false);

            }(window, window.jQuery, window.Code.PhotoSwipe));
        }
    }

    function hideAddressBar() {
        if (!window.location.hash) {
            if (document.documentElement.scrollHeight < window.outerHeight) {

                /* Expands Page Height if it's smaller than window */

                document.body.style.minHeight = (window.outerHeight + 60) + 'px';
                document.getElementById('container').style.minHeight = (window.outerHeight + 60) + 'px';
                document.getElementById('content-container').style.minHeight = (window.outerHeight + 60) + 'px';
            }

            setTimeout(function() {
                window.scrollTo(0, 1);
            }, 0);
        }
    }

    Session.set("Mongol", {
        'collections': ['List', 'Your', 'Collections'],
        'display': false,
        'opacity_normal': ".7",
        'opacity_expand': ".9",
        'disable_warning': 'true'
    });
};
