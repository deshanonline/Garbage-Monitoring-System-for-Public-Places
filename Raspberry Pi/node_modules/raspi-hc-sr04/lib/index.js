"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _raspiSonarAddon = _interopRequireDefault(require("../build/Release/raspiSonarAddon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// Sonar class provides a read method to interact with an ultrasonic sensor
var Sonar = /*#__PURE__*/function () {
  function Sonar(opts) {
    _classCallCheck(this, Sonar);

    this.opts = Object.assign({}, {
      callWiringPiSetup: true
    }, opts);
    this.sensor = _raspiSonarAddon["default"].RaspiSonar(this.opts);
  } // Accepts function as an argument which is called back with a duration


  _createClass(Sonar, [{
    key: "read",
    value: function read(callback) {
      this.sensor.read(callback);
    }
  }]);

  return Sonar;
}();

exports["default"] = Sonar;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIlNvbmFyIiwib3B0cyIsIk9iamVjdCIsImFzc2lnbiIsImNhbGxXaXJpbmdQaVNldHVwIiwic2Vuc29yIiwiYWRkb24iLCJSYXNwaVNvbmFyIiwiY2FsbGJhY2siLCJyZWFkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7QUFFQTtJQUNxQkEsSztBQUNuQixpQkFBWUMsSUFBWixFQUFrQjtBQUFBOztBQUNoQixTQUFLQSxJQUFMLEdBQVlDLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjLEVBQWQsRUFBa0I7QUFDNUJDLE1BQUFBLGlCQUFpQixFQUFFO0FBRFMsS0FBbEIsRUFFVEgsSUFGUyxDQUFaO0FBSUEsU0FBS0ksTUFBTCxHQUFjQyw0QkFBTUMsVUFBTixDQUFpQixLQUFLTixJQUF0QixDQUFkO0FBQ0QsRyxDQUVEOzs7Ozt5QkFDS08sUSxFQUFVO0FBQ2IsV0FBS0gsTUFBTCxDQUFZSSxJQUFaLENBQWlCRCxRQUFqQjtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFkZG9uIGZyb20gJy4uL2J1aWxkL1JlbGVhc2UvcmFzcGlTb25hckFkZG9uJztcblxuLy8gU29uYXIgY2xhc3MgcHJvdmlkZXMgYSByZWFkIG1ldGhvZCB0byBpbnRlcmFjdCB3aXRoIGFuIHVsdHJhc29uaWMgc2Vuc29yXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTb25hciB7XG4gIGNvbnN0cnVjdG9yKG9wdHMpIHtcbiAgICB0aGlzLm9wdHMgPSBPYmplY3QuYXNzaWduKHt9LCB7XG4gICAgICBjYWxsV2lyaW5nUGlTZXR1cDogdHJ1ZVxuICAgIH0sIG9wdHMpO1xuXG4gICAgdGhpcy5zZW5zb3IgPSBhZGRvbi5SYXNwaVNvbmFyKHRoaXMub3B0cyk7IFxuICB9XG4gIFxuICAvLyBBY2NlcHRzIGZ1bmN0aW9uIGFzIGFuIGFyZ3VtZW50IHdoaWNoIGlzIGNhbGxlZCBiYWNrIHdpdGggYSBkdXJhdGlvblxuICByZWFkKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5zZW5zb3IucmVhZChjYWxsYmFjayk7XG4gIH1cbn0iXSwiZmlsZSI6ImluZGV4LmpzIn0=
