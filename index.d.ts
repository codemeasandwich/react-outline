import * as React from 'react';

// CSS style value types
type CSSValue = string | number;
type CSSProperties = React.CSSProperties;

// Color palette mapping
type ColorMap = Record<string, string>;

// Options for outline configuration
interface OutlineOptions {
    /** Enable caching of styles (default: false) */
    caching?: boolean;
    /** Color palette mapping for color values */
    colors?: ColorMap;
    /** Add name attribute to DOM elements for debugging (default: true) */
    named?: boolean;
}

// CSS selector styles (for :hover, @media, etc.)
type CSSSelector = {
    [selector: string]: CSSProperties;
};

// Style definition with optional base and variant styles
type StyleDefinition = CSSProperties | {
    base?: CSSProperties;
    [variant: string]: CSSProperties | undefined;
};

// Style input object - keys are style names
type StyleInput = {
    [styleName: string]: StyleDefinition;
};

// Logic function types
type StyleLogicFn<T = any> = (arg: T) => CSSProperties;
type StyleModifierFn<T = any> = (baseStyle: CSSProperties, arg: T) => CSSProperties;

// Logic functions object - keys are style names
type LogicInput = {
    [styleName: string]: StyleLogicFn | StyleModifierFn;
};

// Props for generated styled components
interface StyledComponentProps<T = any> extends React.HTMLAttributes<HTMLElement> {
    /** Style overrides or variant flags */
    style?: CSSProperties | Record<string, boolean> | T;
    /** CSS selector overrides for dynamic styling */
    css?: CSSSelector;
    /** DOM event handlers with direct element access */
    onDomEvent?: {
        [eventName: string]: (element: Element, event: Event) => void;
    };
    children?: React.ReactNode;
}

// Generated styled component
type StyledComponent = React.ComponentClass<StyledComponentProps>;

// Style function that returns inline styles
interface StyleFunction {
    /** Get the inline styles, optionally with variant flags */
    (variants?: Record<string, boolean>): CSSProperties;
}

// Tagged template literal function for creating styled components
interface TagCreator {
    (strings: TemplateStringsArray, ...values: any[]): StyledComponent;
}

// Combined style item - both a function and a tag creator
type StyleItem = StyleFunction & TagCreator & {
    /** Color palette if configured */
    colors?: ColorMap;
};

// Processed styles object
type ProcessedStyles<T extends StyleInput> = {
    [K in keyof T]: StyleItem;
} & {
    /** Color palette if configured */
    colors?: ColorMap;
};

// Outline function signature
interface OutlineFunction {
    /** Process style definitions into usable style functions */
    <T extends StyleInput>(styles: T, logic?: LogicInput): ProcessedStyles<T>;
    /** Color palette if configured via setOptions */
    colors?: ColorMap;
}

// Outline function with options pre-configured
interface ConfiguredOutlineFunction extends OutlineFunction {
    /** Color palette if configured via withOptions */
    colors?: ColorMap;
}

// Props for the Styles component
interface StylesProps {
    /** Optional: filter which styles to include */
    [key: string]: any;
}

// Styles component for CSS output (media queries, hover states, etc.)
interface StylesComponent extends React.FC<StylesProps> {
    /** Get CSS string for server-side rendering */
    toString(): string;
}

// Testing utilities
interface TestingUtils {
    /** Reset all generated CSS (useful in tests) */
    resetCSS: () => void;
}

// Main outline function
declare const outline: OutlineFunction;

// Create outline function with custom options
declare function withOptions(options: OutlineOptions): ConfiguredOutlineFunction;

// Set global default options
declare function setOptions(options: OutlineOptions): void;

// Styles component for CSS injection
declare const Styles: StylesComponent;

// Testing utilities
declare const testing: TestingUtils;

export default outline;
export { withOptions, setOptions, Styles, testing };
export type {
    OutlineOptions,
    StyleInput,
    LogicInput,
    StyleDefinition,
    StyleFunction,
    StyledComponent,
    StyledComponentProps,
    ProcessedStyles,
    ColorMap,
    CSSProperties,
    CSSSelector,
    StylesProps,
    TestingUtils,
};
