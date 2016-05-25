/**
 * Created by lincwee on 16/5/13.
 */
import React from 'react';
import Dimensions from 'Dimensions';
import WebContainer from 'react-native-html-webview';
import {
    Component,
    AppRegistry,
    ListView,
    Text,
    View,
    ActivityIndicatorIOS,
    TouchableHighlight,
    StyleSheet,
    Image,
    WebView,
    ScrollView,
    InteractionManager
} from 'react-native';

var styles = StyleSheet.create({
    WebViewStyle: {
        //flex: 1,
        width: Dimensions.get('window').width,
    },
    headerTitle: {
        fontSize: 20,
        backgroundColor: '#00000000',
        color: '#ffffff',
        alignSelf: 'center',
        marginLeft: 15,
        marginRight: 15,
        paddingBottom: 30
    },
});

export default class ZHDetailPage extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            newsDetail: '',
            isLoading: true,
            id: this.props.rowID,
            imgRatio: 1,
        };
    }

    render() {
        var html;
        if (!this.state.isLoading) {
            html = '<html><head><link rel=\"stylesheet\" type=\"text/css\" href='
                + this.state.newsDetail.css[0] + ' /></head><body>'
                + this.state.newsDetail.body + '</body></html>';
        }

        var headerView;
        if (!this.state.isLoading) {
            headerView = (
                <Image
                    style={{resizeMode:'cover',
                width: Dimensions.get('window').width,
                height: this.state.imgHeight,
                position:'absolute',
                top: 0,
                left: 0
            }}
                    source={{uri: this.state.newsDetail.image}}>
                    <View style={{flex: 1, backgroundColor: '#00000030', justifyContent:'flex-end'}}>
                        <Text style={styles.headerTitle}>{this.state.newsDetail.title}</Text>
                    </View>
                </Image>
            );
        }

        var isLoadingFlagView = (!this.state.isLoading) ?
            (
                <View style={{backgroundColor:'#ffffff', flex: 1}}>
                    <WebContainer style={styles.WebViewStyle}
                                  makeSafe={false}
                                  autoHeight={true}
                                  html={html}
                    />
                    {headerView}
                </View>
            )
            :
            (
                <ActivityIndicatorIOS
                    style={{flex:1, paddingTop: Dimensions.get('window').width / 2 ,alignItems:'center'}}
                    hidden='true' size='large'/>
            );
        return (
            <ScrollView
                style={{top: 0, left: 0, backgroundColor:'#ffffff', position: 'absolute', height: Dimensions.get('window').height ,width: Dimensions.get('window').width}}
                automaticallyAdjustContentInsets={false}
                onScroll={this._onScroll.bind(this)}
            >
                {isLoadingFlagView}
            </ScrollView>
        );
    }

    _onScroll(event) {
        var sxt = event.nativeEvent.contentOffset.y;
        var radio = this.state.imgRatio;
        if (sxt < 400) {
            this.setState({
                imgheight: 200 + sxt / 300 * 100
            });
        }
    }

    componentDidMount() {
        var url = "http://news-at.zhihu.com/api/4/news/" + this.state.id;
        this._executeQuery(url);
        InteractionManager.runAfterInteractions(() => {
        });

    }

    _executeQuery(query) {
        console.log(query);
        this.setState({isLoading: true});
        fetch(query)
            .then(response => response.json())
            .then(json => {
                this._handleResponse(json);
                console.log(json);
            })
            .catch(error =>
                this.setState({
                    isLoading: false,
                    message: 'bed response' + error
                }));
    }

    _handleResponse(response) {
        if (response) {
            InteractionManager.runAfterInteractions(() => {
                this.setState({
                    newsDetail: response,
                    isLoading: false
                });
                Image.getSize(response.image, (width, height) => {
                    this.setState({
                        imgRatio: height / width,
                        //imgHeight: height / width * Dimensions.get('window').width
                        imgHeight: 200
                    });
                });
                Image.prefetch(response.image);

            });


        }
    }

}