import { FC } from 'react'
import textStyles from './Text.module.css'

export interface TextProps {
    styles?: Array<string>
}

const safeConcatStyles = (
    style: string,
    styles?: Array<string>
): Array<string> => [style, ...(styles ? styles : [])]

export const Text: FC<TextProps> = (props) => {
    const { styles, children } = props
    const cn = `${textStyles.main} ${styles ? styles.join(' ') : ''}`.trim()

    return <span className={cn}>{children}</span>
}

export const Hero: FC<TextProps> = (props) => {
    return (
        <Text styles={safeConcatStyles(textStyles.hero, props.styles)}>
            {props.children}
        </Text>
    )
}

export const Heading1: FC<TextProps> = (props) => {
    return (
        <Text styles={safeConcatStyles(textStyles.h1, props.styles)}>
            {props.children}
        </Text>
    )
}

export const Heading2: FC<TextProps> = (props) => {
    return (
        <Text styles={safeConcatStyles(textStyles.h2, props.styles)}>
            {props.children}
        </Text>
    )
}

export const Heading3: FC<TextProps> = (props) => {
    return (
        <Text styles={safeConcatStyles(textStyles.h3, props.styles)}>
            {props.children}
        </Text>
    )
}

export const Paragraph: FC<TextProps> = (props) => {
    return (
        <Text styles={safeConcatStyles(textStyles.p, props.styles)}>
            {props.children}
        </Text>
    )
}

export const Caption: FC<TextProps> = (props) => {
    return (
        <Text styles={safeConcatStyles(textStyles.c, props.styles)}>
            {props.children}
        </Text>
    )
}
