/**

Class Core App;

**/
module.exports  =   function (request, location) {
    
    

    /* Properties */

    //app location
    this.root_path          =   (location == '' ? '.' : location);
    
    this.location           =   this.root_path + '/app';
    
    this.__conf_path        =   this.location + '/conf';

    //app config
    this.conf               =   require(this.__conf_path + '/app.conf.json');
    
    this.CONST              =   require(this.__conf_path + '/const.conf.json');

    this.Node               =   {};

    //app request
    this.request            =   {
        'version':          CONST.HTTP.VERSION._11,
        'request-uri':      request.url,
        'routed-uri':       '',
        'scheme':           CONST.NET.SCHEME.HTTP,
        'host':             '',
        'socket':           '',
        'path':             '',
        'script-file':      '',
        'query-string':     '',
        'route':            '',
        'map':              {},
        'method':           CONST.HTTP.METHOD.GET,
        'AUTH':             {},
        'HEADER':           {},
        'COOKIE':           {},
        'SESSION':          {},
        'GET':              {},
        'POST':             {},
        'data':             ''
    };
    

    this.bootstrap          =   require(this.location + '/core/bootstrap.core.js');
    
    this.dispatcher         =   {};
    
    this.view               =   {};
    
    
    /* Public Functions */
    
    
    this.get_conf_path      =   function() {
        return this.__conf_path;  
    };
    
    
    /* Private Functions */
    
    this.__init_Node_module =   function() {
        
        if (this.conf['node-module'] != undefined) {
            for (key in this.conf['node-module']) {
                this.Node[this.conf['node-module'][key]]  =   require(this.conf['node-module'][key]);
            }
        }
        
        global.Node         =   this.Node;
    };
    
    this.__init_CONST       =   function() {
    
    /* Define Global Constants */
        
        global.CONST        =   this.CONST;
        
    };
    
    
    this.__init_request     =   function(request) {
        
        var url_object              =   Node.url.parse(request.url);
        if (url_object.query == null) url_object.query    =   '&';
        var url_scheme              =   url_object.protocol.trim(':').toUpperCase();
        var http_method             =   request.method.toUpperCase();
        var query_obj               =   url_object.query.split('&', 2);
        
        this.request.version        =   request.version;
        this.request.scheme         =   (undefined == CONST.NET.SCHEME[url_scheme] ? CONST.NET.SCHEME.UNKNOW : CONST.NET.SCHEME[url_scheme]);
        this.request.host           =   url_object.host;
        this.request.socket         =   url_object.port;
        this.request.path           =   Node.path.dirname(url_object.pathname);
        this.request['script-file'] =   Node.path.basename(url_object.pathname);
        
        this.request.module         =   '';
        this.request.controller     =   '';
        this.request.action         =   '';
        
        if (query_obj[0].search('=') == -1) {
            this.request.route      =   query_obj.shift();
        }
        
        if ( undefined != query_obj) {
            this.request['query-string']    =   query_obj.shift();
            this.request.GET        =   Node.querystring.parse(this.request['query-string']);
        }
        
        this.request['routed-uri']  =   '/' + this.request.route + '?' + this.request['query-string'];
        this.request.method         =   (undefined == CONST.HTTP.METHOD[http_method] ? CONST.HTTP.METHOD.GET : CONST.HTTP.METHOD[http_method]);
        
        if (this.request.method == CONST.HTTP.METHOD.POST || this.request.method == CONST.HTTP.METHOD.PUT) {
            this.request.POST       =   Node.querystring.parse(request.data);
        }
        
        this.request.data           =   request.data;
        
    };
    
    
    
    
    /* Construct Function Start */
    
    this.__init_Node_module();
    this.__init_CONST();
    this.__init_request(request);
    
    
    /* Init bootstrap with bootstrap Plugin Hooks */
    this.bootstrap.init(this, require(this.location + '/' + this.conf.application['bootstrap-file']));
    
    
    
    /* Construct Function End */
    
    
    return this;
}