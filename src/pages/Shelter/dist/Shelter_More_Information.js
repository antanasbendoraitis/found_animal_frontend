"use strict";
exports.__esModule = true;
var js_cookie_1 = require("js-cookie");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var Shelter_More_Information = function () {
    var dt = {};
    var _a = react_1.useState(dt), data = _a[0], setData = _a[1];
    var params = react_router_dom_1.useParams();
    react_1.useEffect(function () {
        fetch("http://localhost:8000/api/shelters/" + params['id'], {
            method: "GET",
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + js_cookie_1["default"].get('jwt') },
            credentials: 'include'
        })
            .then(function (resp) { return resp.json(); })
            .then(function (resp) {
            setData(resp);
        });
    }, []);
    console.log(data);
    return (React.createElement("div", { style: { width: "50%", position: "absolute", textAlign: "center", left: "30%" } },
        React.createElement("div", { className: "card" },
            React.createElement("div", { className: "description" },
                React.createElement("div", null,
                    React.createElement("h2", { style: { paddingTop: "10px", fontSize: "250%" } },
                        " ",
                        React.createElement("b", null,
                            data.shelterName,
                            " "),
                        " "),
                    React.createElement("img", { className: "card-img-top", style: { height: "50%", width: "50%" }, src: data.shelterImage, alt: "Card image cap" })),
                React.createElement("div", { className: "card-body", style: { textAlign: "center" } },
                    React.createElement("h6", { style: { fontSize: "130%", fontWeight: "bolder", marginTop: "5%" } }, "Description"),
                    React.createElement("div", { style: { textAlign: "left" } },
                        React.createElement("p", { className: "card-text", style: { fontSize: "130%", color: "#3c403d" } }, data.description)),
                    React.createElement("h6", { style: { fontSize: "130%", fontWeight: "bolder" } }, "Contact the shelter"),
                    React.createElement("div", { style: { marginTop: "3%" } },
                        React.createElement("div", { style: { textAlign: "left", color: "grey" } },
                            React.createElement("h4", { style: { fontSize: "110%", fontWeight: "bolder" } },
                                "Address: ",
                                data.address),
                            React.createElement("h6", { style: { fontSize: "110%", fontWeight: "bolder" } },
                                "Email: ",
                                data.email),
                            React.createElement("h6", { style: { fontSize: "110%", fontWeight: "bolder" } },
                                "Phone: ",
                                data.phone))),
                    React.createElement("div", { style: { marginTop: "5%" } },
                        React.createElement("div", { style: { textAlign: "left", color: "#696261" } })))))));
};
exports["default"] = Shelter_More_Information;
