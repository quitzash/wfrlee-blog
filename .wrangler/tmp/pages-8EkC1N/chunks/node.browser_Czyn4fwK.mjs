globalThis.process ??= {}; globalThis.process.env ??= {};
import { A as AnthropicError } from './client_mBwPEIjQ.mjs';

/** Substituted for `./node` by the package.json `browser` field; every property access throws. */
function unavailable(module) {
    return new Proxy({}, {
        get(_target, property) {
            if (typeof property === 'symbol')
                return undefined;
            throw new AnthropicError(`\`${module}.${property}\` is not available in this environment; it needs a Node.js-compatible runtime`);
        },
    });
}
const fs = /* @__PURE__ */ unavailable('fs');
const path = /* @__PURE__ */ unavailable('path');

export { fs, path };
