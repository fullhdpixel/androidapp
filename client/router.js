if (Meteor.isClient) {
    Router.configure({
        layoutTemplate: 'layout',
        notFoundTemplate: "404"
    });

    Router.map(function() {
        this.route('typography', {
            path: '/'
        });
        this.route('home', {
            path: '/home'
        });
        this.route('blog', {
            path: '/blog'
        });
        this.route('blogsingle', {
            path: '/blogsingle'
        });
        this.route('blogsinglevimeo', {
            path: '/blogsinglevimeo'
        });
        this.route('vimeo', {
            path: '/vimeo'
        });
        this.route('buttons', {
            path: '/buttons'
        });
        this.route('components', {
            path: '/components'
        });
        this.route('contact', {
            path: '/contact'
        });
        this.route('contactiframe', {
            path: '/contactiframe'
        });
        this.route('gallery', {
            path: '/gallery'
        });
        this.route('gallery3', {
            path: '/gallery3'
        });
        this.route('gallery4', {
            path: '/gallery4'
        });
    });
}
