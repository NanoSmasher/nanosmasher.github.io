(function() {
  var Color,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __slice = [].slice;

  this.Punchdrunk = (function() {
    function Punchdrunk(config) {
      var conf, element, game_code, game_root, love, vm;
      if (config == null) {
        config = {};
      }
      game_root = config["game_root"] || "lua";
      game_code = config["game_code"];
      element = config["canvas"] || null;
      conf = {
        window: {},
        modules: {}
      };
      if (game_code) {
        Love.root = game_root;
        love = new Love(element, conf.window, conf.modules);
        vm = new shine.VM({
          love: love
        });
        vm.load(game_code);
        love.run();
      } else {
        new shine.FileManager().load("" + game_root + "/conf.lua.json", function(_, file) {
          var conf_env, conf_vm;
          if (file) {
            conf_env = {
              love: {}
            };
            conf_vm = new shine.VM(conf_env);
            conf_vm.execute(null, file);
            conf_env.love.conf.call(null, conf);
          }
          Love.root = game_root;
          love = new Love(element, conf.window, conf.modules);
          vm = new shine.VM({
            love: love
          });
          vm._globals['package'].path = ("" + game_root + "/?.lua.json;" + game_root + "/?.json;") + vm._globals['package'].path;
          return vm.load({
            "sourceName": "@js/boot.lua",
            "lineDefined": 0,
            "lastLineDefined": 0,
            "upvalueCount": 0,
            "paramCount": 0,
            "is_vararg": 2,
            "maxStackSize": 2,
            "instructions": [5, 0, 0, 0, 1, 1, 1, 0, 28, 0, 2, 1, 5, 0, 2, 0, 6, 0, 0, 259, 28, 0, 1, 1, 30, 0, 1, 0],
            "constants": ["require", "main", "love", "run"],
            "functions": [],
            "linePositions": [1, 1, 1, 3, 3, 3, 3],
            "locals": [],
            "upvalues": [],
            "sourcePath": "js/boot.lua"
          });
        });
      }
    }

    shine.stdout.write = function() {
      return console.log.apply(console, arguments);
    };

    return Punchdrunk;

  })();

  this.Love = (function() {
    function Love(element, window_conf, module_conf) {
      if (element == null) {
        element = null;
      }
      if (window_conf == null) {
        window_conf = {};
      }
      if (module_conf == null) {
        module_conf = {};
      }
      this.run = __bind(this.run, this);
      Love.element = element;
      this.graphics = new Love.Graphics(window_conf.width, window_conf.height);
      this.window = new Love.Window(this.graphics);
      this.timer = new Love.Timer();
      this.event = new Love.EventQueue();
      this.keyboard = new Love.Keyboard(this.event, Love.element);
      this.mouse = new Love.Mouse(this.event, Love.element);
      this.touch = new Love.Touch(this.event, Love.element);
      this.filesystem = new Love.FileSystem();
      this.audio = new Love.Audio();
      this.system = new Love.System();
      this.image = new Love.ImageModule();
      this.math = new Love.Math();
      window.addEventListener("beforeunload", (function(_this) {
        return function() {
          return _this.quit.call();
        };
      })(this));
    }

    Love.prototype.run = function() {
      var game_loop;
      this.timer.step();
      this.load.call();
      game_loop = (function(_this) {
        return function() {
          var e, _i, _len, _ref;
          _ref = _this.event.internalQueue;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            e = _ref[_i];
            _this[e.eventType].call(null, e.arg1, e.arg2, e.arg3, e.arg4);
          }
          _this.event.clear();
          _this.timer.step();
          _this.update.call(null, _this.timer.getDelta());
          _this.graphics.origin();
          _this.graphics.clear();
          _this.draw.call();
          return _this.timer.nextFrame(game_loop);
        };
      })(this);
      return this.timer.nextFrame(game_loop);
    };

    Love.prototype.load = function(args) {};

    Love.prototype.update = function(dt) {};

    Love.prototype.mousepressed = function(x, y, button) {};

    Love.prototype.mousereleased = function(x, y, button) {};

    Love.prototype.touchpressed = function(id, x, y) {};

    Love.prototype.touchreleased = function(id, x, y) {};

    Love.prototype.touchmoved = function(id, x, y) {};

    Love.prototype.keypressed = function(key, unicode) {};

    Love.prototype.keyreleased = function(key, unicode) {};

    Love.prototype.draw = function() {};

    Love.prototype.quit = function() {};

    return Love;

  })();

  Love.root = "lua";

  Love.element = null;

  Love.Audio = (function() {
    function Audio() {
      this.stop = __bind(this.stop, this);
      this.setVolume = __bind(this.setVolume, this);
      this.setVelocity = __bind(this.setVelocity, this);
      this.setPosition = __bind(this.setPosition, this);
      this.setOrientation = __bind(this.setOrientation, this);
      this.setDistanceModel = __bind(this.setDistanceModel, this);
      this.rewind = __bind(this.rewind, this);
      this.resume = __bind(this.resume, this);
      this.play = __bind(this.play, this);
      this.pause = __bind(this.pause, this);
      this.newSource = __bind(this.newSource, this);
      this.getVolume = __bind(this.getVolume, this);
      this.getVelocity = __bind(this.getVelocity, this);
      this.getSourceCount = __bind(this.getSourceCount, this);
      this.getPosition = __bind(this.getPosition, this);
      this.getOrientation = __bind(this.getOrientation, this);
      this.getDistanceModel = __bind(this.getDistanceModel, this);
    }

    Audio.prototype.getDistanceModel = function() {};

    Audio.prototype.getOrientation = function() {};

    Audio.prototype.getPosition = function() {};

    Audio.prototype.getSourceCount = function() {};

    Audio.prototype.getVelocity = function() {};

    Audio.prototype.getVolume = function() {};

    Audio.prototype.newSource = function(filename, type) {
      return new Love.Audio.Source(filename, type);
    };

    Audio.prototype.pause = function(source) {
      return source.pause(source);
    };

    Audio.prototype.play = function(source) {
      return source.play(source);
    };

    Audio.prototype.resume = function(source) {
      return source.play(source);
    };

    Audio.prototype.rewind = function(source) {
      return source.rewind(source);
    };

    Audio.prototype.setDistanceModel = function() {};

    Audio.prototype.setOrientation = function() {};

    Audio.prototype.setPosition = function() {};

    Audio.prototype.setVelocity = function() {};

    Audio.prototype.setVolume = function() {};

    Audio.prototype.stop = function(source) {
      return source.stop(source);
    };

    return Audio;

  })();

  Love.Color = (function() {
    function Color(r, g, b, a) {
      this.r = r;
      this.g = g;
      this.b = b;
      this.a = a != null ? a : 255;
      this.html_code = "rgb(" + this.r + ", " + this.g + ", " + this.b + ")";
    }

    Color.prototype.unpack = function() {
      return [this.r, this.g, this.b, this.a];
    };

    return Color;

  })();

  Color = Love.Color;

  Love.EventQueue = (function() {
    var Event;

    function EventQueue() {
      this.wait = __bind(this.wait, this);
      this.quit = __bind(this.quit, this);
      this.push = __bind(this.push, this);
      this.pump = __bind(this.pump, this);
      this.poll = __bind(this.poll, this);
      this.clear = __bind(this.clear, this);
      this.internalQueue = [];
    }

    EventQueue.prototype.clear = function() {
      return this.internalQueue = [];
    };

    EventQueue.prototype.poll = function() {};

    EventQueue.prototype.pump = function() {};

    EventQueue.prototype.push = function() {
      var args, eventType, newEvent;
      eventType = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      newEvent = (function(func, args, ctor) {
        ctor.prototype = func.prototype;
        var child = new ctor, result = func.apply(child, args);
        return Object(result) === result ? result : child;
      })(Event, [eventType].concat(__slice.call(args)), function(){});
      return this.internalQueue.push(newEvent);
    };

    EventQueue.prototype.quit = function() {
      return this.internalQueue.push(new Event("quit"));
    };

    EventQueue.prototype.wait = function() {};

    Event = (function() {
      function Event(eventType, arg1, arg2, arg3, arg4) {
        this.eventType = eventType;
        this.arg1 = arg1;
        this.arg2 = arg2;
        this.arg3 = arg3;
        this.arg4 = arg4;
      }

      return Event;

    })();

    return EventQueue;

  })();

  Love.Exception = (function() {
    function Exception(message) {
      this.message = message;
      this.name = "Love Error";
    }

    return Exception;

  })();

  Love.FileSystem = (function() {
    function FileSystem() {
      this.write = __bind(this.write, this);
      this.unmount = __bind(this.unmount, this);
      this.setSource = __bind(this.setSource, this);
      this.setIdentity = __bind(this.setIdentity, this);
      this.remove = __bind(this.remove, this);
      this.read = __bind(this.read, this);
      this.newFileData = __bind(this.newFileData, this);
      this.newFile = __bind(this.newFile, this);
      this.mount = __bind(this.mount, this);
      this.load = __bind(this.load, this);
      this.lines = __bind(this.lines, this);
      this.isFused = __bind(this.isFused, this);
      this.isFile = __bind(this.isFile, this);
      this.isDirectory = __bind(this.isDirectory, this);
      this.init = __bind(this.init, this);
      this.getWorkingDirectory = __bind(this.getWorkingDirectory, this);
      this.getUserDirectory = __bind(this.getUserDirectory, this);
      this.getSize = __bind(this.getSize, this);
      this.getSaveDirectory = __bind(this.getSaveDirectory, this);
      this.getLastModified = __bind(this.getLastModified, this);
      this.getIdentity = __bind(this.getIdentity, this);
      this.getDirectoryItems = __bind(this.getDirectoryItems, this);
      this.getAppdataDirectory = __bind(this.getAppdataDirectory, this);
      this.exists = __bind(this.exists, this);
      this.createDirectory = __bind(this.createDirectory, this);
      this.append = __bind(this.append, this);
    }

    FileSystem.prototype.append = function() {};

    FileSystem.prototype.createDirectory = function() {};

    FileSystem.prototype.exists = function(filename) {
      return localStorage.getItem(filename) !== null;
    };

    FileSystem.prototype.getAppdataDirectory = function() {};

    FileSystem.prototype.getDirectoryItems = function() {};

    FileSystem.prototype.getIdentity = function() {};

    FileSystem.prototype.getLastModified = function() {};

    FileSystem.prototype.getSaveDirectory = function() {};

    FileSystem.prototype.getSize = function() {};

    FileSystem.prototype.getUserDirectory = function() {};

    FileSystem.prototype.getWorkingDirectory = function() {};

    FileSystem.prototype.init = function() {};

    FileSystem.prototype.isDirectory = function() {};

    FileSystem.prototype.isFile = function() {};

    FileSystem.prototype.isFused = function() {};

    FileSystem.prototype.lines = function() {};

    FileSystem.prototype.load = function() {};

    FileSystem.prototype.mount = function() {};

    FileSystem.prototype.newFile = function() {};

    FileSystem.prototype.newFileData = function(contents, name, decoder) {
      return new Love.FileSystem.FileData(contents, name, decoder);
    };

    FileSystem.prototype.read = function(filename) {
      return localStorage.getItem(filename);
    };

    FileSystem.prototype.remove = function(filename) {
      return localStorage.removeItem(filename);
    };

    FileSystem.prototype.setIdentity = function() {};

    FileSystem.prototype.setSource = function() {};

    FileSystem.prototype.unmount = function() {};

    FileSystem.prototype.write = function(filename, data) {
      return localStorage.setItem(filename, data);
    };

    return FileSystem;

  })();

  Love.Graphics = (function() {
    function Graphics(width, height) {
      if (width == null) {
        width = 800;
      }
      if (height == null) {
        height = 600;
      }
      this.getWidth = __bind(this.getWidth, this);
      this.getHeight = __bind(this.getHeight, this);
      this.getDimensions = __bind(this.getDimensions, this);
      this.translate = __bind(this.translate, this);
      this.shear = __bind(this.shear, this);
      this.scale = __bind(this.scale, this);
      this.rotate = __bind(this.rotate, this);
      this.push = __bind(this.push, this);
      this.pop = __bind(this.pop, this);
      this.origin = __bind(this.origin, this);
      this.setWireframe = __bind(this.setWireframe, this);
      this.setStencil = __bind(this.setStencil, this);
      this.setShader = __bind(this.setShader, this);
      this.setScissor = __bind(this.setScissor, this);
      this.setPointStyle = __bind(this.setPointStyle, this);
      this.setPointSize = __bind(this.setPointSize, this);
      this.setLineWidth = __bind(this.setLineWidth, this);
      this.setLineStyle = __bind(this.setLineStyle, this);
      this.setLineJoin = __bind(this.setLineJoin, this);
      this.setInvertedStencil = __bind(this.setInvertedStencil, this);
      this.setDefaultFilter = __bind(this.setDefaultFilter, this);
      this.setColorMask = __bind(this.setColorMask, this);
      this.setFont = __bind(this.setFont, this);
      this.setColor = __bind(this.setColor, this);
      this.setCanvas = __bind(this.setCanvas, this);
      this.setBlendMode = __bind(this.setBlendMode, this);
      this.setBackgroundColor = __bind(this.setBackgroundColor, this);
      this.reset = __bind(this.reset, this);
      this.isWireframe = __bind(this.isWireframe, this);
      this.isSupported = __bind(this.isSupported, this);
      this.getSystemLimit = __bind(this.getSystemLimit, this);
      this.getShader = __bind(this.getShader, this);
      this.getScissor = __bind(this.getScissor, this);
      this.getRendererInfo = __bind(this.getRendererInfo, this);
      this.getPointStyle = __bind(this.getPointStyle, this);
      this.getPointSize = __bind(this.getPointSize, this);
      this.getMaxPointSize = __bind(this.getMaxPointSize, this);
      this.getMaxImageSize = __bind(this.getMaxImageSize, this);
      this.getLineWidth = __bind(this.getLineWidth, this);
      this.getLineStyle = __bind(this.getLineStyle, this);
      this.getLineJoin = __bind(this.getLineJoin, this);
      this.getFont = __bind(this.getFont, this);
      this.getDefaultFilter = __bind(this.getDefaultFilter, this);
      this.getColorMask = __bind(this.getColorMask, this);
      this.getColor = __bind(this.getColor, this);
      this.getCanvas = __bind(this.getCanvas, this);
      this.getBlendMode = __bind(this.getBlendMode, this);
      this.getBackgroundColor = __bind(this.getBackgroundColor, this);
      this.setNewFont = __bind(this.setNewFont, this);
      this.newSpriteBatch = __bind(this.newSpriteBatch, this);
      this.newShader = __bind(this.newShader, this);
      this.newScreenshot = __bind(this.newScreenshot, this);
      this.newQuad = __bind(this.newQuad, this);
      this.newParticleSystem = __bind(this.newParticleSystem, this);
      this.newMesh = __bind(this.newMesh, this);
      this.newImageFont = __bind(this.newImageFont, this);
      this.newImage = __bind(this.newImage, this);
      this.newFont = __bind(this.newFont, this);
      this.newCanvas = __bind(this.newCanvas, this);
      this.rectangle = __bind(this.rectangle, this);
      this.printf = __bind(this.printf, this);
      this.print = __bind(this.print, this);
      this.polygon = __bind(this.polygon, this);
      this.point = __bind(this.point, this);
      this.line = __bind(this.line, this);
      this.draw = __bind(this.draw, this);
      this.clear = __bind(this.clear, this);
      this.circle = __bind(this.circle, this);
      this.arc = __bind(this.arc, this);
      if (Love.element) {
        this.canvas = new Love.Graphics.Canvas2D(width, height, Love.element);
      } else {
        this.canvas = new Love.Graphics.Canvas2D(width, height);
        document.body.appendChild(this.canvas.element);
        Love.element = this.canvas.element;
      }
      this.default_canvas = this.canvas;
      this.default_font = new Love.Graphics.Font("Vera", 12);
      this.setColor(255, 255, 255);
      this.setBackgroundColor(0, 0, 0);
      this.setFont(this.default_font);
    }

    Graphics.prototype.arc = function(mode, x, y, radius, startAngle, endAngle, segments) {
      return this.canvas.arc(mode, x, y, radius, startAngle, endAngle, segments);
    };

    Graphics.prototype.circle = function(mode, x, y, radius, segments) {
      return this.canvas.circle(mode, x, y, radius, segments);
    };

    Graphics.prototype.clear = function() {
      var a, b, g, r, _ref;
      _ref = this.getBackgroundColor(), r = _ref[0], g = _ref[1], b = _ref[2], a = _ref[3];
      return this.canvas.clear(this.canvas, r, g, b, a);
    };

    Graphics.prototype.draw = function() {
      var args, _ref;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return (_ref = this.canvas).draw.apply(_ref, args);
    };

    Graphics.prototype.line = function() {
      var points, _ref;
      points = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return (_ref = this.canvas).line.apply(_ref, points);
    };

    Graphics.prototype.point = function(x, y) {
      return this.canvas.point(x, y);
    };

    Graphics.prototype.polygon = function() {
      var mode, points, _ref;
      mode = arguments[0], points = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      return (_ref = this.canvas).polygon.apply(_ref, [mode].concat(__slice.call(points)));
    };

    Graphics.prototype.print = function(text, x, y) {
      return this.canvas.print(text, x, y);
    };

    Graphics.prototype.printf = function(text, x, y, limit, align) {
      if (align == null) {
        align = "left";
      }
      return this.canvas.printf(text, x, y, limit, align);
    };

    Graphics.prototype.rectangle = function(mode, x, y, width, height) {
      return this.canvas.rectangle(mode, x, y, width, height);
    };

    Graphics.prototype.newCanvas = function(width, height) {
      if (width == null) {
        width = this.getWidth(this);
      }
      if (height == null) {
        height = this.getHeight(this);
      }
      return new Love.Graphics.Canvas2D(width, height);
    };

    Graphics.prototype.newFont = function(filename, size) {
      if (size == null) {
        size = 12;
      }
      return new Love.Graphics.Font(filename, size);
    };

    Graphics.prototype.newImage = function(data) {
      return new Love.Graphics.Image(data);
    };

    Graphics.prototype.newImageFont = function() {};

    Graphics.prototype.newMesh = function() {};

    Graphics.prototype.newParticleSystem = function() {};

    Graphics.prototype.newQuad = function(x, y, width, height, sw, sh) {
      return new Love.Graphics.Quad(x, y, width, height, sw, sh);
    };

    Graphics.prototype.newScreenshot = function() {};

    Graphics.prototype.newShader = function() {};

    Graphics.prototype.newSpriteBatch = function() {};

    Graphics.prototype.setNewFont = function(filename, size) {
      var font;
      font = this.newFont(filename, size);
      return this.setFont(font);
    };

    Graphics.prototype.getBackgroundColor = function() {
      return this.canvas.getBackgroundColor();
    };

    Graphics.prototype.getBlendMode = function() {
      return this.canvas.getBlendMode();
    };

    Graphics.prototype.getCanvas = function() {
      return this.canvas;
    };

    Graphics.prototype.getColor = function() {
      return this.canvas.getColor();
    };

    Graphics.prototype.getColorMask = function() {
      return this.canvas.getColorMask();
    };

    Graphics.prototype.getDefaultFilter = function() {
      return this.canvas.getDefaultFilter();
    };

    Graphics.prototype.getFont = function() {
      return this.canvas.getFont();
    };

    Graphics.prototype.getLineJoin = function() {
      return this.canvas.getLineJoin();
    };

    Graphics.prototype.getLineStyle = function() {
      return this.canvas.getLineStyle();
    };

    Graphics.prototype.getLineWidth = function() {
      return this.canvas.getLineWidth();
    };

    Graphics.prototype.getMaxImageSize = function() {
      return this.canvas.getMaxImageSize();
    };

    Graphics.prototype.getMaxPointSize = function() {
      return this.canvas.getMaxPointSize();
    };

    Graphics.prototype.getPointSize = function() {
      return this.canvas.getPointSize();
    };

    Graphics.prototype.getPointStyle = function() {
      return this.canvas.getPointStyle();
    };

    Graphics.prototype.getRendererInfo = function() {
      return this.canvas.getRendererInfo();
    };

    Graphics.prototype.getScissor = function() {
      return this.canvas.getScissor();
    };

    Graphics.prototype.getShader = function() {
      return this.canvas.getShader();
    };

    Graphics.prototype.getSystemLimit = function() {
      return this.canvas.getSystemLimit();
    };

    Graphics.prototype.isSupported = function() {};

    Graphics.prototype.isWireframe = function() {
      return this.canvas.isWireframe();
    };

    Graphics.prototype.reset = function() {
      this.setCanvas();
      return this.origin();
    };

    Graphics.prototype.setBackgroundColor = function(r, g, b, a) {
      if (a == null) {
        a = 255;
      }
      return this.canvas.setBackgroundColor(r, g, b, a);
    };

    Graphics.prototype.setBlendMode = function(mode) {
      return this.canvas.setBlendMode(mode);
    };

    Graphics.prototype.setCanvas = function(canvas) {
      if (canvas === void 0 || canvas === null) {
        this.default_canvas.copyContext(this.canvas.context);
        return this.canvas = this.default_canvas;
      } else {
        canvas.copyContext(this.canvas.context);
        return this.canvas = canvas;
      }
    };

    Graphics.prototype.setColor = function(r, g, b, a) {
      if (a == null) {
        a = 255;
      }
      return this.canvas.setColor(r, g, b, a);
    };

    Graphics.prototype.setFont = function(font) {
      return this.canvas.setFont(font);
    };

    Graphics.prototype.setColorMask = function(r, g, b, a) {
      return this.canvas.setColorMask(r, g, b, a);
    };

    Graphics.prototype.setDefaultFilter = function(min, mag, anisotropy) {
      return this.canvas.setDefaultFilter(min, mag, anisotropy);
    };

    Graphics.prototype.setInvertedStencil = function(callback) {
      return this.canvas.setInvertedStencil(callback);
    };

    Graphics.prototype.setLineJoin = function(join) {
      return this.canvas.setLineJoin(join);
    };

    Graphics.prototype.setLineStyle = function(style) {
      return this.canvas.setLineStyle(style);
    };

    Graphics.prototype.setLineWidth = function(width) {
      return this.canvas.setLineWidth(width);
    };

    Graphics.prototype.setPointSize = function(size) {
      return this.canvas.setPointSize(size);
    };

    Graphics.prototype.setPointStyle = function(style) {
      return this.canvas.setPointStyle(style);
    };

    Graphics.prototype.setScissor = function(x, y, width, height) {
      return this.canvas.setScissor(x, y, width, height);
    };

    Graphics.prototype.setShader = function(shader) {
      return this.canvas.setShader(shader);
    };

    Graphics.prototype.setStencil = function(callback) {
      return this.canvas.setStencil(callback);
    };

    Graphics.prototype.setWireframe = function(enable) {
      return this.canvas.setWireframe(enable);
    };

    Graphics.prototype.origin = function() {
      return this.canvas.origin();
    };

    Graphics.prototype.pop = function() {
      return this.canvas.pop();
    };

    Graphics.prototype.push = function() {
      return this.canvas.push();
    };

    Graphics.prototype.rotate = function(r) {
      return this.canvas.rotate(r);
    };

    Graphics.prototype.scale = function(sx, sy) {
      if (sy == null) {
        sy = sx;
      }
      return this.canvas.scale(sx, sy);
    };

    Graphics.prototype.shear = function(kx, ky) {
      return this.canvas.shear(kx, ky);
    };

    Graphics.prototype.translate = function(dx, dy) {
      return this.canvas.translate(dx, dy);
    };

    Graphics.prototype.getDimensions = function() {
      return [this.getWidth(), this.getHeight()];
    };

    Graphics.prototype.getHeight = function() {
      return this.default_canvas.getHeight(this.default_canvas);
    };

    Graphics.prototype.getWidth = function() {
      return this.default_canvas.getWidth(this.default_canvas);
    };

    return Graphics;

  })();

  Love.ImageModule = (function() {
    function ImageModule() {
      this.newImageData = __bind(this.newImageData, this);
      this.newCompressedData = __bind(this.newCompressedData, this);
      this.isCompressed = __bind(this.isCompressed, this);
    }

    ImageModule.prototype.isCompressed = function() {};

    ImageModule.prototype.newCompressedData = function() {};

    ImageModule.prototype.newImageData = function(filedata) {
      return new Love.ImageModule.ImageData(filedata);
    };

    return ImageModule;

  })();

  Love.Keyboard = (function() {
    var getKeyFromEvent, keys, rightKeys, shiftedKeys;

    function Keyboard(eventQueue, canvas) {
      this.isDown = __bind(this.isDown, this);
      var keydown, keyup;
      this.keysDown = {};
      canvas.setAttribute("tabindex", "0");
      keydown = (function(_this) {
        return function(evt) {
          var key;
          evt.preventDefault();
          evt.stopPropagation();
          key = getKeyFromEvent(evt);
          _this.keysDown[key] = true;
          return eventQueue.push("keypressed", key, evt.which);
        };
      })(this);
      canvas.addEventListener("keydown", keydown, true);
      keyup = (function(_this) {
        return function(evt) {
          var key;
          evt.preventDefault();
          evt.stopPropagation();
          key = getKeyFromEvent(evt);
          _this.keysDown[key] = false;
          return eventQueue.push("keyreleased", key, evt.which);
        };
      })(this);
      canvas.addEventListener("keyup", keyup, true);
    }

    Keyboard.prototype.isDown = function() {
      var key, others;
      key = arguments[0], others = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (!this.keysDown[key]) {
        return false;
      } else {
        if (others.length === 0) {
          return true;
        } else {
          return this.isDown.apply(this, others);
        }
      }
    };

    keys = {
      8: "backspace",
      9: "tab",
      13: "return",
      16: "shift",
      17: "ctrl",
      18: "alt",
      19: "pause",
      20: "capslock",
      27: "escape",
      33: "pageup",
      34: "pagedown",
      35: "end",
      36: "home",
      45: "insert",
      46: "delete",
      37: "left",
      38: "up",
      39: "right",
      40: "down",
      91: "lmeta",
      92: "rmeta",
      93: "mode",
      96: "kp0",
      97: "kp1",
      98: "kp2",
      99: "kp3",
      100: "kp4",
      101: "kp5",
      102: "kp6",
      103: "kp7",
      104: "kp8",
      105: "kp9",
      106: "kp*",
      107: "kp+",
      109: "kp-",
      110: "kp.",
      111: "kp/",
      112: "f1",
      113: "f2",
      114: "f3",
      115: "f4",
      116: "f5",
      117: "f6",
      118: "f7",
      119: "f8",
      120: "f9",
      121: "f10",
      122: "f11",
      123: "f12",
      144: "numlock",
      145: "scrolllock",
      186: ",",
      187: "=",
      188: ",",
      189: "-",
      190: ".",
      191: "/",
      192: "`",
      219: "[",
      220: "\\",
      221: "]",
      222: "'"
    };

    shiftedKeys = {
      192: "~",
      48: ")",
      49: "!",
      50: "@",
      51: "#",
      52: "$",
      53: "%",
      54: "^",
      55: "&",
      56: "*",
      57: "(",
      109: "_",
      61: "+",
      219: "{",
      221: "}",
      220: "|",
      59: ":",
      222: "\"",
      188: "<",
      189: ">",
      191: "?",
      96: "insert",
      97: "end",
      98: "down",
      99: "pagedown",
      100: "left",
      102: "right",
      103: "home",
      104: "up",
      105: "pageup"
    };

    rightKeys = {
      16: "rshift",
      17: "rctrl",
      18: "ralt"
    };

    getKeyFromEvent = function(event) {
      var code, key;
      code = event.which;
      if (event.location && event.location > 1) {
        key = rightKeys[code];
      } else if (event.shiftKey) {
        key = shiftedKeys[code] || keys[code];
      } else {
        key = keys[code];
      }
      if (typeof key === "undefined") {
        key = String.fromCharCode(code);
        if (!event.shiftKey) {
          key = key.toLowerCase();
        }
      }
      return key;
    };

    return Keyboard;

  })();

  Love.Math = (function() {
    var any_point_in_triangle, getGammaArgs, is_ear, is_oriented_ccw, on_same_side, point_in_triangle, toPolygon;

    function Math() {
      this.triangulate = __bind(this.triangulate, this);
      this.setRandomSeed = __bind(this.setRandomSeed, this);
      this.randomNormal = __bind(this.randomNormal, this);
      this.random = __bind(this.random, this);
      this.noise = __bind(this.noise, this);
      this.newRandomGenerator = __bind(this.newRandomGenerator, this);
      this.newBezierCurve = __bind(this.newBezierCurve, this);
      this.linearToGamma = __bind(this.linearToGamma, this);
      this.isConvex = __bind(this.isConvex, this);
      this.getRandomSeed = __bind(this.getRandomSeed, this);
      this.gammaToLinear = __bind(this.gammaToLinear, this);
      var simplex_r;
      this.random_generator = new Love.Math.RandomGenerator();
      simplex_r = new Love.Math.RandomGenerator();
      this.simplex = new SimplexNoise(simplex_r.random.bind(simplex_r, simplex_r));
    }

    Math.prototype.gammaToLinear = function() {
      var c, gamma_colors, _i, _len, _results;
      gamma_colors = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      gamma_colors = getGammaArgs(gamma_colors);
      _results = [];
      for (_i = 0, _len = gamma_colors.length; _i < _len; _i++) {
        c = gamma_colors[_i];
        c /= 255;
        if (c > 1) {
          c = 1;
        } else if (c < 0) {
          c = 0;
        } else if (c < 0.0031308) {
          c *= 12.92;
        } else {
          c = 1.055 * window.Math.pow(c, 0.41666) - 0.055;
        }
        _results.push(c *= 255);
      }
      return _results;
    };

    Math.prototype.getRandomSeed = function() {
      return this.random_generator.getSeed(this.random_generator);
    };

    Math.prototype.isConvex = function() {
      var i, j, k, p, polygon, q, vertices, winding;
      vertices = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      polygon = toPolygon(vertices);
      i = polygon.length - 2;
      j = polygon.length - 1;
      k = 0;
      p = {
        x: polygon[j].x - polygon[i].x,
        y: polygon[j].y - polygon[i].y
      };
      q = {
        x: polygon[k].x - polygon[j].x,
        y: polygon[k].y - polygon[j].y
      };
      winding = p.x * q.y - p.y * q.x;
      while (k + 1 < polygon.length) {
        i = j;
        j = k;
        k++;
        p.x = polygon[j].x - polygon[i].x;
        p.y = polygon[j].y - polygon[i].y;
        q.x = polygon[k].x - polygon[j].x;
        q.y = polygon[k].y - polygon[j].y;
        if ((p.x * q.y - p.y * q.x) * winding < 0) {
          return false;
        }
      }
      return true;
    };

    Math.prototype.linearToGamma = function() {
      var c, linear_colors, _i, _len, _results;
      linear_colors = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      linear_colors = getGammaArgs(linear_colors);
      _results = [];
      for (_i = 0, _len = linear_colors.length; _i < _len; _i++) {
        c = linear_colors[_i];
        c /= 255;
        if (c > 1) {
          c = 1;
        } else if (c < 0) {
          c = 0;
        } else if (c <= 0.04045) {
          c /= 12.92;
        } else {
          c = window.Math.pow((c + 0.055) / 1.055, 2.4);
        }
        _results.push(c *= 255);
      }
      return _results;
    };

    Math.prototype.newBezierCurve = function() {
      var controlPoints, i, vertices;
      vertices = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      if (vertices.length === 1) {
        vertices = vertices[0].__shine ? vertices[0].__shine.numValues.slice(1, vertices[0].__shine.numValues.length) : vertices[0];
      }
      controlPoints = (function() {
        var _i, _ref, _results;
        _results = [];
        for (i = _i = 0, _ref = vertices.length; _i < _ref; i = _i += 2) {
          _results.push({
            x: vertices[i],
            y: vertices[i + 1]
          });
        }
        return _results;
      })();
      return new this.constructor.BezierCurve(controlPoints);
    };

    Math.prototype.newRandomGenerator = function(low, high) {
      var r;
      r = new Love.Math.RandomGenerator();
      if (low) {
        r.setSeed(r, low, high);
      }
      return r;
    };

    Math.prototype.noise = function() {
      var dimensions;
      dimensions = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      switch (dimensions.length) {
        case 1:
          return this.simplex.noise1D(dimensions[0]);
        case 2:
          return this.simplex.noise2D(dimensions[0], dimensions[1]);
        case 3:
          return this.simplex.noise3D(dimensions[0], dimensions[1], dimensions[2]);
        case 4:
          return this.simplex.noise4D(dimensions[0], dimensions[1], dimensions[2], dimensions[3]);
      }
    };

    Math.prototype.random = function(min, max) {
      return this.random_generator.random(this.random_generator, min, max);
    };

    Math.prototype.randomNormal = function(stddev, mean) {
      if (stddev == null) {
        stddev = 1;
      }
      if (mean == null) {
        mean = 0;
      }
      return this.random_generator.randomNormal(this.random_generator, stddev, mean);
    };

    Math.prototype.setRandomSeed = function(low, high) {
      return this.random_generator.setSeed(this.random_generator, low, high);
    };

    Math.prototype.triangulate = function() {
      var a, b, c, concave_vertices, current, i, idx_lm, lm, n_vertices, next, next_idx, p, polygon, prev, prev_idx, skipped, triangles, vertices, _i, _j, _ref, _ref1, _ref2, _ref3;
      vertices = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      polygon = toPolygon(vertices);
      next_idx = new Array(polygon.length);
      prev_idx = new Array(polygon.length);
      idx_lm = 0;
      for (i = _i = 0, _ref = polygon.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        lm = polygon[idx_lm];
        p = polygon[i];
        if (p.x < lm.x || (p.x === lm.x && p.y < lm.y)) {
          idx_lm = i;
        }
        next_idx[i] = i + 1;
        prev_idx[i] = i - 1;
      }
      next_idx[next_idx.length - 1] = 0;
      prev_idx[0] = prev_idx.length - 1;
      if (!is_oriented_ccw(polygon[prev_idx[idx_lm]], polygon[idx_lm], polygon[next_idx[idx_lm]])) {
        _ref1 = [prev_idx, next_idx], next_idx = _ref1[0], prev_idx = _ref1[1];
      }
      concave_vertices = [];
      for (i = _j = 0, _ref2 = polygon.length; 0 <= _ref2 ? _j < _ref2 : _j > _ref2; i = 0 <= _ref2 ? ++_j : --_j) {
        if (!is_oriented_ccw(polygon[prev_idx[i]], polygon[i], polygon[next_idx[i]])) {
          concave_vertices.push(polygon[i]);
        }
      }
      triangles = [];
      n_vertices = polygon.length;
      _ref3 = [1, 0], current = _ref3[0], skipped = _ref3[1], next = _ref3[2], prev = _ref3[3];
      while (n_vertices > 3) {
        next = next_idx[current];
        prev = prev_idx[current];
        a = polygon[prev];
        b = polygon[current];
        c = polygon[next];
        if (is_ear(a, b, c, concave_vertices)) {
          triangles.push([a, b, c]);
          next_idx[prev] = next;
          prev_idx[next] = prev;
          concave_vertices.splice(concave_vertices.indexOf(b), 1);
          --n_vertices;
          skipped = 0;
        } else if (++skipped > n_vertices) {
          console.log("Cannot triangulate polygon.");
        }
        current = next;
      }
      next = next_idx[current];
      prev = prev_idx[current];
      triangles.push([polygon[prev], polygon[current], polygon[next]]);
      return triangles;
    };

    getGammaArgs = function(colors) {
      if (colors.length === 1 && colors[0] instanceof Object) {
        return colors = colors[0].__shine ? colors[0].__shine.numValues.slice(1, colors[0].__shine.numValues.length) : colors[0];
      } else {
        return colors;
      }
    };

    toPolygon = function(vertices) {
      var i, _i, _ref, _results;
      if (vertices.length === 1) {
        vertices = vertices[0].__shine ? vertices[0].__shine.numValues.slice(1, vertices[0].__shine.numValues.length) : vertices[0];
      }
      _results = [];
      for (i = _i = 0, _ref = vertices.length; _i < _ref; i = _i += 2) {
        _results.push({
          x: vertices[i],
          y: vertices[i + 1]
        });
      }
      return _results;
    };

    is_oriented_ccw = function(a, b, c) {
      return ((b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x)) >= 0;
    };

    on_same_side = function(a, b, c, d) {
      var l, m, px, py;
      px = d.x - c.x;
      py = d.y - c.y;
      l = px * (a.y - c.y) - py * (a.x - c.x);
      m = px * (b.y - c.y) - py * (b.x - c.x);
      return l * m >= 0;
    };

    point_in_triangle = function(p, a, b, c) {
      return on_same_side(p, a, b, c) && on_same_side(p, b, a, c) && on_same_side(p, c, a, b);
    };

    any_point_in_triangle = function(vertices, a, b, c) {
      var p, _i, _len;
      for (_i = 0, _len = vertices.length; _i < _len; _i++) {
        p = vertices[_i];
        if ((p.x !== a.x && p.y !== a.y) && (p.x !== b.x && p.y !== a.y) && (p.x !== c.x && p.y !== a.y) && point_in_triangle(p, a, b, c)) {
          true;
        }
      }
      return false;
    };

    is_ear = function(a, b, c, vertices) {
      return is_oriented_ccw(a, b, c) && !any_point_in_triangle(vertices, a, b, c);
    };

    return Math;

  })();

  Love.Mouse = (function() {
    var getButtonFromEvent, getWheelButtonFromEvent, mouseButtonNames;

    Mouse.WHEEL_TIMEOUT = 0.02;

    function Mouse(eventQueue, canvas) {
      this.setY = __bind(this.setY, this);
      this.setX = __bind(this.setX, this);
      this.setVisible = __bind(this.setVisible, this);
      this.setPosition = __bind(this.setPosition, this);
      this.setGrabbed = __bind(this.setGrabbed, this);
      this.setCursor = __bind(this.setCursor, this);
      this.newCursor = __bind(this.newCursor, this);
      this.isVisible = __bind(this.isVisible, this);
      this.isGrabbed = __bind(this.isGrabbed, this);
      this.isDown = __bind(this.isDown, this);
      this.getY = __bind(this.getY, this);
      this.getX = __bind(this.getX, this);
      this.getSystemCursor = __bind(this.getSystemCursor, this);
      this.getPosition = __bind(this.getPosition, this);
      this.getCursor = __bind(this.getCursor, this);
      var handlePress, handleRelease, handleWheel;
      this.x = 0;
      this.y = 0;
      this.buttonsDown = {};
      this.wheelTimeOuts = {};
      handlePress = (function(_this) {
        return function(button) {
          _this.buttonsDown[button] = true;
          return eventQueue.push("mousepressed", _this.x, _this.y, button);
        };
      })(this);
      handleRelease = (function(_this) {
        return function(button) {
          _this.buttonsDown[button] = false;
          return eventQueue.push("mousereleased", _this.x, _this.y, button);
        };
      })(this);
      handleWheel = (function(_this) {
        return function(evt) {
          var button;
          evt.preventDefault();
          button = getWheelButtonFromEvent(evt);
          clearTimeout(_this.wheelTimeOuts[button]);
          _this.wheelTimeOuts[button] = setTimeout(function() {
            return handleRelease(button);
          }, _this.constructor.WHEEL_TIMEOUT * 1000);
          return handlePress(button);
        };
      })(this);
      canvas.addEventListener('mousemove', (function(_this) {
        return function(evt) {
          var rect;
          rect = Love.element.getBoundingClientRect();
          _this.x = evt.pageX - rect.left;
          return _this.y = evt.pageY - rect.top;
        };
      })(this));
      canvas.addEventListener('mousedown', (function(_this) {
        return function(evt) {
          return handlePress(getButtonFromEvent(evt));
        };
      })(this));
      canvas.addEventListener('mouseup', (function(_this) {
        return function(evt) {
          return handleRelease(getButtonFromEvent(evt));
        };
      })(this));
      canvas.addEventListener('DOMMouseScroll', handleWheel);
      canvas.addEventListener('mousewheel', handleWheel);
    }

    Mouse.prototype.getCursor = function() {
      return null;
    };

    Mouse.prototype.getPosition = function() {
      return [this.x, this.y];
    };

    Mouse.prototype.getSystemCursor = function() {
      return null;
    };

    Mouse.prototype.getX = function() {
      return this.x;
    };

    Mouse.prototype.getY = function() {
      return this.y;
    };

    Mouse.prototype.isDown = function() {
      var button, others;
      button = arguments[0], others = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (!this.buttonsDown[button]) {
        return false;
      } else {
        if (others.length === 0) {
          return true;
        } else {
          return this.isDown.apply(this, others);
        }
      }
    };

    Mouse.prototype.isGrabbed = function() {
      return false;
    };

    Mouse.prototype.isVisible = function() {
      return true;
    };

    Mouse.prototype.newCursor = function() {
      return null;
    };

    Mouse.prototype.setCursor = function(cursor) {};

    Mouse.prototype.setGrabbed = function(grab) {};

    Mouse.prototype.setPosition = function(x, y) {
      this.setX(x);
      return this.setY(y);
    };

    Mouse.prototype.setVisible = function(visible) {};

    Mouse.prototype.setX = function(x) {};

    Mouse.prototype.setY = function(y) {};

    mouseButtonNames = {
      1: "l",
      2: "m",
      3: "r"
    };

    getButtonFromEvent = function(evt) {
      return mouseButtonNames[evt.which];
    };

    getWheelButtonFromEvent = function(evt) {
      var delta;
      delta = Math.max(-1, Math.min(1, evt.wheelDelta || -evt.detail));
      if (delta === 1) {
        return 'wu';
      } else {
        return 'wd';
      }
    };

    return Mouse;

  })();

  Love.System = (function() {
    function System() {
      this.setClipboardText = __bind(this.setClipboardText, this);
      this.openURL = __bind(this.openURL, this);
      this.getProcessorCount = __bind(this.getProcessorCount, this);
      this.getPowerInfo = __bind(this.getPowerInfo, this);
      this.getOS = __bind(this.getOS, this);
      this.getClipboardText = __bind(this.getClipboardText, this);
    }

    System.prototype.getClipboardText = function() {};

    System.prototype.getOS = function() {
      return window.navigator.appVersion;
    };

    System.prototype.getPowerInfo = function() {
      var battery, percent, seconds, state;
      battery = window.navigator.battery;
      if (battery) {
        state = battery.charging ? "charging" : "unknown";
        percent = battery.level * 100;
        seconds = battery.dischargingTime;
        return [state, percent, seconds];
      } else {
        return ["unknown", null, null];
      }
    };

    System.prototype.getProcessorCount = function() {
      return window.navigator.hardwareConcurrency || 1;
    };

    System.prototype.openURL = function(url) {
      return window.open(url);
    };

    System.prototype.setClipboardText = function(text) {};

    return System;

  })();

  Love.Timer = (function() {
    var lastTime, performance, requestAnimationFrame;

    function Timer() {
      this.step = __bind(this.step, this);
      this.sleep = __bind(this.sleep, this);
      this.getTime = __bind(this.getTime, this);
      this.getFPS = __bind(this.getFPS, this);
      this.getDelta = __bind(this.getDelta, this);
      this.nextFrame = __bind(this.nextFrame, this);
      this.microTime = performance.now();
      this.deltaTime = 0;
      this.deltaTimeLimit = 0.25;
      this.events = {};
      this.maxEventId = 0;
    }

    Timer.prototype.nextFrame = function(callback) {
      return requestAnimationFrame(callback);
    };

    Timer.prototype.getDelta = function() {
      return this.deltaTime;
    };

    Timer.prototype.getFPS = function() {
      if (this.deltaTime === 0) {
        return 0;
      } else {
        return 1 / this.deltaTime;
      }
    };

    Timer.prototype.getTime = function() {
      return this.microTime;
    };

    Timer.prototype.sleep = function() {};

    Timer.prototype.step = function() {
      var dt;
      dt = (performance.now() - this.microTime) / 1000;
      this.deltaTime = Math.max(0, Math.min(this.deltaTimeLimit, dt));
      return this.microTime += dt * 1000;
    };

    performance = window.performance || Date;

    performance.now = performance.now || performance.msNow || performance.mozNow || performance.webkitNow || Date.now;

    lastTime = 0;

    requestAnimationFrame = window.requestAnimationFrame || window.msRequestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.oRequestAnimationFrame || function(callback) {
      var currTime, delay, timeToCall;
      currTime = performance.now();
      timeToCall = Math.max(0, 16 - (currTime - lastTime));
      delay = function() {
        return callback(currTime + timeToCall);
      };
      lastTime = currTime + timeToCall;
      return setTimeout(delay, timeToCall);
    };

    return Timer;

  })();

  Love.Touch = (function() {
    var Finger, getFingerIndex;

    function Touch(eventQueue, canvas) {
      this.getTouchCount = __bind(this.getTouchCount, this);
      this.getTouch = __bind(this.getTouch, this);
      var preventDefault, touchend;
      this.fingers = [];
      preventDefault = function(evt) {
        evt.preventDefault();
        return evt.stopPropagation();
      };
      canvas.addEventListener('gesturestart', preventDefault);
      canvas.addEventListener('gesturechange', preventDefault);
      canvas.addEventListener('gestureend', preventDefault);
      canvas.addEventListener('touchstart', (function(_this) {
        return function(evt) {
          var finger, index, rect, t, _i, _len, _ref, _results;
          preventDefault(evt);
          _ref = evt.targetTouches;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            t = _ref[_i];
            index = getFingerIndex(_this.fingers, t.identifier);
            if (index === -1) {
              rect = Love.element.getBoundingClientRect();
              finger = new Finger(t.identifier, t.pageX - rect.left, t.pageY - rect.top);
              _this.fingers.push(finger);
              _results.push(eventQueue.push('touchpressed', finger.identifier, finger.x, finger.y));
            } else {
              _results.push(void 0);
            }
          }
          return _results;
        };
      })(this));
      touchend = (function(_this) {
        return function(evt) {
          var finger, index, t, _i, _len, _ref, _results;
          preventDefault(evt);
          _ref = evt.changedTouches;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            t = _ref[_i];
            index = getFingerIndex(_this.fingers, t.identifier);
            if (index >= 0) {
              finger = _this.fingers[index];
              _this.fingers.splice(index, 1);
              _results.push(eventQueue.push('touchreleased', finger.identifier, finger.x, finger.y));
            } else {
              _results.push(void 0);
            }
          }
          return _results;
        };
      })(this);
      canvas.addEventListener('touchend', touchend);
      canvas.addEventListener('touchleave', touchend);
      canvas.addEventListener('touchcancel', touchend);
      canvas.addEventListener('touchmove', (function(_this) {
        return function(evt) {
          var finger, index, rect, t, _i, _len, _ref, _results;
          preventDefault(evt);
          _ref = evt.targetTouches;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            t = _ref[_i];
            index = getFingerIndex(_this.fingers, t.identifier);
            if (index >= 0) {
              finger = _this.fingers[index];
              rect = Love.element.getBoundingClientRect();
              finger.x = t.pageX - rect.left;
              finger.y = t.pageY - rect.top;
              _results.push(eventQueue.push('touchmoved', finger.identifier, finger.x, finger.y));
            } else {
              _results.push(void 0);
            }
          }
          return _results;
        };
      })(this));
    }

    Touch.prototype.getTouch = function(id) {
      var finger;
      finger = this.fingers[id];
      if (finger) {
        return [finger.identifier, finger.x, finger.y, 1];
      } else {
        return null;
      }
    };

    Touch.prototype.getTouchCount = function() {
      return Object.keys(this.fingers).length;
    };

    getFingerIndex = function(fingers, id) {
      var finger, index, _i, _ref;
      for (index = _i = 0, _ref = fingers.length; 0 <= _ref ? _i < _ref : _i > _ref; index = 0 <= _ref ? ++_i : --_i) {
        finger = fingers[index];
        if (finger.identifier === id) {
          return index;
        }
      }
      return -1;
    };

    Finger = (function() {
      function Finger(identifier, x, y) {
        this.identifier = identifier;
        this.x = x;
        this.y = y;
      }

      return Finger;

    })();

    return Touch;

  })();

  Love.Window = (function() {
    function Window(graphics) {
      this.graphics = graphics;
      this.setTitle = __bind(this.setTitle, this);
      this.setMode = __bind(this.setMode, this);
      this.setIcon = __bind(this.setIcon, this);
      this.setFullscreen = __bind(this.setFullscreen, this);
      this.isVisible = __bind(this.isVisible, this);
      this.isCreated = __bind(this.isCreated, this);
      this.hasMouseFocus = __bind(this.hasMouseFocus, this);
      this.hasFocus = __bind(this.hasFocus, this);
      this.getWidth = __bind(this.getWidth, this);
      this.getTitle = __bind(this.getTitle, this);
      this.getPixelScale = __bind(this.getPixelScale, this);
      this.getMode = __bind(this.getMode, this);
      this.getIcon = __bind(this.getIcon, this);
      this.getHeight = __bind(this.getHeight, this);
      this.getFullscreenModes = __bind(this.getFullscreenModes, this);
      this.getFullscreen = __bind(this.getFullscreen, this);
      this.getDisplayCount = __bind(this.getDisplayCount, this);
      this.getDimensions = __bind(this.getDimensions, this);
      this.getDesktopDimensions = __bind(this.getDesktopDimensions, this);
      this.fullscreen = false;
    }

    Window.prototype.getDesktopDimensions = function() {
      return [window.screen.width, window.screen.height];
    };

    Window.prototype.getDimensions = function() {
      return [this.getWidth(), this.getHeight()];
    };

    Window.prototype.getDisplayCount = function() {};

    Window.prototype.getFullscreen = function() {
      return this.fullscreen;
    };

    Window.prototype.getFullscreenModes = function() {
      return [];
    };

    Window.prototype.getHeight = function() {
      return this.graphics.getHeight();
    };

    Window.prototype.getIcon = function() {};

    Window.prototype.getMode = function() {};

    Window.prototype.getPixelScale = function() {
      return window.devicePixelRatio;
    };

    Window.prototype.getTitle = function() {
      return window.document.title;
    };

    Window.prototype.getWidth = function() {
      return this.graphics.getWidth();
    };

    Window.prototype.hasFocus = function() {
      return document.activeElement === Love.element;
    };

    Window.prototype.hasMouseFocus = function() {};

    Window.prototype.isCreated = function() {};

    Window.prototype.isVisible = function() {};

    Window.prototype.setFullscreen = function(fullscreen) {
      this.fullscreen = fullscreen;
      return this.fullscreen = false;
    };

    Window.prototype.setIcon = function() {};

    Window.prototype.setMode = function(width, height, flags) {
      return this.graphics.default_canvas.setDimensions(width, height);
    };

    Window.prototype.setTitle = function(title) {
      return window.document.title = title;
    };

    return Window;

  })();

  Love.Audio.Source = (function() {
    function Source(filename, type) {
      this.filename = filename;
      this.type = type;
      this.element = document.createElement("audio");
      this.element.setAttribute("src", Love.root + "/" + filename);
      this.element.setAttribute("preload", "auto");
    }

    Source.prototype.clone = function(self) {
      return new Source(self.filename, self.type);
    };

    Source.prototype.getAttenuationDistances = function(self) {};

    Source.prototype.getChannels = function(self) {};

    Source.prototype.getCone = function(self) {};

    Source.prototype.getDirection = function(self) {};

    Source.prototype.getPitch = function(self) {};

    Source.prototype.getPosition = function(self) {};

    Source.prototype.getRolloff = function(self) {};

    Source.prototype.getVelocity = function(self) {};

    Source.prototype.getVolume = function(self) {
      return self.element.volume;
    };

    Source.prototype.getVolumeLimits = function(self) {};

    Source.prototype.isLooping = function(self) {
      return !!self.element.getAttribute("loop");
    };

    Source.prototype.isPaused = function(self) {
      return self.element.paused;
    };

    Source.prototype.isPlaying = function(self) {
      return !self.element.paused;
    };

    Source.prototype.isRelative = function(self) {};

    Source.prototype.isStatic = function(self) {};

    Source.prototype.isStopped = function(self) {
      return self.isPaused(self) && self.currentTime === 0;
    };

    Source.prototype.pause = function(self) {
      return self.element.pause();
    };

    Source.prototype.play = function(self) {
      return self.element.play();
    };

    Source.prototype.resume = function(self) {
      return self.element.play();
    };

    Source.prototype.rewind = function(self) {
      return self.element.currentTime = 0;
    };

    Source.prototype.seek = function(self, offset, time_unit) {
      if (time_unit == null) {
        time_unit = "seconds";
      }
      switch (time_unit) {
        case "seconds":
          return self.element.currentTime = offset;
      }
    };

    Source.prototype.setAttenuationDistances = function(self) {};

    Source.prototype.setCone = function(self) {};

    Source.prototype.setDirection = function(self) {};

    Source.prototype.setLooping = function(self, looping) {
      return self.element.setAttribute("loop", looping);
    };

    Source.prototype.setPitch = function(self) {};

    Source.prototype.setPosition = function(self) {};

    Source.prototype.setRelative = function(self) {};

    Source.prototype.setRolloff = function(self) {};

    Source.prototype.setVelocity = function(self) {};

    Source.prototype.setVolume = function(self, volume) {
      return self.element.volume = volume;
    };

    Source.prototype.setVolumeLimits = function(self) {};

    Source.prototype.stop = function(self) {
      return self.element.load();
    };

    Source.prototype.tell = function(self, time_unit) {
      if (time_unit == null) {
        time_unit = "seconds";
      }
      switch (time_unit) {
        case "seconds":
          return self.element.currentTime;
        case "samples":
          return 0;
      }
    };

    return Source;

  })();

  Love.Graphics.Canvas2D = (function() {
    Canvas2D.TRANSPARENT = new Love.Color(0, 0, 0, 0);

    function Canvas2D(width, height, element) {
      var canvas_height, canvas_width;
      this.element = element;
      this.getWidth = __bind(this.getWidth, this);
      this.getImageData = __bind(this.getImageData, this);
      this.getHeight = __bind(this.getHeight, this);
      this.getDimensions = __bind(this.getDimensions, this);
      if (this.element == null) {
        this.element = document.createElement('canvas');
      }
      if ((canvas_width = Number(this.element.getAttribute('width'))) !== 0) {
        width = canvas_width;
      }
      if ((canvas_height = Number(this.element.getAttribute('height'))) !== 0) {
        height = canvas_height;
      }
      this.setDimensions(width, height);
      this.context = this.element.getContext('2d');
      this.current_transform = Matrix.I(3);
    }

    Canvas2D.prototype.clear = function(self, r, g, b, a) {
      var color;
      if (r === null || r === void 0) {
        color = this.constructor.TRANSPARENT;
      } else {
        color = new Color(r, g, b, a);
      }
      self.context.save();
      self.context.setTransform(1, 0, 0, 1, 0, 0);
      self.context.fillStyle = color.html_code;
      self.context.globalAlpha = color.a / 255;
      self.context.fillRect(0, 0, self.width, self.height);
      return self.context.restore();
    };

    Canvas2D.prototype.getDimensions = function() {
      return [this.getWidth(), this.getHeight()];
    };

    Canvas2D.prototype.getHeight = function() {
      return this.height;
    };

    Canvas2D.prototype.getImageData = function() {
      var image_data;
      image_data = this.context.getImageData(0, 0, this.width, this.height);
      return new ImageData(image_data);
    };

    Canvas2D.prototype.getPixel = function(self, x, y) {
      var data;
      data = self.context.getImageData(x, y, 1, 1).data;
      return [data[0], data[1], data[2], data[3]];
    };

    Canvas2D.prototype.getWidth = function() {
      return this.width;
    };

    Canvas2D.prototype.getWrap = function(self) {};

    Canvas2D.prototype.setWrap = function(self) {};

    Canvas2D.prototype.arc = function(mode, x, y, radius, startAngle, endAngle, points) {
      var angle_shift, i, phi, _i;
      points || (points = radius > 10 ? radius : 10);
      angle_shift = (endAngle - startAngle) / points;
      phi = startAngle - angle_shift;
      this.context.beginPath();
      this.context.moveTo(x, y);
      for (i = _i = 0; 0 <= points ? _i <= points : _i >= points; i = 0 <= points ? ++_i : --_i) {
        phi += angle_shift;
        this.context.lineTo(x + radius * Math.cos(phi), y + radius * Math.sin(phi));
      }
      this.context.closePath();
      switch (mode) {
        case "fill":
          return this.context.fill();
        case "line":
          return this.context.stroke();
      }
    };

    Canvas2D.prototype.circle = function(mode, x, y, radius, segments) {
      if (radius < 0) {
        return;
      }
      this.context.beginPath();
      this.context.arc(x, y, radius, 0, 2 * Math.PI);
      this.context.closePath();
      switch (mode) {
        case "fill":
          return this.context.fill();
        case "line":
          return this.context.stroke();
      }
    };

    Canvas2D.prototype.draw = function(drawable, quad) {
      switch (true) {
        case !(quad instanceof Love.Graphics.Quad):
          return this.drawDrawable.apply(this, arguments);
        case quad instanceof Love.Graphics.Quad:
          return this.drawWithQuad.apply(this, arguments);
      }
    };

    Canvas2D.prototype.line = function() {
      var i, points, x, y, _i, _ref, _ref1;
      points = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      if (points.length === 1) {
        points = points[0].__shine.numValues.slice(1, points[0].__shine.numValues.length);
      }
      this.context.beginPath();
      this.context.moveTo(points[0], points[1]);
      for (i = _i = 2, _ref = points.length; _i < _ref; i = _i += 2) {
        _ref1 = [points[i], points[i + 1]], x = _ref1[0], y = _ref1[1];
        this.context.lineTo(x, y);
      }
      return this.context.stroke();
    };

    Canvas2D.prototype.point = function(x, y) {
      return this.context.fillRect(x, y, 1, 1);
    };

    Canvas2D.prototype.polygon = function() {
      var i, mode, points, x, y, _i, _ref, _ref1;
      mode = arguments[0], points = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (points.length === 1) {
        points = points[0].__shine.numValues.slice(1, points[0].__shine.numValues.length);
      }
      this.context.beginPath();
      this.context.moveTo(points[0], points[1]);
      for (i = _i = 2, _ref = points.length; _i < _ref; i = _i += 2) {
        _ref1 = [points[i], points[i + 1]], x = _ref1[0], y = _ref1[1];
        this.context.lineTo(x, y);
      }
      this.context.closePath();
      switch (mode) {
        case "fill":
          return this.context.fill();
        case "line":
          return this.context.stroke();
      }
    };

    Canvas2D.prototype.print = function(text, x, y) {
      return this.context.fillText(text, x, y);
    };

    Canvas2D.prototype.printf = function(text, x, y, limit, align) {
      if (align == null) {
        align = "left";
      }
      this.context.save();
      this.context.translate(x + limit / 2, y);
      switch (align) {
        case "center":
          this.context.textAlign = "center";
          break;
        case "left":
          this.context.textAlign = "left";
          break;
        case "right":
          this.context.textAlign = "right";
      }
      this.context.fillText(text, 0, 0);
      this.context.restore();
      return this.context.textBaseline = "top";
    };

    Canvas2D.prototype.rectangle = function(mode, x, y, width, height) {
      switch (mode) {
        case "fill":
          return this.context.fillRect(x, y, width, height);
        case "line":
          return this.context.strokeRect(x, y, width, height);
      }
    };

    Canvas2D.prototype.getBackgroundColor = function() {
      var c;
      c = this.background_color;
      return [c.r, c.g, c.b, c.a];
    };

    Canvas2D.prototype.getBlendMode = function() {
      switch (this.context.globalCompositeOperation) {
        case "source-over":
          return "alpha";
        case "multiply":
          return "multiplicative";
        case "lighten":
          return "additive";
      }
    };

    Canvas2D.prototype.getColor = function() {
      var c;
      c = this.current_color;
      return [c.r, c.g, c.b, c.a];
    };

    Canvas2D.prototype.getColorMask = function() {};

    Canvas2D.prototype.getDefaultFilter = function() {};

    Canvas2D.prototype.getFont = function() {
      return this.current_font;
    };

    Canvas2D.prototype.getLineJoin = function() {};

    Canvas2D.prototype.getLineStyle = function() {};

    Canvas2D.prototype.getLineWidth = function() {};

    Canvas2D.prototype.getMaxImageSize = function() {};

    Canvas2D.prototype.getMaxPointSize = function() {};

    Canvas2D.prototype.getPointSize = function() {};

    Canvas2D.prototype.getPointStyle = function() {};

    Canvas2D.prototype.getRendererInfo = function() {};

    Canvas2D.prototype.getScissor = function() {};

    Canvas2D.prototype.getShader = function() {};

    Canvas2D.prototype.getSystemLimit = function() {};

    Canvas2D.prototype.isSupported = function() {};

    Canvas2D.prototype.isWireframe = function() {};

    Canvas2D.prototype.setBackgroundColor = function(r, g, b, a) {
      if (typeof r === "number") {
        return this.background_color = new Color(r, g, b, a);
      } else {
        return this.background_color = new Color(r.getMember(1), r.getMember(2), r.getMember(3), r.getMember(4));
      }
    };

    Canvas2D.prototype.setBlendMode = function(mode) {
      switch (mode) {
        case "alpha":
          return this.context.globalCompositeOperation = "source-over";
        case "multiplicative":
          return this.context.globalCompositeOperation = "multiply";
        case "additive":
          return this.context.globalCompositeOperation = "lighten";
      }
    };

    Canvas2D.prototype.setColor = function(r, g, b, a) {
      if (a == null) {
        a = 255;
      }
      if (typeof r === "number") {
        this.current_color = new Color(r, g, b, a);
      } else {
        this.current_color = new Color(r.getMember(1), r.getMember(2), r.getMember(3), r.getMember(4));
      }
      this.context.fillStyle = this.current_color.html_code;
      this.context.strokeStyle = this.current_color.html_code;
      return this.context.globalAlpha = this.current_color.a / 255;
    };

    Canvas2D.prototype.setFont = function(font) {
      this.current_font = font;
      if (font) {
        return this.context.font = font.html_code;
      } else {
        return this.context.font = this.default_font.html_code;
      }
    };

    Canvas2D.prototype.setColorMask = function() {};

    Canvas2D.prototype.setDefaultFilter = function() {};

    Canvas2D.prototype.setInvertedStencil = function() {};

    Canvas2D.prototype.setLineJoin = function() {};

    Canvas2D.prototype.setLineStyle = function() {};

    Canvas2D.prototype.setLineWidth = function() {};

    Canvas2D.prototype.setPointSize = function() {};

    Canvas2D.prototype.setPointStyle = function() {};

    Canvas2D.prototype.setScissor = function(x, y, width, height) {};

    Canvas2D.prototype.setShader = function() {};

    Canvas2D.prototype.setStencil = function(callback) {};

    Canvas2D.prototype.setWireframe = function() {};

    Canvas2D.prototype.origin = function() {
      return this.context.setTransform(1, 0, 0, 1, 0, 0);
    };

    Canvas2D.prototype.pop = function() {
      return this.context.restore();
    };

    Canvas2D.prototype.push = function() {
      return this.context.save();
    };

    Canvas2D.prototype.rotate = function(r) {
      return this.context.rotate(r);
    };

    Canvas2D.prototype.scale = function(sx, sy) {
      if (sy == null) {
        sy = sx;
      }
      return this.context.scale(sx, sy);
    };

    Canvas2D.prototype.shear = function(kx, ky) {
      return this.context.transform(1, ky, kx, 1, 0, 0);
    };

    Canvas2D.prototype.translate = function(dx, dy) {
      return this.context.translate(dx, dy);
    };

    Canvas2D.prototype.copyContext = function(context) {
      this.context.fillStyle = context.fillStyle;
      this.context.font = context.font;
      this.context.globalAlpha = context.globalAlpha;
      this.context.globalCompositeOperation = context.globalCompositeOperation;
      this.context.lineCap = context.lineCap;
      this.context.lineDashOffset = context.lineDashOffset;
      this.context.lineJoin = context.lineJoin;
      this.context.lineWidth = context.lineWidth;
      this.context.miterLimit = context.miterLimit;
      this.context.shadowBlur = context.shadowBlur;
      this.context.shadowColor = context.shadowColor;
      this.context.shadowOffsetX = context.shadowOffsetX;
      this.context.shadowOffsetY = context.shadowOffsetY;
      this.context.strokeStyle = context.strokeStyle;
      this.context.textAlign = context.textAlign;
      return this.context.textBaseline = context.textBaseline;
    };

    Canvas2D.prototype.setDimensions = function(width, height) {
      this.width = width;
      this.height = height;
      this.element.setAttribute('width', this.width);
      return this.element.setAttribute('height', this.height);
    };

    Canvas2D.prototype.drawDrawable = function(drawable, x, y, r, sx, sy, ox, oy, kx, ky) {
      var halfHeight, halfWidth;
      if (x == null) {
        x = 0;
      }
      if (y == null) {
        y = 0;
      }
      if (r == null) {
        r = 0;
      }
      if (sx == null) {
        sx = 1;
      }
      if (sy == null) {
        sy = sx;
      }
      if (ox == null) {
        ox = 0;
      }
      if (oy == null) {
        oy = 0;
      }
      if (kx == null) {
        kx = 0;
      }
      if (ky == null) {
        ky = 0;
      }
      halfWidth = drawable.element.width / 2;
      halfHeight = drawable.element.height / 2;
      this.context.save();
      this.context.translate(x, y);
      this.context.rotate(r);
      this.context.scale(sx, sy);
      this.context.transform(1, ky, kx, 1, 0, 0);
      this.context.translate(-ox, -oy);
      this.context.drawImage(drawable.element, 0, 0);
      return this.context.restore();
    };

    Canvas2D.prototype.drawWithQuad = function(drawable, quad, x, y, r, sx, sy, ox, oy, kx, ky) {
      var halfHeight, halfWidth;
      if (x == null) {
        x = 0;
      }
      if (y == null) {
        y = 0;
      }
      if (r == null) {
        r = 0;
      }
      if (sx == null) {
        sx = 1;
      }
      if (sy == null) {
        sy = sx;
      }
      if (ox == null) {
        ox = 0;
      }
      if (oy == null) {
        oy = 0;
      }
      if (kx == null) {
        kx = 0;
      }
      if (ky == null) {
        ky = 0;
      }
      halfWidth = drawable.element.width / 2;
      halfHeight = drawable.element.height / 2;
      this.context.save();
      this.context.translate(x, y);
      this.context.rotate(r);
      this.context.scale(sx, sy);
      this.context.transform(1, ky, kx, 1, 0, 0);
      this.context.translate(-ox, -oy);
      this.context.drawImage(drawable.element, quad.x, quad.y, quad.width, quad.height, 0, 0, quad.width, quad.height);
      return this.context.restore();
    };

    return Canvas2D;

  })();

  Love.Graphics.Font = (function() {
    function Font(filename, size) {
      this.filename = filename;
      this.size = size;
      this.html_code = "" + this.size + "px " + this.filename;
    }

    Font.prototype.getAscent = function(self) {};

    Font.prototype.getBaseline = function(self) {};

    Font.prototype.getDescent = function(self) {};

    Font.prototype.getFilter = function(self) {};

    Font.prototype.getHeight = function(self) {};

    Font.prototype.getLineHeight = function(self) {};

    Font.prototype.getWidth = function(self) {};

    Font.prototype.getWrap = function(self) {};

    Font.prototype.hasGlyphs = function(self) {};

    Font.prototype.setFilter = function(self) {};

    Font.prototype.setLineHeight = function(self) {};

    return Font;

  })();

  Love.Graphics.Image = (function() {
    function Image(data) {
      var filename;
      if (data instanceof Love.ImageModule.ImageData) {
        this.element = document.createElement("img");
        this.element.setAttribute("src", data.getString(data));
      } else {
        filename = data;
        this.element = document.getElementById(filename);
        if (this.element === null) {
          this.element = document.createElement("img");
          this.element.setAttribute("src", Love.root + "/" + filename);
        }
      }
    }

    Image.prototype.getData = function(self) {};

    Image.prototype.getDimensions = function(self) {
      return [self.element.width, self.element.height];
    };

    Image.prototype.getFilter = function(self) {};

    Image.prototype.getHeight = function(self) {
      return self.element.height;
    };

    Image.prototype.getMipmapFilter = function(self) {};

    Image.prototype.getWidth = function(self) {
      return self.element.width;
    };

    Image.prototype.getWrap = function(self) {};

    Image.prototype.isCompressed = function(self) {};

    Image.prototype.refresh = function(self) {};

    Image.prototype.setFilter = function(self) {};

    Image.prototype.setMipmapFilter = function(self) {};

    Image.prototype.setWrap = function(self) {};

    return Image;

  })();

  Love.Graphics.Quad = (function() {
    function Quad(x, y, width, height, sw, sh) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.sw = sw;
      this.sh = sh;
    }

    Quad.prototype.getViewport = function(self) {
      return [self.x, self.y, self.width, self.height];
    };

    Quad.prototype.setViewport = function(self, x, y, width, height) {
      self.x = x;
      self.y = y;
      self.width = width;
      return self.height = height;
    };

    return Quad;

  })();

  Love.FileSystem.FileData = (function() {
    function FileData(contents, name, decoder) {
      this.contents = contents;
      this.name = name;
      this.extension = this.name.match("\\.(.*)")[1];
    }

    FileData.prototype.getPointer = function(self) {};

    FileData.prototype.getSize = function(self) {};

    FileData.prototype.getString = function(self) {
      return self.contents;
    };

    FileData.prototype.getExtension = function(self) {
      return self.extension;
    };

    FileData.prototype.getFilename = function(self) {
      return self.name;
    };

    return FileData;

  })();

  Love.ImageModule.ImageData = (function() {
    function ImageData(filedata) {
      this.contents = "data:image/" + (filedata.getExtension(filedata)) + ";base64," + (filedata.getString(filedata));
    }

    ImageData.prototype.getString = function(self) {
      return this.contents;
    };

    ImageData.prototype.encode = function(self) {};

    ImageData.prototype.getDimensions = function(self) {};

    ImageData.prototype.getHeight = function(self) {};

    ImageData.prototype.getPixel = function(self) {};

    ImageData.prototype.getWidth = function(self) {};

    ImageData.prototype.mapPixel = function(self) {};

    ImageData.prototype.paste = function(self) {};

    ImageData.prototype.setPixel = function(self) {};

    return ImageData;

  })();

  Love.Math.BezierCurve = (function() {
    var subdivide;

    function BezierCurve(controlPoints) {
      this.controlPoints = controlPoints;
    }

    BezierCurve.prototype.evaluate = function(self, t) {
      var i, points, step, _i, _j, _ref, _ref1;
      if (t < 0 || t > 1) {
        throw new Love.Exception("Invalid evaluation parameter: must be between 0 and 1");
      }
      if (self.controlPoints.length < 2) {
        throw new Love.Exception("Invalid Bezier curve: Not enough control points.");
      }
      points = self.controlPoints.slice(0);
      for (step = _i = 1, _ref = self.controlPoints.length; 1 <= _ref ? _i < _ref : _i > _ref; step = 1 <= _ref ? ++_i : --_i) {
        for (i = _j = 0, _ref1 = self.controlPoints.length - step; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
          points[i] = {
            x: points[i].x * (1 - t) + points[i + 1].x * t,
            y: points[i].y * (1 - t) + points[i + 1].y * t
          };
        }
      }
      return [points[0].x, points[0].y];
    };

    BezierCurve.prototype.getControlPoint = function(self, i) {
      if (i < 0) {
        i += self.controlPoints.length;
      }
      if (i < 0 || i >= self.controlPoints.length) {
        throw new Love.Exception("Invalid control point index");
      }
      return [self.controlPoints[i].x, self.controlPoints[i].y];
    };

    BezierCurve.prototype.getControlPointCount = function(self) {
      return self.controlPoints.length;
    };

    BezierCurve.prototype.getDegree = function(self) {
      return self.controlPoints.length - 1;
    };

    BezierCurve.prototype.getDerivative = function(self) {
      var degree, forward_differences, i, _i, _ref;
      if (self.getDegree(self) < 1) {
        throw new Love.Exception("Cannot derive a curve of degree < 1.");
      }
      forward_differences = new Array();
      degree = self.getDegree(self);
      for (i = _i = 0, _ref = self.controlPoints.length - 1; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        forward_differences.push({
          x: (self.controlPoints[i + 1].x - self.controlPoints[i].x) * degree,
          y: (self.controlPoints[i + 1].y - self.controlPoints[i].y) * degree
        });
      }
      return new self.constructor(forward_differences);
    };

    BezierCurve.prototype.insertControlPoint = function(self, x, y, pos) {
      if (pos == null) {
        pos = -1;
      }
      if (pos < 0) {
        pos += self.controlPoints.length + 1;
      }
      if (pos < 0 || pos > self.controlPoints.length) {
        throw new Love.Exception("Invalid control point index");
      }
      return self.controlPoints.splice(pos, 0, {
        x: x,
        y: y
      });
    };

    BezierCurve.prototype.render = function(self, depth) {
      var results, vertice, vertices, _i, _len;
      if (depth == null) {
        depth = 5;
      }
      if (self.controlPoints.length < 2) {
        throw new Love.Exception("Invalid Bezier curve: Not enough control points.");
      }
      vertices = self.controlPoints.slice(0);
      subdivide(vertices, depth);
      results = [];
      for (_i = 0, _len = vertices.length; _i < _len; _i++) {
        vertice = vertices[_i];
        results.push(vertice.x);
        results.push(vertice.y);
      }
      return results;
    };

    BezierCurve.prototype.rotate = function(self, angle, ox, oy) {
      var c, controlPoint, s, v, _i, _len, _ref, _results;
      if (ox == null) {
        ox = 0;
      }
      if (oy == null) {
        oy = 0;
      }
      c = Math.cos(angle);
      s = Math.sin(angle);
      _ref = self.controlPoints;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        controlPoint = _ref[_i];
        v = {
          x: controlPoint.x - ox,
          y: controlPoint.y - oy
        };
        controlPoint.x = c * v.x - s * v.y + ox;
        _results.push(controlPoint.y = s * v.x + c * v.y + oy);
      }
      return _results;
    };

    BezierCurve.prototype.scale = function(self, s, ox, oy) {
      var controlPoint, _i, _len, _ref, _results;
      if (ox == null) {
        ox = 0;
      }
      if (oy == null) {
        oy = 0;
      }
      _ref = self.controlPoints;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        controlPoint = _ref[_i];
        controlPoint.x = (controlPoint.x - ox) * s + ox;
        _results.push(controlPoint.y = (controlPoint.y - oy) * s + oy);
      }
      return _results;
    };

    BezierCurve.prototype.setControlPoint = function(self, i, x, y) {
      if (i < 0) {
        i += self.controlPoints.length;
      }
      if (i < 0 || i >= self.controlPoints.length) {
        throw new Love.Exception("Invalid control point index");
      }
      return self.controlPoints[i] = {
        x: x,
        y: y
      };
    };

    BezierCurve.prototype.translate = function(self, dx, dy) {
      var controlPoint, _i, _len, _ref, _results;
      _ref = self.controlPoints;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        controlPoint = _ref[_i];
        controlPoint.x += dx;
        _results.push(controlPoint.y += dy);
      }
      return _results;
    };

    subdivide = function(points, k) {
      var i, left, right, step, _i, _j, _k, _l, _ref, _ref1, _ref2, _ref3;
      if (k <= 0) {
        return;
      }
      left = [];
      right = [];
      for (step = _i = 1, _ref = points.length; 1 <= _ref ? _i < _ref : _i > _ref; step = 1 <= _ref ? ++_i : --_i) {
        left.push(points[0]);
        right.push(points[points.length - step]);
        for (i = _j = 0, _ref1 = points.length - step; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
          points[i] = (points[i] + points[i + 1]) * .5;
        }
      }
      left.push(points[0]);
      right.push(points[0]);
      subdivide(left, k - 1);
      subdivide(right, k - 1);
      for (i = _k = 0, _ref2 = left.length; 0 <= _ref2 ? _k < _ref2 : _k > _ref2; i = 0 <= _ref2 ? ++_k : --_k) {
        points[i] = left[i];
      }
      for (i = _l = 0, _ref3 = right.length; 0 <= _ref3 ? _l < _ref3 : _l > _ref3; i = 0 <= _ref3 ? ++_l : --_l) {
        points[i - 1 + left.length] = right[right.length - i - 1];
      }
      return points;
    };

    return BezierCurve;

  })();

  Love.Math.RandomGenerator = (function() {
    var Long, MAX_VALUE;

    function RandomGenerator() {
      var seed;
      this.last_random_normal = Number.POSITIVE_INFINITY;
      seed = new Long(0xCBBF7A44, 0x0139408D);
      this.setSeed(this, seed);
    }

    RandomGenerator.prototype.rand = function() {
      this.rng_state = this.rng_state.xor(this.rng_state.shiftLeft(13));
      this.rng_state = this.rng_state.xor(this.rng_state.shiftRight(7));
      return this.rng_state = this.rng_state.xor(this.rng_state.shiftLeft(17));
    };

    RandomGenerator.prototype.random = function(self, min, max) {
      if (min === void 0 && max === void 0) {
        return Math.abs(self.rand().toNumber() / MAX_VALUE);
      }
      if (max === void 0) {
        max = min;
        return self.random(self) * max;
      }
      return self.random(self) * (max - min) + min;
    };

    RandomGenerator.prototype.randomNormal = function(self, stddev, mean) {
      var phi, r;
      if (stddev == null) {
        stddev = 1;
      }
      if (mean == null) {
        mean = 0;
      }
      if (self.last_random_normal !== Number.POSITIVE_INFINITY) {
        r = self.last_random_normal;
        self.last_random_normal = Number.POSITIVE_INFINITY;
        return r * stddev + mean;
      }
      r = Math.sqrt(-2.0 * Math.log(1 - self.random(self)));
      phi = 2 * Math.PI * (1 - self.random(self));
      self.last_random_normal = r * Math.cos(phi);
      return r * Math.sin(phi) * stddev + mean;
    };

    RandomGenerator.prototype.setSeed = function(self, low, high) {
      var i, _i, _results;
      if (high) {
        self.seed = new Long(low, high);
      } else {
        self.seed = Long.fromNumber(low);
      }
      self.rng_state = self.seed;
      _results = [];
      for (i = _i = 0; _i <= 2; i = ++_i) {
        _results.push(self.rand());
      }
      return _results;
    };

    RandomGenerator.prototype.getSeed = function(self) {
      return [self.seed.getLowBits(), self.seed.getHighBits()];
    };

    RandomGenerator.prototype.getState = function(self) {
      var high, high_string, low, low_string, padding, ss, _ref;
      _ref = self.getSeed(), low = _ref[0], high = _ref[1];
      padding = '00000000';
      ss = '0x';
      low_string = low.toString(16);
      high_string = high.toString(16);
      ss += padding.substring(0, padding.length - low_string.length) + low_string;
      ss += padding.substring(0, padding.length - high_string.length) + high_string;
      return ss;
    };

    RandomGenerator.prototype.setState = function(self, state_string) {
      var high, low;
      low = parseInt(state_string.substring(2, 10), 16);
      high = parseInt(state_string.substring(10, 18), 16);
      return self.rng_state = new Long(low, high);
    };

    Long = goog.math.Long;

    MAX_VALUE = Long.fromNumber(Number.MAX_VALUE).toNumber();

    return RandomGenerator;

  })();

}).call(this);
