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
var react_modal_1 = require("react-modal");
var Found_Animal = function (props) {
    var _a = react_1.useState([]), data = _a[0], setData = _a[1];
    var _b = react_1.useState(false), modalIsOpen = _b[0], setModalIsOpen = _b[1];
    var _c = react_1.useState(''), animalId = _c[0], setAnimalId = _c[1];
    react_1.useEffect(function () {
        fetch('http://localhost:8000/api/animals', {
            method: "GET",
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + js_cookie_1["default"].get('jwt') },
            credentials: 'include'
        }).then(function (resp) { return resp.json(); })
            .then(function (resp) { setData(resp); });
    }, []);
    var deleteAnimal = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    return [4 /*yield*/, fetch("http://localhost:8000/api/animals/" + animalId, {
                            method: "DELETE",
                            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + js_cookie_1["default"].get('jwt') },
                            credentials: 'include'
                        })];
                case 1:
                    _a.sent();
                    window.location.href = '/found';
                    return [2 /*return*/];
            }
        });
    }); };
    var list = [];
    data.forEach(function (element, index) {
        var t = JSON.stringify(element['description']).substring(0, 102).substring(1).slice(0, -1);
        var controls;
        if ((props.id === element['userId']) /* || props.role == '2'*/) {
            controls = (React.createElement("div", { className: "edit opp" },
                React.createElement("a", { href: "/edit/animal/" + element['id'], className: "opp" },
                    " ",
                    React.createElement("img", { src: window.location.origin + '/images/icons/edit-solid.svg', style: { width: "8%", height: "8%", position: "absolute", marginLeft: "0.6vw", marginTop: "0.3vw", opacity: "1" }, alt: "" })),
                React.createElement("a", { href: "#", onClick: function (e) { setModalIsOpen(true); setAnimalId(element['id']); } },
                    " ",
                    React.createElement("img", { className: "", src: window.location.origin + '/images/icons/trash-alt-solid.svg', style: { width: "7%", height: "7%", position: "absolute", right: "1vw", marginTop: "0.6vw", opacity: "1" }, alt: "" }))));
        }
        list.push(React.createElement("div", { className: "card op" },
            controls,
            React.createElement("img", { className: "op", src: element['imageUrl'] ? element['imageUrl'] : window.location.origin + '/images/lizard.png', style: { width: "100%", height: "65%" }, alt: "" }),
            React.createElement("div", { className: "card-body" },
                React.createElement("div", { className: "edit" },
                    React.createElement("h5", { className: "card-title small" }, element['title'])),
                React.createElement("p", { className: "card-text" }, t)),
            React.createElement("a", { href: "/more/animal/" + element['id'], className: "btn btn-primary" }, "More information")));
    });
    var add;
    if (props.role == '1' || props.role == '2') {
        add = (React.createElement("a", { href: "/add", className: "btn btn-primary", style: { background: "#1A936F", position: "relative", left: "8em", marginBottom: "1em" } }, " Add animal"));
    }
    return (React.createElement("div", null,
        React.createElement("h1", { className: "head", style: { fontFamily: "Georgia", textAlign: "center", paddingBottom: "10px" } }, "Found animal"),
        add,
        React.createElement("div", { className: "wrapper-cards" }, list),
        React.createElement(react_modal_1["default"], { isOpen: modalIsOpen, className: "Modal", onRequestClose: function () { return setModalIsOpen(false); } },
            React.createElement("div", { className: "modal-content" },
                React.createElement("div", { className: "modal-header" },
                    React.createElement("h5", { className: "modal-title" }, "Delete animal"),
                    React.createElement("button", { type: "button", style: { background: "#ffffff", border: "none", fontSize: "160%" }, onClick: function () { return setModalIsOpen(false); } }, "\u00D7")),
                React.createElement("div", { className: "modal-body md" }, "Are you sure?"),
                React.createElement("div", { className: "modal-footer" },
                    React.createElement("button", { type: "button", className: "btn btn-secondary", "data-dismiss": "modal", onClick: function () { return setModalIsOpen(false); } }, "Close"),
                    React.createElement("button", { type: "button", className: "btn btn-primary", onClick: function (e) { setModalIsOpen(false); deleteAnimal(e); } }, "Delete"))))));
};
exports["default"] = Found_Animal;
