module.exports  =   function(App) {
    
    this.App            =   {},
    
    
    this.get_request    =   function() {
        return this.App.request;
    };
    
    this.get_config     =   function() {
        return this.App.conf;  
    };
    
    this.get_route      =   function() {
        return {
            'module':       this.App.request.module,
            'controller':   this.App.request.cotroller,
            'action':       this.App.request.action
            
        }
    };
    
    this.get_view       =   function() {
        return this.App.view;
    };
    
    this.set_view       =   function(view) {
        this.App.view   =   view;
    };
    
    this.enable_view    =   function() {
        this.App.view.enabled   =   true;
    };
    
    this.disable_view   =   function() {
        this.App.view.enabled   =   false;
    };
    
    this.init_view      =   function() {
        this.set_view(new require(this.App.location + '/core/view.core.js')(App));
    };
    
    this.get_application=   function() {
        return this.App;
    };
        
    this.get_instance   =   function() {
        return this;
    };
    
    this.App            =   App;
    
    return this;
}