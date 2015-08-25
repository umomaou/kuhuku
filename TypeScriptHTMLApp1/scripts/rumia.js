define(["require", "exports", "const"], function (require, exports, C) {
    var anime = [0, 1, 2, 3, 4, 3, 2, 1];
    var State;
    (function (State) {
        State[State["Alive"] = 0] = "Alive";
        State[State["CrashUp"] = 1] = "CrashUp";
        State[State["CrashDown"] = 2] = "CrashDown";
        State[State["Dead"] = 3] = "Dead";
        State[State["Ressurection"] = 4] = "Ressurection";
    })(State || (State = {}));
    var Faith;
    (function (Faith) {
        Faith[Faith["Normal"] = 0] = "Normal";
        Faith[Faith["Expectation"] = 1] = "Expectation";
        Faith[Faith["Happy"] = 2] = "Happy";
        Faith[Faith["Smile"] = 3] = "Smile";
    })(Faith || (Faith = {}));
    var Rumia = (function () {
        function Rumia(keyControl, se, ctx, image, scoreUp, setGameOver) {
            var _this = this;
            this.init = function () {
                _this.flag = true;
                _this.imageNumber = 0;
                _this.count = 0;
                _this.x = 0;
                _this.y = 240;
                _this.vx = 0;
                _this.vy = 0;
                _this.invincible = 0;
                _this.jampCount = 0;
                _this.jampCool = 0;
                _this.happyCount = 0;
                _this.faith = Faith.Normal;
                _this.state = State.Alive;
                _this.onaka = C.ONAMA_MAX;
            };
            this.calc = function () {
                if (!_this.flag)
                    return;
                switch (_this.state) {
                    case State.Alive:
                        _this.moveControl();
                        _this.faithControl();
                        if (_this.onaka == 0) {
                            _this.state = State.CrashDown;
                            _this.currentTime = _this.count;
                            _this.se.play("death2");
                        }
                        break;
                    case State.CrashUp:
                        _this.x += _this.vx / 4;
                        _this.y -= (30 - (_this.count - _this.currentTime)) / 3;
                        if ((_this.count - _this.currentTime) == 30) {
                            _this.state = State.CrashDown;
                            _this.currentTime = _this.count;
                        }
                        break;
                    case State.CrashDown:
                        _this.x += _this.vx / 5;
                        _this.y += (_this.count - _this.currentTime) / 5;
                        if (_this.y > 436) {
                            _this.state = State.Dead;
                        }
                        break;
                    case State.Dead:
                        if (_this.life > 0) {
                            _this.life--;
                            if (_this.onaka == 0 && _this.life >= 1)
                                _this.life--;
                            _this.init();
                            _this.invincible = 210;
                            _this.state = State.Ressurection;
                        }
                        else {
                            _this.flag = false;
                            _this.setGameOver();
                        }
                        break;
                    case State.Ressurection:
                        _this.x += 1.5;
                        if (_this.count == 75)
                            _this.state = State.Alive;
                        break;
                }
                if (_this.happyCount > 0)
                    _this.happyCount--;
                if (_this.invincible > 0)
                    _this.invincible--;
                if (_this.onaka > 0 && (_this.state == State.Alive || _this.state == State.Ressurection))
                    _this.onaka--;
                if (_this.state == State.Alive || _this.state == State.Ressurection)
                    _this.scoreUp();
                _this.count++;
            };
            this.moveControl = function () {
                if (_this.keyControl.getKey("Left").getCount() > 0) {
                    _this.vx = -3.8;
                }
                if (_this.keyControl.getKey("Right").getCount() > 0) {
                    _this.vx = 3.8;
                }
                if ((_this.keyControl.getKey("Z").getCount() == 1 || _this.keyControl.getKey("Up").getCount() == 1) && _this.jampCool == 0) {
                    _this.jampCount = 0;
                    _this.jampCool = 6;
                    _this.se.play("jump");
                }
                if (_this.jampCount == 0 && _this.vy > -2.7) {
                    _this.vy -= 1.5;
                }
                if (_this.vy > 0.5 && _this.vy <= 1.1)
                    _this.vy *= 1.015;
                else if (_this.vy > 1.1 && _this.vy < 4)
                    _this.vy *= 1.025;
                else if (_this.vy <= 1.1)
                    _this.vy += 0.05;
                if (_this.vx > 0)
                    _this.vx--;
                else if (_this.vx < 0)
                    _this.vx++;
                if (_this.vx * _this.vx < 1)
                    _this.vx = 0;
                if (_this.vx > 5)
                    _this.vx = 5;
                else if (_this.vx < -5)
                    _this.vx = -5;
                var x = _this.x + _this.vx;
                var y = _this.y + _this.vy;
                if (x > 24 && x < 456)
                    _this.x = x;
                else if (x < 24) {
                    _this.x = 24;
                    _this.vx = 0;
                }
                else if (x > 456) {
                    _this.x = 456;
                    _this.vx = 0;
                }
                if (y > 96 && y < 384)
                    _this.y = y;
                else if (y < 96) {
                    _this.y = 96;
                    _this.vy = 0;
                }
                else if (y > 384) {
                    _this.y = 384;
                    _this.vy = 0;
                }
                if (_this.jampCount < 48)
                    _this.imageNumber = anime[Math.floor((_this.count % 24) / 3)];
                else
                    _this.imageNumber = anime[Math.floor((_this.count % 48) / 6)];
                if (_this.jampCool > 0)
                    _this.jampCool--;
                _this.jampCount++;
            };
            this.faithControl = function () {
                if (_this.happyCount > 0) {
                    if (_this.happyCount >= 90) {
                        _this.faith = Faith.Happy;
                    }
                    else if (Math.round(_this.happyCount / 15) % 2 == 1) {
                        _this.faith = Faith.Smile;
                    }
                    else {
                        _this.faith = Faith.Normal;
                    }
                }
                else {
                    _this.faith = Faith.Normal;
                }
            };
            this.graph = function () {
                if (!_this.flag)
                    return;
                switch (_this.state) {
                    case State.Ressurection:
                    case State.Alive:
                        if (_this.invincible == 0 || (_this.invincible > 0 && _this.count % 12 < 6)) {
                            _this.image.drawDiv(_this.ctx, "rumia", _this.imageNumber, _this.x - 24, _this.y - 24);
                            _this.image.drawDiv(_this.ctx, "rumia_faith", _this.faith, _this.x - 24, _this.y - 24);
                        }
                        break;
                    case State.CrashUp:
                        _this.image.draw(_this.ctx, "rumia_up", _this.x - 24, _this.y - 24);
                        break;
                    case State.CrashDown:
                        _this.image.draw(_this.ctx, "rumia_down", _this.x - 24, _this.y - 24);
                        break;
                }
            };
            this.gainOnaka = function (gain) {
                _this.se.play("get_item");
                if (_this.onaka + gain < C.ONAMA_MAX)
                    _this.onaka += gain;
                else
                    _this.onaka = C.ONAMA_MAX;
            };
            this.setHappy = function () {
                _this.happyCount = 110;
            };
            this.isHittingItem = function (target) {
                if (!_this.flag || _this.state != State.Alive || !target.isFlag())
                    return false;
                var x = _this.x - target.getX();
                var y = _this.y - target.getY();
                if (x * x + y * y < 2304)
                    return true;
                else
                    return false;
            };
            this.jadgeExpectationItem = function (target) {
                if (!_this.flag || !target.isFlag() || _this.happyCount > 0 || _this.state != State.Alive)
                    return;
                var y = _this.y - target.getY();
                if (_this.x < target.getX() && (target.getX() - _this.x) < 160 && (y * y < 2304))
                    _this.faith = Faith.Expectation;
            };
            this.getY = function () {
                return _this.y;
            };
            this.getOnaka = function () {
                return _this.onaka;
            };
            this.getLife = function () {
                return _this.life;
            };
            this.isHittingStar = function (target) {
                if (!_this.flag || _this.state != State.Alive || !target.isFlag() || _this.invincible > 0)
                    return false;
                var x = _this.x - target.getX();
                var y = _this.y - target.getY();
                var r = (target.isLarge() ? 12 : 6) + C.CRANGE;
                if (x * x + y * y < r * r)
                    return true;
                else
                    return false;
            };
            this.crash = function () {
                _this.se.play("death");
                _this.currentTime = _this.count;
                _this.state = State.CrashUp;
            };
            this.flag = false;
            this.keyControl = keyControl;
            this.se = se;
            this.ctx = ctx;
            this.image = image;
            this.scoreUp = scoreUp;
            this.life = 2;
            this.setGameOver = setGameOver;
        }
        return Rumia;
    })();
    return Rumia;
});
