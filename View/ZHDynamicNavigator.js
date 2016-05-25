/**
 * Created by lincwee on 16/5/13.
 */

import React from 'react';
import {
    NavigatorIOS
} from 'react-native';

export default class ZHDynamicNavigator extends NavigatorIOS {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            testPop:'111'
        };
      }
    render() {
        return this;
    }
}