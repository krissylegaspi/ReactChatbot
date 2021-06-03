import React, { Component } from 'react';
import axios from 'axios/index';

import Message from './Message';

class Chatbot extends Component {
    messagesEnd;
    talkInput;

    constructor(props) {
        super(props);

        this._handleInputKeyPress = this._handleInputKeyPress.bind(this);
        this.state = {
            messages: []
        };
    }

    async df_text_query(queryText) {
        let says = {
            speaks: 'user',
            msg: {
                text: {
                    text: queryText
                }
            }
        }
        this.setState({ messages: [...this.state.messages, says] });
        
        const res = await axios.post('/api/df_text_query', {text: queryText});

        for (let msg of res.data.fulfillmentMessages) {
            says = {
                speaks: 'bot',
                msg: msg
            }
            this.setState({ messages: [...this.state.messages, says] });
        }
    }

    async df_event_query(eventName) {
        const res = await axios.post('/api/df_event_query', {event: eventName});

        for (let msg of res.data.fulfillmentMessages) {
            let says = {
                speaks: 'bot',
                msg: msg
            }
            this.setState({ messages: [...this.state.messages, says] })
        }
    }

    componentDidMount() {
        this.df_event_query('Welcome');
    }

    componentDidUpdate() {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
        this.talkInput.focus();
    }

    renderMessages(stateMessages) {
        if (stateMessages) {
            console.log(stateMessages)
            return stateMessages.map((message, i) => {
                if (message.msg.platform==="PLATFORM_UNSPECIFIED" || message.speaks==="user")
                    return <Message key={i} speaks={message.speaks} text={message.msg.text.text} />;
            });
        } else {
            return null;
        }
    }

    _handleInputKeyPress(e) {
        if (e.key === 'Enter') {
            this.df_text_query(e.target.value);
            e.target.value = '';
        }
    }
    
    render() {
        return (
            <div style={{ height: 500, width: '100%', float: 'left' }}>
                <div id="chatbot" style={{ height: '100%', width: '100%', overflow: 'auto' }}>
                    <h5>Chatbot</h5>
                    {this.renderMessages(this.state.messages)}
                    <div ref={(el) => { this.messagesEnd = el; }} style={{ float: 'left', clear: "both" }}>
                    </div>
                    <input type="text" ref={(input) => { this.talkInput = input; }} onKeyPress={this._handleInputKeyPress} />
                </div>
            </div>
        )
    }
}

export default Chatbot;