const { transform } = require("@babel/core");
const { default: plugin } = require("./");

const source = `
function TestDec1() {
    return (target, propertyKey, description) => { }
}

function TestDec2() {
    return (target, propertyKey, description) => { }
}

class A {
    @TestDec1()
    prop1 = 5;
    @TestDec2()
    func() { }
}
`;

it("Works", () => {
    expect(transform(source, {
        presets: [],
        plugins: [
            [plugin, { legacy: true }],
            ["@babel/plugin-proposal-class-properties", { loose: true }],
        ]
    }).code).toMatchSnapshot();
});