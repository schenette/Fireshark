// Tautologistics htmlparser
(function(){
    function e(a,c){
        this._options=c?c:{};

        if(this._options.includeLocation==undefined)this._options.includeLocation=false;
        this.validateHandler(a);
        this._handler=a;
        this.reset()
        }
        function n(a){
        n.super_.call(this,a,{
            ignoreWhitespace:true,
            verbose:false,
            enforceEmptyTags:false
        })
        }
        function i(a,c){
        this.reset();
        this._options=c?c:{};

        if(this._options.ignoreWhitespace==undefined)this._options.ignoreWhitespace=false;
        if(this._options.verbose==undefined)this._options.verbose=true;
        if(this._options.enforceEmptyTags== undefined)this._options.enforceEmptyTags=true;
        if(typeof a=="function")this._callback=a
            }
            if(!(typeof require=="function"&&typeof exports=="object"&&typeof module=="object"&&typeof __filename=="string"&&typeof __dirname=="string")){
        if(this.Tautologistics){
            if(this.Tautologistics.NodeHtmlParser)return
        }else this.Tautologistics={};

        this.Tautologistics.NodeHtmlParser={};

        exports=this.Tautologistics.NodeHtmlParser
        }
        var d={
        Text:"text",
        Directive:"directive",
        Comment:"comment",
        Script:"script",
        Style:"style",
        Tag:"tag"
    };
    e._reTrim=/(^\s+|\s+$)/g;
    e._reTrimComment=/(^\!--|--$)/g;
    e._reWhitespace=/\s/g;
    e._reTagName=/^\s*(\/?)\s*([^\s\/]+)/;
    e._reAttrib=/([^=<>\"\'\s]+)\s*=\s*"([^"]*)"|([^=<>\"\'\s]+)\s*=\s*'([^']*)'|([^=<>\"\'\s]+)\s*=\s*([^'"\s]+)|([^=<>\"\'\s\/]+)/g;
    e._reTags=/[\<\>]/g;
    e.prototype.parseComplete=function(a){
        this.reset();
        this.parseChunk(a);
        this.done()
        };

    e.prototype.parseChunk=function(a){
        this._done&&this.handleError(Error("Attempted to parse chunk after parsing already done"));
        this._buffer+=a;
        this.parseTags()
        };
    e.prototype.done=function(){
        if(!this._done){
            this._done=true;
            if(this._buffer.length){
                var a=this._buffer;
                this._buffer="";
                a={
                    raw:a,
                    data:this._parseState==d.Text?a:a.replace(e._reTrim,""),
                    type:this._parseState
                    };

                if(this._parseState==d.Tag||this._parseState==d.Script||this._parseState==d.Style)a.name=this.parseTagName(a.data);
                this.parseAttribs(a);
                this._elements.push(a)
                }
                this.writeHandler();
            this._handler.done()
            }
        };

e.prototype.reset=function(){
    this._buffer="";
    this._done=false;
    this._elements=[];
    this._next=this._current= this._elementsCurrent=0;
    this._location={
        row:0,
        col:0,
        charOffset:0,
        inBuffer:0
    };

    this._parseState=d.Text;
    this._prevTagSep="";
    this._tagStack=[];
    this._handler.reset()
    };

e.prototype._options=null;
e.prototype._handler=null;
e.prototype._buffer=null;
e.prototype._done=false;
e.prototype._elements=null;
e.prototype._elementsCurrent=0;
e.prototype._current=0;
e.prototype._next=0;
e.prototype._location=null;
e.prototype._parseState=d.Text;
e.prototype._prevTagSep="";
e.prototype._tagStack=null;
e.prototype.parseTagAttribs= function(a){
    for(var c=a.length,b=0;b<c;){
        var h=a[b++];
        if(h.type==d.Tag||h.type==d.Script||h.type==d.style)this.parseAttribs(h)
            }
            return a
    };

e.prototype.parseAttribs=function(a){
    if(!(a.type!=d.Script&&a.type!=d.Style&&a.type!=d.Tag)){
        var c=a.data.split(e._reWhitespace,1)[0];
        c=a.data.substring(c.length);
        if(!(c.length<1)){
            var b;
            for(e._reAttrib.lastIndex=0;b=e._reAttrib.exec(c);){
                if(a.attribs==undefined)a.attribs={};

                if(typeof b[1]=="string"&&b[1].length)a.attribs[b[1]]=b[2];
                else if(typeof b[3]=="string"&& b[3].length)a.attribs[b[3].toString()]=b[4].toString();
                else if(typeof b[5]=="string"&&b[5].length)a.attribs[b[5]]=b[6];
                else if(typeof b[7]=="string"&&b[7].length)a.attribs[b[7]]=b[7]
                    }
                }
        }
};

e.prototype.parseTagName=function(a){
    if(a==null||a=="")return"";
    a=e._reTagName.exec(a);
    if(!a)return"";
    return(a[1]?"/":"")+a[2]
    };

e.prototype.parseTags=function(){
    for(var a=this._buffer.length-1;e._reTags.test(this._buffer);){
        this._next=e._reTags.lastIndex-1;
        var c=this._buffer.charAt(this._next),b=this._buffer.substring(this._current, this._next);
        b={
            raw:b,
            data:this._parseState==d.Text?b:b.replace(e._reTrim,""),
            type:this._parseState
            };

        var h=this.parseTagName(b.data);
        if(this._tagStack.length)if(this._tagStack[this._tagStack.length-1]==d.Script)if(h=="/script")this._tagStack.pop();
            else{
            if(b.raw.indexOf("!--")!=0){
                b.type=d.Text;
                if(this._elements.length&&this._elements[this._elements.length-1].type==d.Text){
                    var g=this._elements[this._elements.length-1];
                    g.raw=g.data=g.raw+this._prevTagSep+b.raw;
                    b.raw=b.data=""
                    }
                }
        }else if(this._tagStack[this._tagStack.length- 1]==d.Style)if(h=="/style")this._tagStack.pop();
        else{
        if(b.raw.indexOf("!--")!=0){
            b.type=d.Text;
            if(this._elements.length&&this._elements[this._elements.length-1].type==d.Text){
                g=this._elements[this._elements.length-1];
                if(b.raw!=""){
                    g.raw=g.data=g.raw+this._prevTagSep+b.raw;
                    b.raw=b.data=""
                    }else g.raw=g.data=g.raw+this._prevTagSep
                    }else if(b.raw!="")b.raw=b.data=b.raw
                }
            }else if(this._tagStack[this._tagStack.length-1]==d.Comment){
        g=b.raw.length;
        if(b.raw.charAt(g-2)=="-"&&b.raw.charAt(g-1)=="-"&&c==">"){
            this._tagStack.pop();
            if(this._elements.length&&this._elements[this._elements.length-1].type==d.Comment){
                g=this._elements[this._elements.length-1];
                g.raw=g.data=(g.raw+b.raw).replace(e._reTrimComment,"");
                b.raw=b.data="";
                b.type=d.Text
                }else b.type=d.Comment
                }else{
            b.type=d.Comment;
            if(this._elements.length&&this._elements[this._elements.length-1].type==d.Comment){
                g=this._elements[this._elements.length-1];
                g.raw=g.data=g.raw+b.raw+c;
                b.raw=b.data="";
                b.type=d.Text
                }else b.raw=b.data=b.raw+c
                }
            }
    if(b.type==d.Tag){
    b.name=h;
    if(b.raw.indexOf("!--")== 0){
        b.type=d.Comment;
        delete b.name;
        g=b.raw.length;
        if(b.raw.charAt(g-1)=="-"&&b.raw.charAt(g-2)=="-"&&c==">")b.raw=b.data=b.raw.replace(e._reTrimComment,"");
        else{
            b.raw+=c;
            this._tagStack.push(d.Comment)
            }
        }else if(b.raw.indexOf("!")==0||b.raw.indexOf("?")==0)b.type=d.Directive;
else if(b.name=="script"){
    b.type=d.Script;
    b.data.charAt(b.data.length-1)!="/"&&this._tagStack.push(d.Script)
    }else if(b.name=="/script")b.type=d.Script;
else if(b.name=="style"){
    b.type=d.Style;
    b.data.charAt(b.data.length-1)!="/"&& this._tagStack.push(d.Style)
    }else if(b.name=="/style")b.type=d.Style;
if(b.name&&b.name.charAt(0)=="/")b.data=b.name
    }
    if(b.raw!=""||b.type!=d.Text){
    if(this._options.includeLocation&&!b.location)b.location=this.getLocation(b.type==d.Tag);
    this.parseAttribs(b);
    this._elements.push(b);
    b.type!=d.Text&&b.type!=d.Comment&&b.type!=d.Directive&&b.data.charAt(b.data.length-1)=="/"&&this._elements.push({
        raw:"/"+b.name,
        data:"/"+b.name,
        name:"/"+b.name,
        type:b.type
        })
    }
    this._parseState=c=="<"?d.Tag:d.Text;
this._current= this._next+1;
this._prevTagSep=c
}
if(this._options.includeLocation){
    this.getLocation();
    this._location.row+=this._location.inBuffer;
    this._location.inBuffer=0;
    this._location.charOffset=0
    }
    this._buffer=this._current<=a?this._buffer.substring(this._current):"";
this._current=0;
this.writeHandler()
};

e.prototype.getLocation=function(a){
    for(var c=this._location,b=this._current-(a?1:0),h=a&&c.charOffset==0&&this._current==0;c.charOffset<b;c.charOffset++){
        a=this._buffer.charAt(c.charOffset);
        if(a=="\n"){
            c.inBuffer++;
            c.col=0
            }else a!="\r"&&c.col++
    }
    return{
        line:c.row+c.inBuffer+1,
        col:c.col+(h?0:1)
        }
    };

e.prototype.validateHandler=function(a){
    if(typeof a!="object")throw Error("Handler is not an object");
    if(typeof a.reset!="function")throw Error("Handler method 'reset' is invalid");
    if(typeof a.done!="function")throw Error("Handler method 'done' is invalid");
    if(typeof a.writeTag!="function")throw Error("Handler method 'writeTag' is invalid");
    if(typeof a.writeText!="function")throw Error("Handler method 'writeText' is invalid");
    if(typeof a.writeComment!="function")throw Error("Handler method 'writeComment' is invalid");
    if(typeof a.writeDirective!="function")throw Error("Handler method 'writeDirective' is invalid");
};

e.prototype.writeHandler=function(a){
    a=!!a;
    if(!(this._tagStack.length&&!a))for(;this._elements.length;){
        a=this._elements.shift();
        switch(a.type){
            case d.Comment:
                this._handler.writeComment(a);
                break;
            case d.Directive:
                this._handler.writeDirective(a);
                break;
            case d.Text:
                this._handler.writeText(a);
                break;
            default:
                this._handler.writeTag(a)
                }
            }
    };
e.prototype.handleError=function(a){
    if(typeof this._handler.error=="function")this._handler.error(a);else throw a;
};
(function(a,c){
    var b=function(){};

    b.prototype=c.prototype;
    a.super_=c;
    a.prototype=new b;
    a.prototype.constructor=a
    })(n,i);
n.prototype.done=function(){
    var a={},c,b=f.getElementsByTagName(function(j){
        return j=="rss"||j=="feed"
        },this.dom,false);
    if(b.length)c=b[0];
    if(c){
        if(c.name=="rss"){
            a.type="rss";
            c=c.children[0];
            a.id="";
            try{
                a.title=f.getElementsByTagName("title",c.children,false)[0].children[0].data
                }catch(h){}
            try{
                a.link= f.getElementsByTagName("link",c.children,false)[0].children[0].data
                }catch(g){}
            try{
                a.description=f.getElementsByTagName("description",c.children,false)[0].children[0].data
                }catch(l){}
            try{
                a.updated=new Date(f.getElementsByTagName("lastBuildDate",c.children,false)[0].children[0].data)
                }catch(m){}
            try{
                a.author=f.getElementsByTagName("managingEditor",c.children,false)[0].children[0].data
                }catch(o){}
            a.items=[];
            f.getElementsByTagName("item",c.children).forEach(function(j){
                var k={};

                try{
                    k.id=f.getElementsByTagName("guid", j.children,false)[0].children[0].data
                    }catch(q){}
                try{
                    k.title=f.getElementsByTagName("title",j.children,false)[0].children[0].data
                    }catch(r){}
                try{
                    k.link=f.getElementsByTagName("link",j.children,false)[0].children[0].data
                    }catch(s){}
                try{
                    k.description=f.getElementsByTagName("description",j.children,false)[0].children[0].data
                    }catch(t){}
                try{
                    k.pubDate=new Date(f.getElementsByTagName("pubDate",j.children,false)[0].children[0].data)
                    }catch(u){}
                a.items.push(k)
                })
            }else{
            a.type="atom";
            try{
                a.id=f.getElementsByTagName("id", c.children,false)[0].children[0].data
                }catch(p){}
            try{
                a.title=f.getElementsByTagName("title",c.children,false)[0].children[0].data
                }catch(v){}
            try{
                a.link=f.getElementsByTagName("link",c.children,false)[0].attribs.href
                }catch(w){}
            try{
                a.description=f.getElementsByTagName("subtitle",c.children,false)[0].children[0].data
                }catch(x){}
            try{
                a.updated=new Date(f.getElementsByTagName("updated",c.children,false)[0].children[0].data)
                }catch(y){}
            try{
                a.author=f.getElementsByTagName("email",c.children,true)[0].children[0].data
                }catch(z){}
            a.items= [];
            f.getElementsByTagName("entry",c.children).forEach(function(j){
                var k={};

                try{
                    k.id=f.getElementsByTagName("id",j.children,false)[0].children[0].data
                    }catch(q){}
                try{
                    k.title=f.getElementsByTagName("title",j.children,false)[0].children[0].data
                    }catch(r){}
                try{
                    k.link=f.getElementsByTagName("link",j.children,false)[0].attribs.href
                    }catch(s){}
                try{
                    k.description=f.getElementsByTagName("summary",j.children,false)[0].children[0].data
                    }catch(t){}
                try{
                    k.pubDate=new Date(f.getElementsByTagName("updated",j.children, false)[0].children[0].data)
                    }catch(u){}
                a.items.push(k)
                })
            }
            this.dom=a
        }
        n.super_.prototype.done.call(this)
    };

i._emptyTags={
    area:1,
    base:1,
    basefont:1,
    br:1,
    col:1,
    frame:1,
    hr:1,
    img:1,
    input:1,
    isindex:1,
    link:1,
    meta:1,
    param:1,
    embed:1
};

i.reWhitespace=/^\s*$/;
i.prototype.dom=null;
i.prototype.reset=function(){
    this.dom=[];
    this._done=false;
    this._tagStack=[];
    this._tagStack.last=function(){
        return this.length?this[this.length-1]:null
        }
    };

i.prototype.done=function(){
    this._done=true;
    this.handleCallback(null)
    };

i.prototype.writeTag= function(a){
    this.handleElement(a)
    };

i.prototype.writeText=function(a){
    if(this._options.ignoreWhitespace)if(i.reWhitespace.test(a.data))return;
    this.handleElement(a)
    };

i.prototype.writeComment=function(a){
    this.handleElement(a)
    };

i.prototype.writeDirective=function(a){
    this.handleElement(a)
    };

i.prototype.error=function(a){
    this.handleCallback(a)
    };

i.prototype._options=null;
i.prototype._callback=null;
i.prototype._done=false;
i.prototype._tagStack=null;
i.prototype.handleCallback=function(a){
    if(typeof this._callback!= "function")if(a)throw a;else return;
    this._callback(a,this.dom)
    };

i.prototype.isEmptyTag=function(a){
    a=a.name.toLowerCase();
    if(a.charAt(0)=="/")a=a.substring(1);
    return this._options.enforceEmptyTags&&!!i._emptyTags[a]
    };

i.prototype.handleElement=function(a){
    this._done&&this.handleCallback(Error("Writing to the handler after done() called is not allowed without a reset()"));
    if(!this._options.verbose){
        delete a.raw;
        if(a.type=="tag"||a.type=="script"||a.type=="style")delete a.data
            }
            if(this._tagStack.last())if(a.type!= d.Text&&a.type!=d.Comment&&a.type!=d.Directive)if(a.name.charAt(0)=="/"){
        var c=a.name.substring(1);
        if(!this.isEmptyTag(a)){
            for(a=this._tagStack.length-1;a>-1&&this._tagStack[a--].name!=c;);
            if(a>-1||this._tagStack[0].name==c)for(;a<this._tagStack.length-1;)this._tagStack.pop()
                }
            }else{
        if(!this._tagStack.last().children)this._tagStack.last().children=[];
        this._tagStack.last().children.push(a);
        this.isEmptyTag(a)||this._tagStack.push(a)
        }else{
        if(!this._tagStack.last().children)this._tagStack.last().children= [];
        this._tagStack.last().children.push(a)
        }else if(a.type!=d.Text&&a.type!=d.Comment&&a.type!=d.Directive){
    if(a.name.charAt(0)!="/"){
        this.dom.push(a);
        this.isEmptyTag(a)||this._tagStack.push(a)
        }
    }else this.dom.push(a)
    };

var f={
    testElement:function(a,c){
        if(!c)return false;
        for(var b in a)if(b=="tag_name"){
            if(c.type!="tag"&&c.type!="script"&&c.type!="style")return false;
            if(!a.tag_name(c.name))return false
                }else if(b=="tag_type"){
            if(!a.tag_type(c.type))return false
                }else if(b=="tag_contains"){
            if(c.type!="text"&& c.type!="comment"&&c.type!="directive")return false;
            if(!a.tag_contains(c.data))return false
                }else if(!c.attribs||!a[b](c.attribs[b]))return false;return true
        },
    getElements:function(a,c,b,h){
        function g(o){
            return function(p){
                return p==o
                }
            }
        b=b===undefined||b===null||!!b;
    h=isNaN(parseInt(h))?-1:parseInt(h);
    if(!c)return[];
    var l=[],m;
    for(m in a)if(typeof a[m]!="function")a[m]=g(a[m]);f.testElement(a,c)&&l.push(c);
    if(h>=0&&l.length>=h)return l;
    if(b&&c.children)c=c.children;
    else if(c instanceof Array)c=c;else return l;
    for(m=0;m<c.length;m++){
        l=l.concat(f.getElements(a,c[m],b,h));
        if(h>=0&&l.length>=h)break
    }
    return l
    },
getElementById:function(a,c,b){
    a=f.getElements({
        id:a
    },c,b,1);
    return a.length?a[0]:null
    },
getElementsByTagName:function(a,c,b,h){
    return f.getElements({
        tag_name:a
    },c,b,h)
    },
getElementsByTagType:function(a,c,b,h){
    return f.getElements({
        tag_type:a
    },c,b,h)
    }
};

exports.Parser=e;
exports.DefaultHandler=i;
exports.RssHandler=n;
exports.ElementType=d;
exports.DomUtils=f
})();

// Page beautifier
var PageBeautify = function (page_text, container) {
    // Page structure var
    var text_struct = "";

    page_text = $("<div/>").html(page_text).text();
    console.log(page_text);

    // Tags to recolor for warning
    var warn_tags = [
    {
        prop: "name",
        to_match: /script/,
        color: "#ffff00"
    },
    {
        prop: "name",
        to_match: /iframe/,
        color: "#ffff00"
    },
    {
        prop: "raw",
        to_match: /\.exe/,
        color: "#ffff00"
    }
    ];

    // HTML elements without closing tags
    var empty_tags = {
        area: 1,
        base: 1,
        basefont: 1,
        br: 1,
        col: 1,
        frame: 1,
        hr: 1,
        img: 1,
        input: 1,
        isindex: 1,
        link: 1,
        meta: 1,
        param: 1,
        embed: 1
    };

    // Create leading whitespace to simulate tabs
    var GetWhitespace = function (depth) {
        var ret_string = "";
        for (i = 0; i < depth; i++) {
            ret_string += "&nbsp;&nbsp;";
        }
        return ret_string;
    };

    var ColorCheck = function (element_arg) {
        for (var i = 0; i < warn_tags.length; i++) {
            // if (has proprty && matches to_match)
            if (element_arg[warn_tags[i].prop] && element_arg[warn_tags[i].prop].match(warn_tags[i].to_match)) {
                return warn_tags[i].color;
            }
        }
    };

    // Recurse over structure and create formatted page
    var ParseTags = function (dom_obj, depth, color) {
        depth = depth || 0;
        for (var i = 0; i < dom_obj.length; i++) {
            var element = dom_obj[i];

            color = color || ColorCheck(element);

            // Fake tabbed whitespace
            text_struct += GetWhitespace(depth);

            // Add color span if matching warning is found
            if (color) {
                text_struct += "<span style=\"background:" + color + ";\">";
            }

            // Dont write "<" and ">" tags on text nodes
            if (element.type != "text") {
                text_struct += "&lt;" + element.raw + "&gt;";
            }
            else {
                text_struct += element.raw;
            }

            if (color) {
                text_struct += "</span>";
            }
            text_struct += "<br>";



            // Parse children
            if (element.children) {
                ParseTags(element.children, depth+1, color);
            }
            
            // End tags
            if ((element.type != "text") && (element.type != "comment") && (!empty_tags.hasOwnProperty(element.name.toLowerCase()))) {
                text_struct += GetWhitespace(depth);
                if (color) {
                    text_struct += "<span style=\"background:" + color + ";\">";
                }
                text_struct += "&lt;/" + element.name + "&gt;<br>";
                if (color) {
                    text_struct += "</span>";
                }
            }
        }
    };

    var handler = new Tautologistics.NodeHtmlParser.DefaultHandler(function (error, dom) {
        if (error) {
            alert("Error initializing parser.");
        }
    }, {
        ignoreWhitespace: true
    });

    // Send data to parser
    var parser = new Tautologistics.NodeHtmlParser.Parser(handler);
    parser.parseComplete(page_text);
    ParseTags(handler.dom);
    console.log(text_struct);

    document.getElementById(container).innerHTML = text_struct;
};

/*

var BEAUTIFY = function () {
    var unparsed = document.getElementById("htmlstuff").value;
    var new_struct = PageBeautify(unparsed);

    // Set new element

};


// Onload listeners
if (document.addEventListener) {
    window.addEventListener("load", BEAUTIFY, false );
}
else if (document.attachEvent) {
    window.attachEvent("onload", LoadParser);
}

*/
