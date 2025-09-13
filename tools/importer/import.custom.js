
/*
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

/**
 * A map of custom parser names to imported parser functions.
 *
 * eg.
 * {
 *   myParser: customParser1,
 * }
 */
export const customParsers = {};

/**
 * An array of custom page elements to parse.
 * The name is the parser name.
 * If the element is a string, it will be used as a selector to the element to parse.
 * If the element is not provided, the parser will be applied to the main element.
 *
 * eg.
 * [
 *   { name: 'myParser', element: 'selector' },
 * ]
 */
export const customElements = [];

/**
 * Custom transformers
 */
export const customTransformers = {
  /**
   * Removes unwanted navigation and header elements from the page
   * @param {Document} document - The document to transform
   */
  inject: (hookName, element, context) => {
    if (hookName === 'beforeTransform') {
      try {
        // Try to get document from context, element, or global
        const doc = context?.document || element?.ownerDocument || element?.document || document;
        
        if (doc) {
          // Check and remove .help-left-navigation
          let element1 = doc.querySelector(".help-left-navigation");
          console.log('Before removal - .help-left-navigation found:', !!element1);
          element1?.remove();
          console.log('After removal - .help-left-navigation still exists:', !!doc.querySelector(".help-left-navigation"));
          
          // Check and remove #ces_holder
          let element2 = doc.querySelector("#ces_holder");
          console.log('Before removal - #ces_holder found:', !!element2);
          element2?.remove();
          console.log('After removal - #ces_holder still exists:', !!doc.querySelector("#ces_holder"));
          
          // Check and remove #hmb-header
          let element3 = doc.querySelector("#hmb-header");
          console.log('Before removal - #hmb-header found:', !!element3);
          element3?.remove();
          console.log('After removal - #hmb-header still exists:', !!doc.querySelector("#hmb-header"));
          
          // Check and remove .help-search
          let element4 = doc.querySelector(".help-search");
          console.log('Before removal - .help-search found:', !!element4);
          element4?.remove();
          console.log('After removal - .help-search still exists:', !!doc.querySelector(".help-search"));
          
          // Check and remove #desktop-header
          let element5 = doc.querySelector("#desktop-header");
          console.log('Before removal - #desktop-header found:', !!element5);
          element5?.remove();
          console.log('After removal - #desktop-header still exists:', !!doc.querySelector("#desktop-header"));

          let element6 = doc.querySelector("#hmb-mobile-header");
          console.log('Before removal - #hmb-mobile-header found:', !!element6);
          element6?.remove();
          console.log('After removal - #hmb-mobile-header still exists:', !!doc.querySelector("#hmb-mobile-header"));
          
          let element7 = doc.querySelector("#hmb-footer");
          console.log('Before removal - #hmb-footer found:', !!element7);
          element7?.remove();
          console.log('After removal - #hmb-footer still exists:', !!doc.querySelector("#hmb-footer"));
          
          console.log('All element removals completed');
        } else {
          console.log('Debug: document is null, context:', context, 'element:', element);
        }
      } catch (e) {
        console.log('Error in removeUnwantedElements:', e);
      }
    }
  },
};
