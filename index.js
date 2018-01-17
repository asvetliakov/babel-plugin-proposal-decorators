"use strict";

exports.__esModule = true;
exports.default = void 0;

var _template = _interopRequireDefault(require("@babel/template"));
var _helpers = _interopRequireDefault(require("@babel/helpers/lib/helpers"));
var _proposalDecorator = _interopRequireDefault(require("@babel/plugin-proposal-decorators"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defineHelper = _template.default.program({
  placeholderPattern: false
});

// Monkey patch decorator helper
_helpers.default.applyDecoratedDescriptor = defineHelper(`
    export default function _applyDecoratedDescriptor(target, property, decorators, descriptor, context){
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function(key){
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;
        desc.writable = true;
        desc = decorators.slice().reverse().reduce(function(desc, decorator){
            return decorator(target, property, desc) || desc;
        }, desc);
        if (context && desc.initializer !== void 0){
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }
        if (desc.get || desc.set) {
            delete desc.writable;
        }
        if (desc.initializer === void 0){
            // This is a hack to avoid this being processed by 'transform-runtime'.
            // See issue #9.
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }
        return desc;
    }
`);

var _default = _proposalDecorator;
exports.default = _default;