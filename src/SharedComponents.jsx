// Copyright (C) 2018, Zpalmtree
//
// Please see the included LICENSE file for more information.

import * as _ from 'lodash';

import React from 'react';

import { View, Clipboard, Text } from 'react-native';

import { Button } from 'react-native-elements';

import Config from './Config';

import { Styles } from './Styles';
import { toastPopUp } from './Utilities';

export function TextFixedWidth({ children }) {
    const fontFamily = Platform.OS === 'ios' ? 'Courier' : 'monospace'

    return (
        <Text style={{fontFamily, fontSize: 12}}>{ children }</Text>
    )
}

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
            <View style={[{...this.props.style}, {
                alignItems: 'flex-start',
            }]}>
                <Button
                    title='Copy'
                    onPress={() => {
                        Clipboard.setString(this.props.data);
                        toastPopUp(this.props.name + ' copied');
                    }}
                    titleStyle={{
                        color: Config.theme.primaryColour,
                        textDecorationLine: 'underline',
                    }}
                    type='clear'
                />
            </View>
        );
    }
}

export class Hr extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <View style={{ borderWidth: 0.5, borderColor: 'lightgrey', marginTop: 15, width: '90%' }}/>
        );
    }
}

export const BottomButton = props => (
    <View style={Styles.alignBottom}>
        <Button
            buttonStyle={{
                backgroundColor: Config.theme.primaryColour,
                height: 50
            }}
            {...props}
            title={props.title.toUpperCase()}
        />
    </View>
);

export class OR extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                paddingHorizontal: 10,
            }}>
                <View style={{
                    width: '45%',
                    borderWidth: 1,
                    borderColor: 'lightgrey',
                    height: 1
                }}/>

                <Text style={{
                    fontSize: 14,
                    color: 'grey',
                }}>
                    OR
                </Text>

                <View style={{
                    width: '45%',
                    borderWidth: 1,
                    borderColor: 'lightgrey',
                    height: 1
                }}/>
            </View>
        );
    }
}

export class OneLineText extends React.Component {
    constructor(props) {
        super(props);

        if (!this.props.style || !this.props.style.fontSize) {
            throw new Error('Fontsize property is mandatory!');
        }

        if (this.props.style.fontSize === 0) {
            throw new Error('Font size cannot be zero!');
        }

        this.multiplier = this.props.multiplier || 20;
    }

    calculateFontSize(fontSize, text) {
        if (text.length === 0) {
            return fontSize;
        }

        /* Get a decent guess of the right font size to use to fit on one line */
        let maxFontSize = Math.round(((1 / text.length) / fontSize) * this.multiplier * 1000);

        return Math.min(maxFontSize, fontSize);
    }

    render() {
        return(
            <Text {...this.props} style={[{...this.props.style}, {fontSize: this.calculateFontSize(this.props.style.fontSize, this.props.children)}]}>
                {this.props.children}
            </Text>
        );
    }
}