/**
 * 
 * bootstrap.core.js
 * Static Class
 * 
 */
module.exports  =   {
    
    /* Properties */
    
    
    
    App:                {},
    
    
    /* Public Functions */
    
    /**

    Function bootstrap.init(App);

    **/
    
    init:               function(App, Plugin) {
        
        this.__init_route(App);
        
        App.dispatcher   =   {};
    
        App.conf.application['plugin-path'];
        
        this.__init_dispatcher(App);
        
        this.App        =   App;
        
    },
    
    
    /**

    Function bootstrap.run();

    **/
    run:                function() {
        var instance    =   require(this.App.location + '/core/controller.core.js')(this.App);
        var show_view   =   instance.run_action(this.App.request.action);
        
        this.__init_view(show_view);
        
        if (show_view == true) {
            this.App.dispatcher.get_view().render();
        }
        
        console.log('Running!');
    },
    
    
    
    
    /* Private Functions */
    
    
    /**

    Function bootstrap.__init_route(App);

    **/
    __init_route:       function(App) {
        
        //match route config with App.request.
        
        if (('routes' in App.conf)) {
            
            match_route:
            for (key in App.conf.routes) {
                
                switch (App.conf.routes[key].type) {
                    
                    case 'regex':
                        var match           =   App.request['routed-uri'].match(App.conf.routes[key].match);
                        
                        if (match == null) break;
                        
                        if ('regex-map' in App.conf.routes[key]) {
                            var map         =   {};
                            console.log(JSON.stringify(App.conf.routes[key]['regex-map']));
                            for (map_key in App.conf.routes[key]['regex-map']) {
                                map[App.conf.routes[key]['regex-map'][map_key]] =   match[map_key.replace('$', '')];
                            }
                            
                            App.request.map =   map;
                        }
                        
                        
                        break match_route;
                        
                    case 'static':
                        
                        
                        break match_route;
                        
                }
                
            }
        }
        
    
        var mvc_obj                 =   App.request.route.split('/', 3);
        var tmp_mvc                 =   {
            module:                 '',
            controller:             '',
            action:                 ''
        };
        
        switch (mvc_obj.length) {
            case 3: //has m c a

            case 2: //has c a
            tmp_mvc.action          =   mvc_obj.pop();                

            case 1: //has c
            tmp_mvc.controller      =   mvc_obj.pop();

            default:
            if (mvc_obj.length != 0) {
                tmp_mvc.module      =   mvc_obj.pop();
            }
        }
        
        App.request.module          =   (tmp_mvc.module == '' ? (('modules' in App.conf.application) && typeof(App.conf.application.modules) == 'object' ? 'index' : App.conf.application.modules[0]) : tmp_mvc.module);
        App.request.controller      =   (tmp_mvc.controller == '' ? 'index' : tmp_mvc.controller);
        App.request.action          =   (tmp_mvc.action == '' ? 'index' : tmp_mvc.action);
    },
    
    
    
    __init_dispatcher: function(App) {
        
        App.dispatcher              =   new require(App.location + '/core/dispatcher.core.js')(App);
        

    },
    
    
    
    __init_view:        function(show_view) {
        
        if (show_view == true) {
            
            this.App.dispatcher.enable_view();
            App.dispatcher.init_view();
            
        } else {
            
            this.App.dispatcher.disable_view();
            
        }
        
    }
    
    /* Construct Function Start */
    
    
    
    /* Construct Function End */
}