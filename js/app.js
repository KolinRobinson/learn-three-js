let type = "WebGL"
if(!PIXI.utils.isWebGLSupported()){
        type = 'canvars';
}

PIXI.utils.sayHello(type)
