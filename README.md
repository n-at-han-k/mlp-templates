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

	var template = new t("<div>Hello {{=name}}</div>");
	document.body.innerHtml = template.render({name: "World!"});

For more advanced usage check the [`t_test.html`](https://github.com/jasonmoo/t.js/blob/master/t_test.html).

This software is released under the MIT license.

___
[Horse ascii art](https://www.asciiart.eu/animals/horses)
[Heavily inspired by t.js](https://github.com/jasonmoo/t.js/blob/master/t.js)

[PHP version](https://github.com/ramon82/t.php) maintained by [@ramon82](https://github.com/ramon82)
