export type TTagWrapper = {
    regexp: () => RegExp;
    test: (s: string) => boolean;
    innerText: (line: string) => string | null;
};
/**
 * Creates a start tag from string
 *
 * @param {string} tagStr tag string
 * @returns start tag wrapper object
 */
export declare const createStartTag: (tagStr: string) => TTagWrapper;
/**
 * Creates an end tag from string
 *
 * @param {string} tagStr
 * @returns end tag wrapper object
 */
export declare const createEndTag: (tagStr: string) => TTagWrapper;
/**
 * Creates a section tag from string
 *
 * @param {string} leftPartStr left part of a section
 * @param {string} rightPartStr right part of a section
 * @returns section tag wrapper object
 */
export declare const createSectionTag: (leftPartStr: string, rightPartStr: string) => TTagWrapper;
export declare const matchAllTag: TTagWrapper;
