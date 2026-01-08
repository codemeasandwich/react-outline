/**
 * @fileoverview Simple pub/sub system for managing generated CSS.
 * Allows components to publish CSS and the Styles component to subscribe.
 * @module pubsub
 */

/**
 * Singleton publish/subscribe manager for CSS class definitions.
 * Elements publish their CSS, and the Styles component subscribes to render it.
 * 
 * @type {{
 *   publish: function(string, string): void,
 *   subscribe: function(function(Object): void): void,
 *   get: function(): Object.<string, string>,
 *   clear: function(): void
 * }}
 */
const pubsub = new function () {

  /** @type {Object.<string, string>} Map of class names to CSS strings */
  const vals = {};
  /** @type {Array.<function(Object): void>} Subscriber callbacks */
  const subscribers = [];

  /**
   * Publishes a CSS class definition.
   * Notifies all subscribers of the updated values.
   * 
   * @param {string} key - CSS class name
   * @param {string|null} value - CSS string, or null to remove
   */
  this.publish = function (key, value) {

    vals[key] = value;
    subscribers.forEach(subscriber => subscriber(vals))
  }

  /**
   * Subscribes to CSS updates.
   * 
   * @param {function(Object.<string, string>): void} subscriber - Callback receiving all values
   */
  this.subscribe = (subscriber) => subscribers.push(subscriber);

  /**
   * Gets all published CSS values.
   * 
   * @returns {Object.<string, string>} Map of class names to CSS strings
   */
  this.get = () => vals;

  /**
   * Clears all published CSS values.
   * Used for testing to reset state between tests.
   */
  this.clear = () => {
    for (const className of Object.getOwnPropertyNames(vals)) {
      delete vals[className]
    }
  }
}()

export default pubsub
