"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var js_cookie_1 = require("js-cookie");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
require("./App.css");
var Nav_1 = require("./components/Nav");
var Add_Animal_1 = require("./pages/Add_Animal");
var Edit_Animal_1 = require("./pages/Edit_Animal");
var Found_Animal_1 = require("./pages/Found_Animal");
var Home_1 = require("./pages/Home");
var Login_1 = require("./pages/Login");
var More_Information_1 = require("./pages/More_Information");
var Register_1 = require("./pages/Register");
var Add_Shelter_1 = require("./pages/Shelter/Add_Shelter");
var Edit_Shelter_1 = require("./pages/Shelter/Edit_Shelter");
var Shelter_1 = require("./pages/Shelter/Shelter");
var Shelter_More_Information_1 = require("./pages/Shelter/Shelter_More_Information");
var Users_1 = require("./pages/Users");
function App() {
    var _this = this;
    var _a = react_1.useState(' '), username = _a[0], setName = _a[1];
    var _b = react_1.useState(0), id = _b[0], setId = _b[1];
    var _c = react_1.useState('0'), role = _c[0], setRole = _c[1];
    react_1.useEffect(function () {
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var response, content;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('http://localhost:8000/api/user', {
                            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + js_cookie_1["default"].get('jwt') },
                            credentials: 'include'
                        })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        content = _a.sent();
                        try {
                            setName(content.name.username);
                            setRole(content.role);
                            setId(content.id);
                        }
                        catch (error) {
                            setName(' ');
                        }
                        return [2 /*return*/];
                }
            });
        }); })();
    });
    console.log(role);
    return (React.createElement("div", { className: "App" },
        React.createElement(react_router_dom_1.BrowserRouter, null,
            React.createElement(Nav_1["default"], { username: username, setName: setName }),
            React.createElement("main", null,
                React.createElement("div", { className: "form-signin" },
                    React.createElement(react_router_dom_1.Route, { path: "/", exact: true, component: function () { return React.createElement(Home_1["default"], { username: username }); } }),
                    React.createElement(react_router_dom_1.Route, { path: "/login", component: function () { return React.createElement(Login_1["default"], { username: username, setName: setName }); } }),
                    React.createElement(react_router_dom_1.Route, { path: "/register", component: Register_1["default"] }),
                    React.createElement(react_router_dom_1.Route, { path: "/more/animal/:id", component: function () { return React.createElement(More_Information_1["default"], { id: id, role: role }); } }),
                    React.createElement(react_router_dom_1.Route, { path: "/more/shelter/:id", component: Shelter_More_Information_1["default"] }),
                    (role == '1' || role == '2') && React.createElement(react_router_dom_1.Route, { path: "/add", component: function () { return React.createElement(Add_Animal_1["default"], { id: id }); } }),
                    role == '2' && React.createElement(react_router_dom_1.Route, { path: "/create/shelter", component: function () { return React.createElement(Add_Shelter_1["default"], { id: id }); } }),
                    (role == '1' || role == '2') && React.createElement(react_router_dom_1.Route, { path: "/edit/animal/:id", component: function () { return React.createElement(Edit_Animal_1["default"], { id: id }); } }),
                    role == '2' && React.createElement(react_router_dom_1.Route, { path: "/edit/shelter/:id/", component: function () { return React.createElement(Edit_Shelter_1["default"], { id: id }); } })),
                React.createElement(react_router_dom_1.Route, { path: "/found", component: function () { return React.createElement(Found_Animal_1["default"], { id: id, role: role }); } }),
                role == '2' && React.createElement(react_router_dom_1.Route, { path: "/users", component: Users_1["default"] }),
                React.createElement(react_router_dom_1.Route, { path: "/shelters", component: function () { return React.createElement(Shelter_1["default"], { role: role }); } })))));
}
exports["default"] = App;
