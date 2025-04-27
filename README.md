# My Little Pony® Templates

```
                            _(\_/)      -------------
                          ,((((^`\     < Fuck React! >
                         ((((  (6 \     -------------
                       ,((((( ,    \    /
   ,,,_              ,(((((  /"._  ,`, /
  ((((\\ ,...       ,((((   /    `-.-'
  )))  ;'    `"'"'""((((   (      
 (((  /            (((      \
  )) |                      |
 ((  |        .       '     |
 ))  \     _ '      `t   ,.')  
 (   |   y;- -,-""'"-.\   \/  
 )   / ./  ) /         `\  \
    |./   ( (           / /'
    ||     \\          //'|
    ||      \\       _//'||
    ||       ))     |_/  ||
    \_\     |_/          ||
    `'"                  \_\
```

A class-based OO approach to a simple templating language with conditionals and loops.

## Run the demo

```
npm install -g yarn # install yarn, if not already installed
yarn run dev
```

### Features
 * Simple interpolation: `{{=value}}`
 * Scrubbed interpolation: `{{%unsafe_value}}`
 * Name-spaced variables: `{{=User.address.city}}`
 * If/else blocks: `{{value}} <<markup>> {{:value}} <<alternate markup>> {{/value}}`
 * If not blocks: `{{!value}} <<markup>> {{/!value}}`
 * Object/Array iteration: `{{@object_value}} {{=_key}}:{{=_val}} {{/@object_value}}`
 * Multi-line templates (no removal of newlines required to render)
 * Render the same template multiple times with different data
 * Works in all modern browsers

### How to use

```
import { Template } from 'mlp-templates'
let template = new Template("<div>Hello {{=name}}</div>")
document.body.innerHTML = template.render({name: "World!"})
```

___

- [Horse ascii art](https://www.asciiart.eu/animals/horses)

- [Heavily inspired by t.js](https://github.com/jasonmoo/t.js/blob/master/t.js)

