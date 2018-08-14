"use strict";

exports.__esModule = true;
exports.default = void 0;

var _template = _interopRequireDefault(require("@babel/template"));
var _helpers = _interopRequireDefault(require("@babel/helpers/lib/helpers"));
var _proposalDecorator = _interopRequireDefault(require("@babel/plugin-proposal-decorators"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const helper = minVersion => tpl => ({
    minVersion,
    ast: () => _template.default.program.ast(tpl)
});

_helpers.default.applyDecoratedDescriptor = helper("7.0.0-beta.0")`
    export default function _applyDecoratedDescriptor(target, property, decorators, descriptor, context){
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function(key){
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;
        desc.writable = true;
        if ('value' in desc || desc.initializer){
            desc.writable = true;
        }

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
`;

var _default = _proposalDecorator.default;
exports.default = _default;