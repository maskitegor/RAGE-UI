import React from 'react';
import EventManager from "../../../EventManager";
import $ from 'jquery'; 

class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: true,
            fontFamily: 'Roboto',
            fontsize: 13,
            opacity: 1,
        }
    }

    componentDidCatch(error, errorInfo) {
        mp.trigger('client:ui:debug', 'Chat.jsx', error, errorInfo); // eslint-disable-line
    }

    componentWillUnmount() {
        EventManager.removeHandler('chat', value => {
            if (value.type == 'hideHud') {
                document.getElementById('chat').style.display = 'none';
            }
            if (value.type == 'showHud') {
                document.getElementById('chat').style.display = 'block';
            } else return;
        });
    }

    componentDidMount() {
        let chat =
        {
            size: 0,
            history_limit: 15,  //Change this if you want to hold more/less chat history
            container: null,
            input: null,
            enabled: false,
            active: true
        };

        EventManager.addHandler('chat', value => {
            if (value.type == 'hideHud') {
                document.getElementById('chat').style.display = 'none';
            }
            if (value.type == 'showHud') {
                document.getElementById('chat').style.display = 'block';
            } else return;
        });

        function enableChatInput(enable) {
            mp.trigger("chatEnabled", enable); // eslint-disable-line

            if (chat.active == false
                && enable == true)
                return;

            if (enable != (chat.input != null)) {
                //chat_printing = enable;

                mp.invoke("focus", enable); // eslint-disable-line

                if (enable) {
                    chat.input = $("#chat").append('<div><input onkeyup="chatOnKeyUp()" id="chat_msg" type="text" /></div>').children(":last");
                    chat.input.children("input").focus();
                    $('#chat_messages').css("background-color", "rgba(0, 0, 0, 0.5)");
                }
                else {
                    chat.input.fadeOut('fast', function () {
                        chat.input.remove();
                        chat.input = null;
                    });
                    $('#chat_messages').css("background-color", "rgba(0, 0, 0, 0.0)");
                }
            }
        }

        var timeOut = null;
        function chatOnKeyUp() {
            if (timeOut) {
                clearTimeout(timeOut);
                timeOut = null;
            }
            else
                mp.trigger('client:chatTyping', true); // eslint-disable-line

            timeOut = setTimeout(function () {
                mp.trigger('client:chatTyping', false); // eslint-disable-line
                timeOut = null;
            }, 1000);
        }

        function getIndicesOf(searchStr, str, caseSensitive) {
            var searchStrLen = searchStr.length;
            if (searchStrLen == 0) {
                return [];
            }
            var startIndex = 0, index, indices = [];
            if (!caseSensitive) {
                str = str.toLowerCase();
                searchStr = searchStr.toLowerCase();
            }
            while ((index = str.indexOf(searchStr, startIndex)) > -1) {
                indices.push(index);
                startIndex = index + searchStrLen;
            }
            return indices;
        }

        var chatAPI =
        {
            push: (text) => {
                let textResult = escapeHtml(text);

                var matchColors = /!\{#\w*\}/gi;
                var match = textResult.match(matchColors);
                if (match !== null) {

                    for (let i = 0; i < match.length; i++) {
                        let clr = match[i].replace(match[i], match[i].replace('!{', '').replace('}', ''));
                        textResult = textResult.replace(match[i], '<span style="color: ' + clr + '">');
                    }

                    for (let i = 0; i < match.length; i++) {
                        textResult += '</span>';
                    }
                }

                matchColors = /!\{\w*\}/gi;
                match = textResult.match(matchColors);
                if (match !== null) {

                    for (let i = 0; i < match.length; i++) {
                        let clr = match[i].replace(match[i], match[i].replace('!{', '').replace('}', ''));
                        textResult = textResult.replace(match[i], '<span style="color: #' + clr + '">');
                    }

                    for (let i = 0; i < match.length; i++) {
                        textResult += '</span>';
                    }
                }

                chat.container.prepend("<li>" + textResult + "</li>");

                chat.size++;

                if (chat.size >= chat.history_limit) {
                    chat.container.children(":last").remove();
                }
            },

            clear: () => {
                chat.container.html("");
            },

            activate: (toggle) => {
                if (toggle == false
                    && (chat.input != null))
                    enableChatInput(false);

                chat.active = toggle;
            },

            show: (toggle) => {
                if (toggle)
                    $("#chat").show();
                else
                    $("#chat").hide();

                chat.active = toggle;
            }
        };

        var entityMap = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
            '/': '&#x2F;',
            '`': '&#x60;',
            '=': '&#x3D;'
        };

        function escapeHtml(string) {
            return String(string).replace(/[&<>"'`=\/]/g, function (s) {
                return entityMap[s];
            });
        }

        $(document).ready(function () {
            chat.container = $("#chat ul#chat_messages");

            $(".ui_element").show();
            chatAPI.push("Добро пожаловать на DEDNET 💀");
            chatAPI.push("Желаем приятной игры ; ]");
            chatAPI.push("Если очень долго грузит, лучше перезайдите");

            $("body").keydown(function (event) {
                if (event.which == 84 && chat.input == null
                    && chat.active == true) {
                    enableChatInput(true);
                    event.preventDefault();
                }
                else if (event.which == 13 && chat.input != null) {
                    var value = chat.input.children("input").val();

                    if (value.length > 0) {
                        if (value[0] == "/") {
                            value = value.substr(1);

                            if (value.length > 0)
                                mp.invoke("command", value); // eslint-disable-line
                        }
                        else {
                            mp.invoke("chatMessage", value); // eslint-disable-line
                        }
                    }

                    enableChatInput(false);
                }
            });
        });
    }

    render() {
        if (!this.state.show) {
            return null;
        }
        return (
            <React.Fragment>
                <div id="chat" style={{ opacity: this.state.opacity, fontWeight: 400 + 'px', fontFamily: this.state.fontFamily, fontSize: this.state.fontsize + "px" }} className="ui_element">
                    <ul id="chat_messages"></ul>
                </div>
            </React.Fragment>
        )
    }
}

export default Chat;