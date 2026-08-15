/**
 * dsh-pixterm-theme host plugin — intentionally a no-op.
 *
 * The theme lives entirely in the browser half (client/client.js): token
 * overrides through the theme service plus one injected stylesheet. This
 * host entry exists so the Cordis row in cordis.patch.yml has a package main
 * to mount; the `dsh.client` declaration in package.json is what actually
 * delivers the theme to the Web GUI.
 */
export const name = 'dsh-pixterm-theme'

export function apply() {
  // Client-only theme: nothing to do on the host.
}
