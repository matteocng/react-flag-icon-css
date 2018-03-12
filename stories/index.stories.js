import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies

import FlagIconFactory from '../lib'
import { sizes, rotates, flips, countries } from '../lib/static/enums'

const FlagIcon = FlagIconFactory(React, { useCssModules: false });

const defaultProps = {
    code: 'rw',
    size: '5x',
};

const Block = ({ children, style }) => (
    <div style={{ margin: 10, ...style }}>
        {children}
    </div>
);

Block.propTypes = {
    children: PropTypes.node,
    style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

Block.defaultProps = {
    children: null,
    style: null,
};


const Span = ({ children, ...props }) => (
    <span style={{ paddingRight: 10 }} {...props}>
        {children}
    </span>
);

Span.propTypes = {
    children: PropTypes.node,
};

Span.defaultProps = {
    children: null,
};

storiesOf('FlagIconFactory (useCssModules: false)', module)
    .add('all countries', () =>
        countries.map(({ name, code }) => {
            const props = { ...defaultProps, code, key: code };
            return (
                <Block>
                    <Span>{name}</Span>
                    <FlagIcon { ...props } />
                </Block>
            );
        })
    )
    .add('all sizes', () =>
        sizes.map((size) => {
            const props = { ...defaultProps, size, key: size };
            return (
                <Block>
                    <Span>{size}</Span>
                    <FlagIcon { ...props } />
                </Block>
            );
        })
    )
    .add('all rotates', () =>
        rotates.map((rotate) => {
            const props = {...defaultProps, rotate, key: rotate };
            return (
                <Block style={{ marginBottom: 50, marginTop: 50 }}>
                    <Span>{rotate}</Span>
                    <FlagIcon { ...props } />
                </Block>
            );
        })
    )
    .add('all flips', () =>
        flips.map((flip) => {
            const props = { ...defaultProps, flip, key: flip };
            return (
                <Block>
                    <Span>{flip}</Span>
                    <FlagIcon { ...props } />
                </Block>
            );
        })
    );
