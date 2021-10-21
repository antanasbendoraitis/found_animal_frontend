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
var react_modal_1 = require("react-modal");
var More_information = function (props) {
    var dt = {};
    var _a = react_1.useState(dt), data = _a[0], setData = _a[1];
    var _b = react_1.useState([]), dataComment = _b[0], setDataComment = _b[1];
    var params = react_router_dom_1.useParams();
    var _c = react_1.useState(''), comment = _c[0], setComment = _c[1];
    var _d = react_1.useState(false), modalIsOpen = _d[0], setModalIsOpen = _d[1];
    var _e = react_1.useState(false), modalIsOpen2 = _e[0], setModalIsOpen2 = _e[1];
    var _f = react_1.useState(false), modalEdit = _f[0], setModalEdit = _f[1];
    var _g = react_1.useState(false), commentId = _g[0], setCommentId = _g[1];
    react_1.useEffect(function () {
        fetch("http://localhost:8000/api/animals/" + params['id'], {
            method: "GET",
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + js_cookie_1["default"].get('jwt') },
            credentials: 'include'
        })
            .then(function (resp) { return resp.json(); })
            .then(function (resp) {
            setData(resp);
        });
        setInterval(function () {
            fetch("http://localhost:8000/api/comments/" + params['id'], {
                method: "GET",
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + js_cookie_1["default"].get('jwt') },
                credentials: 'include'
            })
                .then(function (resp) { return resp.json(); })
                .then(function (resp) {
                setDataComment(resp);
            });
        }, 1000);
    }, []);
    var list = [];
    dataComment.forEach(function (element) {
        var change;
        if (props.role == '2') {
            change = (React.createElement(React.Fragment, null,
                React.createElement("a", { href: "javascript:void(0);", style: { position: "absolute", right: "0px", width: "5%", height: "5%", marginRight: "12%" }, onClick: function () { setModalEdit(true); setComment(element['comment']); setCommentId(element['id']); } },
                    " ",
                    React.createElement("img", { src: window.location.origin + '/images/icons/edit-solid.svg', style: { width: "280%", height: "280%" }, alt: "" })),
                React.createElement("a", { href: "javascript:void(0);", style: { position: "absolute", right: "5%", width: "5%", height: "5%" }, onClick: function () { setModalIsOpen2(true); setCommentId(element['id']); } },
                    " ",
                    React.createElement("img", { src: window.location.origin + '/images/icons/trash-alt-solid.svg', style: { width: "280%", height: "280%" }, alt: "" }))));
        }
        list.push(React.createElement("div", { className: "card", style: { marginTop: "1%", marginBottom: "3%" } },
            React.createElement("div", { className: "description" },
                React.createElement("div", { className: "card-body" },
                    change,
                    React.createElement("h1", { style: { fontSize: "125%", paddingTop: "10px", marginLeft: "2%", color: "#992820", fontStyle: "italic" } }, element['user']),
                    React.createElement("h4", { style: { fontSize: "75%", color: "red", marginLeft: "2%" } }, element['date']),
                    React.createElement("p", { className: "card-text", style: { fontSize: "110%", color: "#3c403d" } }, element['comment'])))));
    });
    var saveComment = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    return [4 /*yield*/, fetch('http://localhost:8000/api/comments', {
                            method: "POST",
                            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + js_cookie_1["default"].get('jwt') },
                            credentials: 'include',
                            body: JSON.stringify({
                                animalId: params['id'],
                                comment: comment
                            })
                        })];
                case 1:
                    _a.sent();
                    setModalIsOpen(false);
                    return [2 /*return*/];
            }
        });
    }); };
    var cm;
    if (props.id !== 0) {
        cm = (React.createElement("div", { style: { marginBottom: "10%" } },
            React.createElement("button", { className: "btn btn-primary", style: { position: "absolute", right: "10%", opacity: "0.8" }, onClick: function () { return setModalIsOpen(true); } }, " Add comment")));
    }
    var deleteComment = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    return [4 /*yield*/, fetch("http://localhost:8000/api/comments/" + commentId, {
                            method: "DELETE",
                            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + js_cookie_1["default"].get('jwt') },
                            credentials: 'include'
                        })];
                case 1:
                    _a.sent();
                    setModalIsOpen2(false);
                    return [2 /*return*/];
            }
        });
    }); };
    var editComment = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    return [4 /*yield*/, fetch("http://localhost:8000/api/comments/" + commentId, {
                            method: "PUT",
                            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + js_cookie_1["default"].get('jwt') },
                            credentials: 'include',
                            body: JSON.stringify({
                                comment: comment
                            })
                        })];
                case 1:
                    _a.sent();
                    setModalEdit(false);
                    return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement("div", { style: { width: "250%", position: "relative", right: "55%" } },
        React.createElement("div", { className: "card" },
            React.createElement("div", { className: "description" },
                React.createElement("div", { style: { textAlign: "center" } },
                    React.createElement("h1", { style: { fontSize: "180%", paddingTop: "10px" } },
                        data.title,
                        " "),
                    React.createElement("img", { className: "card-img-top", style: { height: "50%", width: "50%" }, src: data.imageUrl, alt: "Card image cap" })),
                React.createElement("div", { className: "card-body" },
                    React.createElement("h4", { style: { fontSize: "130%", fontWeight: "bolder" } }, data.address),
                    React.createElement("p", { className: "card-text", style: { fontSize: "130%", color: "#3c403d" } }, data.description)))),
        React.createElement("div", { style: { marginLeft: "6%" } },
            React.createElement("h5", { className: "head", style: { fontSize: "130%", fontFamily: "Georgia", marginTop: "5%" } }, "Comments"),
            list),
        cm,
        React.createElement(react_modal_1["default"], { isOpen: modalIsOpen, className: "Modal", onRequestClose: function () { return setModalIsOpen(false); } },
            React.createElement("div", { className: "modal-content" },
                React.createElement("div", { className: "modal-header" },
                    React.createElement("h5", { className: "modal-title" }, "Write comment"),
                    React.createElement("button", { type: "button", style: { background: "#ffffff", border: "none", fontSize: "160%" }, onClick: function () { return setModalIsOpen(false); } }, "\u00D7")),
                React.createElement("form", { onSubmit: saveComment },
                    React.createElement("div", { className: "modal-body md" },
                        React.createElement("label", { className: "col-form-label" }, "Comment:"),
                        React.createElement("div", { className: "form-group" },
                            React.createElement("textarea", { className: "form-control", minLength: 4, maxLength: 500, onChange: function (e) { return setComment(e.target.value); }, required: true }))),
                    React.createElement("div", { className: "modal-footer" },
                        React.createElement("button", { type: "button", className: "btn btn-secondary", "data-dismiss": "modal", onClick: function () { return setModalIsOpen(false); } }, "Close"),
                        React.createElement("button", { type: "submit", className: "btn btn-primary" }, "Comemnt"))))),
        React.createElement(react_modal_1["default"], { isOpen: modalIsOpen2, className: "Modal", onRequestClose: function () { return setModalIsOpen2(false); } },
            React.createElement("div", { className: "modal-content" },
                React.createElement("div", { className: "modal-header" },
                    React.createElement("h5", { className: "modal-title" }, "Delete comment"),
                    React.createElement("button", { type: "button", style: { background: "#ffffff", border: "none", fontSize: "160%" }, onClick: function () { return setModalIsOpen2(false); } }, "\u00D7")),
                React.createElement("div", { className: "modal-header" }, "Are you sure?"),
                React.createElement("div", { className: "modal-footer" },
                    React.createElement("button", { type: "button", className: "btn btn-secondary", "data-dismiss": "modal", onClick: function () { return setModalIsOpen2(false); } }, "Close"),
                    React.createElement("button", { type: "button", className: "btn btn-primary", onClick: deleteComment }, "Delete")))),
        React.createElement(react_modal_1["default"], { isOpen: modalEdit, className: "Modal", onRequestClose: function () { return setModalEdit(false); } },
            React.createElement("div", { className: "modal-content" },
                React.createElement("div", { className: "modal-header" },
                    React.createElement("h5", { className: "modal-title" }, "Write comment"),
                    React.createElement("button", { type: "button", style: { background: "#ffffff", border: "none", fontSize: "160%" }, onClick: function () { return setModalEdit(false); } }, "\u00D7")),
                React.createElement("form", { onSubmit: editComment },
                    React.createElement("div", { className: "modal-body md" },
                        React.createElement("label", { className: "col-form-label" }, "Comment:"),
                        React.createElement("div", { className: "form-group" },
                            React.createElement("textarea", { className: "form-control", minLength: 4, maxLength: 500, value: comment, onChange: function (e) { return setComment(e.target.value); }, required: true }))),
                    React.createElement("div", { className: "modal-footer" },
                        React.createElement("button", { type: "button", className: "btn btn-secondary", "data-dismiss": "modal", onClick: function () { return setModalEdit(false); } }, "Close"),
                        React.createElement("button", { type: "submit", className: "btn btn-primary" }, "Comemnt")))))));
};
exports["default"] = More_information;
