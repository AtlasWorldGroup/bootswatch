Bootswatch
==========

This is a fork of Bootswatch customized to build AtlasNet themes.

**NOTE** Examples are written assuming you have Node installed and are using a PowerShell command line.

Usage
-----

Navigate to the root of the project and run `npm install` to install the dependencies.

~~~bash
npm install
~~~

** Node must be installed to use Node Package Manager **

To build a theme, run `grunt swatch:{theme}`. In this example, we will build the Atlas theme.

~~bash
grunt swatch:atlas
~~~

If you need the Date/Time picker switch to the themes root and `gulp`. Again, we will use the Atlas theme as an example.

~~~bash
cd atlas
gulp
~~~

Files
-----

Once a theme has been generated using `grunt swatch:{theme}`, in that theme's root, there is a `dist` folder. In the `dist` folder you will see a subfolder named `bootstrap` (and a subfolder named `datetime` if you also used `gulp` to build the date/time picker). The tasks created the normal and the minified version of the css.

Adding New Themes
-----

To create a new theme, copy an existing theme. As an example, we will create a theme for Titan.

~~~bash
Copy-Item atlas titan -recurse
~~~

Next, open the `Gruntfile.js` in the root of the project.

Inside of the project configuration in this file you will see `swatch:`

~~~bash
...

swatch: {
  atlas:{}
},

...
~~~

To enable the new theme to be built, we will add it to the swatch configuration.

~~~bash
...

swatch: {
  atlas:{}, titan{}
},

...
~~~

You can now build a theme for Titan.


Copyright and License
----
Bootswatch Copyright
Copyright 2014 Thomas Park

Code released under the MIT License.
