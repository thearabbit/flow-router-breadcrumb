# Breadcrumb For Flow Router

### Install
```js
meteor add theara:flow-router-breadcrumb
```

### Usage
#### Breadcrumb register

```js
FlowRouter.route('/level1', {
    name: 'level1',
    action: function (params, queryParams) {
        Layout.main('level1');
    }
});
Breadcrumb.register({
    route: 'level1',
    title: 'Level 1'
});

// ------------------------

FlowRouter.route('/level2', {
    name: 'level2',
    action: function (params, queryParams) {
        Layout.main('level2');
    }
});
Breadcrumb.register({
    route: 'level2',
    title: 'Level 2',
    parent: 'level1'
});

// ------------------------

FlowRouter.route('/level3/:level2Id', {
    name: 'level3',
    action: function (params, queryParams) {
        Layout.main('level3');
    }
});
Breadcrumb.register({
    route: {name: 'level3', params: 'level2Id', queryParams: ['color', 'background']},
    title: 'Level 3',
    parent: 'level2'
});

// ------------------------

FlowRouter.route('/level4/:level2Id/:level3Id', {
    name: 'level4',
    action: function (params, queryParams) {
        Layout.main('level4');
    }
});
Breadcrumb.register({
    route: {name: 'level4', params: ['level2Id', 'level3Id'], queryParams: ['color', 'background']},
    title: 'Level 4',
    parent: 'level3'
});
```

#### Breadcrumb render

```js
<!--Render with bootstrap 3-->
{{> breadcrumb}}

<!--Render with custom-->
<ol class="breadcrumb">
    {{#each breadcrumb}}
        {{#if cssClassActive}}
            <li class="{{cssClassActive}}">{{title}}</li>
        {{else}}
            <li><a href="{{path}}">{{title}}</a></li>
        {{/if}}
    {{/each}}
</ol>
```
