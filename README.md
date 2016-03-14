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

**NOTE** Node must be installed to use Node Package Manager

To build a theme, run `gulp -t {theme}`. In this example, we will build the Atlas theme.

~~~bash
gulp -t atlas
~~~

Files
-----

Once a theme has been generated using `gulp -t {theme}`, in that theme's root, there is a `dist` folder. In the `dist` folder you will see a subfolder named `bootstrap`, `datetime`, and `toolkit`. The tasks created the normal and the minified version of the css/js files.

Adding New Themes
-----

To create a new theme, run `gulp add-theme -t {theme}` to get the template from the `global` folder and create a new folder with your designated theme name. As an example, let's create a theme for Titan.

~~~bash
gulp add-theme -t titan
~~~

To customize the theme, navigate to the new theme's directory, open the `less` folder and edit the `variables.less`. The primary variable that needs to be edited for color scheming is `@brand-primary`.

Once the variables have been edited properly, just run `gulp -t titan`

~~~bash
gulp -t titan
~~~


Bootswatch Copyright and License
----

Copyright 2014 Thomas Park

Code released under the MIT License.
