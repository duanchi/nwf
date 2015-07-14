module.exports  =   function(App) {
    
    this.App        =   App;
    
    this.__instance =   require(this.App.location + '/modules/' + this.App.request.module + '/' + this.App.request.controller + '.controller.js');
    
    this.run_action =   function(action_name) {
        console.log('run [' + this.App.request.action + '] action !!!');
        return eval('this.__instance.___' + action_name + '(App.request.map)');
    }
                    
    this.get_request=   function() {
        return this.App.request;
    }
    
    
    
    
    
    if (typeof(this.__instance.__init) == 'function') {
        this.__instance.__init();
        console.log('run [' + this.App.request.module + '/' + this.App.request.controller + '] controller !!!');
    }
    
    return this;
}