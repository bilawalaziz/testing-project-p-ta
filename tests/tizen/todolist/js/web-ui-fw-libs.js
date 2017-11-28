(function(a){var b=function(a){return parseInt(a,10)||0};a.each(["min","max"],function(c,d){a.fn[d+"Size"]=function(a){var c,e;return a?(a.width!==undefined&&this.css(d+"-width",a.width),a.height!==undefined&&this.css(d+"-height",a.height),this):(c=this.css(d+"-width"),e=this.css(d+"-height"),{width:d==="max"&&(c===undefined||c==="none"||b(c)===-1)&&Number.MAX_VALUE||b(c),height:d==="max"&&(e===undefined||e==="none"||b(e)===-1)&&Number.MAX_VALUE||b(e)})}}),a.fn.isVisible=function(){return this.is(":visible")},a.each(["border","margin","padding"],function(c,d){a.fn[d]=function(a){return a?(a.top!==undefined&&this.css(d+"-top"+(d==="border"?"-width":""),a.top),a.bottom!==undefined&&this.css(d+"-bottom"+(d==="border"?"-width":""),a.bottom),a.left!==undefined&&this.css(d+"-left"+(d==="border"?"-width":""),a.left),a.right!==undefined&&this.css(d+"-right"+(d==="border"?"-width":""),a.right),this):{top:b(this.css(d+"-top"+(d==="border"?"-width":""))),bottom:b(this.css(d+"-bottom"+(d==="border"?"-width":""))),left:b(this.css(d+"-left"+(d==="border"?"-width":""))),right:b(this.css(d+"-right"+(d==="border"?"-width":"")))}}})})(jQuery);(function(){jLayout=typeof jLayout=="undefined"?{}:jLayout,jLayout.border=function(a){function i(a){return function(c){var i=c.insets(),j=0,k=0,l;return d&&d.isVisible()&&(l=d[a+"Size"](),j+=l.width+b.hgap,k=l.height),e&&e.isVisible()&&(l=e[a+"Size"](),j+=l.width+b.hgap,k=Math.max(l.height,k)),h&&h.isVisible()&&(l=h[a+"Size"](),j+=l.width,k=Math.max(l.height,k)),f&&f.isVisible()&&(l=f[a+"Size"](),j=Math.max(l.width,j),k+=l.height+b.vgap),g&&g.isVisible()&&(l=g[a+"Size"](),j=Math.max(l.width,j),k+=l.height+b.vgap),{width:j+i.left+i.right,height:k+i.top+i.bottom}}}var b={},c={},d=a.east,e=a.west,f=a.north,g=a.south,h=a.center;return b.hgap=a.hgap||0,b.vgap=a.vgap||0,c.items=function(){var a=[];return d&&a.push(d),e&&a.push(e),f&&a.push(f),g&&a.push(g),h&&a.push(h),a},c.layout=function(a){var c=a.bounds(),i=a.insets(),j=i.top,k=c.height-i.bottom,l=i.left,m=c.width-i.right,n;return f&&f.isVisible()&&(n=f.preferredSize(),f.bounds({x:l,y:j,width:m-l,height:n.height}),f.doLayout(),j+=n.height+b.vgap),g&&g.isVisible()&&(n=g.preferredSize(),g.bounds({x:l,y:k-n.height,width:m-l,height:n.height}),g.doLayout(),k-=n.height+b.vgap),d&&d.isVisible()&&(n=d.preferredSize(),d.bounds({x:m-n.width,y:j,width:n.width,height:k-j}),d.doLayout(),m-=n.width+b.hgap),e&&e.isVisible()&&(n=e.preferredSize(),e.bounds({x:l,y:j,width:n.width,height:k-j}),e.doLayout(),l+=n.width+b.hgap),h&&h.isVisible()&&(h.bounds({x:l,y:j,width:m-l,height:k-j}),h.doLayout()),a},c.preferred=i("preferred"),c.minimum=i("minimum"),c.maximum=i("maximum"),c}})();(function(){jLayout=typeof jLayout=="undefined"?{}:jLayout,jLayout.grid=function(a,b){function e(a){return function(b){var d=0,e=0,f=0,g,h=b.insets();for(;d<c.items.length;d+=1)g=c.items[d][a+"Size"](),e=Math.max(e,g.width),f=Math.max(f,g.height);return{width:h.left+h.right+c.columns*e+(c.columns-1)*c.hgap,height:h.top+h.bottom+c.rows*f+(c.rows-1)*c.vgap}}}var c=b||{},d={};return c.hgap=a.hgap||0,c.vgap=a.vgap||0,c.items=a.items||[],c.columns=a.columns||c.items.length,c.rows=a.rows||0,c.fillVertical=a.fill&&a.fill==="vertical",c.rows>0?c.columns=Math.floor((c.items.length+c.rows-1)/c.rows):c.rows=Math.floor((c.items.length+c.columns-1)/c.columns),d.items=function(){var a=[];return Array.prototype.push.apply(a,c.items),a},d.layout=function(a){var b,d,e=a.insets(),f=e.left,g=e.top,h=(a.bounds().width-(e.left+e.right)-(c.columns-1)*c.hgap)/c.columns,i=(a.bounds().height-(e.top+e.bottom)-(c.rows-1)*c.vgap)/c.rows;for(b=0,d=1;b<c.items.length;b+=1,d+=1)c.items[b].bounds({x:f,y:g,width:h,height:i}),c.fillVertical?d>=c.rows?(f+=h+c.hgap,g=e.top,d=0):g+=i+c.vgap:d>=c.columns?(g+=i+c.vgap,f=e.left,d=0):f+=h+c.hgap,c.items[b].doLayout();return a},d.preferred=e("preferred"),d.minimum=e("minimum"),d.maximum=e("maximum"),d}})();(function(){jLayout=typeof jLayout=="undefined"?{}:jLayout,typeof jLayout.grid!="undefined"&&(jLayout.flexGrid=function(a){function d(a,b){var c=0;for(;c<b;c+=1)a[c]=0;return a}function e(a){return function(c){var e=0,f=0,g=0,h=0,i=0,j=d([],b.columns),k=d([],b.rows),l,m=c.insets();for(e=0;e<b.items.length;e+=1)f=e/b.columns,g=e%b.columns,l=b.items[e][a+"Size"](),j[g]<l.width&&(j[g]=l.width),k[f]<l.height&&(k[f]=l.height);for(e=0;e<b.columns;e+=1)h+=j[e];for(e=0;e<b.rows;e+=1)i+=k[e];return{width:m.left+m.right+h+(b.columns-1)*b.hgap,height:m.top+m.bottom+i+(b.rows-1)*b.vgap}}}var b={},c=this.grid(a,b);return c.preferred=e("preferred"),c.minimum=e("minimum"),c.maximum=e("maximum"),c.layout=function(a){var e=0,f=0,g=0,h=c.preferred(a),i=a.bounds().width/h.width,j=a.bounds().height/h.height,k=d([],b.columns),l=d([],b.rows),m=a.insets(),n=m.left,o=m.top,p;for(e=0;e<b.items.length;e+=1)g=e/b.columns,f=e%b.columns,p=b.items[e].preferredSize(),p.width=i*p.width,p.height=j*p.height,k[f]<p.width&&(k[f]=p.width),l[g]<p.height&&(l[g]=p.height);for(f=0;f<b.columns;f+=1){for(g=0,o=m.top;g<b.rows;g+=1)e=g*b.columns+f,e<b.items.length&&(b.items[e].bounds({x:n,y:o,width:k[f],height:l[g]}),b.items[e].doLayout()),o+=l[g]+b.vgap;n+=k[f]+b.hgap}return a},c})})();(function(){jLayout=typeof jLayout=="undefined"?{}:jLayout,jLayout.flow=function(a){function d(a,c,d,e){var f={x:c.x,y:c.y},g=0,h=a.length;switch(b.alignment){case"center":f.x+=(b.hgap+e.width-d.width)/2;break;case"right":f.x+=e.width-d.width+b.hgap}for(;g<h;g+=1)f.y=c.y,a[g].bounds(f),a[g].doLayout(),f.x+=a[g].bounds().width+b.hgap}function e(a){return function(c){var d=0,e=0,f=0,g,h=!1,i=c.insets();for(;d<b.items.length;d+=1)b.items[d].isVisible()&&(g=b.items[d][a+"Size"](),f=Math.max(f,g.height),e+=g.width);return{width:e+i.left+i.right+(b.items.length-1)*b.hgap,height:f+i.top+i.bottom}}}var b={},c={};return b.hgap=typeof a.hgap=="number"&&!isNaN(a.hgap)?a.hgap:5,b.vgap=typeof a.vgap=="number"&&!isNaN(a.vgap)?a.vgap:5,b.items=a.items||[],b.alignment=a.alignment&&(a.alignment==="center"||a.alignment==="right"||a.alignment==="left")&&a.alignment||"left",c.items=function(){var a=[];return Array.prototype.push.apply(a,b.items),a},c.layout=function(a){var c=a.bounds(),e=a.insets(),f=0,g=b.items.length,h,i=[],j={width:0,height:0},k={x:e.left,y:e.top};c.width-=e.left+e.right,c.height-=e.top+e.bottom;for(;f<g;f+=1)b.items[f].isVisible()&&(h=b.items[f].preferredSize(),j.width+h.width>c.width&&(d(i,k,j,c),i=[],k.y+=j.height,k.x=e.left,j.width=0,j.height=0),j.height=Math.max(j.height,h.height+b.vgap),j.width+=h.width+b.hgap,i.push(b.items[f]));return d(i,k,j,c),a},c.preferred=e("preferred"),c.minimum=e("minimum"),c.maximum=e("maximum"),c}})();jQuery&&jLayout&&function(a){function b(b,c){var d={};return a.each(["min","max"],function(a,c){d[c+"imumSize"]=function(a){var e=b.data("jlayout");return e?e[c+"imum"](d):b[c+"Size"](a)}}),a.extend(d,{doLayout:function(){var a=b.data("jlayout");a&&a.layout(d),b.css({position:"absolute"})},isVisible:function(){return b.isVisible()},insets:function(){var a=b.padding(),c=b.border();return{top:a.top,bottom:a.bottom+c.bottom+c.top,left:a.left,right:a.right+c.right+c.left}},bounds:function(a){var c={};return a?(typeof a.x=="number"&&(c.left=a.x),typeof a.y=="number"&&(c.top=a.y),typeof a.width=="number"&&(c.width=a.width-(b.outerWidth(!0)-b.width()),c.width=c.width>=0?c.width:0),typeof a.height=="number"&&(c.height=a.height-(b.outerHeight(!0)-b.height()),c.height=c.height>=0?c.height:0),b.css(c),b):(c=b.position(),{x:c.left,y:c.top,width:b.outerWidth(!1),height:b.outerHeight(!1)})},preferredSize:function(){var a,e,f=b.margin(),g={width:0,height:0},h=b.data("jlayout");if(h&&c){g=h.preferred(d),a=d.minimumSize(),e=d.maximumSize(),g.width+=f.left+f.right,g.height+=f.top+f.bottom;if(g.width<a.width||g.height<a.height)g.width=Math.max(g.width,a.width),g.height=Math.max(g.height,a.height);else if(g.width>e.width||g.height>e.height)g.width=Math.min(g.width,e.width),g.height=Math.min(g.height,e.height)}else g=d.bounds(),g.width+=f.left+f.right,g.height+=f.top+f.bottom;return g}}),d}a.fn.layout=function(c){var d=a.extend({},a.fn.layout.defaults,c);return a.each(this,function(){var c=a(this),e=a.metadata&&c.metadata().layout?a.extend(d,c.metadata().layout):d,f=b(c,e.resize);e.type==="border"&&typeof jLayout.border!="undefined"?(a.each(["north","south","west","east","center"],function(a,d){c.children().hasClass(d)&&(e[d]=b(c.children("."+d+":first")))}),c.data("jlayout",jLayout.border(e))):e.type==="grid"&&typeof jLayout.grid!="undefined"?(e.items=[],c.children().each(function(c){a(this).hasClass("ui-resizable-handle")||(e.items[c]=b(a(this)))}),c.data("jlayout",jLayout.grid(e))):e.type==="flexGrid"&&typeof jLayout.flexGrid!="undefined"?(e.items=[],c.children().each(function(c){a(this).hasClass("ui-resizable-handle")||(e.items[c]=b(a(this)))}),c.data("jlayout",jLayout.flexGrid(e))):e.type==="column"&&typeof jLayout.column!="undefined"?(e.items=[],c.children().each(function(c){a(this).hasClass("ui-resizable-handle")||(e.items[c]=b(a(this)))}),c.data("jlayout",jLayout.column(e))):e.type==="flow"&&typeof jLayout.flow!="undefined"&&(e.items=[],c.children().each(function(c){a(this).hasClass("ui-resizable-handle")||(e.items[c]=b(a(this)))}),c.data("jlayout",jLayout.flow(e))),e.resize&&f.bounds(f.preferredSize()),f.doLayout(),c.css({position:"relative"}),a.ui!==undefined&&c.addClass("ui-widget")})},a.fn.layout.defaults={resize:!0,type:"grid"}}(jQuery);