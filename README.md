# A glTF Tools Problem Reproduction Project

An extension that only exists to reproduce a problem with the [glTF Tools](https://marketplace.visualstudio.com/items?itemName=cesium.gltf-vscode) extension.

This extension (called **Bencoder**) has a function for [bencoding](https://en.wikipedia.org/wiki/Bencode) JavaScript values. The function can't encode a JavaScript function in a meaningful way, but will encode it in _some_ way. Unless, _and this is the problem_, the **glTF Tools** extension has been activated.

After activating the **glTF Tools** extension, encoding a function with the **Bencode** extension will cause the bencode function to enter an infinit recursion.

## Steps to reproduce

0. Have the glTF Tools extension installed and enabled
1. Open this project (the Bencoder extension project) in VS Code
1. Press <kbd>F5</kbd> to launch the Extension Host in the sub folder [a-gltf-project](a-gltf-project).
1. From the Command Palette, run **Bencode Hello World*
   * This bencodes a JavaScript object looking like so: `{message: "Hello World from bencoder!"}`
   * The result of the bencoding should pop up in an information message toast.
1. From the Command Palette, run **Bencode a Function Object**
   * This bencodes a JavaScript function defined like so: `function(){}`
   * The result of the bencoding should pop up in an information message toast.
   * Run the function more times to convince yourself that it works (for some defintion of “works”).
1. Open and then close the `Box.gltf` file.
1. From the Command Palette, run **Bencode a Function Object**
   * **Expected**: The result of the bencoding should pop up in an information message toast.
   * **Actual**: An error modal pops up with the message:
     > **Command 'Bencode a Function Object' resulted in an error** Maximum call stack size exceeded

The command for bencoding the Hello World object keeps working. The command for bencoding a function will not work until the VS Code window is reloaded.