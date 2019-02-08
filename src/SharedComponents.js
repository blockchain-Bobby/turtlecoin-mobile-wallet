// Copyright (C) 2018, Zpalmtree
//
// Please see the included LICENSE file for more information.

import * as _ from 'lodash';

import React from 'react';

import { View, Button, Clipboard } from 'react-native';

import Config from './Config';

import { Styles } from './Styles';
import { toastPopUp, TextFixedWidth } from './Utilities';

/**
 * Display the seed in a nice way
 */
export class SeedComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const split = this.props.seed.split(' ');
        const lines = _.chunk(split, 5);

        return(
            <View>
                <View style={{
                    alignItems: 'center',
                    marginTop: 10,
                    borderWidth: 1,
                    borderColor: this.props.borderColour,
                    padding: 10
                }}>
                    <TextFixedWidth>{lines[0].join(' ')}</TextFixedWidth>
                    <TextFixedWidth>{lines[1].join(' ')}</TextFixedWidth>
                    <TextFixedWidth>{lines[2].join(' ')}</TextFixedWidth>
                    <TextFixedWidth>{lines[3].join(' ')}</TextFixedWidth>
                    <TextFixedWidth>{lines[4].join(' ')}</TextFixedWidth>
                </View>
                <CopyButton
                    data={this.props.seed}
                    name='Seed'
                />
            </View>
        );
    }
}

/**
 * Copy the data to clipboard
 */
export class CopyButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <View style={[Styles.buttonContainer, {
                    alignItems: this.props.alignItems || 'flex-end',
                }]}>
                <Button
                    title='Copy'
                    onPress={() => {
                        Clipboard.setString(this.props.data);
                        toastPopUp(this.props.name + ' copied');
                    }}
                    color={Config.theme.primaryColour}
                />
            </View>
        );
    }
}