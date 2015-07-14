module.exports  =   function(App) {
    
    this.__instance     =   require(App.location + '/' + App.conf.application.view.engine);
    this.__data         =   {};
    this.__template_file=   '';
    this.__output_buffer=   '';
    
    this.App            =   App;
    
    this.enable         =   true;
    
    
    
    this.assign         =   function(key, value) {
        this.__data[key]=   value;
    };
    
    this.display        =   function() {
        
        var source      =   Node.fs.readFileSync(this.__template_file, "utf-8");
        var template    =   this.__instance.compile(source);
        this.__output_buffer    =   template(this.__data);
        
        switch (this.App.conf.application.view['display-type']){
            
            case 'dom':
                window.document.write(this.__output_buffer);
                break;
                
            default:
                Node.process.stdout.write(this.__output_buffer);
        }
    };
    
    this.render         =   function() {
        if (this.enable == true) {
            this.display();
        }
    };
    
    this.set_template_file  =   function(file_name) {
        this.__template_file=   file_name;
    };
    
    this.__init         =   function() {
        
        this.set_template_file(this.App.location + '/' + this.App.conf.application.view.path + '/' + this.App.request.module + '/' + this.App.request.controller + '/' + this.App.request.action + this.App.conf.application.view.suffix);
        
        this.__set_inital_define();
    };
    
    
    this.__set_inital_define    =   function() {
        
        this.assign('__APP', {
            'request':  this.App.request,
            'root':     this.App.root_path
        });
        
        //this.assign('__resource_path', 'http://dashboard.devel/assets');
        this.assign('__resource_path', this.App.root_path + '/assets');
        
        
    };
    
    
    this.__init();
    
    return this;
}