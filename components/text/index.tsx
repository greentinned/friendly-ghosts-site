import { FC } from 'react'
import textStyles from './Text.module.css'

export interface TextProps {
    invert?: boolean;
    styles?: Array<string>
}

const safeConcatStyles = (
    style: string,
    styles?: Array<string>
): Array<string> => [style, ...(styles ? styles : [])]

export const Text: FC<TextProps> = (props) => {
    const { invert, styles, children } = props
    const cn = `${textStyles.main} ${invert ? textStyles.invert : ''} ${styles ? styles.join(' ') : ''}`.trim()

    return <span className={cn}>{children}</span>
}

export const Hero: FC<TextProps> = (props) => {
    const { styles, ...restProps } = props
    return (
        <Text styles={safeConcatStyles(textStyles.hero, props.styles)} {...restProps}>
            {props.children}
        </Text>
    )
}

export const Heading1: FC<TextProps> = (props) => {
    const { styles, ...restProps } = props
    return (
        <Text styles={safeConcatStyles(textStyles.h1, props.styles)} {...restProps}>
            {props.children}
        </Text>
    )
}

export const Heading2: FC<TextProps> = (props) => {
    const { styles, ...restProps } = props
    return (
        <Text styles={safeConcatStyles(textStyles.h2, props.styles)} {...restProps}>
            {props.children}
        </Text>
    )
}

export const Heading3: FC<TextProps> = (props) => {
    const { styles, ...restProps } = props
    return (
        <Text styles={safeConcatStyles(textStyles.h3, props.styles)} {...restProps}>
            {props.children}
        </Text>
    )
}

export const Paragraph: FC<TextProps> = (props) => {
    const { styles, ...restProps } = props
    return (
        <Text styles={safeConcatStyles(textStyles.p, props.styles)} {...restProps}>
            {props.children}
        </Text>
    )
}

export const Caption: FC<TextProps> = (props) => {
    const { styles, ...restProps } = props
    return (
        <Text styles={safeConcatStyles(textStyles.c, props.styles)} {...restProps}>
            {props.children}
        </Text>
    )
}
