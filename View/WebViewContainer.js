/**
 * Created by lincwee on 16/5/18.
 */
'use strict';

var React = require('react-native');
var {AppRegistry, Text, WebView, View} = React;
var Dimensions = require('Dimensions');

var WebViewContainer = React.createClass({
    getInitialState: function () {
        return {
            webViewHeight: 100 // default height, can be anything
        };
    },
    render: function () {
        var html = '<p><strong>WebView Content</strong></p><ul><li>Foo</li><li>Bar</li><li>Baz</li><\/ul>';
        return (
            <View style={{paddingTop: 20}}>
                <Text>This is above the WebView.</Text>
                <WebView
                    html={html}
                    injectedJavaScript="document.body.scrollHeight;"
                    scrollEnabled={false}
                    onNavigationStateChange={this._updateWebViewHeight}
                    automaticallyAdjustContentInsets={true}
                    style={{width: Dimensions.get('window').width, height: this.state.webViewHeight}}/>
                <Text>This is below the WebView.</Text>
            </View>
        );
    },
    //called when HTML was loaded and injected JS executed
    _updateWebViewHeight: function (event) {
        //jsEvaluationValue contains result of injected JS
        this.setState({webViewHeight: parseInt(event.jsEvaluationValue)});
    }
});

AppRegistry.registerComponent('WebViewContainer', () => WebViewContainer);
